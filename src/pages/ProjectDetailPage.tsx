import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Sparkles, Layers, Palette } from 'lucide-react';
import { CategoryBadge } from '../components/CategoryBadge';
import { Button } from '../components/Button';
import { DAFTAR_PROYEK } from '../data/content';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Scroll to top on mount or slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  const currentIndex = DAFTAR_PROYEK.findIndex((p) => p.slug === slug);
  const proyek = DAFTAR_PROYEK[currentIndex];

  const handleBackToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById('karya')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // If slug not found, show 404
  if (!proyek) {
    return (
      <main className="min-h-screen pt-36 pb-24 px-4 sm:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <span className="font-mono text-sm text-[#F97316] uppercase tracking-wider mb-2">
          404 · Halaman Tidak Ditemukan
        </span>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-[#F4F3FF] mb-4">
          Proyek Tidak Ditemukan
        </h1>
        <p className="text-base text-[#B8A9D4] max-w-md mb-8">
          Proyek yang Anda cari tidak tersedia atau alamat tautan telah diperbarui.
        </p>
        <Button as="button" variant="primary" onClick={handleBackToPortfolio}>
          <ArrowLeft size={16} strokeWidth={2} />
          <span>Kembali ke Portofolio</span>
        </Button>
      </main>
    );
  }

  // Next project logic (wrap around)
  const nextIndex = (currentIndex + 1) % DAFTAR_PROYEK.length;
  const nextProyek = DAFTAR_PROYEK[nextIndex];

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen pt-32 pb-32 px-4 sm:px-8 max-w-5xl mx-auto"
    >
      {/* Tombol Kembali */}
      <div className="mb-8">
        <button
          type="button"
          onClick={handleBackToPortfolio}
          className="inline-flex items-center gap-2 text-sm text-[#B8A9D4] hover:text-[#F97316] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] focus-visible:outline-offset-2 rounded cursor-pointer"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          <span>Kembali ke Semua Karya</span>
        </button>
      </div>

      {/* Header Proyek */}
      <header className="mb-14 border-b border-[#5a3c8e] pb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <CategoryBadge category={proyek.kategori} />
          <span className="text-[#5a3c8e]" aria-hidden="true">
            /
          </span>
          <span className="font-mono text-xs text-[#B8A9D4]">{proyek.tahun}</span>
        </div>

        <h1 className="font-heading font-bold text-4xl sm:text-6xl text-[#F4F3FF] tracking-tight mb-8">
          {proyek.judul}
        </h1>

        {/* Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-[#412a6a]/90 border border-[#5a3c8e] rounded-2xl shadow-xl">
          <div>
            <span className="block text-xs uppercase tracking-wider text-[#B8A9D4] mb-1">
              Klien
            </span>
            <span className="font-semibold text-sm sm:text-base text-[#F4F3FF]">
              {proyek.klien}
            </span>
          </div>

          <div>
            <span className="block text-xs uppercase tracking-wider text-[#B8A9D4] mb-1">
              Kategori
            </span>
            <span className="font-semibold text-sm sm:text-base text-[#F4F3FF]">
              {proyek.kategori}
            </span>
          </div>

          <div>
            <span className="block text-xs uppercase tracking-wider text-[#B8A9D4] mb-1">
              Tahun
            </span>
            <span className="font-mono text-sm sm:text-base text-[#F4F3FF]">
              {proyek.tahun}
            </span>
          </div>

          <div>
            <span className="block text-xs uppercase tracking-wider text-[#B8A9D4] mb-1">
              Layanan Utama
            </span>
            <span className="font-semibold text-sm sm:text-base text-[#F4F3FF]">
              {proyek.layanan[0] || '-'}
            </span>
          </div>
        </div>
      </header>

      {/* Ringkasan Proyek */}
      <section className="mb-16">
        <h2 className="text-xs uppercase font-semibold tracking-wider text-[#F97316] mb-3">
          Ringkasan Proyek
        </h2>
        <p className="text-lg sm:text-xl text-[#F4F3FF] leading-relaxed max-w-3xl">
          {proyek.ringkasan}
        </p>
      </section>

      {/* Tiga Blok Teks Bernomor: Tantangan, Solusi, Hasil */}
      <section className="mb-20">
        <h2 className="sr-only">Tantangan, Solusi, dan Hasil</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blok 01: Tantangan */}
          <div className="bg-[#412a6a]/90 border border-[#5a3c8e] rounded-2xl p-7 flex flex-col justify-between shadow-lg hover:border-[#F97316]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[#F97316]">01</span>
                <span className="text-xs uppercase tracking-wider text-[#B8A9D4]">Tantangan</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#F4F3FF] mb-3">
                Kondisi Awal
              </h3>
              <p className="text-sm text-[#B8A9D4] leading-relaxed">
                {proyek.tantangan}
              </p>
            </div>
          </div>

          {/* Blok 02: Solusi */}
          <div className="bg-[#412a6a]/90 border border-[#5a3c8e] rounded-2xl p-7 flex flex-col justify-between shadow-lg hover:border-[#22D3C5]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[#22D3C5]">02</span>
                <span className="text-xs uppercase tracking-wider text-[#B8A9D4]">Solusi</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#F4F3FF] mb-3">
                Pendekatan Viramid
              </h3>
              <p className="text-sm text-[#B8A9D4] leading-relaxed">
                {proyek.solusi}
              </p>
            </div>
          </div>

          {/* Blok 03: Hasil */}
          <div className="bg-[#412a6a]/90 border border-[#5a3c8e] rounded-2xl p-7 flex flex-col justify-between shadow-lg hover:border-[#C26FE0]/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-[#C26FE0]">03</span>
                <span className="text-xs uppercase tracking-wider text-[#B8A9D4]">Hasil</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#F4F3FF] mb-3">
                Dampak Nyata
              </h3>
              <p className="text-sm text-[#B8A9D4] leading-relaxed">
                {proyek.hasil}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Gambar / Visual Showcase */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl text-[#F4F3FF]">
            Dokumentasi &amp; Rancangan Visual
          </h2>
          <span className="text-xs font-mono text-[#B8A9D4]">
            {proyek.gambar && proyek.gambar.length > 0
              ? `${proyek.gambar.length} Tangkapan Layar`
              : 'Showcase Preview'}
          </span>
        </div>

        {proyek.gambar && proyek.gambar.length > 0 ? (
          <div className="flex flex-col gap-8">
            {proyek.gambar.map((imgUrl, i) => (
              <div
                key={i}
                className="w-full bg-[#412a6a]/90 border border-[#5a3c8e] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={imgUrl}
                  alt={`${proyek.judul} - Dokumentasi ${i + 1}`}
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        ) : (
          /* Visual Showcase Elegan jika file screenshot belum dipasang */
          <div className="flex flex-col gap-6">
            <div className="w-full h-80 sm:h-96 bg-gradient-to-br from-[#3b2361] via-[#271742] to-[#1a0f30] border border-[#5a3c8e] rounded-3xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F4F3FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
              
              <div className="w-16 h-16 rounded-2xl border border-[#5a3c8e] bg-[#342056]/80 flex items-center justify-center mb-4 text-[#F97316] shadow-lg">
                <Sparkles size={28} />
              </div>
              <p className="font-heading font-bold text-2xl text-[#F4F3FF] tracking-tight mb-2">
                {proyek.judul}
              </p>
              <p className="text-sm text-[#B8A9D4] max-w-lg leading-relaxed">
                Rancangan visual arsitektur antarmuka dan sistem branding terintegrasi yang telah dioptimasi untuk platform {proyek.kategori.toLowerCase()}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-56 bg-[#412a6a]/80 border border-[#5a3c8e] rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#22D3C5]/10 border border-[#22D3C5]/30 flex items-center justify-center text-[#22D3C5] mb-3">
                  <Layers size={20} />
                </div>
                <span className="font-mono text-xs text-[#22D3C5] mb-1 uppercase tracking-wider font-semibold">
                  Komposisi Desain
                </span>
                <p className="font-heading font-medium text-base text-[#F4F3FF]">
                  Tata Letak Responsif &amp; Arsitektur Antarmuka
                </p>
              </div>

              <div className="h-56 bg-[#412a6a]/80 border border-[#5a3c8e] rounded-2xl flex flex-col items-center justify-center p-6 text-center shadow-md">
                <div className="w-10 h-10 rounded-xl bg-[#C26FE0]/10 border border-[#C26FE0]/30 flex items-center justify-center text-[#C26FE0] mb-3">
                  <Palette size={20} />
                </div>
                <span className="font-mono text-xs text-[#C26FE0] mb-1 uppercase tracking-wider font-semibold">
                  Sistem Desain
                </span>
                <p className="font-heading font-medium text-base text-[#F4F3FF]">
                  Tipografi Berkarakter &amp; Aset Identitas Merek
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Ruang Lingkup Pekerjaan */}
      <section className="mb-20 p-8 bg-[#412a6a]/90 border border-[#5a3c8e] rounded-2xl shadow-xl">
        <h2 className="font-heading font-bold text-xl text-[#F4F3FF] mb-6">
          Ruang Lingkup Pekerjaan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {proyek.layanan.map((layanan, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#F97316]/20 border border-[#F97316]/50 flex items-center justify-center text-[#F97316] shrink-0">
                <Check size={14} strokeWidth={2.5} />
              </div>
              <span className="text-sm sm:text-base text-[#F4F3FF] font-medium">
                {layanan}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Navigasi: Proyek Berikutnya */}
      <footer className="pt-10 border-t border-[#5a3c8e] flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          type="button"
          onClick={handleBackToPortfolio}
          className="text-sm text-[#B8A9D4] hover:text-[#F4F3FF] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded cursor-pointer"
        >
          ← Kembali ke Semua Karya
        </button>

        {nextProyek && (
          <Button
            as="button"
            variant="outline"
            onClick={() => navigate(`/karya/${nextProyek.slug}`)}
            className="group"
          >
            <span className="text-xs text-[#B8A9D4] mr-1">Berikutnya:</span>
            <span>{nextProyek.judul}</span>
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>
        )}
      </footer>
    </motion.main>
  );
};
