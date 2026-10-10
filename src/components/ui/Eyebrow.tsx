/**
 * @file src/components/ui/Eyebrow.tsx
 * Label kecil monospace huruf kapital dengan tracking lebar (12px), standar seragam seluruh seksi.
 */

import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  number?: string;
  className?: string;
  variant?: 'orange' | 'navy' | 'cream' | 'muted';
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  number,
  className = '',
  variant = 'orange',
}) => {
  const variantStyles = {
    orange: 'text-orange',
    navy: 'text-navy-900',
    cream: 'text-cream',
    muted: 'text-muted',
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
