/**
 * @file src/features/booking/services/localBookingService.ts
 * Implementasi BookingService berbasis localStorage dengan integrasi Google Meet otomatis.
 */

import { BOOKING_CONFIG } from '../../../data/booking.config';
import { generateBookingCode } from '../lib/bookingCode';
import type { BookingFormData, BookingRecord, BookingService } from '../types';

const STORAGE_KEY = 'viramid_agency_bookings_v1';

export class LocalBookingService implements BookingService {
  private memoryStore: BookingRecord[] = [];

  constructor() {
    this.memoryStore = this.loadFromStorage();
  }

  private loadFromStorage(): BookingRecord[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }
      }
    } catch (err) {
      console.warn('[LocalBookingService] Gagal membaca localStorage, fallback ke memory:', err);
    }
    return this.memoryStore && this.memoryStore.length > 0 ? this.memoryStore : [];
  }

  private saveToStorage(records: BookingRecord[]): void {
    this.memoryStore = records;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      }
    } catch (err) {
      console.warn('[LocalBookingService] Gagal menyimpan ke localStorage:', err);
    }
  }

  async getBookedSlots(tanggal: string): Promise<BookingRecord[]> {
    const all = this.loadFromStorage();
    // Hanya kembalikan booking yang aktif pada tanggal tersebut
    return all.filter((b) => b.tanggal === tanggal && b.status !== 'dibatalkan');
  }

  async createBooking(payload: BookingFormData): Promise<BookingRecord> {
    const all = this.loadFromStorage();
    const jenisConfig = BOOKING_CONFIG.jenisPertemuan.find(
      (j) => j.id === payload.jenisPertemuanId
    );

    const durasi = jenisConfig ? jenisConfig.durasiMenit : 30;
    const namaJenis = jenisConfig ? jenisConfig.nama : 'Pertemuan Konsultasi';
    const kodeBooking = generateBookingCode(new Date());

    // Generate otomatis link Google Meet unik untuk format online
    const meetCode = `vrm-${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}`;
    const meetingUrl =
      payload.format === 'online'
        ? payload.meetingUrl || `https://meet.google.com/${meetCode}`
        : undefined;

    const newRecord: BookingRecord = {
      ...payload,
      id: `bk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      kodeBooking,
      meetingUrl,
      createdAt: new Date().toISOString(),
      status: 'menunggu',
      durasiMenit: durasi,
      jenisPertemuanNama: namaJenis,
    };

    const updated = [newRecord, ...all];
    this.saveToStorage(updated);
    return newRecord;
  }

  async getBookingHistory(): Promise<BookingRecord[]> {
    const all = this.loadFromStorage();
    return [...all].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getBookingByCode(kode: string): Promise<BookingRecord | null> {
    const all = this.loadFromStorage();
    const found = all.find(
      (b) => b.kodeBooking.trim().toUpperCase() === kode.trim().toUpperCase()
    );
    return found || null;
  }

  async cancelBooking(id: string): Promise<boolean> {
    const all = this.loadFromStorage();
    let found = false;

    const updated = all.map((b) => {
      if (b.id === id || b.kodeBooking === id) {
        found = true;
        return { ...b, status: 'dibatalkan' as const };
      }
      return b;
    });

    if (found) {
      this.saveToStorage(updated);
      return true;
    }
    return false;
  }
}
