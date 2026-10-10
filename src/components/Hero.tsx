import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { DAFTAR_PROYEK } from '../data/content';

/**
 * Hero Section ViramidAgency
 * Menghadirkan layout agency modern, kredibel, dan berkonversi tinggi tanpa intro video 3D warna-warni.
 * Menampilkan value proposition jelas, metrik keunggulan, serta live showcase proyek Lombok Shorai Rinjani.
 */
export const Hero: React.FC = () => {
  const rinjaniProject = DAFTAR_PROYEK[0];

  return (
    <section id="hero" className="relative w-full min-h-[90svh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden isolate">
      <Container className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Value Proposition & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <Eyebrow number="00" variant="orange" className="mb-4 sm:mb-6">
              DIGITAL &amp; CREATIVE AGENCY
            </Eyebrow>

            <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[68px] text-cream tracking-[-0.03em] leading-[1.08] mb-6 text-balance">
              Kami membangun brand dan website yang{' '}
              <span className="text-orange">bekerja</span> untuk bisnismu.
            </h1>

            <p className="text-base sm:text-lg text-cream/85 max-w-[58ch] font-normal leading-relaxed mb-8 text-balance">
              Membantu brand berkembang melalui transformasi identitas visual terstruktur,
              arsitektur website performa tinggi, dan sistem konversi digital yang memikat pelanggan.
            </p>

            {/* Tombol CTA Baku */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                to="/booking"
                className="h-12 px-7 rounded-full bg-orange hover:bg-orange-hover text-navy-900 font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]"
              >
                <span>Jadwalkan Konsultasi</span>
                <Icon name="arrow-right" size={18} />
              </Link>

              <a
                href="#karya"
                className="h-12 px-7 rounded-full border border-cream/30 hover:border-orange bg-surface/50 hover:bg-surface text-cream hover:text-orange font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Lihat Karya</span>
                <Icon name="chevron-down" size={16} />
              </a>
            </div>

            {/* Metrik Standar Keunggulan Agency */}
            <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-border/80 max-w-xl">
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl sm:text-2xl text-cream tracking-tight">
                  99+
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-muted mt-0.5">
                  Core Web Vitals
                </span>
              </div>

              <div className="flex flex-col border-l border-border/80 pl-3 sm:pl-4">
                <span className="font-heading font-bold text-xl sm:text-2xl text-orange tracking-tight">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-muted mt-0.5">
                  SLA Tepat Waktu
                </span>
              </div>

              <div className="flex flex-col border-l border-border/80 pl-3 sm:pl-4">
                <span className="font-heading font-bold text-xl sm:text-2xl text-cream tracking-tight">
                  Bespoke
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-muted mt-0.5">
                  Kode &amp; Desain
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Live Showcase Preview Card (Lombok Shorai Rinjani) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md rounded-2xl bg-surface/90 border border-border hover:border-orange/50 transition-all duration-300 p-5 shadow-2xl backdrop-blur-sm relative group">
              
              {/* Browser Mockup Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/70">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                
                {/* Clean URL Pill */}
                <a
                  href={rinjaniProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-md bg-navy-900 border border-border text-[11px] font-mono text-muted hover:text-orange transition-colors flex items-center gap-1.5 truncate max-w-[200px]"
                >
                  <Icon name="globe" size={12} className="text-orange shrink-0" />
                  <span className="truncate">lombokshorairinjani.com</span>
                  <Icon name="arrow-up-right" size={11} className="shrink-0" />
                </a>

                <div className="flex items-center gap-1 text-green-400 text-[10px] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>Live</span>
                </div>
              </div>

              {/* Showcase Image & Banner */}
              <a
                href={rinjaniProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[16/10] rounded-xl overflow-hidden border border-border group-hover:border-orange/60 transition-colors bg-navy-900"
              >
                <img
                  src={rinjaniProject.gambar[0]}
                  alt="Lombok Shorai Rinjani Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Category Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-navy-950/90 border border-border text-[10px] font-mono font-semibold text-orange backdrop-blur-xs">
                  Proyek Unggulan
                </div>

                {/* Visit Indicator Overlay */}
                <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-orange text-navy-900 font-heading font-bold text-xs flex items-center gap-1.5 shadow-lg">
                    <span>Buka Website</span>
                    <Icon name="arrow-up-right" size={14} />
                  </span>
                </div>
              </a>

              {/* Showcase Info Body */}
              <div className="mt-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-lg text-cream group-hover:text-orange transition-colors">
                    {rinjaniProject.judul}
                  </h3>
                  <span className="text-xs font-mono text-muted">{rinjaniProject.tahun}</span>
                </div>

                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {rinjaniProject.ringkasan}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {rinjaniProject.layanan.map((layanan, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-900/80 border border-border text-cream/70"
                    >
                      {layanan}
                    </span>
                  ))}
                </div>

                {/* Action Link */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <Link
                    to={`/karya/${rinjaniProject.slug}`}
                    className="text-muted hover:text-cream transition-colors font-mono"
                  >
                    Lihat Studi Kasus →
                  </Link>

                  <a
                    href={rinjaniProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange hover:text-orange-hover font-semibold font-mono flex items-center gap-1"
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
