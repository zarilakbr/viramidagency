import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * Logo ViramidAgency
 * Menampilkan logo resmi agency berbingkai 1px tanpa shadow tebal.
 */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 32, showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        className="relative shrink-0 rounded-md overflow-hidden border border-border bg-surface flex items-center justify-center"
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
        <span className="font-heading font-bold text-lg tracking-tight text-foreground">
          Viramid
          <span className="text-orange ml-1">
            Agency
          </span>
        </span>
      )}
    </div>
  );
};
