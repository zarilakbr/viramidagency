import React from 'react';
import { ICON_MAP, type IconName } from '../../lib/icons';

export type IconSize = 'sm' | 'md' | 'lg';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: IconSize | number;
  className?: string;
  strokeWidth?: number;
  'aria-label'?: string;
}

const SIZE_MAP: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

/**
 * Komponen tunggal untuk seluruh ikon website.
 * Standar:
 * - Ukuran baku: sm (16px), md (20px), lg (24px)
 * - Stroke: 1.5px
 * - Warna: currentColor (mewarisi warna teks sekitar)
 * - Sejajar vertikal dengan teks (inline-block align-middle)
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className = '',
  strokeWidth = 1.5,
  'aria-label': ariaLabel,
  ...props
}) => {
  const Component = ICON_MAP[name];

  if (!Component) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Icon] Ikon "${name}" tidak ditemukan di ICON_MAP.`);
    }
    return null;
  }

  const numericSize = typeof size === 'number' ? size : SIZE_MAP[size] || 20;

  return (
    <Component
      size={numericSize}
      strokeWidth={strokeWidth}
      color="currentColor"
      className={`inline-block align-middle shrink-0 ${className}`}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
      {...props}
    />
  );
};
