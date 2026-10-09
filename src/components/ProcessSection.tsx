import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { LANGKAH_PROSES } from '../data/content';

export const ProcessSection: React.FC = () => {
  // Titik langkah berwarna oranye, cyan, ungu bergantian
  const dotColors = ['#F97316', '#22D3C5', '#C26FE0', '#F97316'];

  return (
    <section id="proses" className="py-24 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        number="03"
        title="Proses Kerja"
        subtitle="Alur terstruktur dari awal penjajakan hingga peluncuran untuk memastikan hasil sesuai ekspektasi."
      />

      {/* Timeline Desktop (Horizontal) & Mobile (Vertikal) */}
      <div className="relative">
        {/* Horizontal connecting line on desktop */}
        <div
          className="hidden lg:block absolute top-[28px] left-[40px] right-[40px] h-[1px] bg-[#5a3c8e] z-0"
          aria-hidden="true"
        />

        {/* Vertical connecting line on mobile & tablet */}
        <div
          className="lg:hidden absolute top-[28px] bottom-[28px] left-[20px] w-[1px] bg-[#5a3c8e] z-0"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
          {LANGKAH_PROSES.map((langkah, index) => {
            const dotColor = dotColors[index % dotColors.length];

            return (
              <motion.div
                key={langkah.nomor}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="flex flex-col bg-[#412a6a]/90 border border-[#5a3c8e] rounded-2xl p-6 md:p-7 relative transition-colors duration-200 hover:border-[#F97316] shadow-md"
              >
                {/* Header: Titik langkah & Nomor */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                    <span className="font-mono text-xs text-[#F97316] font-semibold tracking-wider">
                      FASE {langkah.nomor}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#B8A9D4]/60">
                    Step 0{index + 1}
                  </span>
                </div>

                {/* Judul Langkah */}
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F4F3FF] mb-3 tracking-tight">
                  {langkah.judul}
                </h3>

                {/* Deskripsi Satu Kalimat */}
                <p className="text-sm text-[#B8A9D4] leading-relaxed mt-auto font-normal">
                  {langkah.deskripsi}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
