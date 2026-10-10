import React from 'react';
import { KategoriProyek } from '../data/content';

interface CategoryBadgeProps {
  category: KategoriProyek | string;
  className?: string;
}

/**
 * CategoryBadge
 * Eksklusif 2 Warna: HEX #04344C (Deep Teal) & HEX #B0EDF9 (Ice Cyan).
 */
export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const getBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'Website':
        return 'bg-[#B0EDF9] text-[#04344C] font-bold border-transparent';
      case 'Branding':
        return 'bg-transparent border border-[#B0EDF9] text-[#B0EDF9] font-semibold';
      case 'UI/UX':
        return 'bg-[#074563] border border-[#165A7E] text-[#B0EDF9] font-medium';
      case 'Konten':
      default:
        return 'bg-transparent border border-[#165A7E] text-[#78B9CA] font-normal';
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
