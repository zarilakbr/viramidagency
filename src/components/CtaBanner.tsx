/**
 * @file src/components/CtaBanner.tsx
 * Pita CTA penuh sebelum footer: Latar solid Ice Cyan #B0EDF9, teks Deep Teal #04344C.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';

export const CtaBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-[#B0EDF9] text-[#04344C] py-[72px] sm:py-[120px] overflow-hidden">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <Eyebrow variant="navy">
              MULAI LANGKAH PERTAMA
            </Eyebrow>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#04344C] tracking-[-0.02em] leading-[1.15]">
              Punya proyek? Jadwalkan obrolan 30 menit.
            </h2>

            <p className="text-sm sm:text-base font-medium text-[#04344C]/85 max-w-[64ch] mt-1">
              Konsultasi gratis tanpa komitmen awal. Mari bedah kebutuhan website, LMS, dan digitalisasi bisnismu untuk solusi yang paling berdampak.
            </p>
          </div>

          <div className="w-full sm:w-auto shrink-0 flex justify-center">
            <Link
              to="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-8 rounded-full bg-[#04344C] hover:bg-[#022131] text-[#B0EDF9] font-heading font-bold text-sm sm:text-base transition-all duration-200 shadow-lg active:scale-[0.98] cursor-pointer"
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
