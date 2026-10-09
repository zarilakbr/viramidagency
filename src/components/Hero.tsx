import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { Icon } from './ui/Icon';
import { PROFIL_AGENCY } from '../data/content';

/**
 * Hero Section ViramidAgency
 * Standar:
 * - Video latar belakang penuh (full width) terlihat jelas & kontras
 * - Video berada di layer z-0 (di atas kanvas, di bawah teks z-10)
 * - Autoplay terjamin dengan muted & play promise handler
 * - Editorial & tegas: Space Grotesk 700, teks rata kiri
 */
export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch((err) => {
        console.warn('[Hero Video] Autoplay dicegah browser:', err);
      });
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background Video Penuh di Layer z-0 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          src="/videos/Logo_animation_for_Viramid_Agency.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-75 md:opacity-85"
        />

        {/* Lapisan gradien tipis: pekat di sisi kiri agar teks terbaca tajam, transparan di sisi kanan agar animasi logo tampak jelas */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/95 via-background/70 to-background/25" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Konten Teks di Layer z-10 */}
      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col items-start text-left max-w-[880px]">
          {/* Label Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <span className="text-xs font-mono font-medium tracking-wider uppercase text-cyan px-2.5 py-1 rounded border border-border bg-surface/90">
              {PROFIL_AGENCY.label}
            </span>
          </motion.div>

          {/* Judul Utama Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground mb-6 text-balance"
          >
            {PROFIL_AGENCY.tagline}
          </motion.h1>

          {/* Subteks deskriptif maks 68 karakter */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-xl text-muted font-normal leading-relaxed mb-8 max-w-[65ch]"
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
              className="group font-semibold"
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

          {/* Bukti Kualitas Kerja Nyata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 pt-6 border-t border-border/80 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono text-muted w-full"
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
      </div>
    </section>
  );
};
