import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { DAFTAR_LAYANAN } from '../data/content';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

/**
 * ServicesSection
 * Standar:
 * - Editorial list dengan 1px border divider
 * - Space Grotesk 700
 * - Ikon panah arrow-up-right dari Icon.tsx (polos tanpa lingkaran gradasi)
 * - Container 1200px, margin seksi 120px (mobile 72px)
 */
export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const handleClick = (namaLayanan: string) => {
    if (onSelectService) {
      onSelectService(namaLayanan);
    }
    const el = document.getElementById('kontak');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="layanan" className="section-container section-spacing scroll-mt-20">
      <SectionHeading
        number="01"
        title="Layanan"
        subtitle="Solusi terintegrasi untuk memperkuat identitas, antarmuka digital, dan pertumbuhan bisnis Anda."
      />

      <div className="flex flex-col border-t border-border">
        {DAFTAR_LAYANAN.map((item, index) => (
          <Reveal
            key={item.id}
            delayIndex={index}
            className="w-full"
          >
            <div
              onClick={() => handleClick(item.nama)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick(item.nama);
                }
              }}
              className="group py-8 md:py-10 border-b border-border hover:border-orange transition-colors duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Nomor & Nama Layanan */}
              <div className="flex items-start md:items-center gap-6 md:gap-8 md:w-5/12">
                <span className="font-mono text-xs sm:text-sm text-muted group-hover:text-orange transition-colors">
                  {item.nomor}
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground group-hover:text-orange transition-colors tracking-tight">
                  {item.nama}
                </h3>
              </div>

              {/* Deskripsi Pendek */}
              <p className="text-sm md:text-base text-muted md:w-6/12 leading-relaxed max-w-[65ch]">
                {item.deskripsi}
              </p>

              {/* Panah polos tanpa lingkaran warna acak */}
              <div className="flex justify-end md:w-1/12 text-muted group-hover:text-orange transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                <Icon name="arrow-up-right" size="lg" strokeWidth={1.5} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
