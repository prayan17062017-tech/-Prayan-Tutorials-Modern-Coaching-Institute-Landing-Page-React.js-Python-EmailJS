import base64
import html
import logging
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from zoneinfo import ZoneInfo

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request as GoogleAuthRequest
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from config.config import settings

logger = logging.getLogger(__name__)

LOGO_URL = (
    "https://raw.githubusercontent.com/prayan17062017-tech/"
    "-Prayan-Tutorials-Modern-Coaching-Institute-Landing-Page-React.js-Python-EmailJS"
    "/main/frontend/src/assets/PRAYAN%20TUTORIALS%20logo.png"
)
CONTACT_PHONE_DISPLAY = "+91 82912 37037"
CONTACT_PHONE_DIGITS = "918291237037"


# ── helpers ────────────────────────────────────────────────────────────────

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


# ── Gmail API auth ─────────────────────────────────────────────────────────

def _get_gmail_service():
    """Build an authenticated Gmail API service using the stored refresh token."""
    creds = Credentials(
        token=None,
        refresh_token=settings.GMAIL_REFRESH_TOKEN,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=settings.GMAIL_CLIENT_ID,
        client_secret=settings.GMAIL_CLIENT_SECRET,
        scopes=["https://www.googleapis.com/auth/gmail.send"],
    )
    creds.refresh(GoogleAuthRequest())
    return build("gmail", "v1", credentials=creds, cache_discovery=False)


def _send_via_gmail_api(service, from_addr: str, to_addr: str, subject: str,
                         html_body: str, reply_to: str) -> None:
    """Encode and send a single HTML email through the Gmail API."""
    msg = MIMEMultipart("alternative")
    msg["From"] = from_addr
    msg["To"] = to_addr
    msg["Subject"] = subject
    msg["Reply-To"] = reply_to
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    service.users().messages().send(userId="me", body={"raw": raw}).execute()


# ── HTML templates ─────────────────────────────────────────────────────────

def _admin_html(d: dict, submitted_at: str) -> str:
    rows = (
        _row("Student Name", d.get("studentName"), 120)
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


# ── public API ─────────────────────────────────────────────────────────────

def send_enquiry_emails(enquiry_data: dict) -> tuple[bool, str]:
    """Send admin notification + student confirmation via Gmail API over HTTPS.

    Returns (success, safe_error_message). Credentials are never logged or
    included in the returned error string.
    """
    student_email = str(enquiry_data.get("email", "")).strip()
    student_name = _clean(enquiry_data.get("studentName"), 80)

    if not all([settings.GMAIL_CLIENT_ID, settings.GMAIL_CLIENT_SECRET,
                settings.GMAIL_REFRESH_TOKEN]):
        logger.error(
            "[EMAIL] Gmail API credentials not configured "
            "(GMAIL_CLIENT_ID / GMAIL_CLIENT_SECRET / GMAIL_REFRESH_TOKEN missing)"
        )
        return False, "Email service is not configured. Please contact us directly."

    submitted_at = datetime.now(ZoneInfo("Asia/Kolkata")).strftime("%d %b %Y, %I:%M %p IST")

    try:
        logger.info("[EMAIL] Authenticating with Gmail API")
        service = _get_gmail_service()
    except Exception:
        logger.exception("[EMAIL] Gmail API authentication failed")
        return False, "Email authentication failed. Please try again later."

    # Admin notification
    try:
        logger.info("[EMAIL] Sending admin email to %s", settings.ADMIN_EMAIL)
        _send_via_gmail_api(
            service,
            from_addr=settings.GMAIL_SENDER_EMAIL,
            to_addr=settings.ADMIN_EMAIL,
            subject=f"New Student Enquiry - Prayan Tutorials",
            html_body=_admin_html(enquiry_data, submitted_at),
            reply_to=student_email,
        )
        logger.info("[EMAIL] Admin email sent successfully")
    except HttpError as exc:
        logger.error("[EMAIL] Gmail API rejected admin email: status=%s reason=%s",
                     exc.status_code, exc.reason)
        return False, "Email delivery failed. Please try again later."
    except Exception:
        logger.exception("[EMAIL] Unexpected error sending admin email")
        return False, "Email delivery failed. Please try again later."

    # Student confirmation
    if student_email:
        try:
            logger.info("[EMAIL] Sending student confirmation to %s", student_email)
            _send_via_gmail_api(
                service,
                from_addr=settings.GMAIL_SENDER_EMAIL,
                to_addr=student_email,
                subject="Thank You for Contacting Prayan Tutorials",
                html_body=_student_html(enquiry_data, submitted_at),
                reply_to=settings.ADMIN_EMAIL,
            )
            logger.info("[EMAIL] Student confirmation sent successfully")
        except Exception:
            # Admin email already sent — log but don't fail the whole request.
            logger.exception("[EMAIL] Student confirmation failed for %s", student_email)

    return True, ""
