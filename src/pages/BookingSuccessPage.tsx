/**
 * @file src/pages/BookingSuccessPage.tsx
 * Halaman status konfirmasi permintaan jadwal (/booking/sukses).
 */

import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { bookingService } from '../features/booking/services/bookingService';
import { getWhatsAppBookingUrl } from '../features/booking/lib/whatsappMessage';
import { downloadIcsFile, getGoogleCalendarUrl } from '../features/booking/lib/ics';
import { BOOKING_CONFIG } from '../data/booking.config';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import type { BookingRecord } from '../features/booking/types';

export const BookingSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const codeParam = searchParams.get('code');

  const [booking, setBooking] = useState<BookingRecord | null>(
    (location.state as { booking?: BookingRecord })?.booking || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(!booking && Boolean(codeParam));

  useEffect(() => {
    if (!booking && codeParam) {
      setIsLoading(true);
      bookingService
        .getBookingByCode(codeParam)
        .then((found) => setBooking(found))
        .catch((err) => console.error('[BookingSuccessPage] Error fetching booking:', err))
        .finally(() => setIsLoading(false));
    }
  }, [booking, codeParam]);

  if (isLoading) {
    return (
      <main className="w-full min-h-[70vh] flex items-center justify-center pt-24 pb-16">
        <div className="flex flex-col items-center gap-3 text-muted">
          <span className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono">Memuat detail jadwal...</span>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="w-full min-h-[70vh] flex items-center justify-center pt-24 pb-16">
        <div className="section-container max-w-md text-center">
          <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4 text-orange">
            <Icon name="alert-circle" size={24} />
          </div>
          <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
            Data Jadwal Tidak Ditemukan
          </h1>
          <p className="text-sm text-muted mb-6">
            Kode booking tidak valid atau belum tersimpan di sesi browser ini.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-lg bg-orange text-navy font-heading font-bold text-sm"
          >
            <Icon name="calendar" size={16} />
            <span>Buat Jadwal Baru</span>
          </Link>
        </div>
      </main>
    );
  }

  const formatLabel =
    booking.format === 'online'
      ? 'Online (Google Meet)'
      : `Tatap Muka di Studio (${BOOKING_CONFIG.kontak.lokasiStudio})`;

  const whatsappUrl = getWhatsAppBookingUrl(booking);
  const googleCalendarUrl = getGoogleCalendarUrl(booking);

  return (
    <main className="w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      <Container className="max-w-3xl">
        {/* Header Sukses */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-cyan/15 border border-cyan/40 flex items-center justify-center mx-auto mb-4 text-cyan">
            <Icon name="check" size={28} strokeWidth={2.5} />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-orange/40 text-xs font-mono text-orange mb-3">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span>Status: Menunggu Konfirmasi Tim</span>
          </span>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-2">
            Permintaan Jadwal Terkirim
          </h1>

          <p className="text-sm sm:text-base text-muted max-w-lg mx-auto leading-relaxed">
            Terima kasih! Permintaanmu akan kami pelajari terlebih dahulu dan dikonfirmasi langsung oleh tim ViramidAgency lewat WhatsApp atau email resmi.
          </p>
        </div>

        {/* Kartu Kode Booking & Ringkasan */}
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 flex flex-col gap-6 shadow-sm mb-6">
          {/* Box Kode Booking */}
          <div className="p-4 rounded-xl bg-navy border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="text-xs font-mono text-muted block">Kode Booking Anda:</span>
              <span className="font-mono font-bold text-lg sm:text-xl text-cyan tracking-wider">
                {booking.kodeBooking}
              </span>
            </div>
            <span className="text-xs font-mono text-muted bg-surface px-3 py-1.5 rounded-lg border border-border">
              Simpan kode ini untuk referensi
            </span>
          </div>

          {/* Rincian Jadwal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pb-6 border-b border-border/80">
            <div>
              <span className="text-xs font-mono text-muted block">Jenis Sesi:</span>
              <span className="font-heading font-bold text-foreground">
                {booking.jenisPertemuanNama} ({booking.durasiMenit} Menit)
              </span>
            </div>

            <div>
              <span className="text-xs font-mono text-muted block">Format Pertemuan:</span>
              <span className="font-medium text-foreground">{formatLabel}</span>
            </div>

            <div>
              <span className="text-xs font-mono text-muted block">Tanggal:</span>
              <span className="font-heading font-bold text-foreground">
                {booking.tanggal}
              </span>
            </div>

            <div>
              <span className="text-xs font-mono text-muted block">Waktu:</span>
              <span className="font-mono font-semibold text-orange">
                {booking.jamMulai} - {booking.jamSelesai} {BOOKING_CONFIG.timezoneLabel}
              </span>
            </div>
          </div>

          {/* Rincian Pemesan */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-xs font-mono text-muted block">Nama:</span>
                <span className="font-medium text-foreground">{booking.nama}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-muted block">WhatsApp:</span>
                <span className="font-mono text-foreground">{booking.whatsapp}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-muted block">Email:</span>
                <span className="font-mono text-foreground break-all">{booking.email}</span>
              </div>
            </div>

            <div className="mt-2 pt-3 border-t border-border/40">
              <span className="text-xs font-mono text-muted block">Topik Pembahasan:</span>
              <p className="text-xs sm:text-sm text-foreground/90 bg-navy/60 p-3 rounded-lg border border-border/60 mt-1 leading-relaxed">
                "{booking.topik}"
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Aksi Penting */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-center mb-8">
          {/* 1. Kirim ke WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 px-5 rounded-xl bg-orange hover:bg-orange-hover text-navy font-heading font-bold text-sm transition-colors flex items-center justify-center gap-2 text-center shadow-sm"
          >
            <Icon name="message-square" size={18} />
            <span>Kirim Detail ke WhatsApp</span>
          </a>

          {/* 2. Unduh .ICS */}
          <button
            type="button"
            onClick={() => downloadIcsFile(booking)}
            className="py-3.5 px-5 rounded-xl border border-border bg-surface hover:bg-surface-hover text-foreground font-heading font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon name="download" size={16} />
            <span>Unduh File Kalender (.ics)</span>
          </button>

          {/* 3. Google Calendar */}
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-5 rounded-xl border border-border bg-surface hover:bg-surface-hover text-cyan font-heading font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="calendar-plus" size={16} />
            <span>Google Calendar</span>
          </a>
        </div>

        {/* Navigasi Tambahan */}
        <div className="flex items-center justify-between pt-6 border-t border-border text-xs font-mono text-muted">
          <Link
            to="/booking/riwayat"
            className="text-cyan hover:underline inline-flex items-center gap-1"
          >
            <Icon name="clock" size={14} />
            <span>Lihat Semua Riwayat Booking</span>
          </Link>

          <Link
            to="/"
            className="hover:text-foreground inline-flex items-center gap-1"
          >
            <span>Kembali ke Beranda</span>
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </Container>
    </main>
  );
};
