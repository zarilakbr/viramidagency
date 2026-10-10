/**
 * @file src/features/booking/components/TimeSlots.tsx
 * Komponen pemilih slot jam pertemuan dalam format chip pill 2 kolom dengan penanda WITA.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React from 'react';
import { BOOKING_CONFIG } from '../../../data/booking.config';
import { Icon } from '../../../components/ui/Icon';
import type { TimeSlot } from '../types';

interface TimeSlotsProps {
  slots: TimeSlot[];
  selectedSlotTime: string; // "HH:mm" (jamMulai)
  onSelectSlot: (slot: TimeSlot) => void;
  isLoading?: boolean;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  slots,
  selectedSlotTime,
  onSelectSlot,
  isLoading = false,
}) => {
  const hasAvailableSlot = slots.some((s) => s.available);

  return (
    <div className="w-full bg-[#074563] p-4 sm:p-5 rounded-2xl border border-[#165A7E] flex flex-col justify-between shadow-sm min-h-[380px]">
      <div>
        {/* Header Zona Waktu & Informasi */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#165A7E]">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base text-[#B0EDF9]">
              Pilih Jam Pertemuan
            </span>
            <span className="text-[11px] font-mono text-[#78B9CA]">
              Durasi slot disesuaikan otomatis
            </span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#04344C] border border-[#165A7E] text-xs font-mono text-[#B0EDF9]"
            title={`Zona Waktu: ${BOOKING_CONFIG.timezone}`}
          >
            <Icon name="globe" size={13} />
            <span>{BOOKING_CONFIG.timezoneLabel}</span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-14 flex flex-col items-center justify-center text-[#78B9CA] gap-2">
            <span className="w-6 h-6 border-2 border-[#B0EDF9] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Memeriksa ketersediaan jadwal...</span>
          </div>
        )}

        {/* Empty State jika tidak ada slot */}
        {!isLoading && (!slots.length || !hasAvailableSlot) && (
          <div className="py-12 px-4 text-center flex flex-col items-center justify-center border border-dashed border-[#165A7E] rounded-xl bg-[#04344C]/60">
            <div className="w-10 h-10 rounded-xl bg-[#074563] border border-[#165A7E] flex items-center justify-center text-[#B0EDF9] mb-3">
              <Icon name="clock" size={20} />
            </div>
            <p className="font-heading font-semibold text-sm text-[#B0EDF9] mb-1">
              Tidak Ada Jam Tersedia
            </p>
            <p className="text-xs text-[#78B9CA] max-w-[28ch] leading-relaxed">
              Tidak ada jam tersisa di tanggal ini. Silakan pilih tanggal lain pada kalender.
            </p>
          </div>
        )}

        {/* Grid Chip Pill 2 Kolom */}
        {!isLoading && slots.length > 0 && hasAvailableSlot && (
          <div
            role="radiogroup"
            aria-label="Pilihan Jam Pertemuan"
            className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1"
          >
            {slots.map((slot) => {
              const isSelected = selectedSlotTime === slot.jamMulai;
              const isAvailable = slot.available;

              return (
                <button
                  key={`${slot.jamMulai}-${slot.jamSelesai}`}
                  type="button"
                  disabled={!isAvailable}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${slot.jamMulai} sampai ${slot.jamSelesai} WITA${
                    !isAvailable ? ` (${slot.alasanTidakTersedia || 'Tidak tersedia'})` : ''
                  }`}
                  onClick={() => isAvailable && onSelectSlot(slot)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-mono transition-all duration-150 flex items-center justify-between ${
                    !isAvailable
                      ? 'border-transparent bg-[#04344C]/30 text-[#78B9CA]/30 line-through cursor-not-allowed'
                      : isSelected
                      ? 'border-[#B0EDF9] bg-[#B0EDF9] text-[#04344C] font-bold shadow-md ring-1 ring-[#B0EDF9] scale-[1.02]'
                      : 'border-[#165A7E] bg-[#04344C] text-[#B0EDF9] hover:border-[#B0EDF9] hover:bg-[#0B567C] cursor-pointer'
                  }`}
                  title={
                    !isAvailable
                      ? slot.alasanTidakTersedia || 'Waktu tidak tersedia'
                      : `${slot.jamMulai} - ${slot.jamSelesai} WITA`
                  }
                >
                  <span className="font-semibold">{slot.jamMulai}</span>
                  <span className={isSelected ? 'text-[#04344C]/80 text-[10px] font-bold' : 'text-[#78B9CA] text-[10px]'}>
                    {slot.jamSelesai}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Catatan Jeda Buffer */}
      <div className="mt-4 pt-3 border-t border-[#165A7E] flex items-center gap-2 text-[11px] font-mono text-[#78B9CA]">
        <Icon name="clock" size={13} className="text-[#B0EDF9] shrink-0" />
        <span>Jeda {BOOKING_CONFIG.bufferAntarSesi} menit antar sesi diterapkan otomatis.</span>
      </div>
    </div>
  );
};
