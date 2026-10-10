/**
 * @file src/components/ServicesSection.tsx
 * Seksi Layanan ViramidAgency.
 * Ritme Warna: Latar Ice Cyan (#B0EDF9) solid, teks Deep Teal (#04344C).
 * Baris layanan saat hover berubah menjadi latar Deep Teal (#04344C) dengan teks Ice Cyan (#B0EDF9).
 * Font Judul: Gastilo.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { SectionHeading } from './SectionHeading';
import { DAFTAR_LAYANAN } from '../data/content';
import { Icon } from './ui/Icon';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section
      id="layanan"
      className="relative py-[72px] sm:py-[120px] bg-[#B0EDF9] text-[#04344C] scroll-mt-16"
    >
      <Container>
        {/* Header Seksi Latar Ice Cyan */}
        <SectionHeading
          number="01"
          eyebrowText="KAPABILITAS & SOLUSI"
          title="Layanan Keahlian"
          subtitle="Solusi rekayasa digital terintegrasi untuk memperkuat identitas visual, antarmuka interaktif LMS & Web, serta performa konversi bisnismu."
          variant="cyan"
        />

        {/* Daftar Layanan */}
        <div className="flex flex-col border-t border-[#04344C]/20 mt-8">
          {DAFTAR_LAYANAN.map((item) => (
            <Link
              key={item.id}
              to="/booking"
              onClick={() => onSelectService?.(item.nama)}
              className="group py-8 md:py-10 border-b border-[#04344C]/20 transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 sm:px-6 rounded-2xl hover:bg-[#04344C] hover:text-[#B0EDF9]"
            >
              {/* Nomor & Nama Layanan */}
              <div className="flex items-start md:items-center gap-6 md:gap-8 md:w-5/12">
                <span className="font-mono text-xs sm:text-sm text-[#04344C]/70 group-hover:text-[#B0EDF9] font-bold transition-colors">
                  [{item.nomor}]
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#04344C] group-hover:text-[#B0EDF9] transition-colors tracking-tight">
                  {item.nama}
                </h3>
              </div>

              {/* Deskripsi */}
              <p className="text-sm md:text-base text-[#04344C]/80 group-hover:text-[#B0EDF9]/80 md:w-6/12 leading-relaxed max-w-[64ch] transition-colors">
                {item.deskripsi}
              </p>

              {/* Panah Navigasi */}
              <div className="flex justify-end md:w-1/12 text-[#04344C] group-hover:text-[#B0EDF9] transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                <Icon name="arrow-up-right" size="lg" strokeWidth={2} />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
