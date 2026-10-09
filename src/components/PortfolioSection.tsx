import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { ProjectCard } from './ProjectCard';
import { DAFTAR_PROYEK, KategoriProyek } from '../data/content';

type FilterType = 'Semua' | KategoriProyek;

const FILTER_OPTIONS: FilterType[] = ['Semua', 'Website', 'Branding', 'UI/UX', 'Konten'];

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Semua');

  const filteredProyek = useMemo(() => {
    if (activeFilter === 'Semua') {
      return DAFTAR_PROYEK;
    }
    return DAFTAR_PROYEK.filter((item) => item.kategori === activeFilter);
  }, [activeFilter]);

  // Asymmetric spans helper for grid dynamics
  const getColSpan = (index: number) => {
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
    <section id="karya" className="py-24 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeading
          number="02"
          title="Karya Pilihan"
          subtitle="Eksplorasi portofolio proyek digital, identitas visual, dan pengembangan sistem web."
          className="!mb-0"
        />

        {/* Chip Filter Controls dengan Animated Pill Tab */}
        <div
          className="flex flex-wrap items-center gap-2 p-1.5 bg-[#412a6a]/90 border border-[#5a3c8e] rounded-full self-start md:self-auto"
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
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#22D3C5] focus-visible:outline-offset-2 ${
                  isSelected ? 'text-[#0A0A2E] font-semibold' : 'text-[#9A9BC7] hover:text-[#F4F3FF]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-[#F97316] rounded-full -z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Asimetris Portofolio dengan Smooth Stagger & Layout Transitions */}
      {filteredProyek.length > 0 ? (
        <motion.div layout className="grid grid-cols-12 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProyek.map((proyek, index) => {
              const spanClass = getColSpan(index);
              const isLarge = spanClass.includes('col-span-7') || spanClass.includes('col-span-8');
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  key={proyek.slug}
                  className={spanClass}
                >
                  <ProjectCard proyek={proyek} isLarge={isLarge} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center border border-[#5a3c8e] rounded-2xl bg-[#412a6a]/60 shadow-lg"
        >
          <p className="text-base sm:text-lg text-[#B8A9D4]">
            Karya dalam kategori ini akan segera ditambahkan.
          </p>
        </motion.div>
      )}
    </section>
  );
};
