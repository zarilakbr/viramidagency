import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Icon } from '../components/ui/Icon';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="section-container min-h-[75vh] flex flex-col items-center justify-center text-center py-32">
      <span className="font-mono text-xs uppercase tracking-widest text-orange mb-3">
        Kesalahan 404
      </span>
      <h1 className="font-heading font-bold text-4xl sm:text-6xl text-foreground tracking-tight mb-4">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-base sm:text-lg text-muted mb-8 max-w-[65ch] leading-relaxed">
        Tautan yang Anda tuju mungkin telah berpindah alamat atau belum tersedia.
      </p>
      <Button as="button" variant="primary" onClick={() => navigate('/')}>
        <Icon name="arrow-left" size="sm" />
        <span>Kembali ke Beranda</span>
      </Button>
    </main>
  );
};
