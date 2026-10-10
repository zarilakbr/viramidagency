import React, { useState, useMemo } from 'react';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './ui/Reveal';
import { Container } from './ui/Container';
import { DAFTAR_PROYEK, KategoriProyek } from '../data/content';

type FilterType = 'Semua' | KategoriProyek;

const FILTER_OPTIONS: FilterType[] = ['Semua', 'Website', 'Branding', 'UI/UX', 'Konten'];

/**
 * PortfolioSection
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Tipografi Heading: Gastilo.
 */
export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Semua');

  const filteredProyek = useMemo(() => {
    if (activeFilter === 'Semua') {
      return DAFTAR_PROYEK;
    }
    return DAFTAR_PROYEK.filter((item) => item.kategori === activeFilter);
  }, [activeFilter]);

  // Pola asimetris 7-5, 5-7, 7-5 saat 'Semua', atau grid 6-6 jika terfilter
  const getColSpan = (index: number) => {
    if (activeFilter !== 'Semua') {
      return 'col-span-12 md:col-span-6';
    }
    const pattern = [
      'col-span-12 lg:col-span-7',
      'col-span-12 lg:col-span-5',
      'col-span-12 lg:col-span-5',
      'col-span-12 lg:col-span-7',
      'col-span-12 lg:col-span-7',
      'col-span-12 lg:col-span-5',
    ];
    return pattern[index % pattern.length];
  };

  return (
    <section id="karya" className="my-[72px] sm:my-[120px] scroll-mt-20">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            number="02"
            title="Karya Pilihan"
            subtitle="Eksplorasi portofolio proyek digital, platform LMS, identitas visual, dan pengembangan sistem web."
            className="!mb-0"
          />

          {/* Filter Chip Baku */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#074563] border border-[#165A7E] rounded-md self-start md:self-auto"
            role="tablist"
            aria-label="Filter kategori portofolio"
          >
            {FILTER_OPTIONS.map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#B0EDF9] text-[#04344C] font-bold shadow-sm'
                      : 'text-[#78B9CA] hover:text-[#B0EDF9]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Asimetris Portofolio */}
        {filteredProyek.length > 0 ? (
          <div className="grid grid-cols-12 gap-6 sm:gap-8">
            {filteredProyek.map((proyek, index) => {
              const spanClass = getColSpan(index);
              return (
                <Reveal
                  key={proyek.slug}
                  delayIndex={index % 5}
                  className={spanClass}
                >
                  <ProjectCard proyek={proyek} />
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center border border-[#165A7E] rounded bg-[#074563]">
            <p className="text-sm text-[#78B9CA]">
              Karya dalam kategori ini akan segera ditambahkan.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
};
