/**
 * @file src/components/CtaBanner.tsx
 * Pita CTA penuh sebelum footer: Latar solid #F97316, teks navy #0A0A2E.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Icon } from './ui/Icon';

export const CtaBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-orange text-navy py-[72px] sm:py-[120px] overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-navy/80">
              Mulai Langkah Pertama
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-navy tracking-[-0.025em] leading-[1.15]">
              Punya proyek? Jadwalkan obrolan 30 menit.
            </h2>
            <p className="text-sm sm:text-base font-medium text-navy/85 max-w-xl mt-1">
              Konsultasi gratis tanpa komitmen awal. Mari bedah kebutuhan bisnismu dan temukan solusi digital yang paling berdampak.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2.5 py-4 px-8 rounded-xl bg-navy hover:bg-[#070722] text-[#F4F3FF] font-heading font-bold text-base transition-all duration-200 shadow-lg hover:scale-[1.02] cursor-pointer"
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
