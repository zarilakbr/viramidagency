import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
}

/**
 * BackgroundGradients / AnimatedMeshGrid
 * Menghadirkan latar belakang #0A0A2E (navy-900) dengan animasi jaring-jaring halus
 * bernuansa krem dan aksen oranye yang elegan.
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

    // Deteksi reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Jumlah node jaring-jaring menyesuaikan ukuran layar
    const isMobile = width < 768;
    const particleCount = isMobile ? 26 : 52;
    const maxDistance = isMobile ? 90 : 120;

    const particles: Particle[] = [];
    const colors = [
      'rgba(244, 243, 255, ', // Krem lembut utama
      'rgba(244, 243, 255, ',
      'rgba(249, 115, 22, ',  // Oranye identitas
      'rgba(154, 155, 199, ', // Muted navy
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
        vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
        radius: Math.random() * 0.8 + 1.1,
        baseAlpha: Math.random() * 0.3 + 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Interaktivitas posisi kursor mouse
    let mouseX = -9999;
    let mouseY = -9999;

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

    // Loop Animasi Jaring-Jaring
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Gambar grid titik latar mikro sangat halus (pola 48px)
      ctx.fillStyle = 'rgba(244, 243, 255, 0.02)';
      const step = 48;
      for (let x = (step / 2); x < width; x += step) {
        for (let y = (step / 2); y < height; y += step) {
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Update posisi dan gambar partikel
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap-around tepi layar
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        // Gambar titik simpul jaring-jaring
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.baseAlpha})`;
        ctx.fill();

        // Hubungkan dengan simpul lain
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(244, 243, 255, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Interaksi halus dengan kursor mouse
        if (mouseX > 0 && mouseY > 0) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const mdist = Math.hypot(mdx, mdy);
          const mouseReach = 130;

          if (mdist < mouseReach) {
            const mAlpha = (1 - mdist / mouseReach) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-navy-900" aria-hidden="true">
      {/* Canvas Jaring-Jaring Bergerak */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
