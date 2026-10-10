/**
 * @file src/pages/BookingSuccessPage.tsx
 * Halaman status konfirmasi permintaan jadwal (/booking/sukses).
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
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
      <main className="w-full min-h-[70vh] flex items-center justify-center pt-24 pb-16 bg-[#04344C]">
        <div className="flex flex-col items-center gap-3 text-[#78B9CA]">
          <span className="w-8 h-8 border-2 border-[#B0EDF9] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono">Memuat detail jadwal...</span>
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="w-full min-h-[70vh] flex items-center justify-center pt-24 pb-16 bg-[#04344C]">
        <div className="max-w-md text-center p-8 rounded-2xl bg-[#074563] border border-[#165A7E]">
          <div className="w-12 h-12 rounded-xl bg-[#04344C] border border-[#165A7E] flex items-center justify-center mx-auto mb-4 text-[#B0EDF9]">
            <Icon name="alert-circle" size={24} />
          </div>
          <h1 className="font-heading font-bold text-2xl text-[#B0EDF9] mb-2">
            Data Jadwal Tidak Ditemukan
          </h1>
          <p className="text-sm text-[#78B9CA] mb-6">
            Kode booking tidak valid atau belum tersimpan di sesi browser ini.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm"
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
    <main className="w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 bg-[#04344C]">
      <Container className="max-w-3xl">
        {/* Header Sukses */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#074563] border border-[#165A7E] flex items-center justify-center mx-auto mb-4 text-[#B0EDF9] shadow-md">
            <Icon name="check" size={28} strokeWidth={2.5} />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#074563] border border-[#165A7E] text-xs font-mono text-[#B0EDF9] mb-3">
            <Icon name="check-circle" size={14} className="text-[#B0EDF9]" />
            <span>Status: Menunggu Konfirmasi Tim</span>
          </span>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#B0EDF9] mb-2">
            Permintaan Jadwal Terkirim
          </h1>

          <p className="text-sm sm:text-base text-[#78B9CA] max-w-lg mx-auto leading-relaxed">
            Terima kasih! Permintaanmu akan kami pelajari terlebih dahulu dan dikonfirmasi langsung oleh tim ViramidAgency lewat WhatsApp atau email resmi.
          </p>
        </div>

        {/* Kartu Kode Booking & Ringkasan */}
        <div className="bg-[#074563] rounded-2xl border border-[#165A7E] p-6 md:p-8 flex flex-col gap-6 shadow-sm mb-6">
          {/* Box Kode Booking */}
          <div className="p-4 rounded-xl bg-[#04344C] border border-[#165A7E] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="text-xs font-mono text-[#78B9CA] block">Kode Booking Anda:</span>
              <span className="font-mono font-bold text-lg sm:text-xl text-[#B0EDF9] tracking-wider">
                {booking.kodeBooking}
              </span>
            </div>
            <span className="text-xs font-mono text-[#78B9CA] bg-[#074563] px-3 py-1.5 rounded-lg border border-[#165A7E]">
              Simpan kode ini untuk referensi
            </span>
          </div>

          {/* Rincian Jadwal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm pb-6 border-b border-[#165A7E]">
            <div>
              <span className="text-xs font-mono text-[#78B9CA] block">Jenis Sesi:</span>
              <span className="font-heading font-bold text-[#B0EDF9]">
                {booking.jenisPertemuanNama} ({booking.durasiMenit} Menit)
              </span>
            </div>

            <div>
              <span className="text-xs font-mono text-[#78B9CA] block">Format Pertemuan:</span>
              <span className="font-medium text-[#B0EDF9]">{formatLabel}</span>
            </div>

            <div>
              <span className="text-xs font-mono text-[#78B9CA] block">Tanggal:</span>
              <span className="font-heading font-bold text-[#B0EDF9]">
                {booking.tanggal}
              </span>
            </div>

            <div>
              <span className="text-xs font-mono text-[#78B9CA] block">Waktu:</span>
              <span className="font-mono font-semibold text-[#B0EDF9]">
                {booking.jamMulai} - {booking.jamSelesai} {BOOKING_CONFIG.timezoneLabel}
              </span>
            </div>
          </div>

          {/* Rincian Pemesan */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <span className="text-xs font-mono text-[#78B9CA] block">Nama:</span>
                <span className="font-medium text-[#B0EDF9]">{booking.nama}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-[#78B9CA] block">WhatsApp:</span>
                <span className="font-mono text-[#B0EDF9]">{booking.whatsapp}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-[#78B9CA] block">Email:</span>
                <span className="font-mono text-[#B0EDF9] break-all">{booking.email || '-'}</span>
              </div>
            </div>

            <div className="mt-2 pt-3 border-t border-[#165A7E]/40">
              <span className="text-xs font-mono text-[#78B9CA] block">Topik Pembahasan:</span>
              <p className="text-xs sm:text-sm text-[#B0EDF9] bg-[#04344C] p-3 rounded-lg border border-[#165A7E] mt-1 leading-relaxed">
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
            className="flex-1 py-3.5 px-5 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm transition-colors flex items-center justify-center gap-2 text-center shadow-sm"
          >
            <Icon name="message-square" size={18} />
            <span>Kirim Detail ke WhatsApp</span>
          </a>

          {/* 2. Unduh .ICS */}
          <button
            type="button"
            onClick={() => downloadIcsFile(booking)}
            className="py-3.5 px-5 rounded-full border border-[#165A7E] bg-[#074563] hover:bg-[#0B567C] text-[#B0EDF9] font-heading font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon name="download" size={16} />
            <span>Unduh File Kalender (.ics)</span>
          </button>

          {/* 3. Google Calendar */}
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-5 rounded-full border border-[#165A7E] bg-[#074563] hover:bg-[#0B567C] text-[#B0EDF9] font-heading font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="calendar-plus" size={16} />
            <span>Google Calendar</span>
          </a>
        </div>

        {/* Navigasi Tambahan */}
        <div className="flex items-center justify-between pt-6 border-t border-[#165A7E] text-xs font-mono text-[#78B9CA]">
          <Link
            to="/booking/riwayat"
            className="text-[#B0EDF9] hover:underline inline-flex items-center gap-1"
          >
            <Icon name="clock" size={14} />
            <span>Lihat Semua Riwayat Booking</span>
          </Link>

          <Link
            to="/"
            className="hover:text-[#B0EDF9] inline-flex items-center gap-1"
          >
            <span>Kembali ke Beranda</span>
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </Container>
    </main>
  );
};
