/**
 * Prayan Tutorials — Enquiry Submission Service
 *
 * Delivery strategy (frontend):
 *  1. PRIMARY: EmailJS — sends both emails directly from the browser.
 *     - Template A: Admin notification → prayan17062017@gmail.com
 *     - Template B: Student/parent auto-reply → submitted email address
 *  2. FALLBACK: FastAPI backend (SMTP) — only called when EmailJS fails.
 *     The backend receives flags telling it which email(s) EmailJS already sent
 *     so it only retries the missing one(s), preventing duplicates.
 *
 * Environment variables required (in frontend/.env or Render):
 *   VITE_API_URL                    — Backend URL (empty = use Vite proxy in dev)
 *   VITE_EMAILJS_PUBLIC_KEY         — EmailJS Public Key (account identifier)
 *   VITE_EMAILJS_SERVICE_ID         — EmailJS Service ID (e.g. service_xxxxxxx)
 *   VITE_EMAILJS_ADMIN_TEMPLATE_ID  — Template ID for admin notification email
 *   VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID — Template ID for student auto-reply
 */

// ── Configuration ──────────────────────────────────────────────────────────

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const ENQUIRY_ENDPOINT = `${API_BASE_URL}/api/enquiry`;
const REQUEST_TIMEOUT_MS = 45_000;

const EMAILJS_PUBLIC_KEY        = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID        = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_ADMIN_TEMPLATE    = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || '';
const EMAILJS_AUTOREPLY_TEMPLATE = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || '';

const EMAILJS_CONFIGURED =
  Boolean(EMAILJS_PUBLIC_KEY) &&
  Boolean(EMAILJS_SERVICE_ID) &&
  Boolean(EMAILJS_ADMIN_TEMPLATE) &&
  Boolean(EMAILJS_AUTOREPLY_TEMPLATE);


// ── EmailJS lazy loader ────────────────────────────────────────────────────

let _emailjsModule = null;

async function _loadEmailJS() {
  if (_emailjsModule) return _emailjsModule;
  try {
    _emailjsModule = await import('@emailjs/browser');
    _emailjsModule.init({ publicKey: EMAILJS_PUBLIC_KEY });
    return _emailjsModule;
  } catch (err) {
    console.warn('[EnquiryService] EmailJS SDK failed to load:', err?.message);
    return null;
  }
}


// ── Helper: build EmailJS template parameters ──────────────────────────────

function _buildTemplateParams(formData) {
  return {
    // Student fields — map to your EmailJS template variable names
    student_name:  formData.studentName  || '',
    parent_name:   formData.parentName   || '',
    mobile:        formData.mobile       || '',
    email:         formData.email        || '',
    class_name:    formData.className    || '',
    stream:        formData.stream       || '',
    course:        formData.course       || '',
    school:        formData.school       || '',
    message:       formData.message      || '—',
    // Reply-to for EmailJS (usually configured in template, but also passed here)
    reply_to:      formData.email        || '',
    to_email:      formData.email        || '',   // used by auto-reply template
    // Metadata
    submitted_at:  new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };
}


// ── EmailJS send (single template) ────────────────────────────────────────

async function _sendViaEmailJS(templateId, templateParams, label) {
  const ejs = await _loadEmailJS();
  if (!ejs) {
    return { success: false, error: 'EmailJS SDK not available' };
  }
  try {
    const result = await ejs.send(EMAILJS_SERVICE_ID, templateId, templateParams);
    if (result.status === 200 || result.text === 'OK') {
      console.info(`[EnquiryService] EmailJS ${label} sent — status:`, result.status);
      return { success: true };
    }
    console.warn(`[EnquiryService] EmailJS ${label} non-OK response:`, result);
    return { success: false, error: `EmailJS responded with status ${result.status}` };
  } catch (err) {
    console.warn(`[EnquiryService] EmailJS ${label} failed:`, err?.text || err?.message);
    return { success: false, error: err?.text || err?.message || 'Unknown EmailJS error' };
  }
}


// ── Backend fallback (SMTP) ────────────────────────────────────────────────

async function _submitToBackend(formData, emailjsAdminSent, emailjsStudentSent) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const payload = {
    ...formData,
    emailjs_admin_sent:   emailjsAdminSent,
    emailjs_student_sent: emailjsStudentSent,
  };

  try {
    const response = await fetch(ENQUIRY_ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
      signal:  controller.signal,
    });

    let result = null;
    try { result = await response.json(); } catch { result = null; }

    if (response.status === 207) {
      // Partial success: saved to DB but email failed — not silently swallowed
      return {
        success:     false,
        partial:     true,
        smtpBlocked: result?.smtp_blocked || false,
        message:     result?.message || 'Enquiry saved but email delivery failed.',
        enquiryId:   result?.enquiry_id || null,
      };
    }

    if (!response.ok) {
      const msg = result?.detail || result?.message;
      throw new Error(typeof msg === 'string' ? msg : 'Unable to submit enquiry. Please try again.');
    }

    if (result?.success === false) {
      throw new Error(result.message || 'Enquiry submission failed. Please try again.');
    }

    return {
      success:   true,
      message:   result?.message || 'Enquiry submitted successfully.',
      enquiryId: result?.enquiry_id || null,
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('The submission timed out. Please check your connection and try again.');
    }
    throw err;
  } finally {
    window.clearTimeout(timeoutId);
  }
}


// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Submit an enquiry form.
 *
 * Returns a result object:
 *   { success: bool, message: string, enquiryId: string|null, smtpBlocked: bool }
 *
 * Throws an Error on network/timeout failures.
 */
export async function submitEnquiry(formData) {
  let emailjsAdminSent   = false;
  let emailjsStudentSent = false;

  // ── Step 1: Try EmailJS (primary) ────────────────────────────────────────
  if (EMAILJS_CONFIGURED) {
    const templateParams = _buildTemplateParams(formData);

    // Admin notification
    const adminResult = await _sendViaEmailJS(
      EMAILJS_ADMIN_TEMPLATE,
      templateParams,
      'admin notification'
    );
    emailjsAdminSent = adminResult.success;

    // Student auto-reply (independent — partial EmailJS success is handled)
    const studentResult = await _sendViaEmailJS(
      EMAILJS_AUTOREPLY_TEMPLATE,
      templateParams,
      'student auto-reply'
    );
    emailjsStudentSent = studentResult.success;

    console.info(
      '[EnquiryService] EmailJS result — admin:', emailjsAdminSent,
      '/ student:', emailjsStudentSent
    );
  } else {
    console.info(
      '[EnquiryService] EmailJS not configured — skipping. Using backend SMTP only.'
    );
  }

  // ── Step 2: Backend (saves to DB + SMTP fallback for any missing emails) ──
  // Always call backend: it saves to DB regardless of EmailJS result.
  const backendResult = await _submitToBackend(
    formData,
    emailjsAdminSent,
    emailjsStudentSent
  );

  // If both EmailJS emails succeeded and backend also saved — full success.
  if (emailjsAdminSent && emailjsStudentSent && backendResult.success) {
    return {
      success:   true,
      message:   'Your enquiry has been received successfully. We will contact you within 24 hours.',
      enquiryId: backendResult.enquiryId,
      smtpBlocked: false,
    };
  }

  // If backend SMTP handled the missing email(s) successfully
  if (backendResult.success) {
    return {
      success:   true,
      message:   'Your enquiry has been received successfully. We will contact you within 24 hours.',
      enquiryId: backendResult.enquiryId,
      smtpBlocked: false,
    };
  }

  // Partial: saved to DB but email delivery incomplete
  if (backendResult.partial) {
    return {
      success:     false,
      partial:     true,
      message:     backendResult.message,
      enquiryId:   backendResult.enquiryId,
      smtpBlocked: backendResult.smtpBlocked || false,
    };
  }

  // Full failure (backend threw)
  throw new Error(backendResult.message || 'Submission failed. Please try again or call us directly.');
}
