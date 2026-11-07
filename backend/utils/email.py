"""
Email delivery utility for Prayan Tutorials enquiry system.

Delivery strategy:
  1. Primary  → SMTP (Gmail App Password, TLS on port 587)
  2. No EmailJS on the backend — EmailJS is handled on the frontend.

Each email (admin notification + student auto-reply) is tracked
individually so a partial success on one does not cause a duplicate
on the other.

RENDER NOTE: Render free tier blocks outbound SMTP on port 587.
If SMTP_BLOCKED=true is set in env, the backend gracefully reports
the limitation without retrying.
"""
from __future__ import annotations

import html
import logging
import os
import smtplib
import socket
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from zoneinfo import ZoneInfo

from config.config import settings

logger = logging.getLogger(__name__)

# ── Constants ──────────────────────────────────────────────────────────────

LOGO_URL = (
    "https://raw.githubusercontent.com/prayan17062017-tech/"
    "-Prayan-Tutorials-Modern-Coaching-Institute-Landing-Page-React.js-Python-EmailJS"
    "/main/frontend/src/assets/PRAYAN%20TUTORIALS%20logo.png"
)
CONTACT_PHONE_DISPLAY = "+91 82912 37037"
CONTACT_PHONE_DIGITS = "918291237037"

_SMTP_TIMEOUT_S = 20


# ── Helpers ────────────────────────────────────────────────────────────────

def _clean(value: object, max_length: int = 500) -> str:
    return " ".join(str(value or "").split())[:max_length]


def _html_value(value: object, max_length: int = 500) -> str:
    return html.escape(_clean(value, max_length) or "—")


def _row(label: str, value: object, max_length: int = 500) -> str:
    return (
        "<tr>"
        f"<td style=\"padding:11px 16px;font-size:13px;color:#64748b;font-weight:600;"
        f"white-space:nowrap;width:34%;vertical-align:top;\">{html.escape(label)}</td>"
        f"<td style=\"padding:11px 16px;font-size:14px;color:#1e293b;"
        f"border-left:1px solid #e2e8f0;word-break:break-word;\">"
        f"{_html_value(value, max_length)}</td>"
        "</tr>"
    )


# ── SMTP send ──────────────────────────────────────────────────────────────

def _send_via_smtp(
    from_addr: str,
    to_addr: str,
    subject: str,
    html_body: str,
    reply_to: str,
) -> None:
    """Send a single HTML email via Gmail SMTP (STARTTLS, App Password)."""
    msg = MIMEMultipart("alternative")
    msg["From"] = from_addr
    msg["To"] = to_addr
    msg["Subject"] = subject
    msg["Reply-To"] = reply_to
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP(
        settings.SMTP_SERVER, settings.SMTP_PORT, timeout=_SMTP_TIMEOUT_S
    ) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()
        smtp.login(settings.EMAIL_USER, settings.EMAIL_PASSWORD)
        smtp.sendmail(from_addr, to_addr, msg.as_string())


def _smtp_port_reachable() -> bool:
    """Quick TCP probe to detect Render's blocked SMTP port."""
    # If SMTP_BLOCKED env var is explicitly set, trust it without probing.
    if os.getenv("SMTP_BLOCKED", "").strip().lower() == "true":
        return False
    try:
        with socket.create_connection(
            (settings.SMTP_SERVER, settings.SMTP_PORT), timeout=5
        ):
            return True
    except (socket.timeout, OSError):
        return False


# ── HTML templates ─────────────────────────────────────────────────────────

def _admin_html(d: dict, submitted_at: str, enquiry_id: str) -> str:
    rows = (
        _row("Enquiry ID", enquiry_id, 40)
        + _row("Student Name", d.get("studentName"), 120)
        + _row("Parent Name", d.get("parentName"), 120)
        + _row("Mobile Number", f"+91 {_clean(d.get('mobile'), 20)}", 30)
        + _row("Email Address", d.get("email"), 254)
        + _row("Class", d.get("className"), 80)
        + _row("Stream", d.get("stream"), 80)
        + _row("Course", d.get("course"), 120)
        + _row("School / College", d.get("school"), 200)
        + _row("Additional Message", d.get("message") or "—", 2000)
        + _row("Date / Time", submitted_at, 80)
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;
                    overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#1d4ed8 0%,#2563eb 100%);
                     padding:32px 40px;text-align:center;">
            <img src="{LOGO_URL}" alt="Prayan Tutorials" width="160"
                 style="display:block;margin:0 auto 16px;max-width:160px;height:auto;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">
              New Enquiry Received
            </h1>
            <p style="margin:8px 0 0;color:#bfdbfe;font-size:14px;">
              New Student Enquiry — Prayan Tutorials
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#eff6ff;padding:16px 40px;border-bottom:1px solid #dbeafe;">
            <p style="margin:0;font-size:14px;color:#1d4ed8;font-weight:600;line-height:1.6;">
              &#128276; A new admission enquiry has been submitted. Please contact the student/parent promptly.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <h2 style="margin:0 0 16px;font-size:16px;color:#1e293b;font-weight:700;
                       text-transform:uppercase;letter-spacing:1px;">Enquiry Details</h2>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                   style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;border-collapse:collapse;">
              {rows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px;text-align:center;">
            <a href="https://wa.me/{CONTACT_PHONE_DIGITS}"
               style="display:inline-block;background:#25d366;color:#ffffff;text-decoration:none;
                      padding:12px 28px;border-radius:8px;font-size:14px;font-weight:700;">
              &#128222; WhatsApp Prayan Tutorials
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">
              Prayan Tutorials &bull; {settings.ADMIN_EMAIL}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""


def _student_html(d: dict, submitted_at: str) -> str:
    rows = (
        _row("Student Name", d.get("studentName"), 120)
        + _row("Parent Name", d.get("parentName"), 120)
        + _row("Mobile Number", f"+91 {_clean(d.get('mobile'), 20)}", 30)
        + _row("Class", d.get("className"), 80)
        + _row("Stream", d.get("stream"), 80)
        + _row("Course", d.get("course"), 120)
        + _row("School / College", d.get("school"), 200)
        + _row("Additional Message", d.get("message") or "—", 2000)
    )
    student_name = _html_value(d.get("studentName"), 120)
    course = _html_value(d.get("course"), 120)
    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;
                    overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#1d4ed8 0%,#2563eb 100%);
                     padding:36px 40px;text-align:center;">
            <img src="{LOGO_URL}" alt="Prayan Tutorials" width="160"
                 style="display:block;margin:0 auto 20px;max-width:160px;height:auto;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;line-height:1.3;">
              Thank You for Contacting Prayan Tutorials
            </h1>
            <p style="margin:10px 0 0;color:#bfdbfe;font-size:14px;">
              Your enquiry has been successfully received.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px 0;">
            <p style="margin:0;font-size:16px;color:#1e293b;font-weight:600;">
              Hello {student_name},
            </p>
            <p style="margin:12px 0 0;font-size:14px;color:#475569;line-height:1.7;">
              Thank you for contacting <strong>Prayan Tutorials</strong>. We have successfully
              received your enquiry regarding <strong>{course}</strong>.
            </p>
            <p style="margin:12px 0 0;font-size:14px;color:#475569;line-height:1.7;">
              Our team will review your enquiry and contact you within <strong>24 hours</strong>.
              We look forward to helping you take the next step toward academic excellence.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 40px 0;">
            <h2 style="margin:0 0 16px;font-size:15px;color:#1e293b;font-weight:700;
                       text-transform:uppercase;letter-spacing:1px;">Your Enquiry Details</h2>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                   style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;border-collapse:collapse;">
              {rows}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                   style="background:#eff6ff;border-radius:10px;border:1px solid #dbeafe;">
              <tr>
                <td style="padding:20px;">
                  <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#1d4ed8;
                             text-transform:uppercase;letter-spacing:0.5px;">Need immediate help?</p>
                  <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.8;">
                    &#128222; Call / WhatsApp: <strong>{CONTACT_PHONE_DISPLAY}</strong><br>
                    &#128140; Email: <strong>{settings.ADMIN_EMAIL}</strong>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 16px;text-align:center;">
            <p style="margin:0;font-size:14px;color:#64748b;font-style:italic;line-height:1.7;">
              "We look forward to helping you take the next step toward academic excellence."
            </p>
            <p style="margin:12px 0 0;font-size:14px;color:#1e293b;font-weight:700;">
              — Team Prayan Tutorials
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:16px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:13px;color:#1e293b;font-weight:600;">Prayan Tutorials</p>
            <p style="margin:4px 0 0;font-size:12px;color:#64748b;">Bringing Excellence to Students</p>
            <p style="margin:8px 0 0;font-size:12px;color:#94a3b8;line-height:1.7;">
              Phone: {CONTACT_PHONE_DISPLAY}<br>
              Ghanshyam Complex, B-101, Mahatma Gandhi Road,<br>
              Above Anil Eye Hospital, Near DNS Bank,<br>
              Vishnu Nagar, Dombivli West, Dombivli, Kalyan,<br>
              Maharashtra - 421202
            </p>
            <p style="margin:8px 0 0;font-size:11px;color:#cbd5e1;">
              This is an automated confirmation. Please do not reply to this email.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""


# ── Individual email senders ───────────────────────────────────────────────

def _send_admin_email(enquiry_data: dict, submitted_at: str, enquiry_id: str) -> tuple[bool, str]:
    """Send admin notification. Returns (success, error_message)."""
    try:
        logger.info("[EMAIL] Sending admin notification to %s", settings.ADMIN_EMAIL)
        _send_via_smtp(
            from_addr=settings.EMAIL_USER,
            to_addr=settings.ADMIN_EMAIL,
            subject=f"New Student Enquiry - Prayan Tutorials [{enquiry_id}]",
            html_body=_admin_html(enquiry_data, submitted_at, enquiry_id),
            reply_to=str(enquiry_data.get("email", settings.ADMIN_EMAIL)),
        )
        logger.info("[EMAIL] Admin notification sent successfully for enquiry %s", enquiry_id)
        return True, ""
    except smtplib.SMTPAuthenticationError:
        logger.error("[EMAIL] SMTP authentication failed — check EMAIL_USER and EMAIL_PASSWORD")
        return False, "smtp_auth_error"
    except (socket.timeout, smtplib.SMTPConnectError, ConnectionRefusedError, OSError) as exc:
        logger.error("[EMAIL] SMTP connection failed (port blocked?): %s", type(exc).__name__)
        return False, "smtp_connection_error"
    except Exception:
        logger.exception("[EMAIL] Unexpected error sending admin notification for %s", enquiry_id)
        return False, "smtp_unexpected_error"


def _send_student_email(enquiry_data: dict, submitted_at: str, enquiry_id: str) -> tuple[bool, str]:
    """Send student auto-reply. Returns (success, error_message)."""
    student_email = str(enquiry_data.get("email", "")).strip()
    if not student_email:
        logger.warning("[EMAIL] No student email provided, skipping auto-reply")
        return False, "no_student_email"
    try:
        logger.info("[EMAIL] Sending student auto-reply to %s", student_email)
        _send_via_smtp(
            from_addr=settings.EMAIL_USER,
            to_addr=student_email,
            subject="Thank You for Contacting Prayan Tutorials",
            html_body=_student_html(enquiry_data, submitted_at),
            reply_to=settings.ADMIN_EMAIL,
        )
        logger.info("[EMAIL] Student auto-reply sent for enquiry %s", enquiry_id)
        return True, ""
    except smtplib.SMTPAuthenticationError:
        logger.error("[EMAIL] SMTP auth failed for student email (enquiry %s)", enquiry_id)
        return False, "smtp_auth_error"
    except (socket.timeout, smtplib.SMTPConnectError, ConnectionRefusedError, OSError) as exc:
        logger.error("[EMAIL] SMTP connection failed for student email: %s", type(exc).__name__)
        return False, "smtp_connection_error"
    except Exception:
        logger.exception("[EMAIL] Unexpected error sending student auto-reply for %s", enquiry_id)
        return False, "smtp_unexpected_error"


# ── Public API ─────────────────────────────────────────────────────────────

def send_enquiry_emails(
    enquiry_data: dict,
    enquiry_id: str,
    *,
    skip_admin: bool = False,
    skip_student: bool = False,
) -> dict:
    """
    Send admin notification and/or student auto-reply via SMTP.

    Parameters
    ----------
    enquiry_data : dict        Validated enquiry fields.
    enquiry_id   : str        Unique ID for this enquiry (used in subject + logs).
    skip_admin   : bool       True if admin email was already sent (e.g. via EmailJS).
    skip_student : bool       True if student auto-reply was already sent via EmailJS.

    Returns
    -------
    dict with keys:
        admin_sent   : bool
        student_sent : bool
        smtp_blocked : bool   True if SMTP port appears unreachable on this host.
        error        : str    Human-readable error (never includes credentials).
    """
    result: dict = {
        "admin_sent": skip_admin,
        "student_sent": skip_student,
        "smtp_blocked": False,
        "error": "",
    }

    if skip_admin and skip_student:
        logger.info("[EMAIL] Both emails already sent via EmailJS — SMTP not needed.")
        return result

    # Credential check
    if not settings.EMAIL_USER or not settings.EMAIL_PASSWORD:
        logger.error(
            "[EMAIL] SMTP credentials missing (EMAIL_USER / EMAIL_PASSWORD). "
            "Set them as environment variables on Render."
        )
        result["error"] = "smtp_not_configured"
        return result

    # Connectivity probe
    if not _smtp_port_reachable():
        logger.warning(
            "[EMAIL] SMTP port %s on %s is unreachable — "
            "likely blocked by hosting provider (Render free tier restricts port 587). "
            "Set SMTP_BLOCKED=true in env to suppress probe.",
            settings.SMTP_PORT, settings.SMTP_SERVER,
        )
        result["smtp_blocked"] = True
        result["error"] = "smtp_port_blocked"
        return result

    submitted_at = datetime.now(ZoneInfo("Asia/Kolkata")).strftime("%d %b %Y, %I:%M %p IST")

    # Admin notification
    if not skip_admin:
        ok, err = _send_admin_email(enquiry_data, submitted_at, enquiry_id)
        result["admin_sent"] = ok
        if not ok:
            result["error"] = err

    # Student auto-reply
    if not skip_student:
        ok, err = _send_student_email(enquiry_data, submitted_at, enquiry_id)
        result["student_sent"] = ok
        if not ok and not result["error"]:
            result["error"] = err

    return result
