/**
 * @file src/features/booking/lib/whatsappMessage.ts
 * Generator pesan WhatsApp dan email terformat otomatis untuk konfirmasi jadwal pemesanan
 * beserta tautan Google Meet / Zoom otomatis.
 */

import { BOOKING_CONFIG } from '../../../data/booking.config';
import type { BookingRecord } from '../types';

/**
 * Membuat teks pesan WhatsApp yang terstruktur dan rapi untuk dikirimkan ke nomor ViramidAgency.
 */
export function generateWhatsAppMessage(booking: BookingRecord): string {
  const formatLabel =
    booking.format === 'online'
      ? 'Online (Google Meet)'
      : `Tatap Muka di Studio (${BOOKING_CONFIG.kontak.lokasiStudio})`;

  let text = `*KONFIRMASI JADWAL KONSULTASI - VIRAMIDAGENCY*\n`;
  text += `────────────────────────────\n`;
  text += `*Kode Booking:* ${booking.kodeBooking}\n`;
  text += `*Nama Klien:* ${booking.nama}\n`;
  text += `*Email:* ${booking.email || '-'}\n`;
  text += `*WhatsApp:* ${booking.whatsapp}\n\n`;
  text += `*DETAIL SESI PERTEMUAN:*\n`;
  text += `• *Jenis Sesi:* ${booking.jenisPertemuanNama} (${booking.durasiMenit} Menit)\n`;
  text += `• *Format:* ${formatLabel}\n`;
  text += `• *Tanggal:* ${booking.tanggal}\n`;
  text += `• *Waktu Sesi:* ${booking.jamMulai} - ${booking.jamSelesai} WITA (UTC+8)\n`;

  if (booking.meetingUrl) {
    text += `• *Link Google Meet:* ${booking.meetingUrl}\n`;
  }

  text += `\n*TOPIK / KEBUTUHAN PROYEK:*\n`;
  text += `"${booking.topik}"\n`;

  if (booking.linkReferensi && booking.linkReferensi.trim().length > 0) {
    text += `\n*Link Referensi:* ${booking.linkReferensi.trim()}\n`;
  }

  text += `────────────────────────────\n`;
  text += `_Halo Tim ViramidAgency, saya telah mengajukan jadwal pertemuan di atas melalui website resmi. Mohon konfirmasinya. Terima kasih!_`;

  return text;
}

/**
 * Menghasilkan link tautan langsung ke WhatsApp Web / WhatsApp Mobile (wa.me)
 */
export function getWhatsAppBookingUrl(booking: BookingRecord): string {
  const message = generateWhatsAppMessage(booking);
  const targetNumber = BOOKING_CONFIG.kontak.whatsappNomor;
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Menghasilkan mailto URL untuk konfirmasi otomatis via email ke agensi
 */
export function getEmailBookingUrl(booking: BookingRecord): string {
  const subject = `[JADWAL KONSULTASI] ${booking.jenisPertemuanNama} - ${booking.nama} (${booking.kodeBooking})`;
  const body = generateWhatsAppMessage(booking);
  return `mailto:${BOOKING_CONFIG.kontak.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
