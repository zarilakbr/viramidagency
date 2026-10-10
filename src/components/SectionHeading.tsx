import React from 'react';
import { Reveal } from './ui/Reveal';
import { Eyebrow } from './ui/Eyebrow';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  eyebrowText?: string;
  className?: string;
  variant?: 'navy' | 'orange' | 'cream' | 'cyan';
}

/**
 * SectionHeading
 * Standar:
 * - Eyebrow monospace uppercase 12px
 * - Font Judul: Gastilo (font-heading font-bold)
 * - Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  eyebrowText,
  className = '',
  variant = 'navy',
}) => {
  const isCyanBg = variant === 'cyan' || variant === 'orange';

  const titleColor = isCyanBg
    ? 'text-[#04344C]'
    : 'text-[#B0EDF9]';

  const subtitleColor = isCyanBg
    ? 'text-[#04344C]/80'
    : 'text-[#78B9CA]';

  const eyebrowVariant = isCyanBg ? 'navy' : 'cyan';

  return (
    <Reveal className={`mb-10 md:mb-12 text-left ${className}`}>
      <div className="flex flex-col gap-2">
        <Eyebrow number={number} variant={eyebrowVariant}>
          {eyebrowText || `SEKSI ${number}`}
        </Eyebrow>

        <h2 className={`font-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.15] text-balance ${titleColor}`}>
          {title}
        </h2>
      </div>

      {subtitle && (
        <p className={`mt-3 text-sm sm:text-base max-w-[64ch] font-normal leading-[1.7] text-balance ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
};
