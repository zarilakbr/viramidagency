import React from 'react';
import { useReveal } from '../../hooks/useReveal';

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number; // 0 sampai 4 untuk stagger 60ms
  as?: React.ElementType;
}

/**
 * Komponen pembungkus scroll reveal.
 * Standar:
 * - Durasi 600ms, translateY 16px ke 0, opacity 0 ke 1
 * - Easing cubic-bezier(0.22, 1, 0.36, 1)
 * - Stagger 60ms per index (maksimum 5 elemen berurutan)
 * - Hanya mentransformasi transform dan opacity
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delayIndex = 0,
  as: Component = 'div',
}) => {
  // Batasi stagger index maksimum 5 elemen (0 sampai 4)
  const cappedIndex = Math.min(Math.max(delayIndex, 0), 4);
  const delayMs = cappedIndex * 60;

  const { ref, isVisible } = useReveal<HTMLDivElement>({
    delay: delayMs,
  });

  return (
    <Component
      ref={ref}
      style={{
        transitionProperty: 'opacity, transform',
        transitionDuration: '600ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={`${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </Component>
  );
};
