import React from 'react';
import { KategoriProyek } from '../data/content';

interface CategoryBadgeProps {
  category: KategoriProyek | string;
  className?: string;
}

/**
 * CategoryBadge
 * Tag kategori dibedakan lewat isian dan garis (bukan warna cyan/purple):
 * - Website = isi oranye teks navy (bg-orange text-navy-900 font-bold)
 * - Branding = outline oranye teks oranye (border border-orange text-orange)
 * - UI/UX = outline krem teks krem (border border-cream/60 text-cream)
 * - Konten = outline muted teks muted (border border-muted/50 text-muted)
 */
export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const getBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'Website':
        return 'bg-orange text-navy-900 font-bold border-transparent';
      case 'Branding':
        return 'bg-transparent border border-orange text-orange font-semibold';
      case 'UI/UX':
        return 'bg-transparent border border-cream/60 text-cream font-medium';
      case 'Konten':
      default:
        return 'bg-transparent border border-muted/50 text-muted font-normal';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono tracking-wide uppercase transition-colors ${getBadgeStyle(
        category
      )} ${className}`}
    >
      {category}
    </span>
  );
};
