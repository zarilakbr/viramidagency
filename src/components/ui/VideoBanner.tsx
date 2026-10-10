/**
 * @file src/components/ui/VideoBanner.tsx
 * Komponen Banner Tengah (Mid-Banner) ViramidAgency.
 * Desain arsitektural dark navy yang bersih dengan aksen garis presisi dan CTA berkonversi tinggi.
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
      className={`relative w-full overflow-hidden isolate select-none py-16 md:py-24 bg-surface border-y border-border flex items-center justify-center ${className}`}
    >
      {/* Background Accent Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(244, 243, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(244, 243, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <Eyebrow variant="orange" className="mb-4">
          KOLABORASI DIGITAL
        </Eyebrow>

        <h2 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl text-cream tracking-tight mb-4 text-balance">
          {banner.judul}
        </h2>

        {banner.subjudul && (
          <p className="text-sm sm:text-base text-muted max-w-[60ch] mb-8 leading-relaxed text-balance">
            {banner.subjudul}
          </p>
        )}

        <Link
          to={banner.tombolHref}
          className="h-12 px-8 rounded-full bg-orange hover:bg-orange-hover text-navy-900 font-heading font-bold text-sm sm:text-base transition-all duration-200 inline-flex items-center gap-2.5 shadow-md active:scale-[0.98]"
        >
          <span>{banner.tombolLabel}</span>
          <Icon name="arrow-right" size={18} />
        </Link>
      </div>
    </div>
  );
};
