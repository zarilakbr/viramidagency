import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CategoryBadge } from '../components/CategoryBadge';
import { Button } from '../components/Button';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { DAFTAR_PROYEK } from '../data/content';

/**
 * ProjectDetailPage
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo. Tanpa titik-titik berwarna/menyala.
 */
export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

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

  // 404 jika proyek tidak ditemukan
  if (!proyek) {
    return (
      <main className="section-container min-h-[70vh] flex flex-col items-center justify-center text-center py-32 bg-[#04344C]">
        <span className="font-mono text-xs text-[#B0EDF9] uppercase tracking-wider mb-2">
          404 · Halaman Tidak Ditemukan
        </span>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-[#B0EDF9] mb-4">
          Proyek Tidak Ditemukan
        </h1>
        <p className="text-sm sm:text-base text-[#78B9CA] max-w-[65ch] mb-8">
          Proyek yang Anda cari tidak tersedia atau alamat tautan telah diperbarui.
        </p>
        <Button as="button" variant="primary" onClick={handleBackToPortfolio}>
          <Icon name="arrow-left" size="sm" />
          <span>Kembali ke Portofolio</span>
        </Button>
      </main>
    );
  }

  const nextIndex = (currentIndex + 1) % DAFTAR_PROYEK.length;
  const nextProyek = DAFTAR_PROYEK[nextIndex];

  return (
    <main className="w-full min-h-screen pt-28 pb-28 md:pt-36 md:pb-36 bg-[#04344C] text-[#B0EDF9]">
      <Container>
        {/* Tombol Kembali ke Portofolio */}
        <div className="mb-8">
          <button
            type="button"
            onClick={handleBackToPortfolio}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#78B9CA] hover:text-[#B0EDF9] transition-colors cursor-pointer"
          >
            <Icon name="arrow-left" size="sm" />
            <span>Kembali ke Semua Karya</span>
          </button>
        </div>

        {/* Header Proyek */}
        <header className="mb-12 border-b border-[#165A7E] pb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <CategoryBadge category={proyek.kategori} />
            <span className="text-[#165A7E]" aria-hidden="true">
              /
            </span>
            <span className="font-mono text-xs text-[#78B9CA]">{proyek.tahun}</span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#B0EDF9] tracking-tight mb-8">
            {proyek.judul}
          </h1>

          {/* Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#074563] border border-[#165A7E] rounded-xl">
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[#78B9CA] mb-1">
                Klien
              </span>
              <span className="font-semibold text-sm sm:text-base text-[#B0EDF9]">
                {proyek.klien}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[#78B9CA] mb-1">
                Kategori
              </span>
              <span className="font-semibold text-sm sm:text-base text-[#B0EDF9]">
                {proyek.kategori}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[#78B9CA] mb-1">
                Tahun
              </span>
              <span className="font-mono text-sm sm:text-base text-[#B0EDF9]">
                {proyek.tahun}
              </span>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-[#78B9CA] mb-1">
                Layanan Utama
              </span>
              <span className="font-semibold text-sm sm:text-base text-[#B0EDF9]">
                {proyek.layanan[0] || '-'}
              </span>
            </div>
          </div>

          {/* Live Project URL & Maps Location Actions */}
          {(proyek.url || proyek.mapsUrl) && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#074563] border border-[#165A7E]">
              <div className="flex items-center gap-2.5">
                <Icon name="globe" size={16} className="text-[#B0EDF9]" />
                <div>
                  <span className="block text-xs font-mono font-semibold text-[#B0EDF9]">
                    {proyek.url ? 'Platform Aktif di Produksi' : 'Lokasi Terverifikasi'}
                  </span>
                  <span className="text-xs font-mono text-[#78B9CA]">
                    {proyek.url || 'Google Maps Profile'}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {proyek.mapsUrl && (
                  <a
                    href={proyek.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg border border-[#165A7E] bg-[#04344C] hover:border-[#B0EDF9] text-[#B0EDF9] font-mono text-xs transition-colors shadow-sm"
                  >
                    <Icon name="map-pin" size={14} className="text-[#B0EDF9]" />
                    <span>Google Maps</span>
                    <Icon name="arrow-up-right" size={12} />
                  </a>
                )}

                {proyek.url && (
                  <a
                    href={proyek.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-95"
                  >
                    <span>Kunjungi Website Live</span>
                    <Icon name="arrow-up-right" size={14} />
                  </a>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Ringkasan Proyek */}
        <section className="mb-14">
          <h2 className="text-xs uppercase font-mono tracking-wider text-[#B0EDF9] mb-2 font-bold">
            Ringkasan Proyek
          </h2>
          <p className="text-base sm:text-lg text-[#B0EDF9]/90 leading-relaxed max-w-[65ch]">
            {proyek.ringkasan}
          </p>
        </section>

        {/* Tiga Blok: Tantangan, Solusi, Hasil */}
        <section className="mb-16">
          <h2 className="sr-only">Tantangan, Solusi, dan Hasil</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blok 01: Tantangan */}
            <Reveal delayIndex={0}>
              <div className="bg-[#074563] border border-[#165A7E] rounded-xl p-6 flex flex-col justify-between h-full hover:border-[#B0EDF9] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-[#165A7E] pb-2">
                    <span className="font-mono text-xs font-bold text-[#B0EDF9]">01</span>
                    <span className="text-xs font-mono uppercase text-[#78B9CA]">Tantangan</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#B0EDF9] mb-2">
                    Kondisi Awal
                  </h3>
                  <p className="text-sm text-[#78B9CA] leading-relaxed max-w-[65ch]">
                    {proyek.tantangan}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Blok 02: Solusi */}
            <Reveal delayIndex={1}>
              <div className="bg-[#074563] border border-[#165A7E] rounded-xl p-6 flex flex-col justify-between h-full hover:border-[#B0EDF9] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-[#165A7E] pb-2">
                    <span className="font-mono text-xs font-bold text-[#B0EDF9]">02</span>
                    <span className="text-xs font-mono uppercase text-[#78B9CA]">Solusi</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#B0EDF9] mb-2">
                    Pendekatan Viramid
                  </h3>
                  <p className="text-sm text-[#78B9CA] leading-relaxed max-w-[65ch]">
                    {proyek.solusi}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Blok 03: Hasil */}
            <Reveal delayIndex={2}>
              <div className="bg-[#074563] border border-[#165A7E] rounded-xl p-6 flex flex-col justify-between h-full hover:border-[#B0EDF9] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-[#165A7E] pb-2">
                    <span className="font-mono text-xs font-bold text-[#B0EDF9]">03</span>
                    <span className="text-xs font-mono uppercase text-[#78B9CA]">Hasil</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#B0EDF9] mb-2">
                    Dampak Nyata
                  </h3>
                  <p className="text-sm text-[#78B9CA] leading-relaxed max-w-[65ch]">
                    {proyek.hasil}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Dokumentasi & Rancangan Visual */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#B0EDF9]">
              Dokumentasi &amp; Rancangan Visual
            </h2>
            <span className="text-xs font-mono text-[#78B9CA]">
              {proyek.gambar && proyek.gambar.length > 0
                ? `${proyek.gambar.length} Tangkapan Layar`
                : 'Showcase Preview'}
            </span>
          </div>

          {proyek.gambar && proyek.gambar.length > 0 ? (
            <div className="flex flex-col gap-6">
              {proyek.gambar.map((imgUrl, i) => (
                <div
                  key={i}
                  className="w-full bg-[#074563] border border-[#165A7E] rounded-xl overflow-hidden aspect-[16/10] flex items-center justify-center"
                >
                  <img
                    src={imgUrl}
                    alt={`${proyek.judul} - Dokumentasi ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="w-full aspect-[16/9] max-h-96 bg-[#074563] border border-[#165A7E] rounded-xl flex flex-col items-center justify-center p-8 text-center">
                <span className="text-xs font-mono uppercase tracking-wider text-[#B0EDF9] mb-2">
                  Studi Kasus Desain &amp; LMS
                </span>
                <p className="font-heading font-bold text-2xl text-[#B0EDF9] mb-2">
                  {proyek.judul}
                </p>
                <p className="text-xs sm:text-sm text-[#78B9CA] max-w-[65ch] leading-relaxed">
                  Rancangan visual arsitektur antarmuka dan sistem branding terintegrasi yang telah dioptimasi untuk platform {proyek.kategori.toLowerCase()}.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Ruang Lingkup Pekerjaan */}
        <section className="mb-16 p-6 sm:p-8 bg-[#074563] border border-[#165A7E] rounded-xl">
          <h2 className="font-heading font-bold text-xl text-[#B0EDF9] mb-4">
            Ruang Lingkup Pekerjaan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {proyek.layanan.map((layanan, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <Icon name="check" size="sm" className="text-[#B0EDF9]" />
                <span className="text-sm sm:text-base text-[#B0EDF9] font-medium">
                  {layanan}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Navigasi: Proyek Berikutnya */}
        <footer className="pt-8 border-t border-[#165A7E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBackToPortfolio}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#78B9CA] hover:text-[#B0EDF9] transition-colors cursor-pointer"
          >
            <Icon name="arrow-left" size="sm" />
            <span>Kembali ke Semua Karya</span>
          </button>

          {nextProyek && (
            <Button
              as="button"
              variant="outline"
              onClick={() => navigate(`/karya/${nextProyek.slug}`)}
              className="group"
            >
              <span className="text-xs text-[#78B9CA] mr-1">Berikutnya:</span>
              <span>{nextProyek.judul}</span>
              <Icon
                name="arrow-right"
                size="sm"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
          )}
        </footer>
      </Container>
    </main>
  );
};
