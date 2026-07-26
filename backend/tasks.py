import asyncio
import uuid
import os
from celery_app import celery_app
from extractor import extractor_instance
from cache import cache_manager
from storage import storage_service
from logger import logger

@celery_app.task(bind=True, name="tasks.extract_song_task")
def extract_song_task(self, url: str):
    logger.info(f"Task {self.request.id} started processing URL: {url}")
    
    # Run async process_reel in sync event loop
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        result = loop.run_until_complete(extractor_instance.process_reel(url))
    except Exception as e:
        logger.error(f"Task {self.request.id} failed: {e}")
        return {"success": False, "error": str(e)}
    finally:
        loop.close()

    if result.get("success"):
        # Cache successful extraction result for identical URL
        cache_manager.set(url, result)

    logger.info(f"Task {self.request.id} completed successfully.")
    return result

@celery_app.task(bind=True, name="tasks.download_mp3_task")
def download_mp3_task(self, title: str, artist: str, video_url: str = None):
    logger.info(f"Task {self.request.id} started downloading MP3 for: {artist} - {title}")
    try:
        temp_mp3_path = extractor_instance.download_song_mp3(title, artist, video_url)
        object_name = f"mp3s/{uuid.uuid4().hex[:12]}_{os.path.basename(temp_mp3_path)}"
        
        # Upload file to Object Storage (S3 / MinIO or Local Storage)
        storage_service.upload_file(temp_mp3_path, object_name)
        
        # Cleanup temp local file after upload
        if os.path.exists(temp_mp3_path):
            os.remove(temp_mp3_path)

        presigned_url = storage_service.generate_presigned_url(object_name, expiration=3600)
        return {
            "success": True,
            "object_name": object_name,
            "download_url": presigned_url
        }
    except Exception as e:
        logger.error(f"Task {self.request.id} MP3 Download failed: {e}")
        return {"success": False, "error": str(e)}
