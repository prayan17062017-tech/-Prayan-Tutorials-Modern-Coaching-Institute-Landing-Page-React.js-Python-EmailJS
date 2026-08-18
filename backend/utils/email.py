import html
import logging
import smtplib
import ssl
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from zoneinfo import ZoneInfo

from config.config import settings

logger = logging.getLogger(__name__)

LOGO_URL = "https://raw.githubusercontent.com/prayan17062017-tech/-Prayan-Tutorials-Modern-Coaching-Institute-Landing-Page-React.js-Python-EmailJS/main/frontend/src/assets/PRAYAN%20TUTORIALS%20logo.png"
CONTACT_PHONE_DISPLAY = "+91 82912 37037"
CONTACT_PHONE_DIGITS = "918291237037"


def _clean(value: object, max_length: int = 500) -> str:
    return " ".join(str(value or "").split())[:max_length]


def _html_value(value: object, max_length: int = 500) -> str:
    return html.escape(_clean(value, max_length) or "—")


def _row(label: str, value: object, max_length: int = 500) -> str:
    return f"""
    <tr>
      <td style="padding:11px 16px;font-size:13px;color:#64748b;font-weight:600;white-space:nowrap;width:34%;vertical-align:top;">{html.escape(label)}</td>
      <td style="padding:11px 16px;font-size:14px;color:#1e293b;border-left:1px solid #e2e8f0;word-break:break-word;">{_html_value(value, max_length)}</td>
    </tr>"""


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
        + _row("Website Source", "Prayan Tutorials Website — Enquiry Form", 120)
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1d4ed8 0%,#2563eb 100%);padding:32px 40px;text-align:center;">
            <img src="{LOGO_URL}" alt="Prayan Tutorials logo" width="160" style="display:block;margin:0 auto 16px;max-width:160px;height:auto;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">New Enquiry Received</h1>
            <p style="margin:8px 0 0;color:#bfdbfe;font-size:14px;">New Student Enquiry — Prayan Tutorials</p>
          </td>
        </tr>

        <!-- Alert banner -->
        <tr>
          <td style="background:#eff6ff;padding:16px 40px;border-bottom:1px solid #dbeafe;">
            <p style="margin:0;font-size:14px;color:#1d4ed8;font-weight:600;line-height:1.6;">
              &#128276; A new admission enquiry has been submitted through the Prayan Tutorials website. Please review the details below and contact the student/parent as soon as possible.
            </p>
          </td>
        </tr>

        <!-- Details card -->
        <tr>
          <td style="padding:32px 40px;">
            <h2 style="margin:0 0 16px;font-size:16px;color:#1e293b;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Enquiry Details</h2>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;border-collapse:collapse;">
              {rows}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:0 40px 32px;text-align:center;">
            <p style="margin:0 0 16px;font-size:13px;color:#64748b;">Reply directly to this email to contact the student/parent.</p>
            <a href="https://wa.me/{CONTACT_PHONE_DIGITS}" style="display:inline-block;background:#25d366;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:700;">
              &#128222; WhatsApp Prayan Tutorials
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">Prayan Tutorials &bull; Navi Mumbai &bull; {settings.ADMIN_EMAIL}</p>
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
    return f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1d4ed8 0%,#2563eb 100%);padding:36px 40px;text-align:center;">
            <img src="{LOGO_URL}" alt="Prayan Tutorials logo" width="160" style="display:block;margin:0 auto 20px;max-width:160px;height:auto;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;line-height:1.3;">Thank You for Choosing Prayan Tutorials!</h1>
            <p style="margin:10px 0 0;color:#bfdbfe;font-size:14px;">Your enquiry has been successfully received.</p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:32px 40px 0;">
            <p style="margin:0;font-size:16px;color:#1e293b;font-weight:600;">Hello {_html_value(d.get("studentName"), 120)},</p>
            <p style="margin:12px 0 0;font-size:14px;color:#475569;line-height:1.7;">
              Thank you for contacting <strong>Prayan Tutorials</strong>. We have successfully received your enquiry regarding <strong>{_html_value(d.get("course"), 120)}</strong>.
            </p>
            <p style="margin:12px 0 0;font-size:14px;color:#475569;line-height:1.7;">
              Our team will review your enquiry and contact you within <strong>24 hours</strong> to provide you with the required information regarding courses, batch details, fees, timings and admission.
            </p>
          </td>
        </tr>

        <!-- Enquiry details -->
        <tr>
          <td style="padding:28px 40px 0;">
            <h2 style="margin:0 0 16px;font-size:15px;color:#1e293b;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Your Enquiry Details</h2>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;border-collapse:collapse;">
              {rows}
            </table>
          </td>
        </tr>

        <!-- Contact info -->
        <tr>
          <td style="padding:28px 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:10px;border:1px solid #dbeafe;">
              <tr>
                <td style="padding:20px;">
                  <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.5px;">Need immediate help?</p>
                  <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.8;">
                    &#128222; Call / WhatsApp: <strong>{CONTACT_PHONE_DISPLAY}</strong><br>
                    &#128140; Email: <strong>{settings.ADMIN_EMAIL}</strong>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Quote -->
        <tr>
          <td style="padding:0 40px 32px;text-align:center;">
            <p style="margin:0;font-size:14px;color:#64748b;font-style:italic;line-height:1.7;">
              "We look forward to helping you take the next step toward academic excellence."
            </p>
            <p style="margin:16px 0 0;font-size:14px;color:#1e293b;font-weight:700;">— Team Prayan Tutorials</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">Prayan Tutorials &bull; Navi Mumbai &bull; {settings.ADMIN_EMAIL}</p>
            <p style="margin:6px 0 0;font-size:11px;color:#cbd5e1;">This is an automated confirmation. Please do not reply to this email.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>"""


def _make_msg(from_addr: str, to_addr: str, reply_to: str, subject: str, html_body: str) -> MIMEMultipart:
    msg = MIMEMultipart("alternative")
    msg["From"] = from_addr
    msg["To"] = to_addr
    msg["Reply-To"] = reply_to
    msg["Subject"] = subject
    msg.attach(MIMEText(html_body, "html", "utf-8"))
    return msg


def send_enquiry_emails(enquiry_data: dict) -> tuple[bool, str]:
    """Send admin notification + student confirmation via Gmail SMTP.

    Returns (success: bool, error_message: str).
    """
    if not settings.EMAIL_USER or not settings.EMAIL_PASSWORD:
        msg = "EMAIL_USER or EMAIL_PASSWORD is not configured."
        logger.error(msg)
        return False, msg

    student_email = str(enquiry_data.get("email", "")).strip()
    student_name = _clean(enquiry_data.get("studentName"), 80)
    submitted_at = datetime.now(ZoneInfo("Asia/Kolkata")).strftime("%d %b %Y, %I:%M %p IST")

    messages = [
        (
            "admin notification",
            _make_msg(
                settings.EMAIL_USER,
                settings.ADMIN_EMAIL,
                student_email,
                f"New Student Enquiry — {student_name} | Prayan Tutorials",
                _admin_html(enquiry_data, submitted_at),
            ),
        ),
        (
            "student confirmation",
            _make_msg(
                settings.EMAIL_USER,
                student_email,
                settings.ADMIN_EMAIL,
                "Thank You for Choosing Prayan Tutorials! — Enquiry Received",
                _student_html(enquiry_data, submitted_at),
            ),
        ),
    ]

    try:
        ctx = ssl.create_default_context()
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT, timeout=settings.SMTP_TIMEOUT) as server:
            server.ehlo()
            server.starttls(context=ctx)
            server.ehlo()
            server.login(settings.EMAIL_USER, settings.EMAIL_PASSWORD)

            for label, msg in messages:
                try:
                    server.sendmail(settings.EMAIL_USER, [msg["To"]], msg.as_string())
                    logger.info("Sent %s to %s", label, msg["To"])
                except Exception:
                    logger.exception("Failed to send %s to %s", label, msg["To"])

    except smtplib.SMTPAuthenticationError:
        logger.error("Gmail SMTP authentication failed — check EMAIL_USER and EMAIL_PASSWORD.")
        return False, "SMTP authentication failed."
    except (smtplib.SMTPConnectError, smtplib.SMTPServerDisconnected, TimeoutError, OSError):
        logger.exception("Gmail SMTP connection failed.")
        return False, "SMTP connection failed."
    except Exception:
        logger.exception("Unexpected SMTP error.")
        return False, "Unexpected email error."

    return True, ""
