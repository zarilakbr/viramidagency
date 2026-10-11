/**
 * @file src/pages/PricingPage.tsx
 * Halaman rute terukur untuk Paket Layanan & Investasi ViramidAgency (/paket).
 * Menampilkan pilihan paket kerja transparan tanpa biaya tersembunyi.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Icon } from '../components/ui/Icon';
import { PAKET_LAYANAN } from '../data/content';

export const PricingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Paket Layanan & Investasi Transparan - ViramidAgency';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="relative w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 bg-[#04344C] overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B0EDF9]/5 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 right-1/4 w-[500px] h-[300px] bg-[#074563]/60 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container className="max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#78B9CA] mb-6">
          <Link to="/" className="hover:text-[#B0EDF9] transition-colors flex items-center gap-1">
            <Icon name="arrow-left" size={13} />
            <span>Beranda</span>
          </Link>
          <span>/</span>
          <span className="text-[#B0EDF9]">Paket Layanan</span>
        </div>

        {/* Header Seksi dengan Ilustrasi Polosan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-12 md:mb-16">
          <div className="lg:col-span-8 text-center lg:text-left">
            <Eyebrow variant="cyan" className="mb-3 inline-block">
              INVESTASI &amp; CAKUPAN KERJA
            </Eyebrow>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#B0EDF9] tracking-[-0.02em] mb-4 text-balance">
              Paket Layanan &amp; Investasi Transparan
            </h1>

            <p className="text-sm sm:text-base text-[#78B9CA] max-w-2xl leading-relaxed text-balance mx-auto lg:mx-0">
              Pilihan paket pengerjaan transparan yang dirancang fleksibel untuk kebutuhan skala bisnis, website, dan aplikasi produk Anda.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-32 sm:w-44 md:w-52 lg:w-60 xl:w-68">
              <div
                className="absolute inset-0 bg-[#B0EDF9]/15 blur-2xl rounded-full pointer-events-none -z-10"
                aria-hidden="true"
              />
              <img
                src="/images/pricing-storyset.svg"
                alt="Paket Layanan ViramidAgency"
                className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(2,34,50,0.85)] hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Grid 3 Kartu Paket */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-12">
          {PAKET_LAYANAN.map((paket) => {
            const isHighlighted = paket.isPopular;

            return (
              <div
                key={paket.id}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isHighlighted
                    ? 'border-2 border-[#B0EDF9] bg-[#B0EDF9] text-[#04344C] shadow-2xl lg:-translate-y-2'
                    : 'border border-[#165A7E] bg-[#074563] text-[#B0EDF9] hover:border-[#B0EDF9]'
                }`}
              >
                <div>
                  {/* Badge Terpopuler */}
                  {isHighlighted && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#04344C] text-[#B0EDF9] text-xs font-mono font-bold uppercase tracking-wider mb-4">
                      <Icon name="sparkles" size={12} className="text-[#B0EDF9]" />
                      <span>{paket.badge}</span>
                    </div>
                  )}

                  <h2
                    className={`font-heading font-bold text-xl sm:text-2xl mb-2 tracking-tight ${
                      isHighlighted ? 'text-[#04344C]' : 'text-[#B0EDF9]'
                    }`}
                  >
                    {paket.nama}
                  </h2>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isHighlighted ? 'text-[#04344C]/85' : 'text-[#78B9CA]'
                    }`}
                  >
                    {paket.deskripsi}
                  </p>

                  {/* Rentang Harga */}
                  <div className="mb-6 pb-6 border-b border-current/20">
                    <span
                      className={`text-xs font-mono block mb-1 uppercase tracking-wider ${
                        isHighlighted ? 'text-[#04344C]/75' : 'text-[#78B9CA]'
                      }`}
                    >
                      Estimasi Investasi
                    </span>
                    <div
                      className={`font-heading font-bold text-2xl sm:text-3xl tracking-tight ${
                        isHighlighted ? 'text-[#04344C]' : 'text-[#B0EDF9]'
                      }`}
                    >
                      {paket.harga}
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 mt-2 text-xs font-mono ${
                        isHighlighted ? 'text-[#04344C]/80' : 'text-[#78B9CA]'
                      }`}
                    >
                      <Icon name="clock" size={13} />
                      <span>{paket.estimasiWaktu}</span>
                    </div>
                  </div>

                  {/* Checklist Fitur */}
                  <div className="space-y-3 mb-8">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-bold block ${
                        isHighlighted ? 'text-[#04344C]' : 'text-[#B0EDF9]'
                      }`}
                    >
                      Cakupan Pekerjaan:
                    </span>
                    <ul className="space-y-2.5 text-xs sm:text-sm">
                      {paket.fitur.map((fiturItem, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Icon
                            name="check"
                            size={16}
                            className={`shrink-0 mt-0.5 ${
                              isHighlighted ? 'text-[#04344C]' : 'text-[#B0EDF9]'
                            }`}
                          />
                          <span
                            className={`leading-snug ${
                              isHighlighted ? 'text-[#04344C]/90' : 'text-[#78B9CA]'
                            }`}
                          >
                            {fiturItem}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div>
                  <Link
                    to={`/booking?paket=${encodeURIComponent(paket.nama)}`}
                    className={`w-full h-12 rounded-full font-heading font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98] ${
                      isHighlighted
                        ? 'bg-[#04344C] hover:bg-[#022131] text-[#B0EDF9]'
                        : 'bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C]'
                    }`}
                  >
                    <span>Pilih Paket Ini</span>
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kotak Konsultasi Kustom */}
        <div className="p-6 rounded-2xl border border-[#165A7E] bg-[#074563]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78B9CA] mb-16">
          <span className="flex items-center gap-2 text-center sm:text-left">
            <Icon name="briefcase" size={16} className="text-[#B0EDF9] shrink-0" />
            <span>Membutuhkan aplikasi kustom atau arsitektur sistem enterprise yang berbeda?</span>
          </span>
          <Link
            to="/booking?jenis=diskusi-proyek"
            className="text-[#B0EDF9] hover:underline font-semibold whitespace-nowrap inline-flex items-center gap-1.5"
          >
            <span>Konsultasikan Spesifikasi Kustom</span>
            <Icon name="arrow-right" size={13} />
          </Link>
        </div>

        {/* 3 Pilar Transparansi Finansial */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#074563]/50 border border-[#165A7E] mb-16">
          <div className="text-center mb-8">
            <span className="font-mono text-xs text-[#B0EDF9] uppercase tracking-widest block mb-2">
              KEBIJAKAN INVESTASI &amp; PEMBAYARAN
            </span>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#B0EDF9]">
              Skema Pembayaran Transparan 100%
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#04344C] border border-[#165A7E]/70 flex flex-col gap-2">
              <span className="font-heading font-bold text-xl text-[#B0EDF9]">Tahap 1: 50%</span>
              <span className="text-xs font-mono text-[#B0EDF9]">Uang Muka (Kickoff)</span>
              <p className="text-xs text-[#78B9CA] leading-relaxed">
                Dimulai saat sesi riset, pemetaan arsitektur, dan perancangan konsep desain disepakati bersama.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#04344C] border border-[#165A7E]/70 flex flex-col gap-2">
              <span className="font-heading font-bold text-xl text-[#B0EDF9]">Tahap 2: 30%</span>
              <span className="text-xs font-mono text-[#B0EDF9]">Progress Desain Disetujui</span>
              <p className="text-xs text-[#78B9CA] leading-relaxed">
                Setelah prototipe UI/UX di-ACC dan proses penulisan kode sumber frontend &amp; backend dimulai.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#04344C] border border-[#165A7E]/70 flex flex-col gap-2">
              <span className="font-heading font-bold text-xl text-[#B0EDF9]">Tahap 3: 20%</span>
              <span className="text-xs font-mono text-[#B0EDF9]">Pelunasan &amp; Go-Live</span>
              <p className="text-xs text-[#78B9CA] leading-relaxed">
                Setelah pengujian selesai, website/aplikasi siap diluncurkan, dan hak milik kode diserahterimakan penuh.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Bawah */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#074563] to-[#04344C] border border-[#B0EDF9] text-center flex flex-col items-center">
          <span className="font-mono text-xs text-[#B0EDF9] uppercase tracking-widest mb-3">
            KONSULTASI GRATIS
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#B0EDF9] mb-4 max-w-xl text-balance">
            Belum Yakin Paket Mana yang Cocok?
          </h2>
          <p className="text-sm sm:text-base text-[#78B9CA] max-w-lg mb-8 leading-relaxed text-balance">
            Diskusikan kebutuhan bisnis Anda langsung dengan kami untuk rekomendasi paket yang paling efisien.
          </p>
          <Link
            to="/booking"
            className="h-12 px-8 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2 shadow-lg active:scale-[0.98]"
          >
            <span>Jadwalkan Konsultasi 30 Menit</span>
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </Container>
    </main>
  );
};
