import os
from pathlib import Path

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

BACKEND_DIR = Path(__file__).resolve().parents[1]
DEFAULT_DATABASE_URL = f"sqlite:///{(BACKEND_DIR / 'prayan.db').as_posix()}"
load_dotenv(BACKEND_DIR / ".env")


def _get_email_password() -> str:
    """Read and normalize the server-only Gmail App Password."""
    # Google displays App Passwords in groups; whitespace is not part of the credential.
    password = os.getenv("EMAIL_PASSWORD", "").replace(" ", "").strip()
    if password.upper() in {"YOUR_GMAIL_APP_PASSWORD", "YOUR_APP_PASSWORD"}:
        return ""
    return password


def _get_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


class Settings(BaseSettings):
    PROJECT_NAME: str = "Prayan Tutorials API"
    DATABASE_URL: str = os.getenv("DATABASE_URL", DEFAULT_DATABASE_URL)

    # Gmail SMTP only. Credentials stay on the backend and are never sent to React.
    EMAIL_USER: str = os.getenv("EMAIL_USER", "prayan17062017@gmail.com").strip()
    EMAIL_PASSWORD: str = _get_email_password()
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "smtp.gmail.com").strip()
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", 587))
    SMTP_TIMEOUT: int = int(os.getenv("SMTP_TIMEOUT", 15))
    SMTP_USE_SSL: bool = _get_bool("SMTP_USE_SSL", SMTP_PORT == 465)

    # Admin / contact
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "prayan17062017@gmail.com").strip()

    # Google Maps
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    GOOGLE_PLACE_ID: str = os.getenv("GOOGLE_PLACE_ID", "ChIJy4_W7XKV5zsRZXCjtqMhSWc")
    GOOGLE_MAPS_URL: str = os.getenv(
        "GOOGLE_MAPS_URL",
        "https://www.google.com/maps/place/Prayan+Tutorials/@19.2202854,73.0859207,17z/data=!4m8!3m7!1s0x3be79572edd68f4b:0x674921a3b6937f65!8m2!3d19.2202854!4d73.0884956!9m1!1b1!16s%2Fg%2F11f016lznz?entry=ttu",
    )


settings = Settings()
