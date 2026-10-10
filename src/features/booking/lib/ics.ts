/**
 * @file src/features/booking/lib/ics.ts
 * Generator file iCalendar (.ics) dan tautan Google Calendar untuk jadwal pertemuan.
 */

import { BOOKING_CONFIG } from '../../../data/booking.config';
import type { BookingRecord } from '../types';

/**
 * Format string tanggal "YYYY-MM-DD" dan waktu "HH:mm" menjadi format iCalendar "YYYYMMDDTHHmm00"
 */
function formatIcsDateTime(dateStr: string, timeStr: string): string {
  const cleanDate = dateStr.replace(/-/g, '');
  const cleanTime = timeStr.replace(/:/g, '') + '00';
  return `${cleanDate}T${cleanTime}`;
}

/**
 * Menghasilkan konten file .ics standar (iCalendar RFC 5545)
 */
export function generateIcsContent(booking: BookingRecord): string {
  const start = formatIcsDateTime(booking.tanggal, booking.jamMulai);
  const end = formatIcsDateTime(booking.tanggal, booking.jamSelesai);
  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');

  const title = `[ViramidAgency] ${booking.jenisPertemuanNama} (${booking.kodeBooking})`;
  const location =
    booking.format === 'online'
      ? 'Google Meet (Tautan akan dikonfirmasi)'
      : BOOKING_CONFIG.kontak.lokasiStudio;

  const description = [
    `Pertemuan dengan ViramidAgency: ${booking.jenisPertemuanNama}`,
    `Kode Booking: ${booking.kodeBooking}`,
    `Format: ${booking.format === 'online' ? 'Online (Google Meet)' : 'Tatap Muka di Studio'}`,
    `Waktu: ${booking.jamMulai} - ${booking.jamSelesai} WITA (UTC+8)`,
    `Pemesan: ${booking.nama} (${booking.whatsapp} / ${booking.email})`,
    `Topik: ${booking.topik}`,
    booking.linkReferensi ? `Referensi: ${booking.linkReferensi}` : '',
    '',
    'Catatan: Status saat ini menunggu konfirmasi dari tim ViramidAgency.',
  ]
    .filter(Boolean)
    .join('\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ViramidAgency//Booking Scheduler//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${booking.kodeBooking}@viramidagency.com`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=Asia/Makassar:${start}`,
    `DTEND;TZID=Asia/Makassar:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:TENTATIVE',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Pengingat Pertemuan ViramidAgency (30 menit lagi)',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Mengunduh file .ics langsung di browser klien
 */
export function downloadIcsFile(booking: BookingRecord): void {
  const icsString = generateIcsContent(booking);
  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${booking.kodeBooking}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Menghasilkan URL langsung ke Google Calendar Add Event
 */
export function getGoogleCalendarUrl(booking: BookingRecord): string {
  const start = formatIcsDateTime(booking.tanggal, booking.jamMulai);
  const end = formatIcsDateTime(booking.tanggal, booking.jamSelesai);

  const title = `[ViramidAgency] ${booking.jenisPertemuanNama} - ${booking.nama}`;
  const location =
    booking.format === 'online'
      ? 'Google Meet (Tautan akan dikonfirmasi)'
      : BOOKING_CONFIG.kontak.lokasiStudio;

  const details = `Kode Booking: ${booking.kodeBooking}\nTopik: ${booking.topik}\nFormat: ${
    booking.format === 'online' ? 'Online' : 'Tatap Muka'
  }\nPemesan: ${booking.nama} (${booking.whatsapp})`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: details,
    location: location,
    ctz: BOOKING_CONFIG.timezone,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
