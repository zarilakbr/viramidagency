/**
 * @file src/components/ProcessSection.tsx
 * Seksi Proses Kerja ViramidAgency.
 * Layout sticky: Judul seksi menempel di kiri, langkah bergulir di kanan,
 * disertai garis progres tipis terisi mengikuti scroll (useScroll motion).
 */

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { LANGKAH_PROSES } from '../data/content';
import { Icon } from './ui/Icon';

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="proses"
      ref={containerRef}
      className="relative py-20 md:py-28 bg-surface border-y border-border scroll-mt-16"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Kolom Kiri: Sticky Header & Progress Line (Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6">
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-xs sm:text-sm font-semibold text-orange select-none">
                  03 /
                </span>
                <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-[-0.025em] leading-[1.15]">
                  Proses Kerja
                </h2>
              </div>
              <p className="text-sm sm:text-base text-muted font-normal leading-relaxed mt-3 max-w-[50ch]">
                Alur rekayasa terstruktur dari pemetaan awal hingga peluncuran untuk memastikan kualitas kode, kecepatan, dan konversi bisnis terjamin.
              </p>
            </div>

            {/* Indikator Progres Scroll Tipis 2px */}
            <div className="hidden lg:flex items-center gap-4 pt-4 border-t border-border/80">
              <div className="relative h-28 w-[2px] bg-border rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleY }}
                  className="absolute top-0 left-0 right-0 bg-orange w-full origin-top h-full rounded-full"
                />
              </div>

              <div className="flex flex-col gap-2 font-mono text-xs text-muted">
                <span className="text-orange font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                  Alur 4 Fase Berkesinambungan
                </span>
                <span className="text-[11px] text-muted/70">
                  Gulir ke bawah untuk menelusuri tiap tahapan eksekusi
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Langkah-Langkah Bergulir */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {LANGKAH_PROSES.map((langkah, index) => {
              return (
                <ProcessStepCard
                  key={langkah.nomor}
                  langkah={langkah}
                  index={index}
                  total={LANGKAH_PROSES.length}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProcessStepCardProps {
  langkah: { nomor: string; judul: string; deskripsi: string };
  index: number;
  total: number;
}

const ProcessStepCard: React.FC<ProcessStepCardProps> = ({ langkah, index, total }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  // Angka outline bergeser halus saat scroll (maksimum 20px)
  const numberOffset = useTransform(scrollYProgress, [0, 1], [18, 0]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-background/80 hover:border-orange transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm"
    >
      {/* Angka Outline Tipis di Pojok Kartu */}
      <motion.span
        style={{ y: numberOffset }}
        className="absolute top-4 right-6 font-heading font-extrabold text-5xl sm:text-6xl text-border/40 group-hover:text-orange/20 select-none pointer-events-none transition-colors duration-300"
        aria-hidden="true"
      >
        {langkah.nomor}
      </motion.span>

      <div>
        {/* Header Kartu: Fase Tag */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-surface border border-border text-cyan">
            <Icon name="layers" size={13} />
            <span>FASE {langkah.nomor}</span>
          </span>
          <span className="text-xs font-mono text-muted">
            0{index + 1} / 0{total}
          </span>
        </div>

        {/* Judul Langkah */}
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground mb-3 tracking-tight group-hover:text-orange transition-colors">
          {langkah.judul}
        </h3>

        {/* Deskripsi */}
        <p className="text-sm sm:text-base text-muted leading-relaxed font-normal max-w-[58ch]">
          {langkah.deskripsi}
        </p>
      </div>

      {/* Garis Aksen Bawah Halus */}
      <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted">
        <span>Standar Eksekusi Presisi</span>
        <span className="text-cyan font-semibold">ViramidAgency Standard</span>
      </div>
    </motion.div>
  );
};
