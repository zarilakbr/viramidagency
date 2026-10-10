/**
 * @file src/components/ui/Eyebrow.tsx
 * Label kecil monospace huruf kapital dengan tracking lebar (12px), standar seragam seluruh seksi.
 * Eksklusif palet #04344C & #B0EDF9.
 */

import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  number?: string;
  className?: string;
  variant?: 'cyan' | 'brand' | 'orange' | 'navy' | 'cream' | 'muted';
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  number,
  className = '',
  variant = 'cyan',
}) => {
  const variantStyles = {
    cyan: 'text-[#B0EDF9]',
    brand: 'text-[#B0EDF9]',
    orange: 'text-[#B0EDF9]',
    navy: 'text-[#04344C]',
    cream: 'text-[#B0EDF9]',
    muted: 'text-[#78B9CA]',
  }[variant];

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase ${variantStyles} ${className}`}
    >
      {number && (
        <span className="opacity-80">
          [{number}]
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};
