/**
 * @file src/pages/PortfolioPage.tsx
 * Halaman rute terukur untuk Portofolio Karya ViramidAgency (/karya).
 * Menampilkan seluruh studi kasus proyek digital dengan filter kategori interaktif.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Icon } from '../components/ui/Icon';
import { ProjectCard } from '../components/ProjectCard';
import { DAFTAR_PROYEK } from '../data/content';

export const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  useEffect(() => {
    document.title = 'Karya Pilihan & Studi Kasus - ViramidAgency';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categories = ['Semua', 'Website', 'Branding', 'UI/UX'];

  const filteredProjects =
    activeCategory === 'Semua'
      ? DAFTAR_PROYEK
      : DAFTAR_PROYEK.filter((p) => p.kategori.toLowerCase() === activeCategory.toLowerCase());

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

      <Container className="max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#78B9CA] mb-6">
          <Link to="/" className="hover:text-[#B0EDF9] transition-colors flex items-center gap-1">
            <Icon name="arrow-left" size={13} />
            <span>Beranda</span>
          </Link>
          <span>/</span>
          <span className="text-[#B0EDF9]">Karya &amp; Portofolio</span>
        </div>

        {/* Header Seksi & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Eyebrow variant="cyan" className="mb-3 inline-block">
              PORTOFOLIO &amp; REKAM JEJAK
            </Eyebrow>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#B0EDF9] tracking-[-0.02em] mb-4 text-balance">
              Karya Pilihan &amp; Studi Kasus
            </h1>

            <p className="text-sm sm:text-base text-[#78B9CA] max-w-2xl leading-relaxed text-balance">
              Eksplorasi portofolio proyek digital, website modern, aplikasi kustom, dan identitas visual yang kami bangun dengan standar teknis tinggi.
            </p>
          </div>

          {/* Filter Chip Kategori */}
          <div
            className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#074563] border border-[#165A7E] self-start md:self-auto shrink-0"
            role="tablist"
            aria-label="Filter kategori proyek"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#B0EDF9] text-[#04344C] font-bold shadow-md'
                      : 'text-[#B0EDF9] hover:bg-[#04344C]/60 hover:text-[#B0EDF9]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Portofolio Proyek */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-16">
          {filteredProjects.map((proyek) => (
            <ProjectCard key={proyek.slug} proyek={proyek} />
          ))}
        </div>

        {/* Banner Ajakan Memulai Proyek */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#074563] to-[#04344C] border border-[#B0EDF9] text-center flex flex-col items-center">
          <span className="font-mono text-xs text-[#B0EDF9] uppercase tracking-widest mb-3">
            WAKTUNYA PROYEK ANDA
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#B0EDF9] mb-4 max-w-xl text-balance">
            Siap Mewujudkan Website &amp; Aplikasi Berdampak?
          </h2>
          <p className="text-sm sm:text-base text-[#78B9CA] max-w-lg mb-8 leading-relaxed text-balance">
            Mari diskusikan visi brand dan kebutuhan fungsional produk digital Anda bersama ViramidAgency.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/booking"
              className="h-12 px-8 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2 shadow-lg active:scale-[0.98]"
            >
              <span>Jadwalkan Konsultasi Sekarang</span>
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link
              to="/proses"
              className="h-12 px-6 rounded-full border border-[#165A7E] hover:border-[#B0EDF9] text-[#B0EDF9] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Pelajari Alur Kerja</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
};
