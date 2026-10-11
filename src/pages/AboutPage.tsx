/**
 * @file src/pages/AboutPage.tsx
 * Halaman rute terukur untuk Profil & Filosofi ViramidAgency (/tentang).
 * Menampilkan visi, prinsip kerja, dan profil resmi Founder Zaril Akbar.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Icon } from '../components/ui/Icon';
import { PROFIL_AGENCY, NILAI_KERJA, DAFTAR_TIM, KONTAK_AGENCY } from '../data/content';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Tentang ViramidAgency - Filosofi & Profil Studio';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const getInitials = (nama: string) => {
    const parts = nama.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nama.slice(0, 2).toUpperCase() || 'VA';
  };

  return (
    <main className="relative w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 bg-[#04344C] overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B0EDF9]/5 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 left-1/4 w-[500px] h-[300px] bg-[#074563]/60 blur-[140px] rounded-full pointer-events-none -z-10"
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
          <span className="text-[#B0EDF9]">Tentang Agency</span>
        </div>

        {/* Header Seksi dengan Ilustrasi Polosan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-12 md:mb-16">
          <div className="lg:col-span-8 text-center lg:text-left">
            <Eyebrow variant="cyan" className="mb-3 inline-block">
              FILOSOFI &amp; PROFIL STUDIO
            </Eyebrow>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#B0EDF9] tracking-[-0.02em] mb-4 text-balance">
              Tentang ViramidAgency
            </h1>

            <p className="text-sm sm:text-base text-[#78B9CA] max-w-2xl leading-relaxed text-balance mx-auto lg:mx-0">
              Pendekatan dedikatif yang menggabungkan presisi desain arsitektural dan keandalan teknologi rekayasa digital.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-32 sm:w-44 md:w-52 lg:w-60 xl:w-68">
              <div
                className="absolute inset-0 bg-[#B0EDF9]/15 blur-2xl rounded-full pointer-events-none -z-10"
                aria-hidden="true"
              />
              <img
                src="/images/about-storyset.svg"
                alt="Tentang ViramidAgency"
                className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(2,34,50,0.85)] hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Dua Kolom: Filosofi & Nilai Kerja */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Kolom Kiri: Cerita Filosofi */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <Eyebrow variant="cyan">FILOSOFI &amp; KOMITMEN</Eyebrow>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#B0EDF9] tracking-[-0.02em] leading-snug">
              Menciptakan karya yang tidak hanya memikat visual, namun terukur dampaknya.
            </h2>
            <p className="text-sm sm:text-base text-[#78B9CA] leading-relaxed">
              {PROFIL_AGENCY.cerita}
            </p>
            <p className="text-sm sm:text-base text-[#78B9CA] leading-relaxed">
              Kami percaya bahwa sebuah website atau aplikasi yang baik adalah pertemuan harmonis antara tipografi yang proporsional, kecepatan akses secepat kilat, dan arsitektur kode yang terstruktur rapi.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs font-mono text-[#B0EDF9]">
              <span className="flex items-center gap-1.5">
                <Icon name="map-pin" size={14} />
                <span>{KONTAK_AGENCY.lokasi}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="check-circle" size={14} />
                <span>Bespoke Engineering</span>
              </span>
            </div>
          </div>

          {/* Kolom Kanan: 3 Nilai Kerja */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <Eyebrow variant="cyan">PRINSIP UTAMA KAMI</Eyebrow>
            {NILAI_KERJA.map((nilai, index) => (
              <div
                key={nilai.judul}
                className="p-6 rounded-2xl bg-[#074563] border border-[#165A7E] hover:border-[#B0EDF9] transition-all duration-300"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-heading font-bold text-lg text-[#B0EDF9]">
                    {nilai.judul}
                  </span>
                  <span className="font-mono text-xs text-[#78B9CA]">0{index + 1}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#78B9CA] leading-relaxed">
                  {nilai.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Profil Tim Kolektif & Founder */}
        <div className="mb-16">
          <div className="text-center md:text-left mb-8">
            <Eyebrow variant="cyan" className="mb-2 inline-block">
              TALENTA &amp; DEDIKASI
            </Eyebrow>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#B0EDF9]">
              Di Balik Setiap Rekayasa Digital
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DAFTAR_TIM.map((anggota) => {
              const isFounder = anggota.peran.toLowerCase().includes('founder');

              return (
                <div
                  key={anggota.nama}
                  className={`relative rounded-2xl p-6 bg-[#074563] border flex flex-col justify-between transition-all duration-300 ${
                    isFounder
                      ? 'border-[#B0EDF9] shadow-lg'
                      : 'border-[#165A7E] hover:border-[#B0EDF9]'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    {anggota.foto ? (
                      <img
                        src={anggota.foto}
                        alt={anggota.nama}
                        className="w-16 h-16 rounded-xl object-cover border border-[#B0EDF9] shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-[#04344C] border border-[#165A7E] flex items-center justify-center text-[#B0EDF9] font-heading font-bold text-lg shrink-0">
                        {getInitials(anggota.nama)}
                      </div>
                    )}

                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#B0EDF9] leading-snug">
                        {anggota.nama}
                      </h3>
                      <span className="text-xs font-mono text-[#78B9CA] block mt-0.5">
                        {anggota.peran}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#78B9CA] leading-relaxed">
                    {isFounder
                      ? 'Memimpin visi kreatif dan standar kualitas produk digital ViramidAgency dengan dedikasi tinggi pada estetika dan fungsi.'
                      : 'Berdedikasi merancang solusi antarmuka dan arsitektur sistem modern untuk performa bisnis klien yang maksimal.'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Bawah */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#074563] to-[#04344C] border border-[#B0EDF9] text-center flex flex-col items-center">
          <span className="font-mono text-xs text-[#B0EDF9] uppercase tracking-widest mb-3">
            KOLABORASI DIGITAL
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#B0EDF9] mb-4 max-w-xl text-balance">
            Mari Bertemu &amp; Wujudkan Proyekmu
          </h2>
          <p className="text-sm sm:text-base text-[#78B9CA] max-w-lg mb-8 leading-relaxed text-balance">
            Siap bekerja sama dengan tim yang mengedepankan kualitas arsitektural dan ketepatan kode?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/booking"
              className="h-12 px-8 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2 shadow-lg active:scale-[0.98]"
            >
              <span>Jadwalkan Konsultasi</span>
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link
              to="/karya"
              className="h-12 px-6 rounded-full border border-[#165A7E] hover:border-[#B0EDF9] text-[#B0EDF9] font-heading font-bold text-sm transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Lihat Portofolio</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
};
