/**
 * @file src/features/booking/components/DetailsStep.tsx
 * Langkah 3: Pengisian data diri kontak dan topik pembahasan diskusi.
 * Standar: Palet Oranye + Navy baku tanpa warna cyan.
 */

import React from 'react';
import { Field } from './Field';

export interface DetailsFormErrors {
  nama?: string;
  email?: string;
  whatsapp?: string;
  topik?: string;
  linkReferensi?: string;
}

interface DetailsStepProps {
  nama: string;
  email: string;
  whatsapp: string;
  topik: string;
  linkReferensi: string;
  errors: DetailsFormErrors;
  onChange: (field: string, value: string) => void;
}

export const DetailsStep: React.FC<DetailsStepProps> = ({
  nama,
  email,
  whatsapp,
  topik,
  linkReferensi,
  errors,
  onChange,
}) => {
  const topikLength = topik.trim().length;
  const isTopikValid = topikLength >= 20;

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div>
        <h2 className="font-heading font-bold text-xl md:text-2xl text-cream">
          Informasi Kontak &amp; Proyek
        </h2>
        <p className="text-xs sm:text-sm text-muted font-normal mt-1">
          Lengkapi data kontak agar tim ViramidAgency dapat mengonfirmasi jadwal pertemuanmu.
        </p>
      </div>

      <div className="flex flex-col gap-4 bg-surface p-5 sm:p-6 rounded-2xl border border-border">
        {/* Nama Lengkap */}
        <Field
          id="booking-nama"
          label="Nama Lengkap / Nama Bisnis"
          placeholder="Contoh: Budi Pratama (PT Sinergi Kreatif)"
          value={nama}
          onChange={(e) => onChange('nama', e.target.value)}
          error={errors.nama}
          required
        />

        {/* Email & WhatsApp Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            id="booking-email"
            type="email"
            label="Alamat Email"
            placeholder="nama@perusahaan.com"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            error={errors.email}
            hint="Untuk pengiriman undangan kalender"
            required
          />

          <Field
            id="booking-whatsapp"
            type="tel"
            label="Nomor WhatsApp"
            placeholder="081234567890"
            value={whatsapp}
            onChange={(e) => onChange('whatsapp', e.target.value)}
            error={errors.whatsapp}
            hint="Untuk konfirmasi cepat jadwal sesi"
            required
          />
        </div>

        {/* Topik Diskusi */}
        <div className="flex flex-col gap-1">
          <Field
            id="booking-topik"
            as="textarea"
            rows={4}
            label="Topik Singkat Diskusi"
            placeholder="Ceritakan gambaran singkat kebutuhanmu, target bisnis, atau kendala yang ingin dipecahkan (minimal 20 karakter)..."
            value={topik}
            onChange={(e) => onChange('topik', e.target.value)}
            error={errors.topik}
            required
          />
          <div className="flex items-center justify-between text-[11px] font-mono px-1">
            <span className={isTopikValid ? 'text-orange font-medium' : 'text-muted'}>
              Minimal 20 karakter
            </span>
            <span
              className={
                isTopikValid
                  ? 'text-orange font-semibold'
                  : topikLength > 0
                  ? 'text-orange-400 font-semibold'
                  : 'text-muted'
              }
            >
              {topikLength} / 20 karakter
            </span>
          </div>
        </div>

        {/* Link Referensi / Website Lama (Opsional) */}
        <Field
          id="booking-link"
          type="url"
          label="Link Referensi / Website Lama (Opsional)"
          placeholder="https://contohwebsite.com atau link Figma/dokumen"
          value={linkReferensi}
          onChange={(e) => onChange('linkReferensi', e.target.value)}
          error={errors.linkReferensi}
          hint="Membantu kami mempelajari konteks sebelum sesi"
        />
      </div>
    </div>
  );
};
