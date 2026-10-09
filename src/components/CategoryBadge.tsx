import React from 'react';
import { KategoriProyek } from '../data/content';

interface CategoryBadgeProps {
  category: KategoriProyek | string;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Website':
        return 'text-[#22D3C5] border-[#22D3C5]/40 bg-[#22D3C5]/10';
      case 'Branding':
        return 'text-[#C26FE0] border-[#C26FE0]/40 bg-[#C26FE0]/10';
      case 'UI/UX':
        return 'text-[#F97316] border-[#F97316]/40 bg-[#F97316]/10';
      case 'Konten':
        return 'text-[#FDBA4D] border-[#FDBA4D]/40 bg-[#FDBA4D]/10';
      default:
        return 'text-[#B8A9D4] border-[#5a3c8e] bg-[#412a6a]';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase border ${getCategoryColor(
        category
      )} ${className}`}
    >
      {category}
    </span>
  );
};
