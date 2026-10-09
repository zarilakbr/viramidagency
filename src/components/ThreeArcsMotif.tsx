import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, Zap } from 'lucide-react';

/**
 * Komposisi Visual Hero ViramidAgency.
 * Menggantikan motif sci-fi generik dengan Studio Showcase Card yang elegan,
 * menampilkan identitas brand resmi, metrik kualitas karya nyata,
 * dan pencahayaan studio yang hangat serta berkelas.
 */
export const ThreeArcsMotif: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`relative w-full max-w-[390px] flex items-center justify-center select-none ${className}`}
    >
      {/* Pencahayaan studio ambient yang halus & hangat (bukan neon RGB mencolok) */}
      <div
        className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-20 blur-[90px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-8 -left-8 w-64 h-64 rounded-full opacity-20 blur-[90px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7E22CE 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Studio Showcase Card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.02 }}
        className="relative w-full rounded-2xl bg-[#281744]/90 border border-[#5a3c8e]/60 p-6 flex flex-col gap-5 shadow-2xl backdrop-blur-xl transition-all duration-300"
      >
        {/* Header Kartu: Status Studio */}
        <div className="flex items-center justify-between border-b border-[#5a3c8e]/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-mono text-[#F4F3FF]/90 font-medium">
              Tersedia untuk Proyek Baru
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#B8A9D4]/70">
            Jakarta, ID
          </span>
        </div>

        {/* Center: Brand Insignia & Identitas */}
        <div className="flex items-center gap-4 py-2">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-xl border border-[#5a3c8e]/80 bg-[#160B26] p-1.5 shrink-0 flex items-center justify-center">
            <img
              src="/logo.jpg"
              alt="Logo ViramidAgency"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#F97316] font-semibold">
              Boutique Studio
            </span>
            <h4 className="font-heading font-bold text-xl text-[#F4F3FF] tracking-tight">
              Viramid Agency
            </h4>
            <p className="text-xs text-[#B8A9D4] mt-0.5 leading-snug">
              Desain Web &amp; Identitas Merek Berperforma Tinggi
            </p>
          </div>
        </div>

        {/* Highlight Pilar Kualitas Nyata */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1e1136]/70 border border-[#5a3c8e]/40">
            <Zap size={14} className="text-[#F97316] shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#F4F3FF]">Core Web Vitals 99</span>
              <span className="text-[9px] font-mono text-[#B8A9D4]">Kecepatan Kilat</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1e1136]/70 border border-[#5a3c8e]/40">
            <CheckCircle2 size={14} className="text-[#22D3C5] shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#F4F3FF]">Standar Orisinal</span>
              <span className="text-[9px] font-mono text-[#B8A9D4]">Tanpa Template Pasaran</span>
            </div>
          </div>
        </div>

        {/* Footer Kartu: Penegasan Nilai */}
        <div className="flex items-center justify-between pt-3 border-t border-[#5a3c8e]/40 text-[11px] font-mono text-[#B8A9D4]/80">
          <span className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#F97316]" />
            Karya Terkurasi
          </span>
          <span className="text-[#F4F3FF]/80">2024–2026</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Garis tipis tiga warna aksen untuk pembatas minimalis.
 */
export const TriColorLine: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full flex h-[1.5px] overflow-hidden opacity-60 ${className}`} aria-hidden="true">
      <div className="w-1/3 bg-gradient-to-r from-[#FFB338] to-[#FF7300]" />
      <div className="w-1/3 bg-gradient-to-r from-[#38BDF8] to-[#2563EB]" />
      <div className="w-1/3 bg-gradient-to-r from-[#C084FC] to-[#7E22CE]" />
    </div>
  );
};
