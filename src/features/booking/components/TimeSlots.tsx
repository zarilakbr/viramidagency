/**
 * @file src/features/booking/components/TimeSlots.tsx
 * Komponen pemilih slot jam pertemuan dalam format chip pill 2 kolom dengan penanda WITA.
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
    <div className="w-full bg-surface p-4 sm:p-5 rounded-xl border border-border flex flex-col justify-between">
      <div>
        {/* Header Zona Waktu & Informasi */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base text-foreground">
              Pilih Jam Pertemuan
            </span>
            <span className="text-[11px] font-mono text-muted">
              Durasi slot telah disesuaikan
            </span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy border border-border text-xs font-mono text-cyan"
            title={`Zona Waktu: ${BOOKING_CONFIG.timezone}`}
          >
            <Icon name="globe" size={13} />
            <span>{BOOKING_CONFIG.timezoneLabel}</span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 flex flex-col items-center justify-center text-muted gap-2">
            <span className="w-5 h-5 border-2 border-orange border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Memeriksa ketersediaan jadwal...</span>
          </div>
        )}

        {/* Empty State jika tidak ada slot */}
        {!isLoading && (!slots.length || !hasAvailableSlot) && (
          <div className="py-10 px-4 text-center flex flex-col items-center justify-center border border-dashed border-border rounded-lg bg-surface/40">
            <div className="w-10 h-10 rounded-full bg-navy border border-border flex items-center justify-center text-orange mb-3">
              <Icon name="clock" size={20} />
            </div>
            <p className="font-heading font-semibold text-sm text-foreground mb-1">
              Tidak Ada Jam Tersedia
            </p>
            <p className="text-xs text-muted max-w-[28ch] leading-relaxed">
              Tidak ada jam tersedia di tanggal ini. Coba pilih tanggal lain pada kalender.
            </p>
          </div>
        )}

        {/* Grid Chip Pill 2 Kolom */}
        {!isLoading && slots.length > 0 && hasAvailableSlot && (
          <div
            role="radiogroup"
            aria-label="Pilihan Jam Pertemuan"
            className="grid grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1"
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
                  className={`py-2.5 px-3 rounded-lg border text-xs font-mono transition-all duration-150 flex items-center justify-between ${
                    !isAvailable
                      ? 'border-border/40 bg-surface/30 text-muted/40 line-through cursor-not-allowed'
                      : isSelected
                      ? 'border-orange bg-orange text-navy font-bold shadow-sm ring-1 ring-orange'
                      : 'border-border bg-surface text-foreground hover:border-orange hover:bg-orange/10 cursor-pointer'
                  }`}
                  title={
                    !isAvailable
                      ? slot.alasanTidakTersedia || 'Waktu tidak tersedia'
                      : `${slot.jamMulai} - ${slot.jamSelesai} WITA`
                  }
                >
                  <span className="font-semibold">{slot.jamMulai}</span>
                  <span className={isSelected ? 'text-navy/80 text-[10px]' : 'text-muted text-[10px]'}>
                    {slot.jamSelesai}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Catatan Jeda Buffer & Kebijakan */}
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2 text-[11px] font-mono text-muted">
        <Icon name="clock" size={13} className="text-cyan shrink-0" />
        <span>Jeda {BOOKING_CONFIG.bufferAntarSesi} menit antar sesi diterapkan otomatis.</span>
      </div>
    </div>
  );
};
