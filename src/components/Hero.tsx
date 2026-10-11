/**
 * @file src/components/Hero.tsx
 * Hero Section ViramidAgency
 * Menampilkan value proposition di sisi kiri dengan tombol CTA simetris,
 * dan showcase ilustrasi Storyset Technology di sisi kanan dengan atribusi resmi.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Tipografi judul menggunakan font Gastilo.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative w-full min-h-[88svh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden isolate">
      <Container className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Kolom Kiri: Value Proposition & CTA Simetris */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <Eyebrow number="00" variant="cyan" className="mb-4 sm:mb-6">
              DIGITAL &amp; CREATIVE AGENCY
            </Eyebrow>

            <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[66px] text-[#B0EDF9] tracking-[-0.02em] leading-[1.08] mb-6 text-balance">
              Kami membangun brand dan website yang{' '}
              <span className="text-[#B0EDF9] underline decoration-[#B0EDF9]/40 underline-offset-8">bekerja</span> untuk bisnismu.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#B0EDF9]/85 max-w-[58ch] font-normal leading-relaxed mb-8 text-balance">
              Membantu brand dan lembaga berkembang melalui transformasi identitas visual terstruktur,
              arsitektur platform LMS &amp; website performa tinggi, dan sistem konversi digital yang memikat pelanggan.
            </p>

            {/* Tombol CTA Simetris (Sama Panjang & Proporsional di Mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full sm:w-auto mb-10">
              <Link
                to="/booking"
                className="w-full sm:w-auto h-12 px-7 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]"
              >
                <span>Jadwalkan Konsultasi</span>
                <Icon name="arrow-right" size={18} />
              </Link>

              <a
                href="#karya"
                className="w-full sm:w-auto h-12 px-7 rounded-full border border-[#165A7E] bg-[#074563] hover:bg-[#0B567C] hover:border-[#B0EDF9] text-[#B0EDF9] font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Lihat Karya</span>
                <Icon name="chevron-down" size={16} />
              </a>
            </div>

            {/* Metrik Standar Keunggulan Agency */}
            <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[#165A7E] max-w-xl">
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl sm:text-2xl text-[#B0EDF9] tracking-tight">
                  99+
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-[#78B9CA] mt-0.5">
                  Core Web Vitals
                </span>
              </div>

              <div className="flex flex-col border-l border-[#165A7E] pl-3 sm:pl-4">
                <span className="font-heading font-bold text-xl sm:text-2xl text-[#B0EDF9] tracking-tight">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-[#78B9CA] mt-0.5">
                  SLA Tepat Waktu
                </span>
              </div>

              <div className="flex flex-col border-l border-[#165A7E] pl-3 sm:pl-4">
                <span className="font-heading font-bold text-xl sm:text-2xl text-[#B0EDF9] tracking-tight">
                  LMS &amp; Web
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-[#78B9CA] mt-0.5">
                  Solusi Digital Agency
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Ilustrasi Polosan Rekayasa Web ViramidAgency */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <div className="relative w-full max-w-lg flex flex-col items-center">
              {/* Ambient backlight glow halus */}
              <div
                className="absolute inset-0 bg-[#B0EDF9]/15 blur-3xl rounded-full pointer-events-none -z-10"
                aria-hidden="true"
              />

              {/* Ilustrasi Polosan Vector */}
              <img
                src="/images/technology-storyset.svg"
                alt="Rekayasa Web & Platform LMS ViramidAgency"
                className="w-full h-auto max-h-[460px] object-contain drop-shadow-[0_20px_40px_rgba(2,34,50,0.85)] transition-transform duration-500 hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
