import React, { useState, useEffect } from 'react';
import { Icon } from './ui/Icon';

/**
 * BackToTop
 * Standar:
 * - Menggunakan Icon.tsx (arrow-up)
 * - Border 1px, tanpa shadow
 * - Transisi 200ms
 */
export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas halaman"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-11 h-11 rounded-md bg-surface text-foreground border border-border hover:border-orange hover:text-orange flex items-center justify-center cursor-pointer transition-colors duration-200 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <Icon name="arrow-up" size="md" />
    </button>
  );
};
