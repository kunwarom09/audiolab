import os
import tempfile
import time
from typing import Optional
import boto3
from botocore.exceptions import BotoCoreError, ClientError
from config import settings
from logger import logger

class BaseStorageService:
    def upload_file(self, file_path: str, object_name: str) -> str:
        raise NotImplementedError

    def download_file(self, object_name: str, target_path: str) -> bool:
        raise NotImplementedError

    def generate_presigned_url(self, object_name: str, expiration: int = 3600) -> Optional[str]:
        raise NotImplementedError

    def delete_file(self, object_name: str) -> bool:
        raise NotImplementedError

class S3StorageService(BaseStorageService):
    def __init__(self):
        self.bucket_name = settings.S3_BUCKET_NAME
        self.s3_client = boto3.client(
            's3',
            endpoint_url=settings.S3_ENDPOINT_URL,
            aws_access_key_id=settings.S3_ACCESS_KEY,
            aws_secret_access_key=settings.S3_SECRET_KEY,
            region_name=settings.S3_REGION,
            config=boto3.session.Config(
                signature_version='s3v4',
                connect_timeout=1,
                read_timeout=2,
                retries={'max_attempts': 1}
            )
        )
        self._ensure_bucket_exists()

    def _ensure_bucket_exists(self):
        try:
            self.s3_client.head_bucket(Bucket=self.bucket_name)
        except Exception as head_err:
            try:
                self.s3_client.create_bucket(Bucket=self.bucket_name)
                logger.info(f"Created S3 bucket: {self.bucket_name}")
            except Exception as create_err:
                raise RuntimeError(f"S3 endpoint connection failed: {create_err}")

    def upload_file(self, file_path: str, object_name: str) -> str:
        try:
            self.s3_client.upload_file(file_path, self.bucket_name, object_name)
            logger.info(f"Successfully uploaded {file_path} as {object_name} to bucket {self.bucket_name}")
            return object_name
        except (BotoCoreError, ClientError) as e:
            logger.error(f"S3 Upload failed for {object_name}: {e}")
            raise e

    def download_file(self, object_name: str, target_path: str) -> bool:
        try:
            self.s3_client.download_file(self.bucket_name, object_name, target_path)
            return True
        except Exception as e:
            logger.error(f"S3 Download failed for {object_name}: {e}")
            return False

    def generate_presigned_url(self, object_name: str, expiration: int = 3600) -> Optional[str]:
        try:
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket_name, 'Key': object_name},
                ExpiresIn=expiration
            )
            return url
        except Exception as e:
            logger.error(f"Failed generating presigned URL for {object_name}: {e}")
            return None

    def delete_file(self, object_name: str) -> bool:
        try:
            self.s3_client.delete_object(Bucket=self.bucket_name, Key=object_name)
            return True
        except Exception as e:
            logger.error(f"Failed deleting object {object_name}: {e}")
            return False

class LocalStorageService(BaseStorageService):
    def __init__(self):
        self.base_dir = os.path.join(tempfile.gettempdir(), "song_extractor_storage")
        os.makedirs(self.base_dir, exist_ok=True)

    def upload_file(self, file_path: str, object_name: str) -> str:
        dest_path = os.path.join(self.base_dir, object_name)
        if os.path.abspath(file_path) == os.path.abspath(dest_path):
            logger.info(f"Source and destination same. Skipping copy for local path: {dest_path}")
            return object_name
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        with open(file_path, 'rb') as src, open(dest_path, 'wb') as dst:
            dst.write(src.read())
        logger.info(f"Stored file locally at {dest_path}")
        return object_name

    def download_file(self, object_name: str, target_path: str) -> bool:
        src_path = os.path.join(self.base_dir, object_name)
        if os.path.abspath(src_path) == os.path.abspath(target_path):
            return os.path.exists(src_path)
        if os.path.exists(src_path):
            with open(src_path, 'rb') as src, open(target_path, 'wb') as dst:
                dst.write(src.read())
            return True
        return False

    def generate_presigned_url(self, object_name: str, expiration: int = 3600) -> Optional[str]:
        return f"/api/download/local/{object_name}"

    def delete_file(self, object_name: str) -> bool:
        src_path = os.path.join(self.base_dir, object_name)
        if os.path.exists(src_path):
            os.remove(src_path)
            return True
        return False

def get_storage_service() -> BaseStorageService:
    try:
        service = S3StorageService()
        logger.info("Connected to S3 / MinIO Object Storage successfully.")
        return service
    except Exception as e:
        logger.info(f"S3 Storage service unavailable ({e}). Using LocalStorageService.")
        return LocalStorageService()

storage_service = get_storage_service()
