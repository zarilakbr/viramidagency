/**
 * @file src/components/ui/VideoBanner.tsx
 * Komponen banner video terpadu untuk Hero (Banner 1) dan Banner Tengah (Banner 2).
 * Memenuhi spesifikasi pemutaran cerdas, aksesibilitas WCAG, reduced-motion, dan overlay navy-900 solid 60%.
 */

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';
import { Eyebrow } from './Eyebrow';
import { Icon } from './Icon';
import type { BannerItem } from '../../data/content';

interface VideoBannerProps {
  banner: BannerItem;
  variant: 'hero' | 'mid';
  eyebrowText?: string;
  className?: string;
}

export const VideoBanner: React.FC<VideoBannerProps> = ({
  banner,
  variant,
  eyebrowText,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Deteksi prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Pemutaran cerdas: IntersectionObserver & Page Visibility API
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || prefersReducedMotion || videoError) return;

    video.defaultMuted = true;
    video.muted = true;

    // 1. Pause saat tab tidak aktif, play saat kembali aktif
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 2. IntersectionObserver: Pause saat keluar layar, Play saat masuk layar
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [prefersReducedMotion, videoError]);

  const isHero = variant === 'hero';

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden isolate select-none ${
        isHero
          ? 'min-h-[560px] h-[min(88svh,760px)] flex items-center justify-center pt-16 md:pt-20'
          : 'h-[320px] md:h-[440px] flex items-center justify-center my-0'
      } ${className}`}
    >
      {/* 1. Latar Belakang Video dengan Fallback Poster & Object-fit Cover */}
      {!prefersReducedMotion && !videoError ? (
        <video
          ref={videoRef}
          src={banner.video}
          poster={banner.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      ) : (
        <img
          src={banner.poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      )}

      {/* 2. Overlay Navy-900 Solid dengan Opasitas 60% (Tanpa Gradasi) */}
      <div
        className="absolute inset-0 z-1 bg-navy-900/60 pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Konten Teks & Tombol di Atas Video */}
      {isHero ? (
        <Container className="relative z-10 w-full">
          <div className="max-w-3xl flex flex-col items-start text-left">
            {/* Eyebrow Label */}
            <Eyebrow number="00" variant="orange" className="mb-4 sm:mb-6">
              {eyebrowText || 'DIGITAL & CREATIVE AGENCY'}
            </Eyebrow>

            {/* Judul 72px Space Grotesk 700 dengan aksen kata kunci Oranye */}
            <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[72px] text-cream tracking-[-0.03em] leading-[1.08] mb-5 text-balance">
              Kami membangun brand dan website yang{' '}
              <span className="text-orange">bekerja</span> untuk bisnismu.
            </h1>

            {/* Subteks Krem 18px (Maks 64 karakter) */}
            {banner.subjudul && (
              <p className="text-base sm:text-lg text-cream/90 max-w-[64ch] font-normal leading-[1.7] mb-8 text-balance">
                {banner.subjudul}
              </p>
            )}

            {/* Dua Tombol CTA: Oranye Solid & Outline Krem */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                to={banner.tombolHref}
                className="h-12 px-7 rounded-full bg-orange hover:bg-orange-hover text-navy-900 font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]"
              >
                <span>{banner.tombolLabel}</span>
                <Icon name="arrow-right" size={18} />
              </Link>

              {banner.tombolKeduaLabel && banner.tombolKeduaHref && (
                <a
                  href={banner.tombolKeduaHref}
                  className="h-12 px-7 rounded-full border border-cream/50 hover:border-orange bg-transparent text-cream hover:text-orange font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>{banner.tombolKeduaLabel}</span>
                  <Icon name="chevron-down" size={16} />
                </a>
              )}
            </div>
          </div>
        </Container>
      ) : (
        /* Variant Banner Tengah (Lebar penuh, tanpa rounded, tanpa shadow) */
        <div className="relative z-10 w-full px-6 py-8">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            <Eyebrow variant="orange" className="mb-3">
              KOLABORASI DIGITAL
            </Eyebrow>

            <h2 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-cream tracking-tight mb-4 text-balance">
              {banner.judul}
            </h2>

            {banner.subjudul && (
              <p className="text-sm sm:text-base text-cream/80 max-w-[60ch] mb-6 leading-relaxed text-balance">
                {banner.subjudul}
              </p>
            )}

            <Link
              to={banner.tombolHref}
              className="h-12 px-8 rounded-full bg-orange hover:bg-orange-hover text-navy-900 font-heading font-bold text-sm sm:text-base transition-all duration-200 inline-flex items-center gap-2 shadow-md active:scale-[0.98]"
            >
              <span>{banner.tombolLabel}</span>
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
