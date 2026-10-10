/**
 * @file src/features/booking/services/bookingService.ts
 * Interface dan entry point singleton untuk lapisan layanan booking.
 * Semua komponen hanya mengimpor `bookingService`, sehingga backend bisa diganti sewaktu-waktu.
 */

import type { BookingService } from '../types';
import { LocalBookingService } from './localBookingService';

// Instance layanan booking aktif (saat ini menggunakan LocalBookingService)
export const bookingService: BookingService = new LocalBookingService();

export type { BookingService };
