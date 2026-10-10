import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { DAFTAR_PROYEK } from '../data/content';

/**
 * Hero Section ViramidAgency
 * Desain presisi, kredibel, dan berkonversi tinggi tanpa titik-titik berwarna atau efek menyala.
 * Palet eksklusif 2 warna: HEX #04344C & HEX #B0EDF9.
 * Tipografi judul menggunakan font Gastilo.
 */
export const Hero: React.FC = () => {
  const lmsProject = DAFTAR_PROYEK[0];

  return (
    <section id="hero" className="relative w-full min-h-[88svh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden isolate">
      <Container className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Kolom Kiri: Value Proposition & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <Eyebrow number="00" variant="cyan" className="mb-4 sm:mb-6">
              DIGITAL &amp; CREATIVE AGENCY
            </Eyebrow>

            <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[68px] text-[#B0EDF9] tracking-[-0.02em] leading-[1.08] mb-6 text-balance">
              Kami membangun brand dan website yang{' '}
              <span className="text-[#B0EDF9] underline decoration-[#B0EDF9]/40 underline-offset-8">bekerja</span> untuk bisnismu.
            </h1>

            <p className="text-base sm:text-lg text-[#B0EDF9]/85 max-w-[58ch] font-normal leading-relaxed mb-8 text-balance">
              Membantu brand dan lembaga berkembang melalui transformasi identitas visual terstruktur,
              arsitektur platform LMS &amp; website performa tinggi, dan sistem konversi digital yang memikat pelanggan.
            </p>

            {/* Tombol CTA: Ice Cyan #B0EDF9 & Deep Teal #04344C */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                to="/booking"
                className="h-12 px-7 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]"
              >
                <span>Jadwalkan Konsultasi</span>
                <Icon name="arrow-right" size={18} />
              </Link>

              <a
                href="#karya"
                className="h-12 px-7 rounded-full border border-[#B0EDF9]/40 hover:border-[#B0EDF9] bg-[#074563]/50 hover:bg-[#074563] text-[#B0EDF9] font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2"
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
                  Sistem Khusus
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Live Showcase Preview Card (LPK Lombok Shorai Rinjani LMS) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md rounded-2xl bg-[#074563] border border-[#165A7E] hover:border-[#B0EDF9] transition-all duration-300 p-5 shadow-2xl relative group">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#165A7E]">
                <div className="flex items-center gap-2">
                  <Icon name="globe" size={14} className="text-[#B0EDF9]" />
                  <span className="text-xs font-mono font-semibold text-[#B0EDF9]">
                    Platform LMS Produksi
                  </span>
                </div>
                
                {/* Clean URL Pill */}
                <a
                  href={lmsProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-[#04344C] border border-[#165A7E] text-[11px] font-mono text-[#78B9CA] hover:text-[#B0EDF9] transition-colors flex items-center gap-1.5"
                >
                  <span className="truncate max-w-[130px]">lombokshorairinjani.com</span>
                  <Icon name="arrow-up-right" size={11} className="shrink-0" />
                </a>
              </div>

              {/* Showcase Image & Banner */}
              <a
                href={lmsProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[16/10] rounded-xl overflow-hidden border border-[#165A7E] group-hover:border-[#B0EDF9] transition-colors bg-[#04344C] p-6 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-[#074563] border border-[#165A7E] p-2 flex items-center justify-center mb-3 shadow-sm">
                  <img
                    src="https://lombokshorairinjani.com/assets/brand/logo.png"
                    alt="LPK Lombok Shorai Rinjani Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                
                <span className="font-heading font-bold text-base text-[#B0EDF9] tracking-tight">
                  LPK Lombok Shorai Rinjani
                </span>
                <span className="text-[11px] font-mono text-[#78B9CA] mt-1">
                  Kursus Bahasa Jepang &amp; Karir ke Jepang
                </span>
                
                {/* Floating Category Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#04344C] border border-[#165A7E] text-[10px] font-mono font-semibold text-[#B0EDF9]">
                  Platform LMS
                </div>

                {/* Visit Indicator Overlay */}
                <div className="absolute inset-0 bg-[#04344C]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-[#B0EDF9] text-[#04344C] font-heading font-bold text-xs flex items-center gap-1.5 shadow-lg">
                    <span>Buka Website LMS</span>
                    <Icon name="arrow-up-right" size={14} />
                  </span>
                </div>
              </a>

              {/* Showcase Info Body */}
              <div className="mt-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-lg text-[#B0EDF9] group-hover:underline transition-all">
                    {lmsProject.judul}
                  </h3>
                  <span className="text-xs font-mono text-[#78B9CA]">{lmsProject.tahun}</span>
                </div>

                <p className="text-xs text-[#78B9CA] leading-relaxed line-clamp-2">
                  {lmsProject.ringkasan}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lmsProject.layanan.map((layanan, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#04344C] border border-[#165A7E] text-[#B0EDF9]"
                    >
                      {layanan}
                    </span>
                  ))}
                </div>

                {/* Action Link */}
                <div className="pt-3 border-t border-[#165A7E] flex items-center justify-between text-xs font-mono">
                  <Link
                    to={`/karya/${lmsProject.slug}`}
                    className="text-[#78B9CA] hover:text-[#B0EDF9] transition-colors flex items-center gap-1"
                  >
                    <span>Lihat Studi Kasus</span>
                    <Icon name="arrow-right" size={12} />
                  </Link>

                  <a
                    href={lmsProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#B0EDF9] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Kunjungi Live</span>
                    <Icon name="arrow-up-right" size={13} />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
