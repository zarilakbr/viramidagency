import React from 'react';
import { Reveal } from './ui/Reveal';
import { Eyebrow } from './ui/Eyebrow';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  eyebrowText?: string;
  className?: string;
  variant?: 'navy' | 'orange' | 'cream';
}

/**
 * SectionHeading
 * Standar:
 * - Eyebrow monospace uppercase 12px
 * - Space Grotesk 700 (48px / text-3xl sm:text-4xl md:text-5xl)
 * - Subtitle maks 64 karakter per baris
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  eyebrowText,
  className = '',
  variant = 'navy',
}) => {
  const isOrangeBg = variant === 'orange';
  const isCreamBg = variant === 'cream';

  const titleColor = isOrangeBg
    ? 'text-navy-900'
    : isCreamBg
    ? 'text-navy-900'
    : 'text-cream';

  const subtitleColor = isOrangeBg
    ? 'text-navy-900/80'
    : isCreamBg
    ? 'text-navy-800'
    : 'text-muted';

  const eyebrowVariant = isOrangeBg ? 'navy' : isCreamBg ? 'orange' : 'orange';

  return (
    <Reveal className={`mb-10 md:mb-12 text-left ${className}`}>
      <div className="flex flex-col gap-2">
        <Eyebrow number={number} variant={eyebrowVariant}>
          {eyebrowText || `SEKSI ${number}`}
        </Eyebrow>

        <h2 className={`font-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-[-0.025em] leading-[1.15] text-balance ${titleColor}`}>
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
