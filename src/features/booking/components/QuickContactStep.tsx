/**
 * @file src/features/booking/components/QuickContactStep.tsx
 * Langkah 2 Terpadu: Pengisian Data Kontak Cepat, Pilihan Kebutuhan Proyek Instan,
 * dan Konfirmasi Jadwal dalam 1 Tampilan Tanpa Ribet.
 */

import React, { useState } from 'react';
import { BOOKING_CONFIG } from '../../../data/booking.config';
import { Field } from './Field';
import { Icon } from '../../../components/ui/Icon';
import type { BookingFormData } from '../types';

export interface ContactFormErrors {
  nama?: string;
  whatsapp?: string;
  email?: string;
  topik?: string;
}

interface QuickContactStepProps {
  formData: BookingFormData;
  onChange: (field: keyof BookingFormData, value: string) => void;
  onEditSchedule: () => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  errors: ContactFormErrors;
  errorMessage?: string | null;
}

const QUICK_PROJECT_TAGS = [
  'Website Bisnis / Company Profile',
  'Web App / Toko Online (E-Commerce)',
  'Redesain UI/UX & Tampilan Web',
  'Branding, Logo & Identitas Visual',
  'Konsultasi Teknis & Strategi Digital',
];

export const QuickContactStep: React.FC<QuickContactStepProps> = ({
  formData,
  onChange,
  onEditSchedule,
  isSubmitting,
  onSubmit,
  errors,
  errorMessage,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('');

  const jenisConfig =
    BOOKING_CONFIG.jenisPertemuan.find((j) => j.id === formData.jenisPertemuanId) ||
    BOOKING_CONFIG.jenisPertemuan[0];

  const formatLabel =
    formData.format === 'online'
      ? 'Online (Google Meet)'
      : `Tatap Muka di Studio (${BOOKING_CONFIG.kontak.lokasiStudio})`;

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    if (!formData.topik || formData.topik === selectedTag) {
      onChange('topik', tag);
    } else if (!formData.topik.includes(tag)) {
      onChange('topik', `${tag}. ${formData.topik}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Kartu Ringkasan Jadwal Terpilih (Dapat Diedit dengan 1 Klik) */}
      <div className="bg-surface p-5 sm:p-6 rounded-2xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-orange/15 border border-orange/40 text-orange flex items-center justify-center shrink-0">
            <Icon name="calendar" size={24} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-heading font-bold text-base sm:text-lg text-cream">
                {jenisConfig.nama} ({jenisConfig.durasiMenit} Menit)
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-orange/15 border border-orange/40 text-orange">
                {formatLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-orange font-semibold">
              {formData.tanggal} • {formData.jamMulai} - {formData.jamSelesai} {BOOKING_CONFIG.timezoneLabel}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onEditSchedule}
          className="self-start md:self-center py-2 px-4 rounded-lg border border-border bg-navy-900 hover:border-orange text-cream hover:text-orange text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Icon name="clock" size={13} />
          <span>Ubah Jadwal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri (7 Kolom): Form Kontak Singkat */}
        <div className="lg:col-span-7 flex flex-col gap-5 bg-surface p-5 sm:p-6 rounded-2xl border border-border">
          <div>
            <h2 className="font-heading font-bold text-lg text-cream">
              Data Kontak &amp; Kebutuhan
            </h2>
            <p className="text-xs text-muted font-normal mt-0.5">
              Cukup isi data dasar di bawah ini untuk mengonfirmasi jadwalmu.
            </p>
          </div>

          {/* Nama Lengkap */}
          <Field
            id="quick-nama"
            label="Nama Lengkap / Nama Bisnis"
            placeholder="Contoh: Pratama (PT Maju Bersama)"
            value={formData.nama}
            onChange={(e) => onChange('nama', e.target.value)}
            error={errors.nama}
            required
          />

          {/* WhatsApp & Email Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id="quick-whatsapp"
              type="tel"
              label="Nomor WhatsApp"
              placeholder="081234567890"
              value={formData.whatsapp}
              onChange={(e) => onChange('whatsapp', e.target.value)}
              error={errors.whatsapp}
              hint="Untuk link Google Meet & info sesi"
              required
            />

            <Field
              id="quick-email"
              type="email"
              label="Alamat Email (Opsional)"
              placeholder="email@perusahaan.com"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              error={errors.email}
              hint="Untuk pengiriman Google Calendar"
            />
          </div>

          {/* Pilihan Tag Cepat Kebutuhan Proyek */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono font-medium text-cream tracking-wide">
              Kebutuhan Utama (Klik untuk memilih cepat)
            </label>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROJECT_TAGS.map((tag) => {
                const isTagActive = selectedTag === tag || formData.topik.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`py-1.5 px-3 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer text-left ${
                      isTagActive
                        ? 'bg-orange text-navy-900 font-bold border border-orange shadow-sm'
                        : 'bg-navy-900 text-muted hover:text-cream border border-border hover:border-orange/60'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topik / Catatan Singkat */}
          <Field
            id="quick-topik"
            as="textarea"
            rows={3}
            label="Catatan / Topik Tambahan"
            placeholder="Tuliskan kendala saat ini, target yang ingin dicapai, atau biarkan ringkasan di atas..."
            value={formData.topik}
            onChange={(e) => onChange('topik', e.target.value)}
            error={errors.topik}
            hint="Bantu kami memahami konteks sebelum berdiskusi"
          />

          {/* Link Referensi (Opsional) */}
          <Field
            id="quick-link"
            type="url"
            label="Link Website Saat Ini / Referensi (Opsional)"
            placeholder="https://contohwebsite.com atau link Figma"
            value={formData.linkReferensi || ''}
            onChange={(e) => onChange('linkReferensi', e.target.value)}
          />
        </div>

        {/* Kolom Kanan (5 Kolom): Metrik Terukur & Tombol Eksekusi Langsung */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-surface p-5 rounded-2xl border border-border flex flex-col gap-4">
            <span className="text-xs font-mono font-bold uppercase text-orange flex items-center gap-1.5">
              <Icon name="shield-check" size={14} />
              <span>Jaminan &amp; Standar Layanan</span>
            </span>

            <ul className="flex flex-col gap-3 text-xs text-muted">
              <li className="flex items-start gap-2.5">
                <Icon name="clock" size={16} className="text-orange shrink-0 mt-0.5" />
                <span>
                  <strong className="text-cream block font-medium">Respon Kilat &lt; 2 Jam</strong>
                  Tim kami akan membalas via WhatsApp untuk konfirmasi ketersediaan.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="check-circle" size={16} className="text-orange shrink-0 mt-0.5" />
                <span>
                  <strong className="text-cream block font-medium">100% Gratis &amp; Transparan</strong>
                  Tidak ada biaya tersembunyi atau kewajiban memesan proyek.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon name="users" size={16} className="text-orange shrink-0 mt-0.5" />
                <span>
                  <strong className="text-cream block font-medium">Diskusi Langsung dengan Tim Inti</strong>
                  Bukan sales umum, kamu langsung berbicara dengan desainer &amp; engineer.
                </span>
              </li>
            </ul>

            {/* Pesan Error Jika Terjadi Kendala */}
            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 rounded-xl border border-error/40 bg-error/10 text-cream flex items-start gap-2.5 text-xs animate-shake"
              >
                <Icon name="alert-circle" size={16} className="text-error shrink-0 mt-0.5" />
                <span className="text-error leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {/* Tombol Utama Konfirmasi */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onSubmit}
              className="w-full h-12 px-6 rounded-full bg-orange hover:bg-orange-hover text-navy-900 font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md active:scale-[0.98] mt-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                  <span>Mengonfirmasi Jadwal...</span>
                </>
              ) : (
                <>
                  <span>Konfirmasi &amp; Jadwalkan Sesi</span>
                  <Icon name="arrow-right" size={18} />
                </>
              )}
            </button>

            <p className="text-[11px] font-mono text-center text-muted">
              Data terlindungi &amp; tersimpan aman di perangkatmu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
