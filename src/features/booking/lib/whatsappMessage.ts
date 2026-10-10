/**
 * @file src/features/booking/lib/whatsappMessage.ts
 * Generator pesan WhatsApp terformat rapi untuk konfirmasi jadwal pemesanan.
 */

import { BOOKING_CONFIG } from '../../../data/booking.config';
import type { BookingRecord } from '../types';

/**
 * Membuat teks pesan WhatsApp yang terstruktur dan sopan untuk dikirimkan ke nomor ViramidAgency.
 */
export function generateWhatsAppMessage(booking: BookingRecord): string {
  const formatLabel =
    booking.format === 'online'
      ? 'Online (Google Meet)'
      : `Tatap Muka di Studio (${BOOKING_CONFIG.kontak.lokasiStudio})`;

  let text = `*KONFIRMASI PERMINTAAN JADWAL - VIRAMIDAGENCY*\n`;
  text += `────────────────────────────\n`;
  text += `*Kode Booking:* ${booking.kodeBooking}\n`;
  text += `*Nama:* ${booking.nama}\n`;
  text += `*Email:* ${booking.email}\n`;
  text += `*WhatsApp:* ${booking.whatsapp}\n\n`;
  text += `*DETAIL PERTEMUAN:*\n`;
  text += `• *Jenis:* ${booking.jenisPertemuanNama} (${booking.durasiMenit} menit)\n`;
  text += `• *Format:* ${formatLabel}\n`;
  text += `• *Tanggal:* ${booking.tanggal}\n`;
  text += `• *Waktu:* ${booking.jamMulai} - ${booking.jamSelesai} WITA (UTC+8)\n\n`;
  text += `*TOPIK DISKUSI:*\n`;
  text += `"${booking.topik}"\n`;

  if (booking.linkReferensi && booking.linkReferensi.trim().length > 0) {
    text += `\n*Link Referensi:* ${booking.linkReferensi.trim()}\n`;
  }

  text += `────────────────────────────\n`;
  text += `_Halo Tim ViramidAgency, saya telah mengajukan jadwal pertemuan di atas melalui website. Mohon konfirmasinya. Terima kasih!_`;

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
