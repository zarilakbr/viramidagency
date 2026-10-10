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
 * Standar:
 * - Menggunakan Icon.tsx tunggal tanpa simbol unicode atau panah teks
 * - Space Grotesk 700, teks rata kiri, max-w-[65ch]
 * - 1px border, tanpa shadow tebal
 * - Container 1200px
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
      <main className="section-container min-h-[70vh] flex flex-col items-center justify-center text-center py-32">
        <span className="font-mono text-xs text-orange uppercase tracking-wider mb-2">
          404 · Halaman Tidak Ditemukan
        </span>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground mb-4">
          Proyek Tidak Ditemukan
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-[65ch] mb-8">
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
    <main className="w-full min-h-screen pt-28 pb-28 md:pt-36 md:pb-36">
      <Container>
      {/* Tombol Kembali ke Portofolio */}
      <div className="mb-8">
        <button
          type="button"
          onClick={handleBackToPortfolio}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted hover:text-orange transition-colors cursor-pointer"
        >
          <Icon name="arrow-left" size="sm" />
          <span>Kembali ke Semua Karya</span>
        </button>
      </div>

      {/* Header Proyek */}
      <header className="mb-12 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <CategoryBadge category={proyek.kategori} />
          <span className="text-border" aria-hidden="true">
            /
          </span>
          <span className="font-mono text-xs text-muted">{proyek.tahun}</span>
        </div>

        <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-foreground tracking-tight mb-8">
          {proyek.judul}
        </h1>

        {/* Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-surface border border-border rounded-lg">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
              Klien
            </span>
            <span className="font-semibold text-sm sm:text-base text-foreground">
              {proyek.klien}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
              Kategori
            </span>
            <span className="font-semibold text-sm sm:text-base text-foreground">
              {proyek.kategori}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
              Tahun
            </span>
            <span className="font-mono text-sm sm:text-base text-foreground">
              {proyek.tahun}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1">
              Layanan Utama
            </span>
            <span className="font-semibold text-sm sm:text-base text-foreground">
              {proyek.layanan[0] || '-'}
            </span>
          </div>
        </div>
      </header>

      {/* Ringkasan Proyek */}
      <section className="mb-14">
        <h2 className="text-xs uppercase font-mono tracking-wider text-orange mb-2">
          Ringkasan Proyek
        </h2>
        <p className="text-base sm:text-lg text-foreground leading-relaxed max-w-[65ch]">
          {proyek.ringkasan}
        </p>
      </section>

      {/* Tiga Blok: Tantangan, Solusi, Hasil */}
      <section className="mb-16">
        <h2 className="sr-only">Tantangan, Solusi, dan Hasil</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blok 01: Tantangan */}
          <Reveal delayIndex={0}>
            <div className="bg-surface border border-border rounded-lg p-6 flex flex-col justify-between h-full hover:border-orange transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                  <span className="font-mono text-xs font-bold text-orange">01</span>
                  <span className="text-xs font-mono uppercase text-muted">Tantangan</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  Kondisi Awal
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-[65ch]">
                  {proyek.tantangan}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Blok 02: Solusi */}
          <Reveal delayIndex={1}>
            <div className="bg-surface border border-border rounded-lg p-6 flex flex-col justify-between h-full hover:border-cyan transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                  <span className="font-mono text-xs font-bold text-cyan">02</span>
                  <span className="text-xs font-mono uppercase text-muted">Solusi</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  Pendekatan Viramid
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-[65ch]">
                  {proyek.solusi}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Blok 03: Hasil */}
          <Reveal delayIndex={2}>
            <div className="bg-surface border border-border rounded-lg p-6 flex flex-col justify-between h-full hover:border-purple transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-border pb-2">
                  <span className="font-mono text-xs font-bold text-purple">03</span>
                  <span className="text-xs font-mono uppercase text-muted">Hasil</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  Dampak Nyata
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-[65ch]">
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
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-foreground">
            Dokumentasi &amp; Rancangan Visual
          </h2>
          <span className="text-xs font-mono text-muted">
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
                className="w-full bg-surface border border-border rounded-lg overflow-hidden aspect-[16/10]"
              >
                <img
                  src={imgUrl}
                  alt={`${proyek.judul} - Dokumentasi ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="w-full aspect-[16/9] max-h-96 bg-surface border border-border rounded-lg flex flex-col items-center justify-center p-8 text-center">
              <span className="text-xs font-mono uppercase tracking-wider text-orange mb-2">
                Studi Kasus Desain
              </span>
              <p className="font-heading font-bold text-2xl text-foreground mb-2">
                {proyek.judul}
              </p>
              <p className="text-xs sm:text-sm text-muted max-w-[65ch] leading-relaxed">
                Rancangan visual arsitektur antarmuka dan sistem branding terintegrasi yang telah dioptimasi untuk platform {proyek.kategori.toLowerCase()}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-surface border border-border rounded-lg flex flex-col items-start gap-2">
                <Icon name="layers" size="md" className="text-cyan" />
                <span className="font-mono text-xs text-cyan uppercase tracking-wider font-semibold">
                  Komposisi Desain
                </span>
                <p className="font-heading font-bold text-base text-foreground">
                  Tata Letak Responsif &amp; Arsitektur Antarmuka
                </p>
              </div>

              <div className="p-6 bg-surface border border-border rounded-lg flex flex-col items-start gap-2">
                <Icon name="palette" size="md" className="text-purple" />
                <span className="font-mono text-xs text-purple uppercase tracking-wider font-semibold">
                  Sistem Desain
                </span>
                <p className="font-heading font-bold text-base text-foreground">
                  Tipografi Berkarakter &amp; Aset Identitas Merek
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Ruang Lingkup Pekerjaan */}
      <section className="mb-16 p-6 sm:p-8 bg-surface border border-border rounded-lg">
        <h2 className="font-heading font-bold text-xl text-foreground mb-4">
          Ruang Lingkup Pekerjaan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {proyek.layanan.map((layanan, idx) => (
            <div key={idx} className="flex items-center gap-2.5">
              <Icon name="check" size="sm" className="text-orange" />
              <span className="text-sm sm:text-base text-foreground font-medium">
                {layanan}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Navigasi: Proyek Berikutnya */}
      <footer className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleBackToPortfolio}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
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
            <span className="text-xs text-muted mr-1">Berikutnya:</span>
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
