const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const ENQUIRY_ENDPOINT = `${API_BASE_URL}/api/enquiry`;
const REQUEST_TIMEOUT_MS = 30000;

/**
 * Submit an enquiry to the FastAPI backend.
 * Credentials never touch the frontend — only form data is sent.
 */
export async function submitEnquiry(formData) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(ENQUIRY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      signal: controller.signal,
    });

    let result = null;
    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      // Backend returned 4xx/5xx — surface the detail message if present.
      const msg = result?.detail || result?.message;
      throw new Error(
        typeof msg === 'string' ? msg : 'Unable to submit your enquiry. Please try again.'
      );
    }

    // Guard against a 200 that carries success: false (should not happen with
    // the current backend, but defensive check costs nothing).
    if (result?.success === false) {
      throw new Error(result.message || 'Enquiry submission failed. Please try again.');
    }

    return result;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The submission timed out. Please check your connection and try again.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
