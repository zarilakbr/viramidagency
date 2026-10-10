/**
 * @file src/components/ui/VideoBanner.tsx
 * Komponen Banner Tengah (Mid-Banner) ViramidAgency.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from './Eyebrow';
import { Icon } from './Icon';
import type { BannerItem } from '../../data/content';

interface VideoBannerProps {
  banner: BannerItem;
  variant?: 'hero' | 'mid';
  eyebrowText?: string;
  className?: string;
}

export const VideoBanner: React.FC<VideoBannerProps> = ({
  banner,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden isolate select-none py-16 md:py-24 bg-[#074563] border-y border-[#165A7E] flex items-center justify-center ${className}`}
    >
      {/* Background Accent Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(176, 237, 249, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(176, 237, 249, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <Eyebrow variant="cyan" className="mb-4">
          KOLABORASI DIGITAL &amp; LMS
        </Eyebrow>

        <h2 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-[#B0EDF9] tracking-tight mb-4 text-balance">
          {banner.judul}
        </h2>

        {banner.subjudul && (
          <p className="text-sm sm:text-base text-[#78B9CA] max-w-[60ch] mb-8 leading-relaxed text-balance">
            {banner.subjudul}
          </p>
        )}

        <Link
          to={banner.tombolHref}
          className="h-12 px-8 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm sm:text-base transition-all duration-200 inline-flex items-center gap-2.5 shadow-md active:scale-[0.98]"
        >
          <span>{banner.tombolLabel}</span>
          <Icon name="arrow-right" size={18} />
        </Link>
      </div>
    </div>
  );
};
