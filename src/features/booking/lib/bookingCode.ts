/**
 * @file src/features/booking/lib/bookingCode.ts
 * Generator kode unik pemesanan jadwal dengan format VRM-YYYYMMDD-XXXX.
 */

import { format } from 'date-fns';

/**
 * Menghasilkan kode booking unik dengan format: VRM-YYYYMMDD-XXXX
 * Contoh: VRM-20261015-8K4F
 */
export function generateBookingCode(dateInput: Date = new Date()): string {
  const dateStr = format(dateInput, 'yyyyMMdd');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Menghindari karakter mirip seperti 0/O, 1/I
  let randomPart = '';
  
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomPart += chars[randomIndex];
  }

  return `VRM-${dateStr}-${randomPart}`;
}
