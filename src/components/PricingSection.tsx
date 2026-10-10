/**
 * @file src/components/PricingSection.tsx
 * Seksi Paket Layanan ViramidAgency dengan perbandingan fitur transparan.
 * Ritme: navy-900, paket tengah berisi ORANYE solid dengan teks navy-900 dan badge "Paling dipilih".
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PAKET_LAYANAN } from '../data/content';
import { SectionHeading } from './SectionHeading';
import { Container } from './ui/Container';
import { Icon } from './ui/Icon';

export const PricingSection: React.FC = () => {
  return (
    <section id="paket" className="relative my-[72px] sm:my-[120px] scroll-mt-20">
      <Container>
        {/* Section Heading */}
        <SectionHeading
          number="04"
          eyebrowText="INVESTASI & CAKUPAN"
          title="Paket Layanan & Investasi"
          subtitle="Pilihan paket pengerjaan transparan yang dirancang fleksibel untuk kebutuhan skala bisnis dan peluncuran produkmu."
        />

        {/* Grid 3 Kartu Paket */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PAKET_LAYANAN.map((paket) => {
            const isHighlighted = paket.isPopular;

            return (
              <div
                key={paket.id}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? 'border-2 border-orange bg-orange text-navy-900 shadow-xl lg:-translate-y-2'
                    : 'border border-border bg-surface text-cream hover:border-orange/60'
                }`}
              >
                <div>
                  {/* Badge Terpopuler / Paling Dipilih */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                        isHighlighted ? 'text-navy-900/80 font-bold' : 'text-orange'
                      }`}
                    >
                      {paket.estimasiWaktu}
                    </span>

                    {isHighlighted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-navy-900 text-orange uppercase tracking-wider shadow-sm">
                        <Icon name="sparkles" size={12} />
                        <span>Paling dipilih</span>
                      </span>
                    ) : paket.badge ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-navy-800 border border-border text-cream uppercase tracking-wider">
                        <span>{paket.badge}</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Nama Paket & Deskripsi */}
                  <h3
                    className={`font-heading font-bold text-xl sm:text-2xl mb-2 ${
                      isHighlighted ? 'text-navy-900' : 'text-cream'
                    }`}
                  >
                    {paket.nama}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isHighlighted ? 'text-navy-900/80' : 'text-muted'
                    }`}
                  >
                    {paket.deskripsi}
                  </p>

                  {/* Harga */}
                  <div
                    className={`mb-6 pb-6 border-b ${
                      isHighlighted ? 'border-navy-900/20' : 'border-border/80'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono block mb-1 ${
                        isHighlighted ? 'text-navy-900/70 font-semibold' : 'text-muted'
                      }`}
                    >
                      Estimasi Investasi
                    </span>
                    <div
                      className={`font-heading font-bold text-2xl sm:text-3xl ${
                        isHighlighted ? 'text-navy-900' : 'text-cream'
                      }`}
                    >
                      {paket.harga}
                    </div>
                  </div>

                  {/* Daftar Fitur Terbuka */}
                  <div className="flex flex-col gap-3 mb-8">
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wide ${
                        isHighlighted ? 'text-navy-900' : 'text-cream'
                      }`}
                    >
                      Cakupan Pekerjaan:
                    </span>
                    <ul className="flex flex-col gap-2.5">
                      {paket.fitur.map((fiturItem, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                            isHighlighted ? 'text-navy-900 font-medium' : 'text-muted'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isHighlighted
                                ? 'bg-navy-900 text-orange'
                                : 'bg-orange/20 text-orange'
                            }`}
                          >
                            <Icon name="check" size={11} strokeWidth={2.5} />
                          </div>
                          <span>{fiturItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tombol Diskusikan Paket Ini (Pill Tinggi 48px) */}
                <div
                  className={`pt-4 border-t ${
                    isHighlighted ? 'border-navy-900/20' : 'border-border/60'
                  }`}
                >
                  <Link
                    to={`/booking?jenis=${paket.bookingJenisId}&paket=${paket.id}`}
                    className={`w-full h-12 px-6 rounded-full font-heading font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      isHighlighted
                        ? 'bg-navy-900 hover:bg-navy-950 text-cream shadow-md'
                        : 'bg-orange hover:bg-orange-hover text-navy-900 shadow-sm'
                    }`}
                  >
                    <span>Diskusikan Paket Ini</span>
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer / Catatan Kustom */}
        <div className="mt-8 p-4 rounded-xl border border-border bg-surface/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <span className="flex items-center gap-2 text-center sm:text-left">
            <Icon name="briefcase" size={14} className="text-orange shrink-0" />
            <span>Membutuhkan lingkup proyek khusus atau arsitektur sistem enterprise yang berbeda?</span>
          </span>
          <Link
            to="/booking?jenis=diskusi-proyek"
            className="text-orange hover:underline font-semibold whitespace-nowrap inline-flex items-center gap-1"
          >
            <span>Konsultasikan Spesifikasi Kustom</span>
            <Icon name="arrow-right" size={12} />
          </Link>
        </div>
      </Container>
    </section>
  );
};
