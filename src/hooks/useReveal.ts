import { useEffect, useRef, useState } from 'react';

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

/**
 * Hook untuk scroll reveal dengan IntersectionObserver tunggal.
 * - Memeriksa prefers-reduced-motion (jika aktif, langsung visible)
 * - Memicu sekali saja (once) saat elemen memasuki viewport
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options: UseRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', delay = 0 } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Cek reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              const timer = window.setTimeout(() => {
                setIsVisible(true);
              }, delay);
              observer.unobserve(node);
              return () => window.clearTimeout(timer);
            } else {
              setIsVisible(true);
              observer.unobserve(node);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, delay]);

  return { ref, isVisible };
}
