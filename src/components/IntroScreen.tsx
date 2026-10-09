import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import introVideo from '../assets/videos/Logo_animation_for_Viramid_Agency.mp4';

interface IntroScreenProps {
  onFinish?: () => void;
}

/**
 * IntroScreen (Layar Penuh Intro Video & Efek Ketikan Bersih)
 * Spesifikasi Pengguna:
 * - Video intro tampil layar penuh (fullscreen) menyesuaikan segala jenis perangkat (mobile, tablet, desktop)
 * - Tampilan di depan BERSIH total: tombol "Lewati Intro" dihapus, tanpa tombol atau kartu yang mengganggu
 * - Pengguna TIDAK BOLEH masuk ke dashboard/landing page jika intro belum selesai diputar
 * - Hanya bertransisi secara mulus setelah video mencapai akhir durasi (onEnded)
 * - Disertai efek ketikan (typewriter) minimalis dan bersih di bawah video
 */
export const IntroScreen: React.FC<IntroScreenProps> = ({ onFinish }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fullTitle = 'Viramid Agency';
  const fullSubtitle = 'Rekayasa Web & Desain Antarmuka Presisi Tinggi.';

  const handleComplete = () => {
    setIsOpen(false);
    if (onFinish) {
      setTimeout(onFinish, 700);
    }
  };

  // Efek Ketikan Bersih (Typewriter Effect)
  useEffect(() => {
    let titleIndex = 0;
    let subtitleIndex = 0;
    let titleInterval: ReturnType<typeof setInterval>;
    let subtitleInterval: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      titleInterval = setInterval(() => {
        if (titleIndex <= fullTitle.length) {
          setTypedTitle(fullTitle.slice(0, titleIndex));
          titleIndex++;
        } else {
          clearInterval(titleInterval);
          subtitleInterval = setInterval(() => {
            if (subtitleIndex <= fullSubtitle.length) {
              setTypedSubtitle(fullSubtitle.slice(0, subtitleIndex));
              subtitleIndex++;
            } else {
              clearInterval(subtitleInterval);
              setIsTypingDone(true);
            }
          }, 28);
        }
      }, 45);
    }, 300);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(titleInterval);
      clearInterval(subtitleInterval);
    };
  }, []);

  // Video Autoplay & Lifecycle
  useEffect(() => {
    // Kunci scroll halaman saat intro diputar
    document.body.style.overflow = 'hidden';

    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      video.play().catch((err) => {
        console.warn('[Intro Video] Autoplay dicegah:', err);
      });
    }

    // Fallback keamanan jika browser memblokir video secara total (8 detik)
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, 8000);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = ''; }}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0F0F0F] w-screen h-screen overflow-hidden select-none"
          role="dialog"
          aria-label="Animasi Intro ViramidAgency"
        >
          {/* Video Fullscreen Menyesuaikan Segala Perangkat (Responsive object-cover) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              src={introVideo}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleComplete}
              className="w-full h-full object-cover object-center"
            />

            {/* Lapisan halus untuk kontras tipografi ketikan */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]/50 pointer-events-none" />
          </div>

          {/* Efek Ketikan Bersih di Bagian Bawah Layar (Murni Teks, Bersih Tanpa Tombol) */}
          <div className="absolute bottom-10 sm:bottom-16 inset-x-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <h1 className="font-heading font-bold text-2xl sm:text-4xl text-foreground tracking-tight flex items-center justify-center drop-shadow-xl mb-2">
              <span>{typedTitle}</span>
              {!isTypingDone && typedSubtitle.length === 0 && (
                <span className="inline-block w-2 sm:w-2.5 h-6 sm:h-8 bg-orange ml-2 animate-pulse" />
              )}
            </h1>

            <p className="text-xs sm:text-sm font-mono text-muted/90 max-w-[60ch] leading-relaxed flex items-center justify-center drop-shadow">
              <span>{typedSubtitle}</span>
              {!isTypingDone && typedSubtitle.length > 0 && (
                <span className="inline-block w-1.5 h-4 bg-cyan ml-1.5 animate-pulse" />
              )}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
