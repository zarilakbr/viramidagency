/**
 * @file src/features/booking/lib/slots.ts
 * Fungsi murni untuk kalkulasi slot jadwal dan ketersediaan kalender.
 */

import {
  format,
  parse,
  addMinutes,
  isBefore,
  isAfter,
  addDays,
  startOfDay,
  getDay,
  parseISO,
} from 'date-fns';
import { BOOKING_CONFIG, type BookingConfig, type JenisPertemuanConfig } from '../../../data/booking.config';
import type { BookingRecord, TimeSlot } from '../types';

/**
 * Konversi "HH:mm" menjadi total menit dari 00:00 untuk perbandingan integer yang akurat.
 */
export function timeStringToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Konversi total menit dari 00:00 menjadi format "HH:mm".
 */
export function minutesToTimeString(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Memformat objek Date menjadi string tanggal "YYYY-MM-DD"
 */
export function formatDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Memeriksa apakah suatu tanggal memenuhi kriteria hari kerja dan bukan hari libur.
 */
export function isDateAvailable(
  dateInput: Date | string,
  config: BookingConfig = BOOKING_CONFIG,
  nowInput: Date = new Date()
): boolean {
  const targetDate = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
  const now = startOfDay(nowInput);
  const targetDayStart = startOfDay(targetDate);

  // 1. Tidak boleh di masa lalu
  if (isBefore(targetDayStart, now)) {
    return false;
  }

  // 2. Tidak boleh melebihi batas maksimal hari ke depan
  const maxDate = addDays(now, config.maksimalHariKedepan);
  if (isAfter(targetDayStart, maxDate)) {
    return false;
  }

  // 3. Harus berada pada hari kerja yang diizinkan (default: 1=Senin s/d 5=Jumat)
  const dayOfWeek = getDay(targetDate);
  if (!config.hariKerja.includes(dayOfWeek)) {
    return false;
  }

  // 4. Tidak boleh jatuh pada tanggal libur yang dikonfigurasi
  const dateString = formatDateString(targetDate);
  if (config.tanggalLibur.includes(dateString)) {
    return false;
  }

  // 5. Jika tanggal adalah hari ini, periksa apakah masih ada waktu sebelum jam tutup dengan batas minimal pemberitahuan
  const isToday = formatDateString(targetDate) === formatDateString(nowInput);
  if (isToday) {
    const minNoticeTime = addMinutes(nowInput, config.minimalPemberitahuanJam * 60);
    const closingTime = parse(config.jamTutup, 'HH:mm', targetDate);
    if (isAfter(minNoticeTime, closingTime)) {
      return false;
    }
  }

  return true;
}

/**
 * Menghasilkan daftar seluruh slot waktu yang valid untuk tanggal dan jenis pertemuan tertentu.
 */
export function generateSlots(
  dateInput: Date | string,
  jenis: JenisPertemuanConfig,
  bookingTerisi: BookingRecord[] = [],
  config: BookingConfig = BOOKING_CONFIG,
  nowInput: Date = new Date()
): TimeSlot[] {
  const targetDate = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput;
  const dateString = formatDateString(targetDate);

  // Jika tanggal secara umum tidak tersedia (akhir pekan / libur / masa lalu), kembalikan array kosong
  if (!isDateAvailable(targetDate, config, nowInput)) {
    return [];
  }

  const slots: TimeSlot[] = [];
  const openMinutes = timeStringToMinutes(config.jamBuka);
  const closeMinutes = timeStringToMinutes(config.jamTutup);
  const duration = jenis.durasiMenit;
  const buffer = config.bufferAntarSesi;

  // Filter booking aktif pada tanggal yang sama (abaikan yang sudah dibatalkan)
  const activeBookings = bookingTerisi.filter(
    (b) => b.tanggal === dateString && b.status !== 'dibatalkan'
  );

  const minBookingDateTime = addMinutes(nowInput, config.minimalPemberitahuanJam * 60);

  // Iterasi slot mulai dari jam buka sampai jam tutup dengan interval konfigurasi
  for (
    let currentStartMinutes = openMinutes;
    currentStartMinutes < closeMinutes;
    currentStartMinutes += config.intervalSlot
  ) {
    const currentEndMinutes = currentStartMinutes + duration;

    // Slot tidak boleh melebihi jam tutup studio/kantor
    if (currentEndMinutes > closeMinutes) {
      break;
    }

    const startStr = minutesToTimeString(currentStartMinutes);
    const endStr = minutesToTimeString(currentEndMinutes);

    // Hitung DateTime penuh untuk slot ini untuk memeriksa minimal notice time
    const slotStartDateTime = parse(
      `${dateString} ${startStr}`,
      'yyyy-MM-dd HH:mm',
      new Date()
    );

    let isAvailable = true;
    let reason: string | undefined;

    // 1. Cek batas minimal pemberitahuan (default: 12 jam dari sekarang)
    if (isBefore(slotStartDateTime, minBookingDateTime)) {
      isAvailable = false;
      reason = `Melewati batas minimal pemberitahuan ${config.minimalPemberitahuanJam} jam`;
    }

    // 2. Cek tabrakan dengan booking yang sudah terisi beserta jeda buffer
    if (isAvailable) {
      for (const booked of activeBookings) {
        const bookedStart = timeStringToMinutes(booked.jamMulai);
        const bookedEnd = timeStringToMinutes(booked.jamSelesai);

        // Daerah terlarang: dari (bookedStart - buffer) sampai (bookedEnd + buffer)
        // Tabrakan interval terjadi jika:
        // currentStartMinutes < (bookedEnd + buffer) DAN currentEndMinutes > (bookedStart - buffer)
        const hasCollision =
          currentStartMinutes < bookedEnd + buffer &&
          currentEndMinutes > bookedStart - buffer;

        if (hasCollision) {
          isAvailable = false;
          reason = 'Slot telah dipesan atau berada dalam jeda buffer pertemuan lain';
          break;
        }
      }
    }

    slots.push({
      jamMulai: startStr,
      jamSelesai: endStr,
      available: isAvailable,
      alasanTidakTersedia: reason,
    });
  }

  return slots;
}
