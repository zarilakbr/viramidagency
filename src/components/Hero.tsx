import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';

/**
 * Hero Section ViramidAgency
 * Menampilkan value proposition di sisi kiri dengan tombol simetris,
 * dan showcase video pembuatan website dalam format lanskap proporsional di sisi kanan.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Tipografi judul menggunakan font Gastilo.
 */
export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-[88svh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden isolate">
      <Container className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Kolom Kiri: Value Proposition & CTA Simetris */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <Eyebrow number="00" variant="cyan" className="mb-4 sm:mb-6">
              DIGITAL &amp; CREATIVE AGENCY
            </Eyebrow>

            <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[66px] text-[#B0EDF9] tracking-[-0.02em] leading-[1.08] mb-6 text-balance">
              Kami membangun brand dan website yang{' '}
              <span className="text-[#B0EDF9] underline decoration-[#B0EDF9]/40 underline-offset-8">bekerja</span> untuk bisnismu.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#B0EDF9]/85 max-w-[58ch] font-normal leading-relaxed mb-8 text-balance">
              Membantu brand dan lembaga berkembang melalui transformasi identitas visual terstruktur,
              arsitektur platform LMS &amp; website performa tinggi, dan sistem konversi digital yang memikat pelanggan.
            </p>

            {/* Tombol CTA Simetris (Sama Panjang & Proporsional di Mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full sm:w-auto mb-10">
              <Link
                to="/booking"
                className="w-full sm:w-auto h-12 px-7 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98]"
              >
                <span>Jadwalkan Konsultasi</span>
                <Icon name="arrow-right" size={18} />
              </Link>

              <a
                href="#karya"
                className="w-full sm:w-auto h-12 px-7 rounded-full border border-[#165A7E] bg-[#074563] hover:bg-[#0B567C] hover:border-[#B0EDF9] text-[#B0EDF9] font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Lihat Karya</span>
                <Icon name="chevron-down" size={16} />
              </a>
            </div>

            {/* Metrik Standar Keunggulan Agency */}
            <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[#165A7E] max-w-xl">
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl sm:text-2xl text-[#B0EDF9] tracking-tight">
                  99+
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-[#78B9CA] mt-0.5">
                  Core Web Vitals
                </span>
              </div>

              <div className="flex flex-col border-l border-[#165A7E] pl-3 sm:pl-4">
                <span className="font-heading font-bold text-xl sm:text-2xl text-[#B0EDF9] tracking-tight">
                  100%
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-[#78B9CA] mt-0.5">
                  SLA Tepat Waktu
                </span>
              </div>

              <div className="flex flex-col border-l border-[#165A7E] pl-3 sm:pl-4">
                <span className="font-heading font-bold text-xl sm:text-2xl text-[#B0EDF9] tracking-tight">
                  LMS &amp; Web
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-[#78B9CA] mt-0.5">
                  Sistem Khusus
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Frame Showcase Video Pembuatan Website Lanskap */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-lg rounded-2xl bg-[#074563] border border-[#165A7E] hover:border-[#B0EDF9] transition-all duration-300 p-4 sm:p-5 shadow-2xl relative group flex flex-col justify-between">
              
              {/* Header Video Frame */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#165A7E]">
                <div className="flex items-center gap-2">
                  <Icon name="video" size={15} className="text-[#B0EDF9]" />
                  <span className="text-xs font-mono font-semibold text-[#B0EDF9]">
                    Workflow Rekayasa Website
                  </span>
                </div>

                <span className="px-2.5 py-1 rounded-md bg-[#04344C] border border-[#165A7E] text-[10px] font-mono text-[#B0EDF9]">
                  1080p · 60 FPS
                </span>
              </div>

              {/* Video Player Lanskap 16:9 / 16:10 */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#04344C] border border-[#165A7E] flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="/videos/banner-1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Overlay Play / Pause Control Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Jeda Video' : 'Putar Video'}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#04344C]/80 hover:bg-[#04344C] text-[#B0EDF9] border border-[#165A7E] backdrop-blur-md transition-all shadow-md cursor-pointer"
                >
                  <Icon name={isPlaying ? 'zap' : 'sparkles'} size={14} />
                </button>

                {/* Watermark Studio Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#04344C]/80 border border-[#165A7E] backdrop-blur-sm text-[10px] font-mono text-[#B0EDF9]">
                  Viramid Production
                </div>
              </div>

              {/* Video Footer Caption */}
              <div className="mt-3.5 pt-3 border-t border-[#165A7E] flex items-center justify-between text-xs font-mono text-[#78B9CA]">
                <span className="truncate max-w-[220px]">
                  Bespoke Code &amp; Visual Design
                </span>
                <span className="text-[#B0EDF9] font-semibold flex items-center gap-1">
                  <span>Standard Quality</span>
                  <Icon name="shield-check" size={13} />
                </span>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
