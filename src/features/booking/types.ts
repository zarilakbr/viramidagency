/**
 * @file src/features/booking/types.ts
 * Definisi tipe data untuk fitur sistem booking ViramidAgency.
 */

export type FormatPertemuan = 'online' | 'tatap-muka';
export type BookingStatus = 'menunggu' | 'dikonfirmasi' | 'dibatalkan';

export interface BookingFormData {
  jenisPertemuanId: string;
  format: FormatPertemuan;
  tanggal: string; // Format "YYYY-MM-DD"
  jamMulai: string; // Format "HH:mm"
  jamSelesai: string; // Format "HH:mm"
  nama: string;
  email: string;
  whatsapp: string;
  topik: string;
  linkReferensi?: string;
  meetingUrl?: string; // Tautan Google Meet / Zoom otomatis
}

export interface BookingRecord extends BookingFormData {
  id: string;
  kodeBooking: string; // Format "VRM-YYYYMMDD-XXXX"
  createdAt: string; // ISO 8601 string
  status: BookingStatus;
  durasiMenit: number;
  jenisPertemuanNama: string;
  meetingUrl?: string;
}

export interface TimeSlot {
  jamMulai: string; // "09:00"
  jamSelesai: string; // "09:30"
  available: boolean;
  alasanTidakTersedia?: string;
}

export interface BookingService {
  getBookedSlots(tanggal: string): Promise<BookingRecord[]>;
  createBooking(payload: BookingFormData): Promise<BookingRecord>;
  getBookingHistory(): Promise<BookingRecord[]>;
  getBookingByCode(kode: string): Promise<BookingRecord | null>;
  cancelBooking(id: string): Promise<boolean>;
}
