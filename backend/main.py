import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine, Base
from routes import enquiry, reviews

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Prayan Tutorials API")

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
    return {"message": "Welcome to Prayan Tutorials API"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.on_event("startup")
async def _log_gmail_config():
    """Log Gmail API config status at startup (no credentials logged)."""
    from config.config import settings
    logger.info(
        "[STARTUP] Gmail API config — client_id_set=%s secret_set=%s refresh_token_set=%s sender=%s",
        bool(settings.GMAIL_CLIENT_ID),
        bool(settings.GMAIL_CLIENT_SECRET),
        bool(settings.GMAIL_REFRESH_TOKEN),
        settings.GMAIL_SENDER_EMAIL,
    )
    if not all([settings.GMAIL_CLIENT_ID, settings.GMAIL_CLIENT_SECRET,
                settings.GMAIL_REFRESH_TOKEN]):
        logger.error(
            "[STARTUP] Gmail API credentials incomplete — "
            "set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN in Render env vars."
        )
