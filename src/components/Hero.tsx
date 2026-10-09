import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { ThreeArcsMotif } from './ThreeArcsMotif';
import { PROFIL_AGENCY } from '../data/content';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left column: Typography & CTAs (Max width 880px) with staggered entrance */}
        <div className="lg:col-span-8 flex flex-col items-start text-left max-w-[880px]">
          {/* Label studio berkelas di atas */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-5 inline-flex items-center gap-2"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#2a1747]/90 border border-[#5a3c8e]/70 text-xs sm:text-sm text-[#F4F3FF]">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" />
              <span className="font-mono text-xs text-[#E2D9F3] tracking-wide">
                Studio Desain &amp; Rekayasa Digital · Jakarta
              </span>
            </div>
          </motion.div>

          {/* Judul Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="font-heading font-bold text-4xl sm:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-[#F4F3FF] mb-6 text-balance"
          >
            {PROFIL_AGENCY.tagline}
          </motion.h1>

          {/* Subteks deskriptif */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="text-base sm:text-lg text-[#B8A9D4] font-normal leading-relaxed mb-9 max-w-2xl"
          >
            {PROFIL_AGENCY.deskripsi}
          </motion.p>

          {/* Dua tombol aksi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                as="button"
                variant="primary"
                onClick={() => scrollTo('karya')}
                className="group shadow-lg shadow-[#F97316]/20 font-semibold"
              >
                <span>Lihat Karya Kami</span>
                <ArrowDownRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                as="button"
                variant="ghost"
                onClick={() => scrollTo('kontak')}
                className="group border-[#5a3c8e]/80 hover:border-[#F97316] bg-[#2a1747]/40"
              >
                <span>Konsultasi Proyek</span>
                <ArrowRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Penegasan Kualitas & Kepercayaan Manusiawi */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 pt-6 border-t border-[#5a3c8e]/40 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#B8A9D4]/90"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-[#F97316] font-bold">✓</span> Kode Bersih &amp; Kecepatan 99+
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#F97316] font-bold">✓</span> Desain Orisinal Tanpa Template
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#F97316] font-bold">✓</span> Dikerjakan Tim Desainer Asli
            </span>
          </motion.div>
        </div>

        {/* Right column: Studio Showcase Craft */}
        <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
          <ThreeArcsMotif />
        </div>
      </div>
    </section>
  );
};
