import React, { useState, useEffect } from 'react';
import { Icon } from './ui/Icon';

/**
 * BackToTop
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9
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
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-11 h-11 rounded-xl bg-[#074563] text-[#B0EDF9] border border-[#165A7E] hover:border-[#B0EDF9] hover:bg-[#0B567C] flex items-center justify-center cursor-pointer transition-colors duration-200 shadow-md ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <Icon name="arrow-up" size={18} />
    </button>
  );
};
