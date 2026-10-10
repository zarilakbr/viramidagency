/**
 * @file src/components/ServicesSection.tsx
 * Seksi Layanan ViramidAgency.
 * Berperan sebagai seksi pemecah ritme warna (Seksi Terang #F4F3FF) sesuai standar Part C.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { DAFTAR_LAYANAN } from '../data/content';
import { Icon } from './ui/Icon';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section
      id="layanan"
      className="relative py-20 md:py-28 bg-[#F4F3FF] text-[#0A0A2E] border-y border-[#D9D8F0] scroll-mt-16"
    >
      <div className="section-container">
        {/* Header Seksi Terang */}
        <div className="text-left mb-12">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-mono text-xs sm:text-sm font-semibold text-orange select-none">
              01 /
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#0A0A2E] tracking-[-0.025em] leading-[1.15]">
              Layanan Keahlian
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#47486B] max-w-2xl font-normal leading-relaxed mt-3">
            Solusi rekayasa digital terintegrasi untuk memperkuat identitas visual, antarmuka interaktif, dan performa konversi bisnismu.
          </p>
        </div>

        {/* Daftar Layanan Terang */}
        <div className="flex flex-col border-t border-[#D9D8F0]">
          {DAFTAR_LAYANAN.map((item) => (
            <Link
              key={item.id}
              to="/booking"
              onClick={() => onSelectService?.(item.nama)}
              className="group py-8 md:py-10 border-b border-[#D9D8F0] hover:border-orange transition-all duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/60 px-3 sm:px-4 rounded-lg"
            >
              {/* Nomor & Nama Layanan */}
              <div className="flex items-start md:items-center gap-6 md:gap-8 md:w-5/12">
                <span className="font-mono text-xs sm:text-sm text-[#73749B] group-hover:text-orange font-semibold transition-colors">
                  {item.nomor}
                </span>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#0A0A2E] group-hover:text-orange transition-colors tracking-tight">
                  {item.nama}
                </h3>
              </div>

              {/* Deskripsi */}
              <p className="text-sm md:text-base text-[#47486B] md:w-6/12 leading-relaxed max-w-[65ch]">
                {item.deskripsi}
              </p>

              {/* Panah Navigasi */}
              <div className="flex justify-end md:w-1/12 text-[#73749B] group-hover:text-orange transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                <Icon name="arrow-up-right" size="lg" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
