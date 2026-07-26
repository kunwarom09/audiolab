import os
import uuid
import tempfile
from celery_app import celery_app
from converter import converter_instance
from storage import storage_service
from logger import logger

@celery_app.task(bind=True, name="tasks.convert_audio_task")
def convert_audio_task(self, file_id: str, output_format: str, options: dict):
    logger.info(f"Celery conversion task {self.request.id} started. File: {file_id} -> {output_format}")
    
    # Resolve file paths in Local/S3 storage
    local_input_path = os.path.join(tempfile.gettempdir(), "song_extractor_storage", f"uploads/{file_id}")
    
    # 1. Download source file from object store if not present locally
    if not os.path.exists(local_input_path):
        os.makedirs(os.path.dirname(local_input_path), exist_ok=True)
        object_key = f"uploads/{file_id}"
        success = storage_service.download_file(object_key, local_input_path)
        if not success:
            logger.error(f"Failed to retrieve source upload file: {object_key}")
            return {"success": False, "error": "Source upload file not found in storage."}

    # 2. Setup output temp path
    output_filename = f"{file_id.split('.')[0]}.{output_format}"
    local_output_path = os.path.join(tempfile.gettempdir(), "song_extractor_storage", f"converted/{output_filename}")
    os.makedirs(os.path.dirname(local_output_path), exist_ok=True)

    # Callback update function for celery status reporting
    def progress_callback(percentage):
        self.update_state(
            state='PROGRESS',
            meta={
                'progress': percentage,
                'status': 'converting'
            }
        )

    # 3. Perform FFmpeg conversion
    self.update_state(state='PROGRESS', meta={'progress': 30, 'status': 'converting'})
    
    success = converter_instance.convert(
        local_input_path,
        local_output_path,
        options,
        progress_callback=progress_callback
    )

    if not success:
        logger.error(f"FFmpeg audio conversion failed for job {self.request.id}")
        return {"success": False, "error": "FFmpeg conversion execution failed."}

    # 4. Upload converted file to storage
    self.update_state(state='PROGRESS', meta={'progress': 90, 'status': 'saving'})
    object_key = f"converted/{output_filename}"
    storage_service.upload_file(local_output_path, object_key)

    # 5. Extract file metadata
    file_size = os.path.getsize(local_output_path)

    # 6. Cleanup local temp converted files if using cloud/S3 storage
    from storage import LocalStorageService
    try:
        if not isinstance(storage_service, LocalStorageService) and os.path.exists(local_output_path):
            os.remove(local_output_path)
    except Exception as cleanup_err:
        logger.warning(f"Error cleaning up local conversion temp file: {cleanup_err}")

    # Generate Presigned download link (valid for 30 minutes / 1800s)
    download_url = storage_service.generate_presigned_url(object_key, expiration=1800)
    
    logger.info(f"Celery conversion task {self.request.id} finished successfully.")
    return {
        "success": True,
        "job_id": self.request.id,
        "file_size": file_size,
        "output_filename": output_filename,
        "download_url": download_url
    }
