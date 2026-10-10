/**
 * @file src/features/booking/lib/clipboard.ts
 * Helper utilitas untuk menyalin teks ke clipboard dengan dukungan fallback komprehensif.
 */

export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // 1. Coba browser modern navigator.clipboard jika tersedia
  if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('[clipboard] navigator.clipboard gagal, mencoba fallback textarea:', err);
    }
  }

  // 2. Fallback untuk WebView, browser seluler, dan context non-HTTPS
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (err) {
    console.error('[clipboard] Gagal menyalin ke clipboard:', err);
    return false;
  }
}
