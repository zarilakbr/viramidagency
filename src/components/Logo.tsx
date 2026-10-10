import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * ViramidAgency Vector Monogram Mark
 * Pyramid / "V" geometric mark in brand Orange (#F97316), Gold highlight (#FDBA4D), and Cream (#F4F3FF).
 * Clean, sharp, mathematical, no rainbow or multi-color gradients.
 */
export const ViramidLogoMark: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Background soft dark foundation */}
      <rect width="48" height="48" rx="10" fill="#12123F" stroke="#262660" strokeWidth="1.5" />
      
      {/* Left Pyramid Facet (Primary Brand Orange) */}
      <path
        d="M24 8L10 38H21L24 19L24 8Z"
        fill="#F97316"
      />

      {/* Right Pyramid Facet (Warm Orange Glow / Deep Facet) */}
      <path
        d="M24 8L24 19L27 38H38L24 8Z"
        fill="#EA580C"
      />

      {/* Center Triangle Apex / Prism Accent (Gold Orange) */}
      <path
        d="M24 13L19 32H29L24 13Z"
        fill="#FDBA4D"
      />

      {/* Modern Center Core (Navy Cutout creating sharp geometric V) */}
      <path
        d="M24 20L21 29H27L24 20Z"
        fill="#0A0A2E"
      />

      {/* Base Light Bar Accent */}
      <path
        d="M16 39.5H32"
        stroke="#F4F3FF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Logo ViramidAgency
 * Menampilkan logo resmi agency bervektor presisi dengan tipografi brand.
 */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 32, showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <ViramidLogoMark size={size} />

      {showText && (
        <span className="font-heading font-bold text-lg tracking-tight text-cream flex items-center">
          <span>Viramid</span>
          <span className="text-orange ml-1">Agency</span>
        </span>
      )}
    </div>
  );
};
