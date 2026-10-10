import React, { useEffect, useRef } from 'react';

/**
 * BackgroundGradients
 * Menghadirkan latar belakang solid dark navy #0A0A2E dengan struktur grid arsitektur
 * berpresisi tinggi dan pencahayaan spotlight kursor halus warna oranye brand.
 * Bersih tanpa titik-titik menyala atau partikel warna-warni yang mengganggu.
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0A2E] select-none"
      aria-hidden="true"
    >
      {/* 1. Grid Arsitektural Presisi 80px (Subtle 1.5% Opacity) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(244, 243, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(244, 243, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* 2. Ambient Gradient Warmth di bagian atas & bawah */}
      <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] bg-[#12123F]/50 blur-[160px] rounded-full" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-orange/5 blur-[180px] rounded-full" />
      <div className="absolute -bottom-40 left-1/3 w-[800px] h-[500px] bg-[#12123F]/60 blur-[180px] rounded-full" />

      {/* 3. Mouse Spotlight Halus Oranye (500px radius, sangat subtle 4% opacity) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-orange/[0.035] blur-[100px] transition-opacity duration-300 pointer-events-none will-change-transform"
        style={{ opacity: 0 }}
      />

      {/* 4. Vignette halus di tepi layar */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(7, 7, 34, 0.5) 100%)',
        }}
      />
    </div>
  );
};
