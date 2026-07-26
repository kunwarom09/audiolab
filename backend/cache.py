import json
from typing import Optional, Any
import redis
from config import settings
from logger import logger

class CacheManager:
    def __init__(self):
        try:
            self.redis_client = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)
            self.redis_client.ping()
            self.is_connected = True
            logger.info("Connected to Redis cache successfully.")
        except Exception as e:
            logger.warning(f"Redis cache connection failed ({e}). Caching disabled.")
            self.redis_client = None
            self.is_connected = False

    def get(self, key: str) -> Optional[Any]:
        if not self.is_connected:
            return None
        try:
            val = self.redis_client.get(f"cache:{key}")
            if val:
                logger.info(f"Cache HIT for key: {key}")
                return json.loads(val)
        except Exception as e:
            logger.error(f"Redis GET error for key {key}: {e}")
        return None

    def set(self, key: str, value: Any, ttl: int = settings.CACHE_TTL_SECONDS) -> bool:
        if not self.is_connected:
            return False
        try:
            self.redis_client.setex(f"cache:{key}", ttl, json.dumps(value))
            logger.info(f"Cache SET for key: {key} (TTL: {ttl}s)")
            return True
        except Exception as e:
            logger.error(f"Redis SET error for key {key}: {e}")
            return False

cache_manager = CacheManager()
