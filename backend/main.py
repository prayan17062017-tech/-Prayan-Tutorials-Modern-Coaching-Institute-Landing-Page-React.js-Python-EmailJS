import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine, Base, run_migrations
from routes import enquiry, reviews

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

# Create new tables + migrate existing ones (safe to run every startup)
Base.metadata.create_all(bind=engine)
run_migrations(engine)

app = FastAPI(title="Prayan Tutorials API", version="2.0.0")

# ── CORS ──────────────────────────────────────────────────────────────────
_PRODUCTION_FRONTEND = "https://prayan-tutorials-modern-coaching-8qu6.onrender.com"

_allowed_origins = [
    _PRODUCTION_FRONTEND,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

_frontend_url = os.getenv("FRONTEND_URL", "").strip().rstrip("/")
if _frontend_url and _frontend_url not in _allowed_origins:
    _allowed_origins.append(_frontend_url)

logger.info("CORS allowed origins: %s", _allowed_origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept", "Authorization"],
)

# ── Routes ────────────────────────────────────────────────────────────────
app.include_router(enquiry.router)
app.include_router(reviews.router)


@app.get("/")
async def root():
    return {"message": "Welcome to Prayan Tutorials API", "version": "2.0.0"}


@app.get("/health")
async def health():
    return {"status": "ok", "service": "Prayan Tutorials API"}


@app.on_event("startup")
async def _log_startup_config():
    """Log SMTP config status at startup. Credentials are never logged."""
    from config.config import settings
    logger.info(
        "[STARTUP] SMTP config — user=%s server=%s port=%s password_set=%s smtp_blocked_flag=%s",
        settings.EMAIL_USER,
        settings.SMTP_SERVER,
        settings.SMTP_PORT,
        bool(settings.EMAIL_PASSWORD),
        settings.SMTP_BLOCKED,
    )
    if not settings.EMAIL_PASSWORD:
        logger.error(
            "[STARTUP] EMAIL_PASSWORD not set — "
            "set EMAIL_PASSWORD (Gmail App Password) in Render environment variables. "
            "SMTP fallback will not work until this is configured."
        )
    if settings.SMTP_BLOCKED:
        logger.warning(
            "[STARTUP] SMTP_BLOCKED=true — SMTP fallback is disabled. "
            "EmailJS must be configured on the frontend as the primary email service."
        )
