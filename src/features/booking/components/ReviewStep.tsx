/**
 * @file src/features/booking/components/ReviewStep.tsx
 * Langkah 4: Ringkasan lengkap permohonan jadwal sebelum pengiriman akhir.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
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
  errorMessage?: string | null;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  onEditSection,
  isSubmitting,
  onSubmit,
  errorMessage,
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
        <h2 className="font-heading font-bold text-xl md:text-2xl text-[#B0EDF9]">
          Konfirmasi Permintaan Jadwal
        </h2>
        <p className="text-xs sm:text-sm text-[#78B9CA] font-normal mt-1">
          Periksa kembali seluruh detail pertemuanmu sebelum mengirimkan permintaan.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Bagian 1: Jenis & Format Pertemuan */}
        <div className="bg-[#074563] p-5 sm:p-6 rounded-2xl border border-[#165A7E] flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#165A7E]">
            <span className="text-xs font-mono font-bold uppercase text-[#B0EDF9] flex items-center gap-1.5">
              <Icon name="clock" size={14} />
              <span>Sesi &amp; Format Pertemuan</span>
            </span>
            <button
              type="button"
              onClick={() => onEditSection(1)}
              className="text-xs font-mono text-[#B0EDF9] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ubah</span>
              <Icon name="arrow-right" size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs text-[#78B9CA] block font-mono">Jenis Sesi:</span>
              <span className="font-heading font-bold text-[#B0EDF9]">
                {jenisConfig.nama} ({jenisConfig.durasiMenit} Menit)
              </span>
            </div>
            <div>
              <span className="text-xs text-[#78B9CA] block font-mono">Format:</span>
              <span className="font-medium text-[#B0EDF9]">{formatLabel}</span>
            </div>
          </div>
        </div>

        {/* Bagian 2: Tanggal & Waktu */}
        <div className="bg-[#074563] p-5 sm:p-6 rounded-2xl border border-[#165A7E] flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#165A7E]">
            <span className="text-xs font-mono font-bold uppercase text-[#B0EDF9] flex items-center gap-1.5">
              <Icon name="calendar" size={14} />
              <span>Jadwal Waktu</span>
            </span>
            <button
              type="button"
              onClick={() => onEditSection(2)}
              className="text-xs font-mono text-[#B0EDF9] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ubah</span>
              <Icon name="arrow-right" size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs text-[#78B9CA] block font-mono">Tanggal Pertemuan:</span>
              <span className="font-heading font-bold text-[#B0EDF9]">
                {formData.tanggal}
              </span>
            </div>
            <div>
              <span className="text-xs text-[#78B9CA] block font-mono">Waktu Sesi:</span>
              <span className="font-mono font-semibold text-[#B0EDF9]">
                {formData.jamMulai} - {formData.jamSelesai} {BOOKING_CONFIG.timezoneLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Bagian 3: Data Pemesan & Topik */}
        <div className="bg-[#074563] p-5 sm:p-6 rounded-2xl border border-[#165A7E] flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#165A7E]">
            <span className="text-xs font-mono font-bold uppercase text-[#B0EDF9] flex items-center gap-1.5">
              <Icon name="user" size={14} />
              <span>Data Diri &amp; Topik</span>
            </span>
            <button
              type="button"
              onClick={() => onEditSection(3)}
              className="text-xs font-mono text-[#B0EDF9] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ubah</span>
              <Icon name="arrow-right" size={12} />
            </button>
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-xs text-[#78B9CA] block font-mono">Nama:</span>
                <span className="font-medium text-[#B0EDF9]">{formData.nama}</span>
              </div>
              <div>
                <span className="text-xs text-[#78B9CA] block font-mono">Email:</span>
                <span className="font-medium text-[#B0EDF9] break-all">{formData.email}</span>
              </div>
              <div>
                <span className="text-xs text-[#78B9CA] block font-mono">WhatsApp:</span>
                <span className="font-mono font-medium text-[#B0EDF9]">{formData.whatsapp}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#165A7E]">
              <span className="text-xs text-[#78B9CA] block font-mono">Topik Diskusi:</span>
              <p className="text-xs sm:text-sm text-[#B0EDF9] bg-[#04344C] p-3.5 rounded-xl border border-[#165A7E] mt-1 leading-relaxed">
                "{formData.topik}"
              </p>
            </div>

            {formData.linkReferensi && (
              <div className="text-xs">
                <span className="text-[#78B9CA] font-mono">Referensi: </span>
                <a
                  href={formData.linkReferensi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B0EDF9] hover:underline break-all"
                >
                  {formData.linkReferensi}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Catatan Transparansi */}
        <div className="p-4 rounded-xl border border-[#165A7E] bg-[#074563]/50 flex items-start gap-3 text-xs text-[#78B9CA]">
          <Icon name="alert-circle" size={18} className="text-[#B0EDF9] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Permintaan jadwalmu akan diterima oleh tim ViramidAgency. Konfirmasi ketersediaan dan tautan video call akan dikirimkan melalui WhatsApp atau email resmi kami.
          </p>
        </div>

        {/* Pesan Error Jika Terjadi Kendala */}
        {errorMessage && (
          <div
            role="alert"
            className="p-4 rounded-xl border border-[#B0EDF9] bg-[#04344C] text-[#B0EDF9] flex items-start gap-3 text-xs sm:text-sm"
          >
            <Icon name="alert-circle" size={18} className="text-[#B0EDF9] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-[#B0EDF9]">Kendala Pengiriman:</span>
              <span className="text-[#78B9CA] leading-relaxed">{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Tombol Eksekusi Submit */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSubmit}
            className="w-full h-12 px-6 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-[0.99]"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-[#04344C] border-t-transparent rounded-full animate-spin" />
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
