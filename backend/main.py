import os
import sys
import re
import asyncio
import uuid
import tempfile
from typing import Optional

# Ensure backend directory is in sys.path for relative imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fastapi import FastAPI, Request, HTTPException, Query, BackgroundTasks, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from config import settings
from logger import logger
from limiter import limiter
from cache import cache_manager
from storage import storage_service
from extractor import extractor_instance
from converter import converter_instance

# Try importing celery app and task
try:
    from celery_app import celery_app
    from tasks import extract_song_task, download_mp3_task
    from converter_tasks import convert_audio_task
    CELERY_AVAILABLE = cache_manager.is_connected
except Exception as e:
    logger.warning(f"Celery task import warning: {e}. Falling back to sync mode.")
    CELERY_AVAILABLE = False

app = FastAPI(
    title=settings.APP_NAME,
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# SlowAPI Rate Limiting setup
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prometheus Metrics Instrumentation
try:
    from prometheus_fastapi_instrumentator import Instrumentator
    Instrumentator().instrument(app).expose(app)
except Exception as e:
    logger.warning(f"Prometheus instrumentator not loaded: {e}")

# Request / Response Schemas
class ExtractRequest(BaseModel):
    url: str
    async_mode: Optional[bool] = True

class AuthVerifyRequest(BaseModel):
    code: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None

class DownloadRequest(BaseModel):
    title: str
    artist: str
    video_url: Optional[str] = None

class ConvertRequest(BaseModel):
    file_id: str
    output_format: str
    options: Optional[dict] = {}

class MergeRequest(BaseModel):
    file_ids: list
    output_format: Optional[str] = "mp3"
    options: Optional[dict] = {}

# API Routes
@app.get("/")
@app.get("/api/health")
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": "2.0.0",
        "redis_cache": cache_manager.is_connected,
        "celery_enabled": CELERY_AVAILABLE,
        "environment": settings.ENVIRONMENT
    }

@app.post("/api/extract")
@limiter.limit(settings.RATE_LIMIT_EXTRACT)
async def extract_song(request: Request, body: ExtractRequest):
    url = body.url.strip()
    if not url:
        raise HTTPException(status_code=400, detail="Please provide a valid reel URL or song query.")

    logger.info(f"Received extraction request for URL: {url} (async_mode={body.async_mode})")

    # 1. Check Redis Cache
    cached_result = cache_manager.get(url)
    if cached_result:
        logger.info(f"Returning cached result for: {url}")
        return cached_result

    # 2. Async Queue Mode via Celery
    if body.async_mode and CELERY_AVAILABLE:
        try:
            task = extract_song_task.delay(url)
            logger.info(f"Enqueued extraction task ID: {task.id}")
            return {
                "success": True,
                "status": "queued",
                "job_id": task.id,
                "message": "Extraction job submitted successfully."
            }
        except Exception as e:
            logger.warning(f"Failed to enqueue Celery task ({e}). Falling back to synchronous processing.")

    # 3. Synchronous Direct Execution Fallback
    try:
        result = await extractor_instance.process_reel(url)
        if result.get("success"):
            cache_manager.set(url, result)
            return JSONResponse(content=result, status_code=200)
        else:
            return JSONResponse(content=result, status_code=422)
    except Exception as e:
        logger.error(f"Synchronous extraction error for '{url}': {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/jobs/{job_id}")
def get_job_status(job_id: str):
    if not CELERY_AVAILABLE:
        raise HTTPException(status_code=400, detail="Background task queue is not active.")

    task_result = celery_app.AsyncResult(job_id)
    state = task_result.state

    if state == "PENDING":
        return {"job_id": job_id, "status": "queued", "result": None}
    elif state == "STARTED":
        return {"job_id": job_id, "status": "processing", "result": None}
    elif state == "SUCCESS":
        res = task_result.result
        return {"job_id": job_id, "status": "completed", "result": res}
    elif state == "FAILURE":
        return {"job_id": job_id, "status": "failed", "error": str(task_result.info)}
    else:
        return {"job_id": job_id, "status": state.lower(), "result": None}

@app.api_route("/api/download", methods=["GET", "POST"])
async def download_mp3(
    request: Request,
    background_tasks: BackgroundTasks,
    title: Optional[str] = Query("Unknown"),
    artist: Optional[str] = Query("Unknown"),
    video_url: Optional[str] = Query(None)
):
    if request.method == "POST":
        try:
            body = await request.json()
            title = body.get("title", title)
            artist = body.get("artist", artist)
            video_url = body.get("video_url", video_url)
        except Exception:
            pass

    try:
        mp3_path = extractor_instance.download_song_mp3(title, artist, video_url)
        clean_name = re.sub(r'[^\w\s-]', '', f"{artist} - {title}").strip() or "song"
        download_filename = f"{clean_name}.mp3"
        object_name = f"mp3s/{download_filename}"

        # Store in Object Storage (S3 / MinIO / Local)
        try:
            storage_service.upload_file(mp3_path, object_name)
            presigned_url = storage_service.generate_presigned_url(object_name)
            if presigned_url and presigned_url.startswith("http"):
                # Clean up local file in background task
                background_tasks.add_task(lambda p: os.remove(p) if os.path.exists(p) else None, mp3_path)
                return RedirectResponse(url=presigned_url)
        except Exception as st_err:
            logger.warning(f"Storage service upload warning: {st_err}. Falling back to direct stream.")

        # Fallback direct streaming response
        def cleanup():
            if os.path.exists(mp3_path):
                try:
                    os.remove(mp3_path)
                except Exception:
                    pass

        background_tasks.add_task(cleanup)
        return FileResponse(
            path=mp3_path,
            filename=download_filename,
            media_type="audio/mpeg"
        )
    except Exception as e:
        logger.error(f"MP3 Download error for '{artist} - {title}': {e}")
        raise HTTPException(status_code=500, detail=f"Failed to download MP3: {str(e)}")

@app.api_route("/api/download_video", methods=["GET", "POST"])
async def download_video(
    request: Request,
    background_tasks: BackgroundTasks,
    url: Optional[str] = Query(None),
    title: Optional[str] = Query("Video"),
    artist: Optional[str] = Query("Unknown")
):
    if request.method == "POST":
        try:
            body = await request.json()
            url = body.get("url", url)
            title = body.get("title", title)
            artist = body.get("artist", artist)
        except Exception:
            pass

    if not url:
        raise HTTPException(status_code=400, detail="Missing video URL.")

    url = url.strip()
    try:
        video_path = extractor_instance.download_reel_video(url, title, artist)
        clean_name = re.sub(r'[^\w\s-]', '', f"{artist} - {title}").strip() or "video"
        
        # Get extension of downloaded file
        ext = video_path.split('.')[-1].lower() if '.' in video_path else 'mp4'
        download_filename = f"{clean_name}.{ext}"
        object_name = f"videos/{download_filename}"

        # Store in Object Storage (S3 / MinIO / Local)
        try:
            storage_service.upload_file(video_path, object_name)
            presigned_url = storage_service.generate_presigned_url(object_name)
            if presigned_url and presigned_url.startswith("http"):
                # Clean up local file in background task
                background_tasks.add_task(lambda p: os.remove(p) if os.path.exists(p) else None, video_path)
                return RedirectResponse(url=presigned_url)
        except Exception as st_err:
            logger.warning(f"Storage service upload warning for video: {st_err}. Falling back to direct stream.")

        # Fallback direct streaming response
        def cleanup():
            if os.path.exists(video_path):
                try:
                    os.remove(video_path)
                except Exception:
                    pass

        background_tasks.add_task(cleanup)
        
        media_type = f"video/{ext}" if ext in ['mp4', 'webm', 'ogg', 'mov'] else "video/mp4"
        return FileResponse(
            path=video_path,
            filename=download_filename,
            media_type=media_type
        )
    except Exception as e:
        logger.error(f"Video Download error for '{url}': {e}")
        raise HTTPException(status_code=500, detail=f"Failed to download video: {str(e)}")

# In-memory registry for fallback jobs when Redis/Celery is disabled
FALLBACK_JOBS = {}

def sync_conversion_worker(job_id: str, file_id: str, output_format: str, options: dict):
    local_input_path = os.path.join(tempfile.gettempdir(), "song_extractor_storage", f"uploads/{file_id}")
    output_filename = f"{file_id.split('.')[0]}.{output_format}"
    local_output_path = os.path.join(tempfile.gettempdir(), "song_extractor_storage", f"converted/{output_filename}")
    os.makedirs(os.path.dirname(local_output_path), exist_ok=True)
    
    FALLBACK_JOBS[job_id] = {"status": "processing", "progress": 40, "result": None}
    
    def callback(pct):
        if job_id in FALLBACK_JOBS:
            FALLBACK_JOBS[job_id]["progress"] = pct
        
    success = converter_instance.convert(local_input_path, local_output_path, options, progress_callback=callback)
    
    if not success:
        FALLBACK_JOBS[job_id] = {"status": "failed", "error": "FFmpeg conversion processing failed.", "progress": 0, "result": None}
        return
        
    FALLBACK_JOBS[job_id]["progress"] = 90
    object_key = f"converted/{output_filename}"
    storage_service.upload_file(local_output_path, object_key)
    file_size = os.path.getsize(local_output_path)
    
    from storage import LocalStorageService
    try:
        if not isinstance(storage_service, LocalStorageService) and os.path.exists(local_output_path):
            os.remove(local_output_path)
    except Exception:
        pass
        
    download_url = storage_service.generate_presigned_url(object_key, expiration=1800)
    
    FALLBACK_JOBS[job_id] = {
        "status": "completed",
        "progress": 100,
        "result": {
            "success": True,
            "job_id": job_id,
            "file_size": file_size,
            "output_filename": output_filename,
            "download_url": download_url
        }
    }

def sync_merge_worker(job_id: str, file_ids: list, output_format: str, options: dict):
    from storage import LocalStorageService
    input_paths = []
    
    for fid in file_ids:
        local_path = os.path.join(tempfile.gettempdir(), "song_extractor_storage", f"uploads/{fid}")
        if not os.path.exists(local_path):
            try:
                storage_service.download_file(f"uploads/{fid}", local_path)
            except Exception as e:
                logger.error(f"Failed to fetch uploaded file {fid}: {e}")
                FALLBACK_JOBS[job_id] = {"status": "failed", "error": f"Failed to download input file: {fid}", "progress": 0, "result": None}
                return
        input_paths.append(local_path)
        
    output_filename = f"merged_{uuid.uuid4().hex[:8]}.{output_format}"
    local_output_path = os.path.join(tempfile.gettempdir(), "song_extractor_storage", f"converted/{output_filename}")
    os.makedirs(os.path.dirname(local_output_path), exist_ok=True)
    
    FALLBACK_JOBS[job_id] = {"status": "processing", "progress": 40, "result": None}
    
    success = converter_instance.join_files(input_paths, local_output_path, options)
    
    if not success:
        FALLBACK_JOBS[job_id] = {"status": "failed", "error": "Audio join processing failed.", "progress": 0, "result": None}
        return
        
    FALLBACK_JOBS[job_id]["progress"] = 90
    object_key = f"converted/{output_filename}"
    storage_service.upload_file(local_output_path, object_key)
    file_size = os.path.getsize(local_output_path)
    try:
        if not isinstance(storage_service, LocalStorageService) and os.path.exists(local_output_path):
            os.remove(local_output_path)
    except Exception:
        pass
    download_url = storage_service.generate_presigned_url(object_key, expiration=1800)
    
    FALLBACK_JOBS[job_id] = {
        "status": "completed",
        "progress": 100,
        "result": {
            "success": True,
            "job_id": job_id,
            "file_size": file_size,
            "output_filename": output_filename,
            "download_url": download_url
        }
    }

@app.post("/api/upload")
@limiter.limit(settings.RATE_LIMIT_UPLOAD)
async def upload_file(request: Request, file: UploadFile = File(...)):
    contents = await file.read()
    file_size = len(contents)
    
    if file_size > settings.MAX_UPLOAD_SIZE_GUEST:
        raise HTTPException(status_code=413, detail=f"File is too large ({file_size // (1024*1024)}MB). Maximum allowed size is 1GB.")
        
    file_uuid = uuid.uuid4().hex[:12]
    ext = file.filename.split('.')[-1].lower() if '.' in file.filename else 'dat'
    file_id = f"{file_uuid}.{ext}"
    
    local_path = os.path.join(tempfile.gettempdir(), "song_extractor_storage", f"uploads/{file_id}")
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    
    with open(local_path, "wb") as f_out:
        f_out.write(contents)
        
    try:
        object_key = f"uploads/{file_id}"
        storage_service.upload_file(local_path, object_key)
    except Exception as st_err:
        logger.warning(f"Failed to sync upload with object storage: {st_err}")
        
    return {
        "success": True,
        "file_id": file_id,
        "size": file_size
    }

@app.post("/api/convert")
@limiter.limit(settings.RATE_LIMIT_CONVERT)
async def start_conversion(request: Request, body: ConvertRequest, background_tasks: BackgroundTasks):
    file_id = body.file_id.strip()
    output_format = body.output_format.strip().lower()
    
    if not file_id or not output_format:
        raise HTTPException(status_code=400, detail="Missing file_id or output_format.")
        
    supported_formats = ['mp3', 'wav', 'flac', 'm4a', 'aac', 'ogg', 'm4r']
    if output_format not in supported_formats:
        raise HTTPException(status_code=400, detail=f"Unsupported output format: {output_format}")
        
    if CELERY_AVAILABLE:
        try:
            task = convert_audio_task.delay(file_id, output_format, body.options)
            return {
                "success": True,
                "job_id": task.id,
                "status": "queued"
            }
        except Exception as e:
            logger.warning(f"Failed to delay Celery conversion task ({e}). Using background fallback.")
            
    job_id = str(uuid.uuid4())
    FALLBACK_JOBS[job_id] = {
        "status": "processing",
        "progress": 20,
        "result": None
    }
    background_tasks.add_task(sync_conversion_worker, job_id, file_id, output_format, body.options)
    return {
        "success": True,
        "job_id": job_id,
        "status": "processing"
    }

@app.post("/api/merge")
@limiter.limit(settings.RATE_LIMIT_CONVERT)
async def start_merge(request: Request, body: MergeRequest, background_tasks: BackgroundTasks):
    file_ids = body.file_ids
    if not file_ids or len(file_ids) < 2:
        raise HTTPException(status_code=400, detail="At least 2 files are required to merge.")
        
    output_format = (body.output_format or "mp3").strip().lower()
    job_id = str(uuid.uuid4())
    FALLBACK_JOBS[job_id] = {
        "status": "processing",
        "progress": 15,
        "result": None
    }
    background_tasks.add_task(sync_merge_worker, job_id, file_ids, output_format, body.options)
    return {
        "success": True,
        "job_id": job_id,
        "status": "processing"
    }

@app.get("/api/convert/jobs/{job_id}")
def get_conversion_job_status(job_id: str):
    if job_id in FALLBACK_JOBS:
        return FALLBACK_JOBS[job_id]
        
    if CELERY_AVAILABLE:
        task_result = celery_app.AsyncResult(job_id)
        state = task_result.state
        
        if state == "PENDING":
            return {"job_id": job_id, "status": "queued", "progress": 5, "result": None}
        elif state == "STARTED":
            return {"job_id": job_id, "status": "processing", "progress": 30, "result": None}
        elif state == "PROGRESS":
            meta = task_result.info or {}
            progress = meta.get('progress', 50)
            return {"job_id": job_id, "status": "processing", "progress": progress, "result": None}
        elif state == "SUCCESS":
            return {"job_id": job_id, "status": "completed", "progress": 100, "result": task_result.result}
        elif state == "FAILURE":
            return {"job_id": job_id, "status": "failed", "progress": 0, "error": str(task_result.info)}
            
    raise HTTPException(status_code=404, detail="Job ID not found.")

@app.get("/api/convert/download/{job_id}")
def download_converted_file(job_id: str):
    result = None
    if job_id in FALLBACK_JOBS and FALLBACK_JOBS[job_id]["status"] == "completed":
        result = FALLBACK_JOBS[job_id]["result"]
    elif CELERY_AVAILABLE:
        task_result = celery_app.AsyncResult(job_id)
        if task_result.state == "SUCCESS":
            result = task_result.result
            
    if not result or not result.get("success"):
        raise HTTPException(status_code=404, detail="Converted file not found or task is not completed yet.")
        
    output_filename = result["output_filename"]
    
    if result.get("download_url") and result["download_url"].startswith("http"):
        return RedirectResponse(url=result["download_url"])
        
    local_path = os.path.join(tempfile.gettempdir(), "song_extractor_storage", f"converted/{output_filename}")
    if os.path.exists(local_path):
        return FileResponse(path=local_path, filename=output_filename, media_type="audio/mpeg")
        
    raise HTTPException(status_code=404, detail="Local converted file not found.")

@app.get("/api/download/local/{object_name:path}")
def serve_local_storage(object_name: str):
    from storage import LocalStorageService
    storage = LocalStorageService()
    file_path = os.path.join(storage.base_dir, object_name)
    if os.path.exists(file_path):
        filename = os.path.basename(file_path)
        return FileResponse(path=file_path, filename=filename, media_type="audio/mpeg")
    raise HTTPException(status_code=404, detail="Requested storage file not found.")

@app.post("/api/auth/google/verify")
def verify_google_auth(body: AuthVerifyRequest):
    if not body.email and not body.code:
        raise HTTPException(status_code=400, detail="Missing authorization code or email.")

    user_email = body.email or "google.user@gmail.com"
    user_name = body.name or user_email.split("@")[0]
    session_token = f"jwt_token_google_{user_email.replace('@', '_')}"

    return {
        "success": True,
        "user": {
            "email": user_email,
            "name": user_name,
            "provider": "google",
            "session_token": session_token
        }
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    logger.info(f"🎵 SongExtractor FastAPI starting on http://0.0.0.0:{port}")
    uvicorn.run(app, host="0.0.0.0", port=port)
