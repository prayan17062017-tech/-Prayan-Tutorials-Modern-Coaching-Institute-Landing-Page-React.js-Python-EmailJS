"""
Enquiry route — POST /api/enquiry

Flow:
  1. Validate request with Pydantic.
  2. Basic anti-spam / rate-limit checks.
  3. Save enquiry to database (never lose data even when email fails).
  4. Report EmailJS delivery status from frontend payload.
  5. If either email was NOT sent by EmailJS → attempt SMTP fallback
     for only the missing email(s).
  6. Return structured JSON with enquiry_id and final delivery status.
"""
from __future__ import annotations

import logging
import time
import uuid
from collections import defaultdict
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database.database import get_db
from models.enquiry import Enquiry
from schemas.enquiry import EnquiryCreate
from utils.email import send_enquiry_emails

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/enquiry", tags=["Enquiry"])

# ── Basic in-memory rate limiter ───────────────────────────────────────────
# Keyed by client IP. Allows at most MAX_REQUESTS submissions per WINDOW_S.
# This is intentionally simple; use Redis + slowapi for production scale.

_rate_store: dict[str, list[float]] = defaultdict(list)
MAX_REQUESTS = 3
WINDOW_S = 60  # 1 minute window


def _get_client_ip(request: Request) -> str:
    xff = request.headers.get("x-forwarded-for", "")
    return xff.split(",")[0].strip() if xff else (request.client.host if request.client else "unknown")


def _rate_limited(ip: str) -> bool:
    now = time.monotonic()
    history = _rate_store[ip]
    # Prune old entries
    _rate_store[ip] = [t for t in history if now - t < WINDOW_S]
    if len(_rate_store[ip]) >= MAX_REQUESTS:
        return True
    _rate_store[ip].append(now)
    return False


# ── Endpoint ───────────────────────────────────────────────────────────────

@router.post("")
def create_enquiry(
    enquiry: EnquiryCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    """
    Accepts enquiry form data.

    Optional extra fields (sent by frontend, not Pydantic-required):
      emailjs_admin_sent   : bool  — did EmailJS successfully send the admin email?
      emailjs_student_sent : bool  — did EmailJS successfully send the student email?

    These allow SMTP fallback to be targeted only at the email(s) that failed.
    """
    # Rate limit
    client_ip = _get_client_ip(request)
    if _rate_limited(client_ip):
        logger.warning("[ENQUIRY] Rate limit hit for IP %s", client_ip)
        raise HTTPException(
            status_code=429,
            detail="Too many submissions. Please wait a moment before trying again.",
        )

    # Honeypot check (extra field from schema)
    if getattr(enquiry, "honeypot", None):
        logger.warning("[ENQUIRY] Honeypot triggered from IP %s — ignoring", client_ip)
        # Return a fake success so bots don't know they were caught
        return JSONResponse(
            status_code=200,
            content={"success": True, "message": "Enquiry submitted.", "enquiry_id": str(uuid.uuid4())},
        )

    logger.info("[ENQUIRY] Received from %s (IP: %s)", enquiry.email, client_ip)

    # EmailJS delivery flags passed from frontend
    raw = enquiry.model_dump()
    emailjs_admin_sent: bool = bool(raw.pop("emailjs_admin_sent", False))
    emailjs_student_sent: bool = bool(raw.pop("emailjs_student_sent", False))

    # 1. Save to database first — data must never be lost
    enquiry_id = str(uuid.uuid4())[:8].upper()
    try:
        db_enquiry = Enquiry(
            enquiry_id=enquiry_id,
            student_name=enquiry.studentName,
            parent_name=enquiry.parentName,
            mobile=enquiry.mobile,
            email=str(enquiry.email),
            class_name=enquiry.className,
            stream=enquiry.stream,
            course=enquiry.course,
            school=enquiry.school,
            message=enquiry.message,
            emailjs_admin_sent=emailjs_admin_sent,
            emailjs_student_sent=emailjs_student_sent,
        )
        db.add(db_enquiry)
        db.commit()
        db.refresh(db_enquiry)
        logger.info("[ENQUIRY] Saved to database — id=%s enquiry_id=%s", db_enquiry.id, enquiry_id)
    except Exception:
        db.rollback()
        logger.exception("[ENQUIRY] Database save failed for %s", enquiry.email)
        raise HTTPException(
            status_code=500,
            detail="Unable to save your enquiry. Please try again later.",
        )

    # 2. Determine which emails still need to be sent
    need_admin = not emailjs_admin_sent
    need_student = not emailjs_student_sent

    smtp_result: dict = {
        "admin_sent": emailjs_admin_sent,
        "student_sent": emailjs_student_sent,
        "smtp_blocked": False,
        "error": "",
    }

    if need_admin or need_student:
        logger.info(
            "[ENQUIRY] EmailJS status — admin_sent=%s student_sent=%s. "
            "Running SMTP fallback for missing email(s).",
            emailjs_admin_sent, emailjs_student_sent,
        )
        smtp_result = send_enquiry_emails(
            enquiry_data=raw,
            enquiry_id=enquiry_id,
            skip_admin=emailjs_admin_sent,
            skip_student=emailjs_student_sent,
        )

        # Update DB with final delivery status
        try:
            db_enquiry.smtp_admin_sent = smtp_result["admin_sent"] and not emailjs_admin_sent
            db_enquiry.smtp_student_sent = smtp_result["student_sent"] and not emailjs_student_sent
            db.commit()
        except Exception:
            logger.warning("[ENQUIRY] Failed to update delivery status in DB for %s", enquiry_id)
    else:
        logger.info("[ENQUIRY] Both emails already sent via EmailJS — SMTP not needed.")

    # 3. Build response
    admin_ok = smtp_result["admin_sent"]
    student_ok = smtp_result["student_sent"]
    smtp_blocked = smtp_result.get("smtp_blocked", False)

    if not admin_ok:
        # Admin email is critical — if it's not delivered by either service, report failure.
        if smtp_blocked:
            user_msg = (
                "Your enquiry has been saved. Email delivery is currently unavailable "
                "due to a hosting restriction. Please call us at +91 82912 37037 "
                "or WhatsApp us — we have your details."
            )
        else:
            user_msg = (
                "Your enquiry was saved but we could not send the notification email. "
                "Please call us at +91 82912 37037 to confirm your enquiry."
            )
        logger.error(
            "[ENQUIRY] Admin notification NOT delivered for enquiry_id=%s. "
            "smtp_blocked=%s error=%s",
            enquiry_id, smtp_blocked, smtp_result.get("error"),
        )
        return JSONResponse(
            status_code=207,  # Multi-Status: saved but email failed
            content={
                "success": False,
                "partial": True,
                "message": user_msg,
                "enquiry_id": enquiry_id,
                "smtp_blocked": smtp_blocked,
            },
        )

    # Student auto-reply failure is non-fatal (admin already notified)
    if not student_ok:
        logger.warning(
            "[ENQUIRY] Student auto-reply NOT delivered for enquiry_id=%s", enquiry_id
        )

    logger.info("[ENQUIRY] Completed — enquiry_id=%s admin_ok=%s student_ok=%s",
                enquiry_id, admin_ok, student_ok)

    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "message": "Your enquiry has been received successfully. We will contact you within 24 hours.",
            "enquiry_id": enquiry_id,
        },
    )
