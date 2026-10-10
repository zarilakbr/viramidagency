/**
 * @file src/components/PricingSection.tsx
 * Seksi Paket Layanan ViramidAgency dengan perbandingan fitur transparan.
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
                    ? 'border-2 border-orange bg-surface/90 shadow-lg lg:-translate-y-2'
                    : 'border border-border bg-surface/40 hover:border-muted/60'
                }`}
              >
                <div>
                  {/* Badge Terpopuler / Paling Dipilih */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-semibold uppercase text-cyan tracking-wider">
                      {paket.estimasiWaktu}
                    </span>

                    {paket.badge && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange text-navy uppercase tracking-wider">
                        <Icon name="sparkles" size={12} />
                        <span>{paket.badge}</span>
                      </span>
                    )}
                  </div>

                  {/* Nama Paket & Deskripsi */}
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-2">
                    {paket.nama}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                    {paket.deskripsi}
                  </p>

                  {/* Harga */}
                  <div className="mb-6 pb-6 border-b border-border/80">
                    <span className="text-xs font-mono text-muted block mb-1">
                      Estimasi Investasi
                    </span>
                    <div className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                      {paket.harga}
                    </div>
                  </div>

                  {/* Daftar Fitur Terbuka */}
                  <div className="flex flex-col gap-3 mb-8">
                    <span className="text-xs font-mono font-semibold text-foreground uppercase tracking-wide">
                      Cakupan Pekerjaan:
                    </span>
                    <ul className="flex flex-col gap-2.5">
                      {paket.fitur.map((fiturItem, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-muted/90"
                        >
                          <div className="w-4 h-4 rounded-full bg-cyan/15 text-cyan flex items-center justify-center shrink-0 mt-0.5">
                            <Icon name="check" size={11} strokeWidth={2.5} />
                          </div>
                          <span>{fiturItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tombol Diskusikan Paket Ini */}
                <div className="pt-4 border-t border-border/60">
                  <Link
                    to={`/booking?jenis=${paket.bookingJenisId}&paket=${paket.id}`}
                    className={`w-full py-3.5 px-5 rounded-xl font-heading font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      isHighlighted
                        ? 'bg-orange hover:bg-orange-hover text-navy shadow-md'
                        : 'bg-surface hover:bg-surface-hover border border-border text-foreground hover:border-orange'
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
        <div className="mt-8 p-4 rounded-xl border border-border bg-surface/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <span className="flex items-center gap-2 text-center sm:text-left">
            <Icon name="briefcase" size={14} className="text-cyan shrink-0" />
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
