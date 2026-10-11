/**
 * @file src/pages/BookingPage.tsx
 * Halaman utama pemesanan jadwal konsultasi & diskusi proyek ViramidAgency (/booking).
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
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
    <main className="relative w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#04344C]">
      {/* Ambient Lighting Orbs */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B0EDF9]/5 blur-[130px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 left-1/4 w-[500px] h-[300px] bg-[#074563]/60 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container className="max-w-5xl">
        {/* Header Halaman dengan Ilustrasi Storyset Polosan (Frameless) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 md:mb-14">
          <div className="lg:col-span-7 text-center lg:text-left">
            <Eyebrow variant="cyan" className="mb-3 inline-block">
              KONSULTASI &amp; DISKUSI PROYEK
            </Eyebrow>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#B0EDF9] tracking-[-0.02em] mb-4 text-balance">
              Jadwalkan Sesi Konsultasi Bisnis &amp; LMS
            </h1>

            <p className="text-sm sm:text-base text-[#78B9CA] max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance mb-6">
              Pilih waktu yang pas untuk membedah arah brand, kebutuhan fitur platform LMS, dan estimasi proyek digitalmu langsung bersama tim inti ViramidAgency.
            </p>

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs font-mono text-[#B0EDF9]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#074563] border border-[#165A7E]">
                <Icon name="check" size={13} className="text-[#B0EDF9]" />
                <span>100% Gratis</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#074563] border border-[#165A7E]">
                <Icon name="users" size={13} className="text-[#B0EDF9]" />
                <span>Diskusi 1-on-1 Langsung</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#074563] border border-[#165A7E]">
                <Icon name="message-square" size={13} className="text-[#B0EDF9]" />
                <span>Konfirmasi Cepat WhatsApp</span>
              </span>
            </div>
          </div>

          {/* Kolom Ilustrasi Storyset Jadwal Polosan (Frameless) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-48 sm:w-60 lg:w-72 flex flex-col items-center">
              <div
                className="absolute inset-0 bg-[#B0EDF9]/15 blur-2xl rounded-full pointer-events-none -z-10"
                aria-hidden="true"
              />
              <img
                src="/images/booking-storyset.svg"
                alt="Schedule illustrations by Storyset - ViramidAgency Konsultasi"
                className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(2,34,50,0.85)] hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
              <a
                href="https://storyset.com/schedule"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-[10px] font-mono text-[#78B9CA]/75 hover:text-[#B0EDF9] transition-colors"
                title="Schedule illustrations by Storyset"
              >
                Schedule illustrations by Storyset
              </a>
            </div>
          </div>
        </div>

        {/* Grand Master Card Container */}
        <div className="w-full bg-[#074563] border border-[#165A7E] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] rounded-3xl p-5 sm:p-8 md:p-10 relative overflow-hidden backdrop-blur-xl">
          {/* Top subtle cyan accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B0EDF9] to-transparent opacity-80" />

          {/* Wizard Form Component */}
          <BookingWizard initialJenisId={initialJenis} />
        </div>
      </Container>
    </main>
  );
};
