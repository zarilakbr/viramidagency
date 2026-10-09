import React from 'react';

/**
 * BackgroundGradients
 * Menghadirkan atmosfer studio digital mewah dan tenang:
 * Latar belakang ungu gelap arsitektural dengan pencahayaan ambient hangat
 * yang subtil, tanpa efek neon mencolok bergaya template AI.
 */
export const BackgroundGradients: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* Base Canvas: Deep Royal Plum & Midnight */}
      <div className="absolute inset-0 bg-[#1e1136]" />

      {/* Subtle Studio Keylight (Warm Amber di area kanan atas / Hero) */}
      <div
        className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full opacity-20 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, #F97316 0%, #C2410C 40%, transparent 70%)',
        }}
      />

      {/* Calm Indigo / Deep Violet Fill (Area tengah kiri) */}
      <div
        className="absolute top-[35%] -left-[10%] w-[650px] h-[650px] rounded-full opacity-15 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, #6366F1 0%, #4338CA 40%, transparent 70%)',
        }}
      />

      {/* Gentle Amethyst Glow (Area bawah / kontak) */}
      <div
        className="absolute bottom-[-10%] right-[10%] w-[700px] h-[600px] rounded-full opacity-15 blur-[150px]"
        style={{
          background: 'radial-gradient(circle, #9333EA 0%, transparent 70%)',
        }}
      />

      {/* Subtle architectural noise texture for tactile, human craft feel */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
