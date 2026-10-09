import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 max-w-2xl mx-auto py-32">
      <span className="font-mono text-sm text-[#F97316] uppercase tracking-widest mb-3">
        Kesalahan 404
      </span>
      <h1 className="font-heading font-bold text-4xl sm:text-6xl text-[#F4F3FF] tracking-tight mb-4">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-base sm:text-lg text-[#B8A9D4] mb-10 max-w-lg leading-relaxed">
        Tautan yang Anda tuju mungkin telah berpindah alamat atau belum tersedia.
      </p>
      <Button as="button" variant="primary" onClick={() => navigate('/')}>
        <ArrowLeft size={16} strokeWidth={1.5} />
        <span>Kembali ke Beranda</span>
      </Button>
    </main>
  );
};
