/**
 * @file src/features/booking/components/ReviewStep.tsx
 * Langkah 4: Ringkasan lengkap permohonan jadwal sebelum pengiriman akhir.
 */

import React from 'react';
import { BOOKING_CONFIG } from '../../../data/booking.config';
import { Icon } from '../../../components/ui/Icon';
import type { BookingFormData } from '../types';

interface ReviewStepProps {
  formData: BookingFormData;
  onEditSection: (step: number) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  onEditSection,
  isSubmitting,
  onSubmit,
}) => {
  const jenisConfig =
    BOOKING_CONFIG.jenisPertemuan.find((j) => j.id === formData.jenisPertemuanId) ||
    BOOKING_CONFIG.jenisPertemuan[0];

  const formatLabel =
    formData.format === 'online'
      ? 'Online (Google Meet)'
      : `Tatap Muka di Studio (${BOOKING_CONFIG.kontak.lokasiStudio})`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div>
        <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">
          Konfirmasi Permintaan Jadwal
        </h2>
        <p className="text-xs sm:text-sm text-muted font-normal mt-1">
          Periksa kembali seluruh detail pertemuanmu sebelum mengirimkan permintaan.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Bagian 1: Jenis & Format Pertemuan */}
        <div className="bg-surface p-5 rounded-xl border border-border flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="text-xs font-mono font-semibold uppercase text-cyan flex items-center gap-1.5">
              <Icon name="clock" size={14} />
              <span>Sesi &amp; Format Pertemuan</span>
            </span>
            <button
              type="button"
              onClick={() => onEditSection(1)}
              className="text-xs font-mono text-orange hover:underline flex items-center gap-1"
            >
              <span>Ubah</span>
              <Icon name="arrow-right" size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs text-muted block font-mono">Jenis Sesi:</span>
              <span className="font-heading font-bold text-foreground">
                {jenisConfig.nama} ({jenisConfig.durasiMenit} Menit)
              </span>
            </div>
            <div>
              <span className="text-xs text-muted block font-mono">Format:</span>
              <span className="font-medium text-foreground">{formatLabel}</span>
            </div>
          </div>
        </div>

        {/* Bagian 2: Tanggal & Waktu */}
        <div className="bg-surface p-5 rounded-xl border border-border flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="text-xs font-mono font-semibold uppercase text-cyan flex items-center gap-1.5">
              <Icon name="calendar" size={14} />
              <span>Jadwal Waktu</span>
            </span>
            <button
              type="button"
              onClick={() => onEditSection(2)}
              className="text-xs font-mono text-orange hover:underline flex items-center gap-1"
            >
              <span>Ubah</span>
              <Icon name="arrow-right" size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs text-muted block font-mono">Tanggal Pertemuan:</span>
              <span className="font-heading font-bold text-foreground">
                {formData.tanggal}
              </span>
            </div>
            <div>
              <span className="text-xs text-muted block font-mono">Waktu Sesi:</span>
              <span className="font-mono font-semibold text-orange">
                {formData.jamMulai} - {formData.jamSelesai} {BOOKING_CONFIG.timezoneLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Bagian 3: Data Pemesan & Topik */}
        <div className="bg-surface p-5 rounded-xl border border-border flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="text-xs font-mono font-semibold uppercase text-cyan flex items-center gap-1.5">
              <Icon name="user" size={14} />
              <span>Data Diri &amp; Topik</span>
            </span>
            <button
              type="button"
              onClick={() => onEditSection(3)}
              className="text-xs font-mono text-orange hover:underline flex items-center gap-1"
            >
              <span>Ubah</span>
              <Icon name="arrow-right" size={12} />
            </button>
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-xs text-muted block font-mono">Nama:</span>
                <span className="font-medium text-foreground">{formData.nama}</span>
              </div>
              <div>
                <span className="text-xs text-muted block font-mono">Email:</span>
                <span className="font-medium text-foreground break-all">{formData.email}</span>
              </div>
              <div>
                <span className="text-xs text-muted block font-mono">WhatsApp:</span>
                <span className="font-mono font-medium text-foreground">{formData.whatsapp}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border/40">
              <span className="text-xs text-muted block font-mono">Topik Diskusi:</span>
              <p className="text-xs sm:text-sm text-foreground bg-navy/60 p-3 rounded-lg border border-border/60 mt-1 leading-relaxed">
                "{formData.topik}"
              </p>
            </div>

            {formData.linkReferensi && (
              <div className="text-xs">
                <span className="text-muted font-mono">Referensi: </span>
                <a
                  href={formData.linkReferensi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:underline break-all"
                >
                  {formData.linkReferensi}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Catatan Transparansi / Status Jujur */}
        <div className="p-4 rounded-xl border border-border bg-surface/40 flex items-start gap-3 text-xs text-muted">
          <Icon name="alert-circle" size={18} className="text-cyan shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Permintaan jadwalmu akan diterima oleh tim ViramidAgency. Konfirmasi ketersediaan dan tautan video call akan dikirimkan melalui WhatsApp atau email resmi kami.
          </p>
        </div>

        {/* Tombol Eksekusi Submit */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSubmit}
            className="w-full py-4 px-6 rounded-xl bg-orange hover:bg-orange-hover text-navy font-heading font-bold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                <span>Memproses Permintaan Jadwal...</span>
              </>
            ) : (
              <>
                <span>Kirim Permintaan Jadwal</span>
                <Icon name="arrow-right" size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
