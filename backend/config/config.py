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


def _bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _email_password() -> str:
    """Read the Gmail App Password and strip display spaces (Google shows it as 4-char groups)."""
    raw = os.getenv("EMAIL_PASSWORD", "")
    password = raw.replace(" ", "").strip()
    if password.upper() in {"YOUR_GMAIL_APP_PASSWORD", "YOUR_APP_PASSWORD", ""}:
        return ""
    return password


class Settings:
    PROJECT_NAME: str = "Prayan Tutorials API"
    DATABASE_URL: str = _str("DATABASE_URL") or DEFAULT_DATABASE_URL

    # Gmail SMTP — credentials are server-side only, never sent to the frontend.
    EMAIL_USER: str = _str("EMAIL_USER", "prayan17062017@gmail.com")
    EMAIL_PASSWORD: str = _email_password()
    SMTP_SERVER: str = _str("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT: int = _int("SMTP_PORT", 587)
    SMTP_TIMEOUT: int = _int("SMTP_TIMEOUT", 15)
    SMTP_USE_SSL: bool = _bool("SMTP_USE_SSL", _int("SMTP_PORT", 587) == 465)

    # Admin / contact
    ADMIN_EMAIL: str = _str("ADMIN_EMAIL", "prayan17062017@gmail.com")

    # Google Maps
    GOOGLE_API_KEY: str = _str("GOOGLE_API_KEY")
    GOOGLE_PLACE_ID: str = _str("GOOGLE_PLACE_ID", "ChIJy4_W7XKV5zsRZXCjtqMhSWc")
    GOOGLE_MAPS_URL: str = _str(
        "GOOGLE_MAPS_URL",
        "https://www.google.com/maps/place/Prayan+Tutorials/@19.2202854,73.0859207,17z/data=!4m8!3m7!1s0x3be79572edd68f4b:0x674921a3b6937f65!8m2!3d19.2202854!4d73.0884956!9m1!1b1!16s%2Fg%2F11f016lznz?entry=ttu",
    )


settings = Settings()
