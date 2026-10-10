/**
 * @file src/features/booking/components/DateTimeStep.tsx
 * Langkah 2: Pemilihan Tanggal (Kalender Kiri/Atas) dan Jam Pertemuan (Slot Kanan/Bawah).
 */

import React, { useEffect, useState } from 'react';
import { BOOKING_CONFIG } from '../../../data/booking.config';
import { bookingService } from '../services/bookingService';
import { generateSlots, isDateAvailable, formatDateString } from '../lib/slots';
import { Calendar } from './Calendar';
import { TimeSlots } from './TimeSlots';
import type { TimeSlot, BookingRecord } from '../types';

interface DateTimeStepProps {
  selectedJenisId: string;
  selectedDate: string; // "YYYY-MM-DD"
  selectedJamMulai: string; // "HH:mm"
  onSelectDate: (date: string) => void;
  onSelectSlot: (slot: TimeSlot) => void;
}

export const DateTimeStep: React.FC<DateTimeStepProps> = ({
  selectedJenisId,
  selectedDate,
  selectedJamMulai,
  onSelectDate,
  onSelectSlot,
}) => {
  const [bookedSlots, setBookedSlots] = useState<BookingRecord[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  const jenisConfig =
    BOOKING_CONFIG.jenisPertemuan.find((j) => j.id === selectedJenisId) ||
    BOOKING_CONFIG.jenisPertemuan[0];

  // Cari tanggal awal yang valid jika belum ada tanggal terpilih
  useEffect(() => {
    if (!selectedDate) {
      const now = new Date();
      // Periksa 30 hari ke depan untuk mencari tanggal pertama yang buka
      for (let i = 0; i < 30; i++) {
        const candidate = new Date(now);
        candidate.setDate(now.getDate() + i);
        if (isDateAvailable(candidate, BOOKING_CONFIG, now)) {
          onSelectDate(formatDateString(candidate));
          break;
        }
      }
    }
  }, [selectedDate, onSelectDate]);

  // Muat data booking yang sudah ada dari bookingService setiap kali tanggal berubah
  useEffect(() => {
    let isMounted = true;

    async function fetchBookings() {
      if (!selectedDate) return;
      setIsLoadingSlots(true);
      try {
        const records = await bookingService.getBookedSlots(selectedDate);
        if (isMounted) {
          setBookedSlots(records);
        }
      } catch (err) {
        console.error('[DateTimeStep] Gagal memuat booked slots:', err);
      } finally {
        if (isMounted) {
          setIsLoadingSlots(false);
        }
      }
    }

    fetchBookings();

    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  // Hitung daftar slot waktu yang valid berdasarkan tanggal, jenis, dan booking yang sudah terisi
  const slots: TimeSlot[] = selectedDate
    ? generateSlots(selectedDate, jenisConfig, bookedSlots, BOOKING_CONFIG, new Date())
    : [];

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">
          Pilih Tanggal &amp; Jam
        </h2>
        <p className="text-xs sm:text-sm text-muted font-normal mt-1">
          Durasi sesi untuk <strong className="text-orange font-medium">{jenisConfig.nama}</strong> adalah{' '}
          <span className="font-mono text-foreground font-semibold">{jenisConfig.durasiMenit} menit</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kalender Bulanan (Kiri / Atas) */}
        <div className="lg:col-span-7 w-full">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={(newDate) => {
              onSelectDate(newDate);
            }}
          />
        </div>

        {/* Daftar Slot Jam (Kanan / Bawah) */}
        <div className="lg:col-span-5 w-full">
          <TimeSlots
            slots={slots}
            selectedSlotTime={selectedJamMulai}
            onSelectSlot={onSelectSlot}
            isLoading={isLoadingSlots}
          />
        </div>
      </div>
    </div>
  );
};
