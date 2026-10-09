import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';
import { ProyekItem } from '../data/content';

interface ProjectCardProps {
  proyek: ProyekItem;
  className?: string;
  isLarge?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  proyek,
  className = '',
  isLarge = false,
}) => {
  const navigate = useNavigate();

  // Extract initials for fallback visual
  const getInitials = (text: string) => {
    const clean = text.replace(/[\[\]]/g, '').trim();
    const parts = clean.split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase() || 'VA';
  };

  const handleCardClick = () => {
    navigate(`/karya/${proyek.slug}`);
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
      className={`group flex flex-col bg-[#412a6a]/90 border border-[#5a3c8e] hover:border-[#F97316] rounded-2xl overflow-hidden cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#22D3C5] focus-visible:outline-offset-2 shadow-lg hover:shadow-2xl hover:shadow-[#F97316]/10 ${className}`}
    >
      {/* Area Gambar atau Visual Mockup Card */}
      <div
        className={`w-full relative overflow-hidden bg-[#271742] flex items-center justify-center border-b border-[#5a3c8e] ${
          isLarge ? 'h-64 sm:h-80' : 'h-52 sm:h-64'
        }`}
      >
        {proyek.gambar && proyek.gambar.length > 0 && proyek.gambar[0] ? (
          <img
            src={proyek.gambar[0]}
            alt={proyek.judul}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#3b2361] via-[#271742] to-[#1c1236] relative select-none">
            {/* Subtle decorative dot/grid */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F4F3FF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            {/* Center Monogram Emblem */}
            <div className="relative w-20 h-20 rounded-2xl border border-[#5a3c8e] bg-[#342056]/80 flex items-center justify-center group-hover:border-[#F97316] group-hover:scale-110 transition-all duration-300 shadow-xl">
              <span className="font-heading font-bold text-2xl sm:text-3xl tracking-wider text-[#F4F3FF] group-hover:text-[#F97316] transition-colors">
                {getInitials(proyek.judul)}
              </span>
            </div>
            
            <span className="mt-3 text-xs font-mono text-[#B8A9D4] tracking-wider uppercase">
              {proyek.kategori} Case Study
            </span>
          </div>
        )}

        {/* Hover Arrow Overlay */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#342056] border border-[#5a3c8e] group-hover:border-[#F97316] group-hover:bg-[#F97316] flex items-center justify-center text-[#F4F3FF] group-hover:text-[#1c1236] opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 shadow-xl">
          <ArrowUpRight size={18} strokeWidth={2} />
        </div>
      </div>

      {/* Konten Kartu */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Metadata: Tag Kategori & Tahun */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <CategoryBadge category={proyek.kategori} />
            <span className="font-mono text-xs text-[#B8A9D4] tabular-nums font-medium">
              {proyek.tahun}
            </span>
          </div>

          {/* Nama Proyek */}
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F4F3FF] group-hover:text-[#FDBA4D] transition-colors tracking-tight">
            {proyek.judul}
          </h3>

          {/* Nama Klien */}
          <p className="text-sm text-[#B8A9D4] mt-1 font-normal">
            Klien: <span className="text-[#F4F3FF] font-medium">{proyek.klien}</span>
          </p>
        </div>

        {/* Ringkasan Singkat */}
        <p className="text-xs sm:text-sm text-[#B8A9D4] line-clamp-2 leading-relaxed">
          {proyek.ringkasan}
        </p>
      </div>
    </motion.article>
  );
};
