/**
 * @file src/features/booking/components/ScheduleStep.tsx
 * Langkah 1 Terpadu: Pemilihan Jenis Sesi, Format, Tanggal Kalender, dan Slot Jam.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo. Tanpa titik-titik berwarna.
 */

import React, { useEffect, useState } from 'react';
import { BOOKING_CONFIG } from '../../../data/booking.config';
import { bookingService } from '../services/bookingService';
import { generateSlots, isDateAvailable, formatDateString } from '../lib/slots';
import { Calendar } from './Calendar';
import { TimeSlots } from './TimeSlots';
import { Icon } from '../../../components/ui/Icon';
import type { FormatPertemuan, TimeSlot, BookingRecord } from '../types';

interface ScheduleStepProps {
  selectedJenisId: string;
  selectedFormat: FormatPertemuan;
  selectedDate: string;
  selectedJamMulai: string;
  selectedJamSelesai: string;
  onSelectJenis: (id: string) => void;
  onSelectFormat: (format: FormatPertemuan) => void;
  onSelectDate: (date: string) => void;
  onSelectSlot: (slot: TimeSlot) => void;
}

export const ScheduleStep: React.FC<ScheduleStepProps> = ({
  selectedJenisId,
  selectedFormat,
  selectedDate,
  selectedJamMulai,
  selectedJamSelesai,
  onSelectJenis,
  onSelectFormat,
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
        console.error('[ScheduleStep] Gagal memuat booked slots:', err);
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

  const isScheduleSelected = Boolean(selectedDate && selectedJamMulai && selectedJamSelesai);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Pemilihan Jenis Sesi (Chip Cepat) */}
      <div className="bg-[#074563] p-5 rounded-2xl border border-[#165A7E] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-[#165A7E]">
          <span className="text-xs font-mono font-bold uppercase text-[#B0EDF9] flex items-center gap-1.5">
            <Icon name="sparkles" size={15} />
            <span>1. Pilih Jenis Pertemuan</span>
          </span>
          <span className="text-[11px] font-mono text-[#78B9CA]">
            100% Gratis • Tanpa Biaya Tersembunyi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {BOOKING_CONFIG.jenisPertemuan.map((item) => {
            const isSelected = selectedJenisId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectJenis(item.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#B0EDF9] bg-[#04344C] ring-1 ring-[#B0EDF9] shadow-md scale-[1.01]'
                    : 'border-[#165A7E] bg-[#04344C]/60 hover:border-[#B0EDF9] hover:bg-[#0B567C]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-heading font-bold text-sm sm:text-base text-[#B0EDF9]">
                    {item.nama}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#04344C] border border-[#165A7E] text-[#B0EDF9] font-semibold">
                    {item.durasiMenit}m
                  </span>
                </div>
                <p className="text-xs text-[#78B9CA] leading-relaxed line-clamp-2">
                  {item.deskripsi}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Format Pertemuan (Online / Tatap Muka) */}
      <div className="bg-[#074563] p-5 rounded-2xl border border-[#165A7E] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-[#165A7E]">
          <span className="text-xs font-mono font-bold uppercase text-[#B0EDF9] flex items-center gap-1.5">
            <Icon name="video" size={15} />
            <span>2. Format Sesi Diskusi</span>
          </span>
          <span className="text-[11px] font-mono text-[#78B9CA]">
            Pilih cara kamu ingin berinteraksi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {BOOKING_CONFIG.formatPertemuan.map((item) => {
            const isSelected = selectedFormat === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectFormat(item.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3.5 ${
                  isSelected
                    ? 'border-[#B0EDF9] bg-[#04344C] ring-1 ring-[#B0EDF9] shadow-md scale-[1.01]'
                    : 'border-[#165A7E] bg-[#04344C]/60 hover:border-[#B0EDF9] hover:bg-[#0B567C]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#B0EDF9] text-[#04344C] font-bold shadow-sm' : 'bg-[#04344C] border border-[#165A7E] text-[#B0EDF9]'
                  }`}
                >
                  <Icon name={item.id === 'online' ? 'video' : 'map-pin'} size={20} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-heading font-bold text-sm sm:text-base text-[#B0EDF9]">
                    {item.nama}
                  </span>
                  <span className="text-xs text-[#78B9CA] truncate">
                    {item.deskripsi}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Kalender & Slot Waktu Berdampingan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Kalender (7 Kolom) */}
        <div className="lg:col-span-7 w-full">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={(newDate) => {
              onSelectDate(newDate);
            }}
          />
        </div>

        {/* Slot Waktu (5 Kolom) */}
        <div className="lg:col-span-5 w-full">
          <TimeSlots
            slots={slots}
            selectedSlotTime={selectedJamMulai}
            onSelectSlot={onSelectSlot}
            isLoading={isLoadingSlots}
          />
        </div>
      </div>

      {/* Ringkasan Real-Time Pilihan Waktu */}
      {isScheduleSelected && (
        <div className="p-4 rounded-2xl bg-[#074563] border border-[#B0EDF9] text-[#B0EDF9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#B0EDF9] text-[#04344C] flex items-center justify-center shrink-0 font-bold shadow-sm">
              <Icon name="check" size={18} strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-heading font-bold text-[#B0EDF9] block sm:inline mr-2 text-sm">
                Jadwal Terpilih:
              </span>
              <span className="text-[#B0EDF9] font-mono font-bold text-sm">
                {selectedDate} • {selectedJamMulai} - {selectedJamSelesai} {BOOKING_CONFIG.timezoneLabel}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-[#B0EDF9] bg-[#04344C] px-3 py-1 rounded-full border border-[#165A7E] shrink-0">
            {selectedFormat === 'online' ? 'Online Google Meet' : 'Studio NTB'} • {jenisConfig.durasiMenit}m
          </span>
        </div>
      )}
    </div>
  );
};
