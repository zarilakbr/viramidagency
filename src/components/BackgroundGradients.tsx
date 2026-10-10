import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

/**
 * BackgroundGradients / FuturisticInteractiveCanvas
 * Menghadirkan latar belakang #0A0A2E (navy-900) dengan ambient gradient halus,
 * partikel konstelasi digital interaktif, dan efek pencahayaan kursor yang elegan.
 */
export const BackgroundGradients: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Deteksi preferensi reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isMobile = width < 768;
    const particleCount = isMobile ? 24 : 45;
    const maxDistance = isMobile ? 90 : 130;

    const particles: Particle[] = [];
    const colorThemes = [
      'rgba(244, 243, 255, ', // Krem murni
      'rgba(249, 115, 22, ',  // Oranye terang
      'rgba(253, 186, 77, ',  // Oranye gold
      'rgba(154, 155, 199, ', // Muted navy
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4),
        radius: Math.random() * 1.1 + 0.9,
        baseAlpha: Math.random() * 0.25 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colorThemes[Math.floor(Math.random() * colorThemes.length)],
      });
    }

    // Posisi kursor halus
    let mouseX = -9999;
    let mouseY = -9999;
    let currentMouseX = -9999;
    let currentMouseY = -9999;

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

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let tick = 0;

    // Loop Animasi Utama
    const render = () => {
      tick += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Interpolasi kursor mouse yang mulus (lerp)
      if (mouseX > 0 && mouseY > 0) {
        if (currentMouseX < 0) {
          currentMouseX = mouseX;
          currentMouseY = mouseY;
        } else {
          currentMouseX += (mouseX - currentMouseX) * 0.1;
          currentMouseY += (mouseY - currentMouseY) * 0.1;
        }

        // Spotlight kursor oranye halus di latar
        const gradient = ctx.createRadialGradient(
          currentMouseX,
          currentMouseY,
          10,
          currentMouseX,
          currentMouseY,
          240
        );
        gradient.addColorStop(0, 'rgba(249, 115, 22, 0.05)');
        gradient.addColorStop(0.6, 'rgba(18, 18, 63, 0.03)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Titik grid matriks cybernetic halus (step 60px)
      ctx.fillStyle = 'rgba(244, 243, 255, 0.018)';
      const step = 60;
      for (let x = (step / 2); x < width; x += step) {
        for (let y = (step / 2); y < height; y += step) {
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Update partikel & gambar koneksi
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.12;

        // Gambar titik node bercahaya
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.1, currentAlpha)})`;
        ctx.fill();

        // Hubungkan antar partikel
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(244, 243, 255, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Hubungkan dengan mouse jika mendekat
        if (currentMouseX > 0 && currentMouseY > 0) {
          const mdx = p.x - currentMouseX;
          const mdy = p.y - currentMouseY;
          const mdist = Math.hypot(mdx, mdy);
          const mouseReach = 140;

          if (mdist < mouseReach) {
            const mAlpha = (1 - mdist / mouseReach) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(currentMouseX, currentMouseY);
            ctx.strokeStyle = `rgba(249, 115, 22, ${mAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0A2E]" aria-hidden="true">
      {/* Ambient gradient auras behind content */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#141448]/40 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-orange/5 blur-[160px] rounded-full" />

      {/* Canvas Latar Interaktif */}
      <canvas ref={canvasRef} className="relative z-0 w-full h-full block" />
    </div>
  );
};
