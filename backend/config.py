import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "SongExtractor API"
    ENVIRONMENT: str = "production"
    DEBUG: bool = False
    PORT: int = 8000

    # Redis Configuration
    REDIS_HOST: str = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", "6379"))
    REDIS_URL: str = os.getenv("REDIS_URL", f"redis://{REDIS_HOST}:{REDIS_PORT}/0")

    # Celery Configuration
    CELERY_BROKER_URL: str = os.getenv("CELERY_BROKER_URL", REDIS_URL)
    CELERY_RESULT_BACKEND: str = os.getenv("CELERY_RESULT_BACKEND", f"redis://{REDIS_HOST}:{REDIS_PORT}/1")

    # Object Storage (S3 / MinIO) Configuration
    S3_ENDPOINT_URL: str = os.getenv("S3_ENDPOINT_URL", "http://localhost:9000")
    S3_ACCESS_KEY: str = os.getenv("S3_ACCESS_KEY", "minioadmin")
    S3_SECRET_KEY: str = os.getenv("S3_SECRET_KEY", "minioadmin")
    S3_BUCKET_NAME: str = os.getenv("S3_BUCKET_NAME", "song-extractor-artifacts")
    S3_REGION: str = os.getenv("S3_REGION", "us-east-1")
    S3_SECURE: bool = os.getenv("S3_SECURE", "false").lower() == "true"

    # Rate Limiting & Cache TTL
    RATE_LIMIT_EXTRACT: str = "20/minute"
    RATE_LIMIT_UPLOAD: str = "10/minute"
    RATE_LIMIT_CONVERT: str = "15/minute"
    CACHE_TTL_SECONDS: int = 86400  # 24 hours
    ARTIFACT_TTL_SECONDS: int = 3600  # 1 hour
    CONVERSION_TTL_SECONDS: int = 1800  # 30 minutes
    MAX_UPLOAD_SIZE_GUEST: int = 100 * 1024 * 1024  # 100MB
    MAX_UPLOAD_SIZE_PREMIUM: int = 500 * 1024 * 1024  # 500MB

    class Config:
        env_file = ".env.local"
        extra = "ignore"

settings = Settings()
