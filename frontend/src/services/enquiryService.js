const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const ENQUIRY_ENDPOINT = `${API_BASE_URL}/api/enquiry`;
const REQUEST_TIMEOUT_MS = 30000;

/**
 * Submit an enquiry to the FastAPI backend.
 * Gmail credentials stay on the server; the browser only sends form data.
 */
export async function submitEnquiry(formData) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(ENQUIRY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      throw new Error(
        result?.detail || result?.message || 'Unable to submit your enquiry. Please try again.'
      );
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
