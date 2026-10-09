import React from 'react';

/**
 * BackgroundGradients
 * Menghadirkan latar belakang solid #0A0A2E arsitektural yang bersih,
 * tanpa gradasi warna-warni besar, partikel melayang, atau efek neon template AI.
 */
export const BackgroundGradients: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-background" aria-hidden="true">
      {/* Tekstur grid titik mikro arsitektural 1px sangat halus */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#F4F3FF 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
