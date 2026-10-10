/**
 * @file src/components/PricingSection.tsx
 * Seksi Paket Layanan ViramidAgency dengan perbandingan fitur transparan.
 * Eksklusif 2 Warna: HEX #04344C (Deep Teal) & HEX #B0EDF9 (Ice Cyan).
 * Font Judul: Gastilo.
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
          subtitle="Pilihan paket pengerjaan transparan yang dirancang fleksibel untuk kebutuhan skala bisnis, LMS, dan peluncuran produkmu."
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
                    ? 'border-2 border-[#B0EDF9] bg-[#B0EDF9] text-[#04344C] shadow-2xl lg:-translate-y-2'
                    : 'border border-[#165A7E] bg-[#074563] text-[#B0EDF9] hover:border-[#B0EDF9]'
                }`}
              >
                <div>
                  {/* Badge Terpopuler / Paling Dipilih */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                        isHighlighted ? 'text-[#04344C] font-bold' : 'text-[#B0EDF9]'
                      }`}
                    >
                      {paket.estimasiWaktu}
                    </span>

                    {isHighlighted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#04344C] text-[#B0EDF9] uppercase tracking-wider shadow-sm">
                        <Icon name="sparkles" size={12} />
                        <span>Paling dipilih</span>
                      </span>
                    ) : paket.badge ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#04344C] border border-[#165A7E] text-[#B0EDF9] uppercase tracking-wider">
                        <span>{paket.badge}</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Nama Paket & Deskripsi */}
                  <h3
                    className={`font-heading font-bold text-xl sm:text-2xl mb-2 ${
                      isHighlighted ? 'text-[#04344C]' : 'text-[#B0EDF9]'
                    }`}
                  >
                    {paket.nama}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isHighlighted ? 'text-[#04344C]/85' : 'text-[#78B9CA]'
                    }`}
                  >
                    {paket.deskripsi}
                  </p>

                  {/* Harga */}
                  <div
                    className={`mb-6 pb-6 border-b ${
                      isHighlighted ? 'border-[#04344C]/20' : 'border-[#165A7E]'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono block mb-1 ${
                        isHighlighted ? 'text-[#04344C]/75 font-semibold' : 'text-[#78B9CA]'
                      }`}
                    >
                      Estimasi Investasi
                    </span>
                    <div
                      className={`font-heading font-bold text-2xl sm:text-3xl ${
                        isHighlighted ? 'text-[#04344C]' : 'text-[#B0EDF9]'
                      }`}
                    >
                      {paket.harga}
                    </div>
                  </div>

                  {/* Daftar Fitur Terbuka */}
                  <div className="flex flex-col gap-3 mb-8">
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wide ${
                        isHighlighted ? 'text-[#04344C]' : 'text-[#B0EDF9]'
                      }`}
                    >
                      Cakupan Pekerjaan:
                    </span>
                    <ul className="flex flex-col gap-2.5">
                      {paket.fitur.map((fiturItem, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                            isHighlighted ? 'text-[#04344C] font-medium' : 'text-[#78B9CA]'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                              isHighlighted
                                ? 'bg-[#04344C] text-[#B0EDF9]'
                                : 'bg-[#04344C] border border-[#165A7E] text-[#B0EDF9]'
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

                {/* Tombol Diskusikan Paket Ini */}
                <div
                  className={`pt-4 border-t ${
                    isHighlighted ? 'border-[#04344C]/20' : 'border-[#165A7E]'
                  }`}
                >
                  <Link
                    to={`/booking?jenis=${paket.bookingJenisId}&paket=${paket.id}`}
                    className={`w-full h-12 px-6 rounded-full font-heading font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      isHighlighted
                        ? 'bg-[#04344C] hover:bg-[#022131] text-[#B0EDF9] shadow-md'
                        : 'bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] shadow-sm'
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
        <div className="mt-8 p-4 rounded-xl border border-[#165A7E] bg-[#074563]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78B9CA]">
          <span className="flex items-center gap-2 text-center sm:text-left">
            <Icon name="briefcase" size={14} className="text-[#B0EDF9] shrink-0" />
            <span>Membutuhkan platform LMS khusus atau arsitektur sistem enterprise yang berbeda?</span>
          </span>
          <Link
            to="/booking?jenis=diskusi-proyek"
            className="text-[#B0EDF9] hover:underline font-semibold whitespace-nowrap inline-flex items-center gap-1"
          >
            <span>Konsultasikan Spesifikasi Kustom</span>
            <Icon name="arrow-right" size={12} />
          </Link>
        </div>
      </Container>
    </section>
  );
};
