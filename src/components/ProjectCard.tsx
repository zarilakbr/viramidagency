import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryBadge } from './CategoryBadge';
import { Icon } from './ui/Icon';
import { ProyekItem } from '../data/content';

interface ProjectCardProps {
  proyek: ProyekItem;
  className?: string;
  isLarge?: boolean;
}

/**
 * ProjectCard
 * Standar:
 * - Gambar dengan aspect-ratio tetap 16/10 dan object-cover
 * - Hover: border berubah ke oranye dan panah bergeser 4px (200ms)
 * - Border 1px, tanpa shadow
 * - Ikon panah arrow-up-right dari Icon.tsx
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  proyek,
  className = '',
}) => {
  const navigate = useNavigate();

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
    <article
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
      className={`group flex flex-col bg-surface border border-border hover:border-orange rounded-lg overflow-hidden cursor-pointer transition-colors duration-200 h-full ${className}`}
    >
      {/* Area Gambar Karya dengan Aspect Ratio Tetap 16/10 */}
      <div className="w-full relative aspect-[16/10] overflow-hidden bg-background border-b border-border flex items-center justify-center">
        {proyek.gambar && proyek.gambar.length > 0 && proyek.gambar[0] ? (
          <img
            src={proyek.gambar[0]}
            alt={proyek.judul}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-background relative select-none">
            {/* Visual Monogram Emblematis */}
            <div className="w-16 h-16 rounded border border-border bg-surface flex items-center justify-center group-hover:border-orange transition-colors duration-200">
              <span className="font-heading font-bold text-2xl text-foreground group-hover:text-orange transition-colors">
                {getInitials(proyek.judul)}
              </span>
            </div>
            <span className="mt-3 text-[11px] font-mono text-muted tracking-wider uppercase">
              {proyek.kategori} · Studi Kasus
            </span>
          </div>
        )}

        {/* Panah Navigasi Detail (Bergeser 4px saat hover) */}
        <div className="absolute top-3 right-3 text-muted group-hover:text-orange transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
          <Icon name="arrow-up-right" size="md" />
        </div>
      </div>

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
      </div>
    </article>
  );
};
