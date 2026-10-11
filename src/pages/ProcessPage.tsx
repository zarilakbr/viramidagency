/**
 * @file src/pages/ProcessPage.tsx
 * Halaman rute terukur untuk Proses Kerja ViramidAgency (/proses).
 * Menyajikan tahapan rekayasa digital terukur, transparan, dan terstruktur.
 * Eksklusif 2 Warna: HEX #04344C (Deep Teal) & HEX #B0EDF9 (Ice Cyan).
 * Font Judul: Gastilo.
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Icon } from '../components/ui/Icon';
import { LANGKAH_PROSES } from '../data/content';

export const ProcessPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Proses Kerja & Metodologi Rekayasa Digital - ViramidAgency';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="relative w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 bg-[#04344C] overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B0EDF9]/5 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 right-1/4 w-[500px] h-[300px] bg-[#074563]/60 blur-[140px] rounded-full pointer-events-none -z-10"
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
          <span className="text-[#B0EDF9]">Proses Kerja</span>
        </div>

        {/* Header Halaman Proses */}
        <div className="text-center md:text-left mb-12 md:mb-16">
          <Eyebrow variant="cyan" className="mb-3 inline-block">
            METODOLOGI &amp; EKSEKUSI TERUKUR
          </Eyebrow>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#B0EDF9] tracking-[-0.02em] mb-4 text-balance">
            Alur Pengerjaan Website &amp; Aplikasi
          </h1>

          <p className="text-sm sm:text-base text-[#78B9CA] max-w-2xl leading-relaxed text-balance">
            Setiap proyek dikerjakan melalui 4 fase berkesinambungan yang terukur dan transparan.
            Kami memastikan setiap baris kode, antarmuka visual, dan arsitektur sistem memberikan dampak nyata bagi bisnis Anda.
          </p>
        </div>

        {/* Grid 4 Fase Proses Kerja */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {LANGKAH_PROSES.map((langkah, index) => {
            const icons = ['layers', 'palette', 'zap', 'sparkles'] as const;
            const currentIcon = icons[index % icons.length];

            return (
              <div
                key={langkah.nomor}
                className="relative rounded-2xl p-6 sm:p-8 bg-[#074563] border border-[#165A7E] hover:border-[#B0EDF9] transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Header Kartu: Nomor & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#04344C] border border-[#165A7E] text-[#B0EDF9]">
                      Fase {langkah.nomor}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#04344C] border border-[#165A7E] text-[#B0EDF9] flex items-center justify-center group-hover:border-[#B0EDF9] transition-colors">
                      <Icon name={currentIcon} size={18} />
                    </div>
                  </div>

                  <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#B0EDF9] mb-3 tracking-tight">
                    {langkah.judul}
                  </h2>

                  <p className="text-sm text-[#78B9CA] leading-relaxed">
                    {langkah.deskripsi}
                  </p>
                </div>

                {/* Garis Aksen Bawah */}
                <div className="mt-6 pt-4 border-t border-[#165A7E]/60 flex items-center justify-between text-xs font-mono text-[#78B9CA]">
                  <span>Milestone Terukur</span>
                  <span className="text-[#B0EDF9] font-bold">100% Transparan</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Pilar Jaminan Transparansi */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#074563]/50 border border-[#165A7E] mb-16">
          <div className="text-center mb-8">
            <span className="font-mono text-xs text-[#B0EDF9] uppercase tracking-widest block mb-2">
              STANDAR KUALITAS VIRAMIDAGENCY
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#B0EDF9]">
              Mengapa Alur Kami Terukur &amp; Terpercaya?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#04344C] border border-[#165A7E]/70 flex flex-col gap-2.5">
              <Icon name="check-circle" size={20} className="text-[#B0EDF9]" />
              <h4 className="font-heading font-bold text-base text-[#B0EDF9]">Milestone Transparan</h4>
              <p className="text-xs text-[#78B9CA] leading-relaxed">
                Setiap progres pengerjaan dipantau melalui checkpoint berkala. Anda selalu tahu status proyek terkini.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#04344C] border border-[#165A7E]/70 flex flex-col gap-2.5">
              <Icon name="shield-check" size={20} className="text-[#B0EDF9]" />
              <h4 className="font-heading font-bold text-base text-[#B0EDF9]">100% Hak Milik Kode</h4>
              <p className="text-xs text-[#78B9CA] leading-relaxed">
                Seluruh source code, repositori, dan berkas desain Figma diserahkan penuh menjadi aset bisnis Anda.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#04344C] border border-[#165A7E]/70 flex flex-col gap-2.5">
              <Icon name="clock" size={20} className="text-[#B0EDF9]" />
              <h4 className="font-heading font-bold text-base text-[#B0EDF9]">Garansi &amp; Pendampingan</h4>
              <p className="text-xs text-[#78B9CA] leading-relaxed">
                Dukungan teknis bebas kendala 14 hingga 60 hari pasca peluncuran untuk memastikan performa stabil.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner Bawah */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#074563] to-[#04344C] border border-[#B0EDF9] text-center flex flex-col items-center">
          <span className="font-mono text-xs text-[#B0EDF9] uppercase tracking-widest mb-3">
            MULAI PROYEK BERSAMA KAMI
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#B0EDF9] mb-4 max-w-xl text-balance">
            Siap Menerapkan Alur Terukur Ini Pada Bisnismu?
          </h2>
          <p className="text-sm sm:text-base text-[#78B9CA] max-w-lg mb-8 leading-relaxed text-balance">
            Jadwalkan sesi konsultasi gratis sekarang. Kami siap membedah kebutuhan website dan aplikasi digital Anda.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/booking"
              className="h-12 px-8 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2 shadow-lg active:scale-[0.98]"
            >
              <span>Jadwalkan Konsultasi</span>
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link
              to="/"
              className="h-12 px-6 rounded-full border border-[#165A7E] hover:border-[#B0EDF9] text-[#B0EDF9] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
};
