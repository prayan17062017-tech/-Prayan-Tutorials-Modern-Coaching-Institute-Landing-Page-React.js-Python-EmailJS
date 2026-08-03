import emailjs from '@emailjs/browser';

const SERVICE_ID       = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID      = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const TEMPLATE_ID_SEND = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_SEND;
const PUBLIC_KEY       = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const TIMEOUT_MS = 10000;

export function validateEmailJSConfig() {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS environment variables are not configured. Check your .env file.');
  }
}

// Wraps emailjs.send with a timeout
function sendWithTimeout(templateId, params) {
  const send = emailjs.send(SERVICE_ID, templateId, params, PUBLIC_KEY);
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out. Please try again.')), TIMEOUT_MS)
  );
  return Promise.race([send, timeout]);
}

export async function sendEnquiryEmail(formData) {
  validateEmailJSConfig();

  const time          = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const mobileWithCode = `+91 ${formData.mobile}`;

  const full_summary = [
    '══════════════════════════════════════════',
    '   NEW ADMISSION ENQUIRY — Prayan Tutorials',
    '══════════════════════════════════════════',
    `Submitted On   : ${time}`,
    '',
    '── Student Details ───────────────────────',
    `Student Name   : ${formData.studentName}`,
    `Parent Name    : ${formData.parentName}`,
    `Mobile Number  : ${mobileWithCode}`,
    `Email Address  : ${formData.email}`,
    '',
    '── Course Details ────────────────────────',
    `Class          : ${formData.className}`,
    `Stream         : ${formData.stream}`,
    `Course         : ${formData.course}`,
    `School/College : ${formData.school}`,
    '',
    '── Additional Message ────────────────────',
    formData.message || 'No additional message provided.',
    '',
    '══════════════════════════════════════════',
    'Sent via Prayan Tutorials Website',
    '══════════════════════════════════════════',
  ].join('\n');

  // ── Admin notification params (existing — unchanged) ────────────────────
  const adminParams = {
    student_name    : formData.studentName,
    parent_name     : formData.parentName,
    mobile_number   : mobileWithCode,
    email           : formData.email,
    class           : formData.className,
    stream          : formData.stream,
    course          : formData.course,
    school          : formData.school,
    message         : formData.message || 'No additional message',
    submission_time : time,
    // aliases
    mobile          : mobileWithCode,
    phone           : mobileWithCode,
    mobile_no       : mobileWithCode,
    class_name      : formData.className,
    school_name     : formData.school,
    college_name    : formData.school,
    student         : formData.studentName,
    name            : formData.studentName,
    from_name       : formData.studentName,
    reply_to        : formData.email,
    full_summary,
  };

  // ── Auto-reply params (sent to student/parent) ──────────────────────────
  const autoReplyParams = {
    student_name    : formData.studentName,
    parent_name     : formData.parentName,
    email           : formData.email,
    phone           : mobileWithCode,
    mobile_number   : mobileWithCode,
    course          : formData.course,
    class           : formData.className,
    stream          : formData.stream,
    school          : formData.school,
    submission_time : time,
    to_email        : formData.email,   // recipient for auto-reply
    to_name         : formData.studentName,
    reply_to        : 'prayan17062017@gmail.com',
    from_name       : 'Prayan Tutorials',
  };

  // ── Step 1: Send admin email (throws on failure — stops everything) ──────
  await sendWithTimeout(TEMPLATE_ID, adminParams);

  // ── Step 2: Send auto-reply (failure is non-fatal) ───────────────────────
  if (TEMPLATE_ID_SEND) {
    try {
      await sendWithTimeout(TEMPLATE_ID_SEND, autoReplyParams);
    } catch (autoReplyErr) {
      // Auto-reply failure must NOT affect the enquiry success flow
      console.error('Auto-reply email failed (enquiry still received):', autoReplyErr);
    }
  }
}
