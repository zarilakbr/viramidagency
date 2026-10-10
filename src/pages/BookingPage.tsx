/**
 * @file src/pages/BookingPage.tsx
 * Halaman utama pemesanan jadwal konsultasi & diskusi proyek ViramidAgency (/booking).
 * Didesain megah, modern, dan berkontras tinggi dengan ambient lighting dan master container.
 */

import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BookingWizard } from '../features/booking/components/BookingWizard';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Icon } from '../components/ui/Icon';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialJenis = searchParams.get('jenis') || undefined;

  return (
    <main className="relative w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange/10 blur-[130px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 left-1/4 w-[500px] h-[300px] bg-[#262660]/30 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container className="max-w-5xl">
        {/* Header Halaman yang Megah & Berwibawa */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <Eyebrow variant="orange" className="mb-3">
            KONSULTASI &amp; DISKUSI PROYEK
          </Eyebrow>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-cream tracking-[-0.025em] mb-4 text-balance">
            Jadwalkan Sesi Konsultasi Bisnis
          </h1>

          <p className="text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed text-balance">
            Pilih waktu yang pas untuk membedah arah brand, kebutuhan fitur, dan estimasi proyek digitalmu langsung bersama tim inti ViramidAgency.
          </p>

          {/* Quick Trust Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-cream">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12123F] border border-[#262660]">
              <span className="w-2 h-2 rounded-full bg-orange" />
              <span>100% Gratis</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12123F] border border-[#262660]">
              <span className="w-2 h-2 rounded-full bg-orange" />
              <span>Diskusi 1-on-1 Langsung</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12123F] border border-[#262660]">
              <span className="w-2 h-2 rounded-full bg-orange" />
              <span>Konfirmasi Cepat via WhatsApp</span>
            </span>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-mono text-muted">
            <Link
              to="/booking/riwayat"
              className="text-orange hover:underline inline-flex items-center gap-1.5"
            >
              <Icon name="clock" size={13} />
              <span>Lihat Riwayat Jadwal di Perangkat Ini</span>
            </Link>
          </div>
        </div>

        {/* Grand Master Card Container */}
        <div className="w-full bg-[#0D0D33] border border-[#252562] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] rounded-3xl p-5 sm:p-8 md:p-10 relative overflow-hidden backdrop-blur-xl">
          {/* Top subtle orange accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange to-transparent opacity-80" />

          {/* Wizard Form Component */}
          <BookingWizard initialJenisId={initialJenis} />
        </div>
      </Container>
    </main>
  );
};
