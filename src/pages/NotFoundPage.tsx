import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icon';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen bg-[#04344C] flex flex-col items-center justify-center text-center py-32 px-4">
      <span className="font-mono text-xs uppercase tracking-widest text-[#B0EDF9] mb-3">
        Kesalahan 404
      </span>
      <h1 className="font-heading font-bold text-4xl sm:text-6xl text-[#B0EDF9] tracking-tight mb-4">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-base sm:text-lg text-[#78B9CA] mb-8 max-w-[65ch] leading-relaxed">
        Tautan yang Anda tuju mungkin telah berpindah alamat atau belum tersedia.
      </p>
      <button
        type="button"
        onClick={() => navigate('/')}
        className="h-12 px-7 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2 shadow-md cursor-pointer"
      >
        <Icon name="arrow-left" size={16} />
        <span>Kembali ke Beranda</span>
      </button>
    </main>
  );
};
