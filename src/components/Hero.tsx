import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Icon } from './ui/Icon';
import { PROFIL_AGENCY } from '../data/content';
import heroVideo from '../assets/videos/Logo_exit_animation.mp4';

/**
 * Hero Section ViramidAgency
 * Standar:
 * - Tiga lengkungan motif logo menyatu mengunci dari 3 arah (1.2s, sessionStorage guarded)
 * - Masked line-by-line headline reveal dengan garis bawah oranye yang tergambar
 * - CTA Utama: "Jadwalkan Konsultasi" menuju /booking
 * - CTA Kedua: "Lihat Karya" menuju #karya
 * - Tipografi di tengah (centered) dan responsif penuh di seluruh perangkat
 */
export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasAnimated, setHasAnimated] = useState<boolean>(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch((err) => {
        console.warn('[Hero Video] Autoplay dicegah browser:', err);
      });
    }

    // Periksa sessionStorage untuk animasi lengkungan logo
    try {
      const played = sessionStorage.getItem('viramid_hero_arcs_played');
      if (!played) {
        setHasAnimated(false);
        sessionStorage.setItem('viramid_hero_arcs_played', 'true');
      }
    } catch {
      // Fallback jika storage tidak tersedia
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
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

        {/* Lapisan vignette terpusat: menjaga kontras tajam */}
        <div className="absolute inset-0 z-[1] bg-background/60" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-background/70" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/70 via-transparent to-background/70" />
      </div>

      {/* Konten Teks Terpusat (Centered) di Layer z-10 */}
      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="flex flex-col items-center text-center max-w-[960px] mx-auto w-full">
          
          {/* Tiga Lengkungan Logo Menyatu (Converging 3-Arcs Triangle Lock) */}
          <div className="mb-4 relative w-16 h-16 flex items-center justify-center" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              {/* Lengkung Oranye (Dari Kiri Atas) */}
              <motion.path
                d="M 50 15 A 35 35 0 0 0 20 65"
                fill="none"
                stroke="#F97316"
                strokeWidth="7"
                strokeLinecap="round"
                initial={hasAnimated ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -35, y: -35 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Lengkung Cyan (Dari Kanan Atas) */}
              <motion.path
                d="M 20 65 A 35 35 0 0 0 80 65"
                fill="none"
                stroke="#22D3C5"
                strokeWidth="7"
                strokeLinecap="round"
                initial={hasAnimated ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 35, y: -35 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Lengkung Ungu (Dari Bawah) */}
              <motion.path
                d="M 80 65 A 35 35 0 0 0 50 15"
                fill="none"
                stroke="#C26FE0"
                strokeWidth="7"
                strokeLinecap="round"
                initial={hasAnimated ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 0, y: 40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </div>

          {/* Label Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 inline-flex items-center gap-2"
          >
            <span className="text-xs font-mono font-medium tracking-wider uppercase text-cyan px-3 py-1 rounded border border-border bg-surface/90">
              {PROFIL_AGENCY.label}
            </span>
          </motion.div>

          {/* Judul Utama Headline dengan Mask Reveal & Underline Oranye yang Tergambar */}
          <div className="overflow-hidden mb-6 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl lg:text-[60px] xl:text-[64px] leading-[1.2] sm:leading-[1.14] tracking-[-0.025em] text-foreground text-center !text-center max-w-4xl mx-auto w-full px-2 sm:px-4"
              style={{ textAlign: 'center' }}
            >
              <span>Kami membangun </span>
              <span className="relative inline-block text-foreground whitespace-nowrap">
                brand dan website
                {/* Garis Bawah Oranye yang Tergambar dari Kiri ke Kanan */}
                <motion.span
                  className="absolute left-0 bottom-0 sm:bottom-1 h-[3px] sm:h-[4px] bg-orange w-full rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
              </span>
              <span> yang bekerja untuk bisnismu.</span>
            </motion.h1>
          </div>

          {/* Subteks deskriptif terpusat proporsional */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-muted font-normal leading-[1.7] mb-9 max-w-[58ch] text-center !text-center mx-auto w-full px-2 sm:px-4"
            style={{ textAlign: 'center' }}
          >
            {PROFIL_AGENCY.deskripsi}
          </motion.p>

          {/* Tombol Aksi */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 w-full"
          >
            {/* Tombol Utama: Jadwalkan Konsultasi */}
            <Link
              to="/booking"
              className="py-3.5 px-6 rounded-xl bg-orange hover:bg-orange-hover text-navy font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center gap-2.5 shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <Icon name="calendar" size={18} />
              <span>Jadwalkan Konsultasi</span>
              <Icon name="arrow-right" size={16} />
            </Link>

            {/* Tombol Kedua: Lihat Karya */}
            <button
              type="button"
              onClick={() => scrollTo('karya')}
              className="py-3.5 px-6 rounded-xl border border-border bg-surface/80 hover:bg-surface text-foreground font-heading font-semibold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 hover:border-muted cursor-pointer"
            >
              <span>Lihat Karya</span>
              <Icon
                name="arrow-down-right"
                size={16}
                className="transition-transform duration-200"
              />
            </button>
          </motion.div>

          {/* Bukti Kualitas Kerja Nyata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
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
      </Container>
    </section>
  );
};
