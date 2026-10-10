import React from 'react';
import { VideoBanner } from './ui/VideoBanner';
import { DAFTAR_BANNER } from '../data/content';

/**
 * Hero Section ViramidAgency (Banner 1)
 * Menggunakan VideoBanner dengan video background, overlay solid navy-900 60%,
 * Eyebrow, judul 72px Space Grotesk 700 dengan aksen kata kunci oranye,
 * subteks krem 18px maks 64 karakter, dan dua tombol CTA baku.
 */
export const Hero: React.FC = () => {
  const heroBanner = DAFTAR_BANNER[0];

  return (
    <section id="hero" className="w-full">
      <VideoBanner
        banner={heroBanner}
        variant="hero"
        eyebrowText="DIGITAL & CREATIVE AGENCY"
      />
    </section>
  );
};
