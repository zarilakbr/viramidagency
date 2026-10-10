/**
 * @file src/pages/BookingPage.tsx
 * Halaman utama pemesanan jadwal konsultasi & diskusi proyek ViramidAgency (/booking).
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
    <main className="w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      <Container>
        {/* Header Halaman */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs font-mono font-medium text-orange mb-4">
            <Icon name="calendar" size={14} />
            <span>Jadwalkan Sesi Konsultasi &amp; Diskusi</span>
          </div>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-cream tracking-[-0.025em] mb-4">
            Mulai Kolaborasi Digitalmu
          </h1>

          <p className="text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
            Pilih jenis pertemuan, tentukan jadwal yang pas, dan diskusikan rencana website atau brand bisnismu langsung bersama founder &amp; tim ViramidAgency.
          </p>

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

        {/* Wizard Form Component */}
        <BookingWizard initialJenisId={initialJenis} />
      </Container>
    </main>
  );
};
