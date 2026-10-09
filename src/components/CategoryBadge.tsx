import React from 'react';
import { KategoriProyek } from '../data/content';

interface CategoryBadgeProps {
  category: KategoriProyek | string;
  className?: string;
}

/**
 * CategoryBadge
 * Badge kategori proyek dengan border 1px dan warna aksen resmi.
 */
export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Website':
        return 'text-cyan';
      case 'Branding':
        return 'text-purple';
      case 'UI/UX':
        return 'text-orange';
      case 'Konten':
        return 'text-muted';
      default:
        return 'text-foreground';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium tracking-wide uppercase border border-border bg-surface ${getCategoryColor(
        category
      )} ${className}`}
    >
      {category}
    </span>
  );
};
