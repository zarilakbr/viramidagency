/**
 * @file src/lib/whatsapp.ts
 * Utilitas untuk membuka aplikasi WhatsApp secara langsung (mobile / desktop).
 * Menghindari pengalihan paksa ke WhatsApp Web jika pengguna memiliki aplikasi WhatsApp.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 */

import { KONTAK_AGENCY } from '../data/content';

/**
 * Menghasilkan URL protokol langsung aplikasi WhatsApp (whatsapp://send).
 * Protokol ini memicu aplikasi WhatsApp native di Android, iOS, Windows, dan macOS.
 */
export function getDirectWhatsAppUrl(text?: string, phone = KONTAK_AGENCY.whatsappNomor): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = text ? encodeURIComponent(text) : '';
  return `whatsapp://send?phone=${cleanPhone}${encodedText ? `&text=${encodedText}` : ''}`;
}

/**
 * Menghasilkan URL fallback universal resmi (api.whatsapp.com).
 */
export function getUniversalWhatsAppUrl(text?: string, phone = KONTAK_AGENCY.whatsappNomor): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = text ? encodeURIComponent(text) : '';
  return `https://api.whatsapp.com/send?phone=${cleanPhone}${encodedText ? `&text=${encodedText}` : ''}`;
}

/**
 * Membuka aplikasi WhatsApp langsung dengan penanganan cerdas lintas platform.
 * 1. Di perangkat Mobile (Android/iOS): Langsung mengarahkan ke skema whatsapp:// untuk membuka aplikasi seketika.
 * 2. Di Desktop (Windows/Mac): Mencoba memicu protokol whatsapp:// terlebih dahulu agar aplikasi WhatsApp Desktop terbuka.
 *    Jika aplikasi desktop tidak merespons dalam 1.8 detik, baru membuka fallback tab universal.
 */
export function openWhatsAppDirectly(text?: string, phone = KONTAK_AGENCY.whatsappNomor): void {
  const appUrl = getDirectWhatsAppUrl(text, phone);
  const webUrl = getUniversalWhatsAppUrl(text, phone);

  if (typeof window === 'undefined') return;

  const userAgent = navigator.userAgent || '';
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

  if (isMobile) {
    // Di perangkat mobile, arahkan langsung ke protokol aplikasi
    window.location.href = appUrl;
    return;
  }

  // Di desktop: picu protokol aplikasi whatsapp://
  const link = document.createElement('a');
  link.href = appUrl;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Fallback cerdas jika browser tidak memiliki aplikasi desktop yang terdaftar
  const startTime = Date.now();
  const timeoutId = window.setTimeout(() => {
    // Jika window masih memiliki fokus setelah 1.5 detik, besar kemungkinan tidak ada aplikasi yang dibuka
    if (document.hasFocus() && Date.now() - startTime > 1200) {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  }, 1600);

  // Jika window kehilangan fokus (artinya dialog aplikasi terbuka), batalkan fallback
  const handleBlur = () => {
    window.clearTimeout(timeoutId);
    window.removeEventListener('blur', handleBlur);
  };
  window.addEventListener('blur', handleBlur, { once: true });
}

/**
 * Membuka aplikasi email default pengguna dengan subjek dan isi pesan terstruktur.
 */
export function openEmailDirectly(
  subject: string,
  body: string,
  email = KONTAK_AGENCY.email
): void {
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}
