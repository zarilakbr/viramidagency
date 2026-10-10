import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * ViramidAgency Vector Monogram Mark
 * Pyramid / "V" geometric mark in exclusive 2-Color brand identity:
 * HEX #04344C (Deep Ocean Teal) & HEX #B0EDF9 (Ice Cyan).
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
      {/* Background #04344C with subtle #165A7E border */}
      <rect width="48" height="48" rx="10" fill="#04344C" stroke="#165A7E" strokeWidth="1.5" />
      
      {/* Left Pyramid Facet (Primary Ice Cyan #B0EDF9) */}
      <path
        d="M24 8L10 38H21L24 19L24 8Z"
        fill="#B0EDF9"
      />

      {/* Right Pyramid Facet (Ice Cyan with subtle opacity #B0EDF9 / 0.8) */}
      <path
        d="M24 8L24 19L27 38H38L24 8Z"
        fill="#B0EDF9"
        fillOpacity="0.75"
      />

      {/* Center Triangle Apex / Prism Accent (Pure Solid Cyan #B0EDF9) */}
      <path
        d="M24 13L19 32H29L24 13Z"
        fill="#B0EDF9"
      />

      {/* Modern Center Core (Deep #04344C Cutout creating geometric V) */}
      <path
        d="M24 20L21 29H27L24 20Z"
        fill="#04344C"
      />

      {/* Base Light Bar Accent */}
      <path
        d="M16 39.5H32"
        stroke="#B0EDF9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Logo ViramidAgency
 * Menampilkan logo resmi agency bervektor presisi dengan tipografi brand Gastilo.
 */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 32, showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <ViramidLogoMark size={size} />

      {showText && (
        <span className="font-heading font-bold text-lg tracking-tight text-[#B0EDF9] flex items-center">
          <span>Viramid</span>
          <span className="text-[#B0EDF9] opacity-80 ml-1">Agency</span>
        </span>
      )}
    </div>
  );
};
