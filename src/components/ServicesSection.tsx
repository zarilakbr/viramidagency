import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { DAFTAR_LAYANAN } from '../data/content';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

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
    <section id="layanan" className="py-24 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        number="01"
        title="Layanan"
        subtitle="Solusi terintegrasi untuk memperkuat identitas, antarmuka digital, dan pertumbuhan bisnis Anda."
      />

      {/* Daftar vertikal bergaya editorial dengan scroll-reveal & micro-interactions */}
      <div className="flex flex-col border-t border-[#5a3c8e]">
        {DAFTAR_LAYANAN.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            onClick={() => handleClick(item.nama)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(item.nama);
              }
            }}
            whileHover={{ x: 6 }}
            className="group py-8 md:py-10 border-b border-[#5a3c8e] hover:border-[#F97316] transition-colors duration-200 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 focus-visible:outline-2 focus-visible:outline-[#22D3C5] focus-visible:outline-offset-4 rounded-sm"
          >
            {/* Nomor & Nama Layanan */}
            <div className="flex items-start md:items-center gap-6 md:gap-10 md:w-5/12">
              <span className="font-mono text-sm md:text-base text-[#B8A9D4] group-hover:text-[#F97316] transition-colors">
                {item.nomor}
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F4F3FF] group-hover:text-[#FDBA4D] transition-colors tracking-tight">
                {item.nama}
              </h3>
            </div>

            {/* Deskripsi Pendek */}
            <p className="text-sm md:text-base text-[#B8A9D4] md:w-6/12 leading-relaxed">
              {item.deskripsi}
            </p>

            {/* Panah di kanan */}
            <div className="flex justify-end md:w-1/12">
              <div className="w-10 h-10 rounded-full border border-[#5a3c8e] group-hover:border-[#F97316] group-hover:bg-[#F97316] flex items-center justify-center text-[#B8A9D4] group-hover:text-[#0A0A2E] transition-all duration-200">
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
