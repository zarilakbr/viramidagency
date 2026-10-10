import React, { useEffect, useRef } from 'react';

/**
 * BackgroundGradients
 * Menghadirkan latar belakang solid Deep Ocean Teal #04344C dengan struktur grid arsitektur
 * berpresisi tinggi dan pencahayaan spotlight kursor warna Ice Cyan #B0EDF9.
 * Eksklusif 2 warna: HEX #04344C & HEX #B0EDF9.
 */
export const BackgroundGradients: React.FC = () => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mouseX = -9999;
    let mouseY = -9999;
    let currentX = -9999;
    let currentY = -9999;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const updateSpotlight = () => {
      if (spotlightRef.current) {
        if (mouseX > 0 && mouseY > 0) {
          if (currentX < 0) {
            currentX = mouseX;
            currentY = mouseY;
          } else {
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;
          }
          spotlightRef.current.style.opacity = '1';
          spotlightRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
        } else {
          spotlightRef.current.style.opacity = '0';
        }
      }
      animationFrameId = requestAnimationFrame(updateSpotlight);
    };

    animationFrameId = requestAnimationFrame(updateSpotlight);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#04344C] select-none"
      aria-hidden="true"
    >
      {/* 1. Grid Arsitektural Presisi 80px (Subtle 3% Opacity Cyan #B0EDF9) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(176, 237, 249, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(176, 237, 249, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* 2. Ambient Atmosphere Depth #04344C / #074563 */}
      <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] bg-[#074563]/60 blur-[160px] rounded-full" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-[#B0EDF9]/[0.03] blur-[180px] rounded-full" />
      <div className="absolute -bottom-40 left-1/3 w-[800px] h-[500px] bg-[#074563]/60 blur-[180px] rounded-full" />

      {/* 3. Mouse Spotlight Halus Cyan #B0EDF9 (500px radius, sangat subtle 3% opacity) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#B0EDF9]/[0.04] blur-[100px] transition-opacity duration-300 pointer-events-none will-change-transform"
        style={{ opacity: 0 }}
      />

      {/* 4. Vignette halus */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(2, 33, 49, 0.6) 100%)',
        }}
      />
    </div>
  );
};
