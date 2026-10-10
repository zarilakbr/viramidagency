import React from 'react';
import { motion } from 'motion/react';
import { KONTAK_AGENCY } from '../data/content';

/**
 * TriLoopMotif (ThreeArcsMotif)
 * Kartu showcase identitas studio ViramidAgency dengan logo resmi pengguna (/logo.jpg) dan spesifikasi standar kualitas.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
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
        className="w-full rounded-2xl bg-[#074563] border border-[#165A7E] p-6 flex flex-col gap-6 shadow-sm"
      >
        {/* Header Keterangan Studio */}
        <div className="flex items-center justify-between border-b border-[#165A7E] pb-4">
          <span className="text-xs font-mono text-[#B0EDF9] font-semibold">
            Studio Portofolio
          </span>
          <span className="text-xs font-mono text-[#78B9CA]">
            {KONTAK_AGENCY.lokasi}
          </span>
        </div>

        {/* Visual Logo Resmi Pengguna */}
        <div className="flex flex-col items-center justify-center py-4 gap-4">
          <div className="w-20 h-20 rounded-2xl border border-[#165A7E] bg-[#04344C] overflow-hidden p-1 flex items-center justify-center shadow-inner">
            <img
              src="/logo.jpg"
              alt="ViramidAgency Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="text-center">
            <h3 className="font-heading font-bold text-lg text-[#B0EDF9] tracking-tight">
              Viramid <span className="text-[#B0EDF9] opacity-80">Agency</span>
            </h3>
            <p className="text-xs text-[#78B9CA] mt-1 font-mono">
              Rekayasa LMS &amp; Desain Antarmuka
            </p>
          </div>
        </div>

        {/* Garis Aksen Cyan Tunggal */}
        <TriColorLine />

        {/* Spesifikasi Teknis Studio */}
        <div className="grid grid-cols-2 gap-3 pt-1 text-left font-mono">
          <div className="p-3 rounded-lg border border-[#165A7E] bg-[#04344C]/60">
            <span className="block text-[11px] text-[#78B9CA]">Performa</span>
            <span className="text-xs font-bold text-[#B0EDF9]">Core Web Vitals 99</span>
          </div>
          <div className="p-3 rounded-lg border border-[#165A7E] bg-[#04344C]/60">
            <span className="block text-[11px] text-[#78B9CA]">Pendekatan</span>
            <span className="text-xs font-bold text-[#B0EDF9]">Bespoke LMS &amp; Web</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Re-export sebagai ThreeArcsMotif untuk kompatibilitas
export const ThreeArcsMotif = TriLoopMotif;

/**
 * Garis tipis 1px cyan tunggal
 */
export const TriColorLine: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full h-[1px] bg-[#B0EDF9]/40 overflow-hidden ${className}`} aria-hidden="true" />
  );
};
