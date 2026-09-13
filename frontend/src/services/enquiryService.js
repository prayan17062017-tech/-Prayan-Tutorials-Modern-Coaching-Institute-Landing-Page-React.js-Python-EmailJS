const REQUEST_TIMEOUT_MS = 45000;

export async function submitEnquiry(formData) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      signal: controller.signal,
    });

    let result = null;
    try { result = await response.json(); } catch { result = null; }

    if (!response.ok) {
      const msg = result?.detail || result?.message;
      throw new Error(typeof msg === 'string' ? msg : 'Unable to submit your enquiry. Please try again.');
    }

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
