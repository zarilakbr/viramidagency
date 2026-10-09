import React from 'react';
import { motion } from 'motion/react';

/**
 * TriLoopMotif (ThreeArcsMotif)
 * Motif resmi tiga lengkungan ViramidAgency.
 * Standar:
 * - Gerak sangat halus (perpindahan maksimum 6px, siklus 12 detik)
 * - Border 1px, tanpa shadow, tanpa glow neon
 * - Hormati prefers-reduced-motion
 */
export const TriLoopMotif: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full max-w-[380px] flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full rounded-lg bg-surface border border-border p-6 flex flex-col gap-6"
      >
        {/* Header Keterangan Studio */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan" />
            <span className="text-xs font-mono text-foreground font-medium">
              Studio Portofolio
            </span>
          </div>
          <span className="text-xs font-mono text-muted">
            Jakarta, ID
          </span>
        </div>

        {/* Visual Logo Resmi dengan Vektor Tiga Lengkungan Arsitektural */}
        <div className="flex flex-col items-center justify-center py-4 gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden border border-border bg-background p-1 flex items-center justify-center">
            <video
              src="/videos/Logo_animation_for_Viramid_Agency.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded"
            />
          </div>

          <div className="text-center">
            <h3 className="font-heading font-bold text-lg text-foreground tracking-tight">
              Viramid Agency
            </h3>
            <p className="text-xs text-muted mt-1 font-mono">
              Rekayasa Web &amp; Desain Antarmuka
            </p>
          </div>
        </div>

        {/* Garis Aksen Tiga Warna Tipis 1px */}
        <TriColorLine />

        {/* Spesifikasi Teknis Studio */}
        <div className="grid grid-cols-2 gap-3 pt-1 text-left font-mono">
          <div className="p-3 rounded border border-border bg-background/50">
            <span className="block text-[11px] text-muted">Performa</span>
            <span className="text-xs font-bold text-foreground">Core Web Vitals 99</span>
          </div>
          <div className="p-3 rounded border border-border bg-background/50">
            <span className="block text-[11px] text-muted">Pendekatan</span>
            <span className="text-xs font-bold text-foreground">Bespoke Design</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Re-export sebagai ThreeArcsMotif untuk kompatibilitas
export const ThreeArcsMotif = TriLoopMotif;

/**
 * Garis tipis 1px tiga warna identitas logo (Oranye, Cyan, Ungu)
 */
export const TriColorLine: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full flex h-[1px] overflow-hidden ${className}`} aria-hidden="true">
      <div className="w-1/3 bg-orange" />
      <div className="w-1/3 bg-cyan" />
      <div className="w-1/3 bg-purple" />
    </div>
  );
};
