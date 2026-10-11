/**
 * @file src/pages/NotFoundPage.tsx
 * Halaman status 404 / Server Down ViramidAgency.
 * Menampilkan ilustrasi Storyset frameless (polosan) berpalet #04344C & #B0EDF9.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen bg-[#04344C] flex flex-col items-center justify-center text-center py-20 px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#B0EDF9]/10 blur-[130px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Ilustrasi Polosan Storyset Serverdown (Frameless) */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-center mb-6">
        <div
          className="absolute inset-0 bg-[#B0EDF9]/15 blur-3xl rounded-full pointer-events-none -z-10"
          aria-hidden="true"
        />
        <img
          src="/images/serverdown-storyset.svg"
          alt="Server status illustrations by Storyset - ViramidAgency"
          className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(2,34,50,0.85)] hover:scale-[1.02] transition-transform duration-300"
          loading="eager"
        />
        <a
          href="https://storyset.com/web"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-[10px] font-mono text-[#78B9CA]/75 hover:text-[#B0EDF9] transition-colors"
          title="Server illustrations by Storyset"
        >
          Server illustrations by Storyset
        </a>
      </div>

      <span className="font-mono text-xs uppercase tracking-widest text-[#B0EDF9] mb-3">
        Sistem Status / 404
      </span>

      <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#B0EDF9] tracking-tight mb-4 max-w-2xl text-balance">
        Halaman Tidak Ditemukan atau Server Sedang Rehat
      </h1>

      <p className="text-sm sm:text-base text-[#78B9CA] mb-8 max-w-[62ch] leading-relaxed text-balance">
        Tautan yang Anda tuju mungkin telah dipindahkan, sedang dalam pemeliharaan server, atau alamat URL belum terdaftar.
      </p>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="h-12 px-8 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2 shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(176,237,249,0.35)]"
      >
        <Icon name="arrow-left" size={16} />
        <span>Kembali ke Beranda</span>
      </button>
    </main>
  );
};
