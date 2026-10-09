import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './ui/Reveal';
import { LANGKAH_PROSES } from '../data/content';

/**
 * ProcessSection
 * Standar:
 * - Roadmap 4 fase terstruktur dengan 1px border
 * - Space Grotesk 700
 * - Container 1200px, section-spacing 120px (mobile 72px)
 * - Tanpa shadow tebal, tanpa dot warna-warni acak
 */
export const ProcessSection: React.FC = () => {
  return (
    <section id="proses" className="section-container section-spacing scroll-mt-20">
      <SectionHeading
        number="03"
        title="Proses Kerja"
        subtitle="Alur terstruktur dari awal penjajakan hingga peluncuran untuk memastikan hasil sesuai ekspektasi."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {LANGKAH_PROSES.map((langkah, index) => (
          <Reveal
            key={langkah.nomor}
            delayIndex={index}
            className="h-full"
          >
            <div className="flex flex-col bg-surface border border-border rounded-lg p-6 hover:border-orange transition-colors duration-200 h-full">
              {/* Header: Nomor Langkah */}
              <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                <span className="font-mono text-xs text-orange font-semibold tracking-wider">
                  FASE {langkah.nomor}
                </span>
                <span className="text-xs font-mono text-muted">
                  0{index + 1} / 04
                </span>
              </div>

              {/* Judul Langkah */}
              <h3 className="font-heading font-bold text-xl text-foreground mb-3 tracking-tight">
                {langkah.judul}
              </h3>

              {/* Deskripsi Satu Kalimat */}
              <p className="text-sm text-muted leading-relaxed mt-auto font-normal max-w-[65ch]">
                {langkah.deskripsi}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
