/**
 * @file src/components/ProjectCard.tsx
 * Kartu Proyek ViramidAgency dengan efek gambar tersingkap (clip-path inset reveal),
 * badge live URL jika tersedia, dan follower label "Lihat" pada desktop.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CategoryBadge } from './CategoryBadge';
import { Icon } from './ui/Icon';
import type { ProyekItem } from '../data/content';

interface ProjectCardProps {
  proyek: ProyekItem;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  proyek,
  className = '',
}) => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <article
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      role="button"
      tabIndex={0}
      className={`group relative flex flex-col bg-surface border border-border hover:border-orange rounded-xl overflow-hidden cursor-pointer transition-colors duration-200 h-full ${className}`}
    >
      {/* Area Gambar Karya dengan Aspect Ratio Tetap 16/10 & Clip-Path Reveal 700ms */}
      <motion.div
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full relative aspect-[16/10] overflow-hidden bg-background border-b border-border flex items-center justify-center"
      >
        {proyek.gambar && proyek.gambar.length > 0 && proyek.gambar[0] ? (
          <img
            src={proyek.gambar[0]}
            alt={proyek.judul}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-background relative select-none">
            <div className="w-16 h-16 rounded-xl border border-border bg-surface flex items-center justify-center group-hover:border-orange transition-colors duration-200 shadow-sm">
              <span className="font-heading font-bold text-2xl text-foreground group-hover:text-orange transition-colors">
                {getInitials(proyek.judul)}
              </span>
            </div>
            <span className="mt-3 text-[11px] font-mono text-muted tracking-wider uppercase">
              {proyek.kategori} · Studi Kasus
            </span>
          </div>
        )}

        {/* Live URL Pill (Top Left if available) */}
        {proyek.url && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-950/90 border border-border text-[10px] font-mono text-green-400 backdrop-blur-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span>Live Website</span>
            </span>
          </div>
        )}

        {/* Floating "Lihat" Pill Follower (Desktop Only) */}
        {isHovered && (
          <motion.div
            className="hidden md:flex absolute pointer-events-none z-20 px-3 py-1.5 rounded-full bg-orange text-navy font-heading font-bold text-xs shadow-md items-center gap-1 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: mousePos.x,
              top: mousePos.y,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <span>Lihat</span>
            <Icon name="arrow-up-right" size={13} strokeWidth={2.5} />
          </motion.div>
        )}

        {/* Panah Navigasi Detail Pojok Kanan Atas */}
        <div className="absolute top-3 right-3 text-muted group-hover:text-orange transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
          <Icon name="arrow-up-right" size="md" />
        </div>
      </motion.div>

      {/* Konten Metadata & Deskripsi */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <CategoryBadge category={proyek.kategori} />
            <span className="font-mono text-xs text-muted tabular-nums">
              {proyek.tahun}
            </span>
          </div>

          <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground group-hover:text-orange transition-colors tracking-tight">
            {proyek.judul}
          </h3>

          <p className="text-xs sm:text-sm text-muted mt-1 font-mono">
            Klien: <span className="text-foreground">{proyek.klien}</span>
          </p>
        </div>

        <p className="text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed max-w-[65ch]">
          {proyek.ringkasan}
        </p>

        {/* External Link Direct CTA if URL exists */}
        {proyek.url && (
          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs font-mono">
            <span className="text-muted">Domain: {new URL(proyek.url).hostname}</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                window.open(proyek.url, '_blank', 'noopener,noreferrer');
              }}
              className="text-orange hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <span>Kunjungi Live</span>
              <Icon name="arrow-up-right" size={12} />
            </span>
          </div>
        )}
      </div>
    </article>
  );
};
