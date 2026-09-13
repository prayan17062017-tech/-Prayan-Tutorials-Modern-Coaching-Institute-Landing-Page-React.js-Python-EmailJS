import html
import json
import logging
import os
import smtplib
import ssl
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from http.server import BaseHTTPRequestHandler
from zoneinfo import ZoneInfo

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

EMAIL_USER = os.environ.get("EMAIL_USER", "").strip()
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD", "").replace(" ", "").strip()
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", EMAIL_USER)
SMTP_SERVER = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_TIMEOUT = int(os.environ.get("SMTP_TIMEOUT", "15"))
SMTP_USE_SSL = os.environ.get("SMTP_USE_SSL", "false").lower() in {"1", "true", "yes"}

CONTACT_PHONE_DISPLAY = "+91 82912 37037"
CONTACT_PHONE_DIGITS = "918291237037"
LOGO_URL = "https://raw.githubusercontent.com/prayan17062017-tech/-Prayan-Tutorials-Modern-Coaching-Institute-Landing-Page-React.js-Python-EmailJS/main/frontend/src/assets/PRAYAN%20TUTORIALS%20logo.png"


def _clean(value, max_length=500):
    return " ".join(str(value or "").split())[:max_length]


def _h(value, max_length=500):
    return html.escape(_clean(value, max_length) or "—")


def _row(label, value, max_length=500):
    return (
        f'<tr>'
        f'<td style="padding:11px 16px;font-size:13px;color:#64748b;font-weight:600;white-space:nowrap;width:34%;vertical-align:top;">{html.escape(label)}</td>'
        f'<td style="padding:11px 16px;font-size:14px;color:#1e293b;border-left:1px solid #e2e8f0;word-break:break-word;">{_h(value, max_length)}</td>'
        f'</tr>'
    )


def _admin_html(d, submitted_at):
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
    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 12px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:32px 40px;text-align:center;">
          <img src="{LOGO_URL}" width="160" style="display:block;margin:0 auto 16px;">
          <h1 style="margin:0;color:#fff;font-size:22px;">New Enquiry Received</h1>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;border-collapse:collapse;">{rows}</table>
        </td></tr>
        <tr><td style="padding:0 40px 32px;text-align:center;">
          <a href="https://wa.me/{CONTACT_PHONE_DIGITS}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:700;">WhatsApp Prayan Tutorials</a>
        </td></tr>
        <tr><td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">Prayan Tutorials &bull; Navi Mumbai &bull; {ADMIN_EMAIL}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>"""


def _student_html(d, submitted_at):
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
    return f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 12px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:36px 40px;text-align:center;">
          <img src="{LOGO_URL}" width="160" style="display:block;margin:0 auto 20px;">
          <h1 style="margin:0;color:#fff;font-size:24px;">Thank You for Choosing Prayan Tutorials!</h1>
          <p style="margin:10px 0 0;color:#bfdbfe;font-size:14px;">Your enquiry has been successfully received.</p>
        </td></tr>
        <tr><td style="padding:32px 40px 0;">
          <p style="margin:0;font-size:16px;color:#1e293b;font-weight:600;">Hello {_h(d.get("studentName"), 120)},</p>
          <p style="margin:12px 0 0;font-size:14px;color:#475569;line-height:1.7;">
            Thank you for contacting <strong>Prayan Tutorials</strong>. We have received your enquiry regarding <strong>{_h(d.get("course"), 120)}</strong>.
            Our team will contact you within <strong>24 hours</strong>.
          </p>
        </td></tr>
        <tr><td style="padding:28px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;border-collapse:collapse;">{rows}</table>
        </td></tr>
        <tr><td style="padding:28px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#eff6ff;border-radius:10px;border:1px solid #dbeafe;">
            <tr><td style="padding:20px;">
              <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.8;">
                Call / WhatsApp: <strong>{CONTACT_PHONE_DISPLAY}</strong><br>
                Email: <strong>{ADMIN_EMAIL}</strong>
              </p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">Prayan Tutorials &bull; Navi Mumbai &bull; {ADMIN_EMAIL}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>"""


def _send_emails(d):
    if not EMAIL_USER or not EMAIL_PASSWORD:
        raise RuntimeError("SMTP credentials not configured.")

    submitted_at = datetime.now(ZoneInfo("Asia/Kolkata")).strftime("%d %b %Y, %I:%M %p IST")
    student_email = str(d.get("email", "")).strip()
    student_name = _clean(d.get("studentName"), 80)

    messages = [
        (ADMIN_EMAIL, f"New Student Enquiry — {student_name} | Prayan Tutorials", _admin_html(d, submitted_at), student_email),
        (student_email, "Thank You for Choosing Prayan Tutorials! — Enquiry Received", _student_html(d, submitted_at), ADMIN_EMAIL),
    ]

    if SMTP_USE_SSL or SMTP_PORT == 465:
        server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, timeout=SMTP_TIMEOUT)
    else:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=SMTP_TIMEOUT)

    try:
        server.ehlo()
        if not (SMTP_USE_SSL or SMTP_PORT == 465):
            server.starttls(context=ssl.create_default_context())
            server.ehlo()
        server.login(EMAIL_USER, EMAIL_PASSWORD)

        for to_addr, subject, html_body, reply_to in messages:
            msg = MIMEMultipart("alternative")
            msg["From"] = EMAIL_USER
            msg["To"] = to_addr
            msg["Reply-To"] = reply_to
            msg["Subject"] = subject
            msg.attach(MIMEText(html_body, "html", "utf-8"))
            server.sendmail(EMAIL_USER, [to_addr], msg.as_string())
            logger.info("Sent email to %s", to_addr)
    finally:
        server.quit()


def _cors_headers():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        for k, v in _cors_headers().items():
            self.send_header(k, v)
        self.end_headers()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            data = json.loads(body)
        except Exception:
            self._respond(400, {"success": False, "message": "Invalid request body."})
            return

        # Basic validation
        required = ["studentName", "parentName", "mobile", "email", "className", "stream", "course", "school"]
        missing = [f for f in required if not str(data.get(f, "")).strip()]
        if missing:
            self._respond(422, {"success": False, "message": f"Missing fields: {', '.join(missing)}"})
            return

        try:
            _send_emails(data)
        except RuntimeError as e:
            logger.error("SMTP config error: %s", e)
            self._respond(503, {"success": False, "message": "Email service not configured."})
            return
        except smtplib.SMTPAuthenticationError:
            logger.exception("SMTP auth failed")
            self._respond(503, {"success": False, "message": "Email authentication failed."})
            return
        except Exception:
            logger.exception("Email send failed")
            self._respond(503, {"success": False, "message": "Unable to send email. Please try again."})
            return

        self._respond(200, {"success": True, "message": "Enquiry submitted successfully."})

    def _respond(self, status, body):
        payload = json.dumps(body).encode()
        self.send_response(status)
        for k, v in _cors_headers().items():
            self.send_header(k, v)
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, format, *args):
        logger.info(format, *args)
