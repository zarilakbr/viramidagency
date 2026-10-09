import React from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { TriLoopMotif } from './ThreeArcsMotif';
import { Icon } from './ui/Icon';
import { PROFIL_AGENCY } from '../data/content';

/**
 * Hero Section ViramidAgency
 * Standar:
 * - Editorial & tegas: Space Grotesk 700, teks rata kiri
 * - Animasi masuk berurutan (label -> judul -> subteks -> tombol) total di bawah 1 detik
 * - Container 1200px, padding 32px (mobile 16px)
 * - Ikon baku dari Icon.tsx tanpa simbol unicode
 */
export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative section-container pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Video: Logo Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        <video
          src="/videos/Logo_animation_for_Viramid_Agency.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        />
        {/* Lapisan gradien halus agar teks editorial tetap kontras & tajam */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left column: Typography & CTAs (Max width 880px / 65ch) */}
        <div className="lg:col-span-8 flex flex-col items-start text-left max-w-[800px]">
          {/* Label Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <span className="text-xs font-mono font-medium tracking-wider uppercase text-cyan px-2.5 py-1 rounded border border-border bg-surface">
              {PROFIL_AGENCY.label}
            </span>
          </motion.div>

          {/* Judul Utama Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.06] tracking-tight text-foreground mb-6"
          >
            {PROFIL_AGENCY.tagline}
          </motion.h1>

          {/* Subteks deskriptif maks 68 karakter */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-muted font-normal leading-relaxed mb-8 max-w-[65ch]"
          >
            {PROFIL_AGENCY.deskripsi}
          </motion.p>

          {/* Tombol Aksi */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button
              as="button"
              variant="primary"
              onClick={() => scrollTo('karya')}
              className="group"
            >
              <span>Lihat Karya</span>
              <Icon
                name="arrow-down-right"
                size="sm"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </Button>

            <Button
              as="button"
              variant="ghost"
              onClick={() => scrollTo('kontak')}
              className="group"
            >
              <span>Hubungi Kami</span>
              <Icon
                name="arrow-right"
                size="sm"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          </motion.div>

          {/* Bukti Kualitas Kerja Nyata (Tanpa Unicode) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-muted"
          >
            <span className="flex items-center gap-2">
              <Icon name="check" size="sm" className="text-orange" />
              <span>Kode Bersih &amp; Kecepatan 99+</span>
            </span>
            <span className="flex items-center gap-2">
              <Icon name="check" size="sm" className="text-orange" />
              <span>Desain Orisinal Tanpa Template</span>
            </span>
            <span className="flex items-center gap-2">
              <Icon name="check" size="sm" className="text-orange" />
              <span>Kolaborasi Tim Langsung</span>
            </span>
          </motion.div>
        </div>

        {/* Right column: TriLoopMotif */}
        <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
          <TriLoopMotif />
        </div>
      </div>
    </section>
  );
};
