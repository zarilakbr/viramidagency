import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from './ui/Icon';
import { TriColorLine } from './ThreeArcsMotif';

interface IntroScreenProps {
  onFinish?: () => void;
}

/**
 * IntroScreen (Preloader Video Intro + Efek Ketikan Mesin Tik)
 * Menampilkan animasi logo resmi ViramidAgency disertai efek ketikan teks (typewriter)
 * sebelum masuk ke landing page / dashboard utama.
 */
export const IntroScreen: React.FC<IntroScreenProps> = ({ onFinish }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fullTitle = 'Viramid Agency';
  const fullSubtitle = 'Membangun Pengalaman Digital & Rekayasa Web Presisi Tinggi.';

  const handleComplete = () => {
    setIsOpen(false);
    if (onFinish) {
      setTimeout(onFinish, 600);
    }
  };

  // Efek Ketikan (Typewriter Effect)
  useEffect(() => {
    let titleIndex = 0;
    let subtitleIndex = 0;
    let titleInterval: ReturnType<typeof setInterval>;
    let subtitleInterval: ReturnType<typeof setInterval>;

    // Mulai ketik title setelah 250ms
    const startTimeout = setTimeout(() => {
      titleInterval = setInterval(() => {
        if (titleIndex <= fullTitle.length) {
          setTypedTitle(fullTitle.slice(0, titleIndex));
          titleIndex++;
        } else {
          clearInterval(titleInterval);
          // Setelah title selesai, mulai ketik subtitle
          subtitleInterval = setInterval(() => {
            if (subtitleIndex <= fullSubtitle.length) {
              setTypedSubtitle(fullSubtitle.slice(0, subtitleIndex));
              subtitleIndex++;
            } else {
              clearInterval(subtitleInterval);
              setIsTypingDone(true);
            }
          }, 24);
        }
      }, 45);
    }, 250);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(titleInterval);
      clearInterval(subtitleInterval);
    };
  }, []);

  // Video Autoplay & Fallback Timer
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch((err) => {
        console.warn('[Intro Video] Autoplay dicegah browser:', err);
      });
    }

    // Keyboard shortcut untuk keluar (Enter, Spasi, Escape)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Fallback otomatis selesai setelah 6.5 detik
    const timer = setTimeout(() => {
      handleComplete();
    }, 6500);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = ''; }}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-4 sm:p-6 select-none"
          role="dialog"
          aria-label="Animasi Intro ViramidAgency"
        >
          {/* Tombol Lewati di pojok kanan atas */}
          <button
            type="button"
            onClick={handleComplete}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 px-3.5 py-1.5 rounded border border-border bg-surface/80 text-muted hover:text-foreground hover:border-orange text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Lewati Intro</span>
            <Icon name="arrow-right" size="sm" />
          </button>

          {/* Konten Utama Terpusat */}
          <div className="w-full max-w-xl flex flex-col items-center text-center">
            {/* Tagline Sistem Monospace */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded border border-border bg-surface/60 text-[11px] font-mono text-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <span>&gt; viramid.init()</span>
            </div>

            {/* Kontainer Video Animasi Logo Resmi */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-surface/30 flex items-center justify-center mb-6 shadow-2xl">
              <video
                ref={videoRef}
                src="/videos/Logo_animation_for_Viramid_Agency.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={() => {
                  // Jika video selesai dan teks sudah terketik, transisi otomatis
                  setTimeout(handleComplete, 600);
                }}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Garis Aksen Tiga Warna Identitas */}
            <div className="w-48 mb-6">
              <TriColorLine />
            </div>

            {/* Area Ketikan Mesin Tik (Typewriter Area) */}
            <div className="min-h-[72px] flex flex-col items-center justify-center gap-1.5 px-4">
              {/* Judul yang diketik */}
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-tight flex items-center justify-center">
                <span>{typedTitle}</span>
                {!isTypingDone && typedSubtitle.length === 0 && (
                  <span className="inline-block w-2 sm:w-2.5 h-6 sm:h-7 bg-orange ml-1.5 animate-pulse" />
                )}
              </h1>

              {/* Subjudul yang diketik huruf demi huruf */}
              <p className="text-xs sm:text-sm font-mono text-muted max-w-[55ch] leading-relaxed flex items-center justify-center">
                <span>{typedSubtitle}</span>
                {!isTypingDone && typedSubtitle.length > 0 && (
                  <span className="inline-block w-1.5 h-4 bg-cyan ml-1 animate-pulse" />
                )}
              </p>
            </div>

            {/* Tombol Masuk yang Muncul Setelah Ketikan Selesai */}
            <div className="mt-6 min-h-[44px]">
              {isTypingDone ? (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  type="button"
                  onClick={handleComplete}
                  className="px-5 py-2.5 rounded bg-orange hover:bg-orange-hover text-foreground font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
                >
                  <span>Masuk ke Halaman Utama</span>
                  <Icon name="arrow-right" size="sm" />
                </motion.button>
              ) : (
                <div className="text-[11px] font-mono text-muted/60 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange animate-ping" />
                  <span>Menyiapkan portofolio...</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
