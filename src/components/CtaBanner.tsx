/**
 * @file src/components/CtaBanner.tsx
 * Pita CTA penuh sebelum footer: Latar solid #F97316 (orange), teks navy-900 #0A0A2E.
 * Sumber kebenaran visual palet Oranye + Navy ViramidAgency.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';

export const CtaBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-orange text-navy-900 py-[72px] sm:py-[120px] overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <Eyebrow variant="navy">
              MULAI LANGKAH PERTAMA
            </Eyebrow>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-navy-900 tracking-[-0.025em] leading-[1.15]">
              Punya proyek? Jadwalkan obrolan 30 menit.
            </h2>

            <p className="text-sm sm:text-base font-medium text-navy-900/85 max-w-[64ch] mt-1">
              Konsultasi gratis tanpa komitmen awal. Mari bedah kebutuhan bisnismu dan temukan solusi digital yang paling berdampak.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2.5 h-12 px-8 rounded-full bg-navy-900 hover:bg-navy-950 text-cream font-heading font-bold text-sm sm:text-base transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer"
            >
              <span>Jadwalkan Sekarang</span>
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
