import React from 'react';
import { Reveal } from './ui/Reveal';

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * SectionHeading
 * Standar:
 * - Editorial & tegas: Space Grotesk 700
 * - Panjang baris subtitle maksimum 65 karakter
 * - Scroll reveal 600ms
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <Reveal className={`mb-10 md:mb-12 text-left ${className}`}>
      <div className="flex items-baseline gap-4 md:gap-5">
        <span
          className="font-mono text-xs sm:text-sm font-semibold text-orange select-none"
          aria-hidden="true"
        >
          {number} /
        </span>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-[-0.025em] leading-[1.15] text-balance">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-muted/90 max-w-[62ch] font-normal leading-[1.7] text-balance">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
};
