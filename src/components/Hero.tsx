import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './Button';
import { Icon } from './ui/Icon';
import { PROFIL_AGENCY } from '../data/content';
import heroVideo from '../assets/videos/Logo_exit_animation.mp4';

/**
 * Hero Section ViramidAgency
 * Standar:
 * - Tipografi di tengah (centered) megah & seimbang di atas video latar belakang penuh
 * - Video berada di layer z-0 dengan overlay gradien vignette seimbang
 * - Autoplay terjamin dengan muted & play promise handler
 * - Space Grotesk 700, kontras tinggi, bebas kekosongan samping
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
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 pb-20 md:pt-40 md:pb-28">
      {/* Background Video Penuh di Layer z-0 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-75 md:opacity-85"
        />

        {/* Lapisan vignette terpusat: menjaga teks di tengah tetap tajam & video di belakang tetap hidup */}
        <div className="absolute inset-0 z-[1] bg-background/55" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/60" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Konten Teks Terpusat (Centered) di Layer z-10 */}
      <div className="section-container relative z-10 w-full flex flex-col items-center text-center">
        <div className="flex flex-col items-center text-center max-w-[960px] mx-auto">
          {/* Label Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2"
          >
            <span className="text-xs font-mono font-medium tracking-wider uppercase text-cyan px-3 py-1 rounded border border-border bg-surface/90">
              {PROFIL_AGENCY.label}
            </span>
          </motion.div>

          {/* Judul Utama Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.14] tracking-[-0.025em] text-foreground mb-6 text-balance text-center max-w-4xl mx-auto"
          >
            {PROFIL_AGENCY.tagline}
          </motion.h1>

          {/* Subteks deskriptif terpusat proporsional */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-muted font-normal leading-[1.7] mb-9 max-w-[56ch] text-balance text-center mx-auto"
          >
            {PROFIL_AGENCY.deskripsi}
          </motion.p>

          {/* Tombol Aksi */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
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
            className="mt-14 pt-6 border-t border-border/80 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-muted w-full"
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
