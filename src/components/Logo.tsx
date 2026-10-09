import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

/**
 * Logo ViramidAgency
 * Menampilkan logo resmi agency: segitiga tiga pita lengkung tumpang tindih
 * dengan gradien oranye, cyan, dan ungu.
 */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 36, showText = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div
        className="relative shrink-0 rounded-xl overflow-hidden shadow-md shadow-[#342056]/50 border border-[#5a3c8e]/60 bg-[#090A22] flex items-center justify-center transition-transform duration-300 hover:scale-105"
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
        <span className="font-heading font-bold text-xl tracking-tight text-[#F4F3FF]">
          Viramid
          <span className="bg-gradient-to-r from-[#FF9900] via-[#22D3C5] to-[#C084FC] bg-clip-text text-transparent">
            Agency
          </span>
        </span>
      )}
    </div>
  );
};
