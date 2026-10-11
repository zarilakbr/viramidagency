/**
 * @file src/pages/ServicesPage.tsx
 * Halaman rute terukur untuk Layanan Keahlian ViramidAgency (/layanan).
 * Menyajikan kapabilitas lengkap: Website, Aplikasi, UI/UX, Branding, dan Konten.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Icon } from '../components/ui/Icon';
import { DAFTAR_LAYANAN } from '../data/content';

export const ServicesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Layanan & Kapabilitas Digital - ViramidAgency';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const serviceSpecs: Record<string, { tags: string[]; icon: 'globe' | 'zap' | 'palette' | 'sparkles' | 'file-text' }> = {
    'layanan-1': {
      tags: ['Next.js / React', 'SEO Skor 95+', 'Mobile First', 'Kecepatan Akses Kilat'],
      icon: 'globe',
    },
    'layanan-2': {
      tags: ['Web & Mobile App', 'Dashboard Admin', 'REST API / Database', 'Keamanan Enterprise'],
      icon: 'zap',
    },
    'layanan-3': {
      tags: ['Figma Prototype', 'Design System', 'User Flow Teruji', 'Micro-interactions'],
      icon: 'palette',
    },
    'layanan-4': {
      tags: ['Logo & Visual Guideline', 'Tipografi Berkarakter', 'Aset Brand Lengkap', 'Diferensiasi Pasar'],
      icon: 'sparkles',
    },
    'layanan-5': {
      tags: ['Strategi Konten', 'Aset Multimedia', 'Desain Feed & Story', 'Brand Tone of Voice'],
      icon: 'file-text',
    },
  };

  return (
    <main className="relative w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 bg-[#04344C] overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B0EDF9]/5 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 left-1/4 w-[500px] h-[300px] bg-[#074563]/60 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container className="max-w-5xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#78B9CA] mb-6">
          <Link to="/" className="hover:text-[#B0EDF9] transition-colors flex items-center gap-1">
            <Icon name="arrow-left" size={13} />
            <span>Beranda</span>
          </Link>
          <span>/</span>
          <span className="text-[#B0EDF9]">Layanan</span>
        </div>

        {/* Header Halaman Layanan */}
        <div className="text-center md:text-left mb-12 md:mb-16">
          <Eyebrow variant="cyan" className="mb-3 inline-block">
            KAPABILITAS &amp; SOLUSI DIGITAL
          </Eyebrow>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#B0EDF9] tracking-[-0.02em] mb-4 text-balance">
            Layanan Keahlian &amp; Rekayasa Digital
          </h1>

          <p className="text-sm sm:text-base text-[#78B9CA] max-w-2xl leading-relaxed text-balance">
            Solusi digital terpadu untuk memperkuat identitas merek, performa konversi website, serta keandalan aplikasi bisnis Anda.
          </p>
        </div>

        {/* Daftar Kartu Layanan Lengkap */}
        <div className="flex flex-col gap-6 mb-16">
          {DAFTAR_LAYANAN.map((layanan) => {
            const spec = serviceSpecs[layanan.id] || {
              tags: ['Custom Engineering', 'Solusi Terukur'],
              icon: 'zap',
            };

            return (
              <div
                key={layanan.id}
                className="relative rounded-2xl p-6 sm:p-8 bg-[#074563] border border-[#165A7E] hover:border-[#B0EDF9] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#04344C] border border-[#165A7E] text-[#B0EDF9] flex items-center justify-center font-mono text-xs font-bold">
                      {layanan.nomor}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#78B9CA]">
                      <Icon name={spec.icon} size={14} className="text-[#B0EDF9]" />
                      <span>Kapabilitas Inti</span>
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#B0EDF9] mb-3 tracking-tight">
                    {layanan.nama}
                  </h2>

                  <p className="text-sm sm:text-base text-[#78B9CA] leading-relaxed max-w-2xl mb-5">
                    {layanan.deskripsi}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2">
                    {spec.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-[#04344C] border border-[#165A7E]/70 text-[#B0EDF9]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tombol Aksi Layanan */}
                <div className="shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#165A7E]">
                  <Link
                    to={`/booking?layanan=${encodeURIComponent(layanan.nama)}`}
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm transition-all duration-200 shadow-md active:scale-[0.98]"
                  >
                    <span>Pilih Layanan</span>
                    <Icon name="arrow-right" size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Ajakan Konsultasi */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#074563] to-[#04344C] border border-[#B0EDF9] text-center flex flex-col items-center">
          <span className="font-mono text-xs text-[#B0EDF9] uppercase tracking-widest mb-3">
            MULAI PROYEK BERSAMA KAMI
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#B0EDF9] mb-4 max-w-xl text-balance">
            Butuh Kombinasi Beberapa Layanan Sekaligus?
          </h2>
          <p className="text-sm sm:text-base text-[#78B9CA] max-w-lg mb-8 leading-relaxed text-balance">
            Diskusikan spesifikasi kebutuhan website, aplikasi, dan branding Anda dalam satu sesi terintegrasi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/booking"
              className="h-12 px-8 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2 shadow-lg active:scale-[0.98]"
            >
              <span>Jadwalkan Konsultasi Gratis</span>
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link
              to="/paket"
              className="h-12 px-6 rounded-full border border-[#165A7E] hover:border-[#B0EDF9] text-[#B0EDF9] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Lihat Paket Layanan</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
};
