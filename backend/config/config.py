import logging
import os
from pathlib import Path

from dotenv import load_dotenv

BACKEND_DIR = Path(__file__).resolve().parents[1]
DEFAULT_DATABASE_URL = f"sqlite:///{(BACKEND_DIR / 'prayan.db').as_posix()}"
load_dotenv(BACKEND_DIR / ".env")

logger = logging.getLogger(__name__)


def _str(name: str, default: str = "") -> str:
    return os.getenv(name, default).strip()


def _int(name: str, default: int) -> int:
    try:
        return int(os.getenv(name, "").strip() or default)
    except ValueError:
        logger.warning("Invalid integer for %s, using default %s", name, default)
        return default


class Settings:
    PROJECT_NAME: str = "Prayan Tutorials API"
    DATABASE_URL: str = _str("DATABASE_URL") or DEFAULT_DATABASE_URL

    # Gmail API OAuth2 credentials — server-side only, never sent to the frontend.
    GMAIL_CLIENT_ID: str = _str("GMAIL_CLIENT_ID")
    GMAIL_CLIENT_SECRET: str = _str("GMAIL_CLIENT_SECRET")
    GMAIL_REFRESH_TOKEN: str = _str("GMAIL_REFRESH_TOKEN")
    GMAIL_SENDER_EMAIL: str = _str("GMAIL_SENDER_EMAIL", "prayan17062017@gmail.com")

    # Admin / contact
    ADMIN_EMAIL: str = _str("ADMIN_EMAIL", "prayan17062017@gmail.com")

    # Google Maps
    GOOGLE_API_KEY: str = _str("GOOGLE_API_KEY")
    GOOGLE_PLACE_ID: str = _str("GOOGLE_PLACE_ID", "ChIJy4_W7XKV5zsRZXCjtqMhSWc")
    GOOGLE_MAPS_URL: str = _str(
        "GOOGLE_MAPS_URL",
        "https://www.google.com/maps/place/Prayan+Tutorials/@19.2202854,73.0859207,17z"
        "/data=!4m8!3m7!1s0x3be79572edd68f4b:0x674921a3b6937f65!8m2!3d19.2202854"
        "!4d73.0884956!9m1!1b1!16s%2Fg%2F11f016lznz?entry=ttu",
    )


settings = Settings()
