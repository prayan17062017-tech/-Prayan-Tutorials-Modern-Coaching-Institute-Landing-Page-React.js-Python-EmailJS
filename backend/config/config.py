import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Prayan Tutorials API"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./prayan.db")
    EMAIL_SENDER: str = os.getenv("EMAIL_SENDER", "your-email@gmail.com")
    EMAIL_PASSWORD: str = os.getenv("EMAIL_PASSWORD", "your-app-password")
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", 587))
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "prayan17062017@gmail.com")
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    GOOGLE_PLACE_ID: str = os.getenv("GOOGLE_PLACE_ID", "ChIJy4_W7XKV5zsRZXCjtqMhSWc") # Prayan Tutorials
    GOOGLE_MAPS_URL: str = os.getenv("GOOGLE_MAPS_URL", "https://www.google.com/maps/place/Prayan+Tutorials/@19.2202854,73.0859207,17z/data=!4m8!3m7!1s0x3be79572edd68f4b:0x674921a3b6937f65!8m2!3d19.2202854!4d73.0884956!9m1!1b1!16s%2Fg%2F11f016lznz?entry=ttu")

settings = Settings()
