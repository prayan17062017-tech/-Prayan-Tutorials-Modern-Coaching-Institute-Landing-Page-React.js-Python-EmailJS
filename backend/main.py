import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine, Base
from routes import enquiry, reviews

logger = logging.getLogger(__name__)

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Prayan Tutorials API")

# CORS — allow the deployed frontend origin plus localhost for development.
_frontend_url = os.getenv("FRONTEND_URL", "").strip().rstrip("/")
_allowed_origins = ["http://localhost:5173", "http://localhost:3000"]
if _frontend_url:
    _allowed_origins.append(_frontend_url)
else:
    logger.warning(
        "FRONTEND_URL is not set. CORS will only allow localhost origins. "
        "Set FRONTEND_URL=https://your-app.vercel.app in Render environment variables."
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(enquiry.router)
app.include_router(reviews.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Prayan Tutorials API"}


@app.on_event("startup")
async def _verify_smtp_on_startup():
    """Log SMTP config at startup so Render logs show misconfiguration immediately."""
    from config.config import settings
    import smtplib, ssl
    user = settings.EMAIL_USER
    has_password = bool(settings.EMAIL_PASSWORD)
    logger.info(
        "SMTP config — server=%s port=%s ssl=%s user=%s password_set=%s timeout=%ss",
        settings.SMTP_SERVER, settings.SMTP_PORT, settings.SMTP_USE_SSL,
        user, has_password, settings.SMTP_TIMEOUT,
    )
    if not has_password:
        logger.error("EMAIL_PASSWORD is not set — email delivery will fail.")
        return
    try:
        if settings.SMTP_USE_SSL or settings.SMTP_PORT == 465:
            server = smtplib.SMTP_SSL(settings.SMTP_SERVER, settings.SMTP_PORT, timeout=settings.SMTP_TIMEOUT)
        else:
            server = smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT, timeout=settings.SMTP_TIMEOUT)
        server.ehlo()
        if not (settings.SMTP_USE_SSL or settings.SMTP_PORT == 465):
            server.starttls(context=ssl.create_default_context())
            server.ehlo()
        server.login(settings.EMAIL_USER, settings.EMAIL_PASSWORD)
        server.quit()
        logger.info("SMTP startup verification passed — Gmail SMTP is reachable and authenticated.")
    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP startup check: authentication failed — verify EMAIL_PASSWORD in Render env vars.")
    except Exception as exc:
        logger.warning("SMTP startup check failed (%s: %s) — emails may not send.", type(exc).__name__, exc)
