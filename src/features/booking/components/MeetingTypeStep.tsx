/**
 * @file src/features/booking/components/MeetingTypeStep.tsx
 * Langkah 1: Pemilihan jenis pertemuan dan format pertemuan (Online / Tatap Muka).
 * Standar: Palet Oranye + Navy baku tanpa warna cyan/ungu.
 */

import React from 'react';
import { BOOKING_CONFIG } from '../../../data/booking.config';
import { Icon } from '../../../components/ui/Icon';
import type { FormatPertemuan } from '../types';

interface MeetingTypeStepProps {
  selectedJenisId: string;
  selectedFormat: FormatPertemuan;
  onSelectJenis: (id: string) => void;
  onSelectFormat: (format: FormatPertemuan) => void;
}

export const MeetingTypeStep: React.FC<MeetingTypeStepProps> = ({
  selectedJenisId,
  selectedFormat,
  onSelectJenis,
  onSelectFormat,
}) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 1. Pemilihan Jenis Pertemuan */}
      <div>
        <div className="mb-4">
          <h2 className="font-heading font-bold text-xl md:text-2xl text-cream">
            Pilih Jenis Pertemuan
          </h2>
          <p className="text-xs sm:text-sm text-muted font-normal mt-1">
            Pilih sesi yang paling sesuai dengan kebutuhan bisnis atau proyekmu saat ini.
          </p>
        </div>

        <div
          role="radiogroup"
          aria-label="Daftar Jenis Pertemuan"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {BOOKING_CONFIG.jenisPertemuan.map((item) => {
            const isSelected = selectedJenisId === item.id;

            return (
              <div
                key={item.id}
                role="radio"
                tabIndex={0}
                aria-checked={isSelected}
                onClick={() => onSelectJenis(item.id)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onSelectJenis(item.id);
                  }
                }}
                className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-orange bg-orange/10 ring-1 ring-orange shadow-sm'
                    : 'border-border bg-surface hover:border-orange/60'
                }`}
              >
                <div>
                  {/* Header Kartu: Durasi & Radio Indicator */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-navy-900 border border-border text-orange">
                      <Icon name="clock" size={13} />
                      <span>{item.durasiMenit} Menit</span>
                    </span>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-orange bg-orange text-navy-900'
                          : 'border-border bg-surface/80 group-hover:border-muted'
                      }`}
                    >
                      {isSelected && <Icon name="check" size={12} strokeWidth={2.5} />}
                    </div>
                  </div>

                  {/* Judul & Deskripsi */}
                  <h3
                    className={`font-heading font-bold text-base md:text-lg mb-2 ${
                      isSelected ? 'text-orange' : 'text-cream'
                    }`}
                  >
                    {item.nama}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-[1.6]">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted">
                  <span>Biaya Sesi</span>
                  <span className="font-semibold text-cream">
                    {item.durasiMenit === 30 ? 'Gratis (Rp 0)' : 'Disesuaikan'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Pemilihan Format Pertemuan */}
      <div className="pt-6 border-t border-border">
        <div className="mb-4">
          <h2 className="font-heading font-bold text-lg md:text-xl text-cream">
            Format Pertemuan
          </h2>
          <p className="text-xs sm:text-sm text-muted font-normal mt-1">
            Pilih metode pertemuan yang paling nyaman untukmu.
          </p>
        </div>

        <div
          role="radiogroup"
          aria-label="Format Pertemuan"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {BOOKING_CONFIG.formatPertemuan.map((fmt) => {
            const isSelected = selectedFormat === fmt.id;
            const isOnline = fmt.id === 'online';

            return (
              <div
                key={fmt.id}
                role="radio"
                tabIndex={0}
                aria-checked={isSelected}
                onClick={() => onSelectFormat(fmt.id as FormatPertemuan)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onSelectFormat(fmt.id as FormatPertemuan);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                  isSelected
                    ? 'border-orange bg-orange/10 ring-1 ring-orange'
                    : 'border-border bg-surface hover:border-orange/60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-orange text-navy-900'
                      : 'bg-navy-900 border border-border text-orange'
                  }`}
                >
                  <Icon name={isOnline ? 'video' : 'map-pin'} size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`font-heading font-bold text-sm md:text-base ${
                        isSelected ? 'text-orange' : 'text-cream'
                      }`}
                    >
                      {fmt.nama}
                    </h3>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'border-orange bg-orange text-navy-900' : 'border-border'
                      }`}
                    >
                      {isSelected && <Icon name="check" size={10} strokeWidth={2.5} />}
                    </div>
                  </div>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    {fmt.deskripsi}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
