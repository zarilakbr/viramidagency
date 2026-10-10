/**
 * @file src/features/booking/lib/slots.test.ts
 * Unit tests untuk fungsi kalkulasi slot dan ketersediaan tanggal.
 */

import { describe, it, expect } from 'vitest';
import { generateSlots, isDateAvailable } from './slots';
import type { BookingConfig, JenisPertemuanConfig } from '../../../data/booking.config';
import type { BookingRecord } from '../types';

const mockConfig: BookingConfig = {
  timezone: 'Asia/Makassar',
  timezoneLabel: 'WITA (UTC+8)',
  hariKerja: [1, 2, 3, 4, 5], // Senin - Jumat
  jamBuka: '09:00',
  jamTutup: '17:00',
  intervalSlot: 30,
  bufferAntarSesi: 15,
  minimalPemberitahuanJam: 12,
  maksimalHariKedepan: 30,
  tanggalLibur: ['2026-12-25', '2026-01-01'],
  jenisPertemuan: [],
  formatPertemuan: [],
  kontak: {
    whatsappNomor: '6287864033058',
    whatsappDisplay: '+62 878-6403-3058',
    email: 'kerjadigitallll@gmail.com',
    lokasiStudio: 'Nusa Tenggara Barat',
  },
};

const mockJenis30: JenisPertemuanConfig = {
  id: 'konsultasi-gratis',
  nama: 'Konsultasi Gratis',
  durasiMenit: 30,
  deskripsi: 'Konsultasi 30 menit',
};

const mockJenis60: JenisPertemuanConfig = {
  id: 'diskusi-proyek',
  nama: 'Diskusi Proyek',
  durasiMenit: 60,
  deskripsi: 'Diskusi 60 menit',
};

describe('slots calculation and availability logic', () => {
  const referenceNow = new Date('2026-10-12T08:00:00Z'); // Senin pagi

  it('menolak tanggal akhir pekan (Sabtu & Minggu)', () => {
    // 2026-10-17 adalah Sabtu, 2026-10-18 adalah Minggu
    expect(isDateAvailable('2026-10-17', mockConfig, referenceNow)).toBe(false);
    expect(isDateAvailable('2026-10-18', mockConfig, referenceNow)).toBe(false);

    const slots = generateSlots('2026-10-17', mockJenis30, [], mockConfig, referenceNow);
    expect(slots).toEqual([]);
  });

  it('menolak tanggal libur nasional yang ada di konfigurasi', () => {
    // 2026-12-25 adalah hari libur di config
    expect(isDateAvailable('2026-12-25', mockConfig, referenceNow)).toBe(false);

    const slots = generateSlots('2026-12-25', mockJenis30, [], mockConfig, referenceNow);
    expect(slots).toEqual([]);
  });

  it('menghasilkan slot yang tidak melebihi batas jam tutup (17:00)', () => {
    // 2026-10-14 adalah Rabu
    const targetDate = '2026-10-14';
    const slots60 = generateSlots(targetDate, mockJenis60, [], mockConfig, referenceNow);

    expect(slots60.length).toBeGreaterThan(0);
    // Untuk durasi 60 menit dengan jam tutup 17:00, slot terakhir yang valid adalah mulai 16:00 selesai 17:00
    const lastSlot = slots60[slots60.length - 1];
    expect(lastSlot.jamMulai).toBe('16:00');
    expect(lastSlot.jamSelesai).toBe('17:00');
  });

  it('menonaktifkan slot yang bertabrakan dengan booking lain beserta jeda buffer 15 menit', () => {
    const targetDate = '2026-10-14'; // Rabu
    const existingBookings: BookingRecord[] = [
      {
        id: 'book-1',
        kodeBooking: 'VRM-20261014-001',
        createdAt: '2026-10-12T08:00:00Z',
        status: 'menunggu',
        jenisPertemuanId: 'konsultasi-gratis',
        jenisPertemuanNama: 'Konsultasi Gratis',
        durasiMenit: 30,
        format: 'online',
        tanggal: targetDate,
        jamMulai: '10:00',
        jamSelesai: '10:30',
        nama: 'Ahmad Client',
        email: 'ahmad@example.com',
        whatsapp: '08123456789',
        topik: 'Diskusi pembuatan website company profile',
      },
    ];

    const slots = generateSlots(targetDate, mockJenis30, existingBookings, mockConfig, referenceNow);

    // Slot 10:00 - 10:30 harus tidak tersedia (tabrakan langsung)
    const slot1000 = slots.find((s) => s.jamMulai === '10:00');
    expect(slot1000?.available).toBe(false);

    // Slot 09:30 - 10:00 selesai jam 10:00, jarak ke 10:00 adalah 0 menit (< 15 menit buffer), maka tidak tersedia
    const slot0930 = slots.find((s) => s.jamMulai === '09:30');
    expect(slot0930?.available).toBe(false);

    // Slot 10:30 - 11:00 mulai jam 10:30, jarak dari 10:30 selesai adalah 0 menit (< 15 menit buffer), maka tidak tersedia
    const slot1030 = slots.find((s) => s.jamMulai === '10:30');
    expect(slot1030?.available).toBe(false);

    // Slot 11:00 - 11:30 mulai jam 11:00, jarak dari 10:30 adalah 30 menit (>= 15 menit buffer), maka harus tersedia
    const slot1100 = slots.find((s) => s.jamMulai === '11:00');
    expect(slot1100?.available).toBe(true);

    // Slot 09:00 - 09:30 selesai 09:30, jarak ke 10:00 adalah 30 menit (>= 15 menit buffer), maka harus tersedia
    const slot0900 = slots.find((s) => s.jamMulai === '09:00');
    expect(slot0900?.available).toBe(true);
  });

  it('mengabaikan booking yang statusnya dibatalkan (slot dibebaskan kembali)', () => {
    const targetDate = '2026-10-14';
    const cancelledBookings: BookingRecord[] = [
      {
        id: 'book-cancel',
        kodeBooking: 'VRM-20261014-002',
        createdAt: '2026-10-12T08:00:00Z',
        status: 'dibatalkan', // Dibatalkan!
        jenisPertemuanId: 'konsultasi-gratis',
        jenisPertemuanNama: 'Konsultasi Gratis',
        durasiMenit: 30,
        format: 'online',
        tanggal: targetDate,
        jamMulai: '10:00',
        jamSelesai: '10:30',
        nama: 'User Cancelled',
        email: 'user@example.com',
        whatsapp: '08123456789',
        topik: 'Topik dibatalkan',
      },
    ];

    const slots = generateSlots(targetDate, mockJenis30, cancelledBookings, mockConfig, referenceNow);
    const slot1000 = slots.find((s) => s.jamMulai === '10:00');
    expect(slot1000?.available).toBe(true);
  });

  it('menegakkan batas minimal pemberitahuan (12 jam)', () => {
    // Jika 'now' adalah 2026-10-14 jam 08:00
    const nowTime = new Date('2026-10-14T08:00:00');
    // Batas 12 jam adalah jam 20:00 pada hari yang sama
    // Maka seluruh slot pada 2026-10-14 (09:00 - 17:00) harus ditandai tidak tersedia karena kurang dari 12 jam
    const slotsToday = generateSlots('2026-10-14', mockJenis30, [], mockConfig, nowTime);
    slotsToday.forEach((slot) => {
      expect(slot.available).toBe(false);
      expect(slot.alasanTidakTersedia).toContain('pemberitahuan');
    });

    // Sedangkan hari berikutnya 2026-10-15 (Kamis) slot jam 09:00 (> 24 jam dari now) harus tersedia
    const slotsTomorrow = generateSlots('2026-10-15', mockJenis30, [], mockConfig, nowTime);
    const tomorrowMorningSlot = slotsTomorrow.find((s) => s.jamMulai === '09:00');
    expect(tomorrowMorningSlot?.available).toBe(true);
  });
});
