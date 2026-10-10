/**
 * @file src/features/booking/components/ScheduleStep.tsx
 * Langkah 1 Terpadu: Pemilihan Jenis Sesi, Format, Tanggal Kalender, dan Slot Jam.
 * Didesain ringkas, responsif, dan langsung terintegrasi tanpa lompatan langkah berlebih.
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
      <div className="bg-surface p-4 sm:p-5 rounded-2xl border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-bold uppercase text-orange flex items-center gap-1.5">
            <Icon name="sparkles" size={14} />
            <span>1. Pilih Jenis Pertemuan</span>
          </span>
          <span className="text-[11px] font-mono text-muted">
            100% Gratis • Tanpa Biaya Tersembunyi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {BOOKING_CONFIG.jenisPertemuan.map((item) => {
            const isSelected = selectedJenisId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectJenis(item.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-orange bg-orange/10 ring-1 ring-orange shadow-sm'
                    : 'border-border bg-navy-900/60 hover:border-orange/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`font-heading font-bold text-sm ${isSelected ? 'text-orange' : 'text-cream'}`}>
                    {item.nama}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted">
                    {item.durasiMenit} Menit
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {item.deskripsi}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Format Pertemuan (Online / Tatap Muka) */}
      <div className="bg-surface p-4 sm:p-5 rounded-2xl border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-bold uppercase text-orange flex items-center gap-1.5">
            <Icon name="video" size={14} />
            <span>2. Format Sesi Diskusi</span>
          </span>
          <span className="text-[11px] font-mono text-muted">
            Pilih cara kamu ingin berinteraksi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BOOKING_CONFIG.formatPertemuan.map((item) => {
            const isSelected = selectedFormat === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectFormat(item.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'border-orange bg-orange/10 ring-1 ring-orange shadow-sm'
                    : 'border-border bg-navy-900/60 hover:border-orange/50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-orange text-navy-900 font-bold' : 'bg-surface border border-border text-muted'
                  }`}
                >
                  <Icon name={item.id === 'online' ? 'video' : 'map-pin'} size={18} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className={`font-heading font-bold text-sm ${isSelected ? 'text-orange' : 'text-cream'}`}>
                    {item.nama}
                  </span>
                  <span className="text-xs text-muted truncate">
                    {item.deskripsi}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Kalender & Slot Waktu Berdampingan */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-orange flex items-center gap-1.5">
            <Icon name="calendar" size={14} />
            <span>3. Tentukan Tanggal &amp; Waktu</span>
          </span>
          <span className="text-[11px] font-mono text-muted">
            Zona Waktu: {BOOKING_CONFIG.timezoneLabel}
          </span>
        </div>

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
      </div>

      {/* Ringkasan Real-Time Pilihan Waktu */}
      {isScheduleSelected && (
        <div className="p-4 rounded-xl bg-orange/10 border border-orange/40 text-cream flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-orange text-navy-900 flex items-center justify-center shrink-0 font-bold">
              <Icon name="check" size={16} strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-heading font-bold text-cream block sm:inline mr-2">
                Jadwal Terpilih:
              </span>
              <span className="text-orange font-mono font-semibold">
                {selectedDate} • {selectedJamMulai} - {selectedJamSelesai} {BOOKING_CONFIG.timezoneLabel}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-muted shrink-0">
            {selectedFormat === 'online' ? 'Google Meet' : 'Studio'} • {jenisConfig.durasiMenit}m
          </span>
        </div>
      )}
    </div>
  );
};
