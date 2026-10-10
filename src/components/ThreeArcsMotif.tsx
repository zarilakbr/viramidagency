import React from 'react';
import { motion } from 'motion/react';
import { KONTAK_AGENCY } from '../data/content';

/**
 * TriLoopMotif (ThreeArcsMotif)
 * Motif tiga bentuk pill dengan warna oranye, krem, dan outline oranye.
 * Logo asli (file logo) tidak diubah sama sekali.
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
        className="w-full rounded-2xl bg-surface border border-border p-6 flex flex-col gap-6 shadow-sm"
      >
        {/* Header Keterangan Studio */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange" />
            <span className="text-xs font-mono text-cream font-semibold">
              Studio Portofolio
            </span>
          </div>
          <span className="text-xs font-mono text-muted">
            {KONTAK_AGENCY.lokasi}
          </span>
        </div>

        {/* Visual Logo Resmi dengan Vektor Tiga Pill Oranye/Krem */}
        <div className="flex flex-col items-center justify-center py-4 gap-4">
          <div className="w-24 h-24 rounded-xl overflow-hidden border border-border bg-navy-900 p-1 flex items-center justify-center">
            <video
              src="/videos/banner-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="text-center">
            <h3 className="font-heading font-bold text-lg text-cream tracking-tight">
              Viramid Agency
            </h3>
            <p className="text-xs text-muted mt-1 font-mono">
              Rekayasa Web &amp; Desain Antarmuka
            </p>
          </div>

          {/* 3 Bentuk Pill: Oranye Solid, Krem Solid, Outline Oranye */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="w-8 h-3 rounded-full bg-orange" title="Oranye" />
            <div className="w-8 h-3 rounded-full bg-cream" title="Krem" />
            <div className="w-8 h-3 rounded-full border-2 border-orange bg-transparent" title="Outline Oranye" />
          </div>
        </div>

        {/* Garis Aksen Oranye Tunggal */}
        <TriColorLine />

        {/* Spesifikasi Teknis Studio */}
        <div className="grid grid-cols-2 gap-3 pt-1 text-left font-mono">
          <div className="p-3 rounded-lg border border-border bg-navy-900/60">
            <span className="block text-[11px] text-muted">Performa</span>
            <span className="text-xs font-bold text-cream">Core Web Vitals 99</span>
          </div>
          <div className="p-3 rounded-lg border border-border bg-navy-900/60">
            <span className="block text-[11px] text-muted">Pendekatan</span>
            <span className="text-xs font-bold text-cream">Bespoke Design</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Re-export sebagai ThreeArcsMotif untuk kompatibilitas
export const ThreeArcsMotif = TriLoopMotif;

/**
 * Garis tipis 1px oranye tunggal
 */
export const TriColorLine: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full h-[1px] bg-orange/60 overflow-hidden ${className}`} aria-hidden="true" />
  );
};
