import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * Logo ViramidAgency
 * Menampilkan logo resmi agency dari file logo pengguna (/logo.jpg) dengan bingkai presisi
 * berbingkai 1px border #165A7E dan tipografi brand Gastilo.
 */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 32, showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        className="relative shrink-0 rounded-lg overflow-hidden border border-[#165A7E] bg-[#04344C] flex items-center justify-center shadow-sm"
        style={{ width: size, height: size }}
      >
        <img
          src="/logo.jpg"
          alt="ViramidAgency Logo"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {showText && (
        <span className="font-heading font-bold text-lg tracking-tight text-[#B0EDF9] flex items-center">
          <span>Viramid</span>
          <span className="text-[#B0EDF9] opacity-80 ml-1">Agency</span>
        </span>
      )}
    </div>
  );
};

export const ViramidLogoMark = Logo;
