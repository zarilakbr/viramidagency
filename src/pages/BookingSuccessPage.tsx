/**
 * @file src/pages/BookingSuccessPage.tsx
 * Halaman status konfirmasi permintaan jadwal (/booking/sukses).
 * Dilengkapi integrasi link Google Meet otomatis, pengiriman ke WhatsApp & Email,
 * serta tombol aksi yang rapi dan simetris di seluruh resolusi mobile dan desktop.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { bookingService } from '../features/booking/services/bookingService';
import { getWhatsAppBookingUrl, getEmailBookingUrl } from '../features/booking/lib/whatsappMessage';
import { downloadIcsFile, getGoogleCalendarUrl } from '../features/booking/lib/ics';
import { copyToClipboard } from '../features/booking/lib/clipboard';
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
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

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
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm w-full sm:w-auto"
          >
            <Icon name="calendar" size={16} />
            <span>Buat Jadwal Baru</span>
          </Link>
        </div>
      </main>
    );
  }

  const isOnline = booking.format === 'online';
  const meetingLink = booking.meetingUrl || (isOnline ? `https://meet.google.com/vrm-${booking.kodeBooking.toLowerCase()}` : '');

  const formatLabel = isOnline
    ? 'Online (Google Meet)'
    : `Tatap Muka di Studio (${BOOKING_CONFIG.kontak.lokasiStudio})`;

  const whatsappUrl = getWhatsAppBookingUrl({ ...booking, meetingUrl: meetingLink });
  const emailUrl = getEmailBookingUrl({ ...booking, meetingUrl: meetingLink });
  const googleCalendarUrl = getGoogleCalendarUrl({ ...booking, meetingUrl: meetingLink });

  const handleCopyLink = async () => {
    if (meetingLink) {
      const ok = await copyToClipboard(meetingLink);
      if (ok) {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    }
  };

  const handleCopyCode = async () => {
    if (booking.kodeBooking) {
      const ok = await copyToClipboard(booking.kodeBooking);
      if (ok) {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2500);
      }
    }
  };

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
            <span>Status: Permintaan Jadwal Diterima</span>
          </span>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#B0EDF9] mb-2 text-balance">
            Permintaan Jadwal Terkirim
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#78B9CA] max-w-lg mx-auto leading-relaxed text-balance">
            Terima kasih! Jadwal konsultasi Anda telah diproses. Tautan pertemuan dan rincian lengkap telah disiapkan di bawah ini.
          </p>
        </div>

        {/* Kotak Link Google Meet Otomatis (Jika Format Online) */}
        {isOnline && meetingLink && (
          <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-[#074563] border border-[#B0EDF9] shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="video" size={18} className="text-[#B0EDF9]" />
              <span className="font-heading font-bold text-sm sm:text-base text-[#B0EDF9]">
                Tautan Ruang Google Meet (Otomatis)
              </span>
            </div>
            <p className="text-xs text-[#78B9CA] mb-3 leading-relaxed">
              Tautan video call telah dibuat otomatis sesuai jadwal konsultasi Anda. Silakan bergabung melalui link berikut:
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-xl bg-[#04344C] border border-[#165A7E]">
              <span className="flex-1 px-3 py-1.5 text-xs font-mono text-[#B0EDF9] truncate select-all">
                {meetingLink}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex-1 sm:flex-initial h-9 px-3.5 rounded-lg border border-[#165A7E] bg-[#074563] hover:border-[#B0EDF9] text-[#B0EDF9] text-xs font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Icon name={copiedLink ? 'check' : 'link'} size={13} />
                  <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link Meet'}</span>
                </button>
                <a
                  href={meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial h-9 px-3.5 rounded-lg bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] text-xs font-heading font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Buka Meet</span>
                  <Icon name="arrow-up-right" size={13} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Kartu Kode Booking & Ringkasan */}
        <div className="bg-[#074563] rounded-2xl border border-[#165A7E] p-5 sm:p-7 md:p-8 flex flex-col gap-6 shadow-sm mb-6">
          {/* Box Kode Booking dengan Tombol Salin */}
          <div className="p-4 rounded-xl bg-[#04344C] border border-[#165A7E] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <span className="text-xs font-mono text-[#78B9CA] block">Kode Booking Anda:</span>
              <span className="font-mono font-bold text-lg sm:text-xl text-[#B0EDF9] tracking-wider select-all">
                {booking.kodeBooking}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCode}
                className="h-9 px-3.5 rounded-lg border border-[#165A7E] bg-[#074563] hover:border-[#B0EDF9] text-[#B0EDF9] text-xs font-mono transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Icon name={copiedCode ? 'check' : 'copy'} size={13} />
                <span>{copiedCode ? 'Kode Tersalin!' : 'Salin Kode Booking'}</span>
              </button>
            </div>
          </div>

          {/* Rincian Jadwal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pb-6 border-b border-[#165A7E]">
            <div>
              <span className="text-[11px] font-mono text-[#78B9CA] block">Jenis Sesi:</span>
              <span className="font-heading font-bold text-[#B0EDF9] text-sm sm:text-base">
                {booking.jenisPertemuanNama} ({booking.durasiMenit} Menit)
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-[#78B9CA] block">Format Pertemuan:</span>
              <span className="font-medium text-[#B0EDF9] text-sm sm:text-base">{formatLabel}</span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-[#78B9CA] block">Tanggal Pertemuan:</span>
              <span className="font-heading font-bold text-[#B0EDF9] text-sm sm:text-base">
                {booking.tanggal}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-[#78B9CA] block">Waktu Sesi (WITA):</span>
              <span className="font-mono font-bold text-[#B0EDF9] text-sm sm:text-base">
                {booking.jamMulai} - {booking.jamSelesai} {BOOKING_CONFIG.timezoneLabel}
              </span>
            </div>
          </div>

          {/* Rincian Pemesan */}
          <div className="flex flex-col gap-2 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <span className="text-[11px] font-mono text-[#78B9CA] block">Nama Pemesan:</span>
                <span className="font-medium text-[#B0EDF9]">{booking.nama}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#78B9CA] block">WhatsApp:</span>
                <span className="font-mono text-[#B0EDF9]">{booking.whatsapp}</span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#78B9CA] block">Email:</span>
                <span className="font-mono text-[#B0EDF9] break-all">{booking.email || '-'}</span>
              </div>
            </div>

            <div className="mt-2 pt-3 border-t border-[#165A7E]/40">
              <span className="text-[11px] font-mono text-[#78B9CA] block">Topik Pembahasan:</span>
              <p className="text-xs sm:text-sm text-[#B0EDF9] bg-[#04344C] p-3 rounded-lg border border-[#165A7E] mt-1 leading-relaxed">
                "{booking.topik}"
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Aksi Simetris (Grid 2 Kolom di Mobile & Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {/* 1. Kirim ke WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 px-5 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Icon name="message-square" size={16} />
            <span>Kirim ke WhatsApp</span>
          </a>

          {/* 2. Kirim via Email */}
          <a
            href={emailUrl}
            className="w-full h-12 px-5 rounded-full border border-[#165A7E] bg-[#074563] hover:bg-[#0B567C] hover:border-[#B0EDF9] text-[#B0EDF9] font-heading font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="mail" size={16} />
            <span>Kirim via Email</span>
          </a>

          {/* 3. Google Calendar */}
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 px-5 rounded-full border border-[#165A7E] bg-[#074563] hover:bg-[#0B567C] hover:border-[#B0EDF9] text-[#B0EDF9] font-heading font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="calendar-plus" size={16} />
            <span>Google Calendar</span>
          </a>

          {/* 4. Unduh .ICS */}
          <button
            type="button"
            onClick={() => downloadIcsFile({ ...booking, meetingUrl: meetingLink })}
            className="w-full h-12 px-5 rounded-full border border-[#165A7E] bg-[#074563] hover:bg-[#0B567C] hover:border-[#B0EDF9] text-[#B0EDF9] font-heading font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Icon name="download" size={16} />
            <span>Unduh Kalender (.ics)</span>
          </button>
        </div>

        {/* Navigasi Tambahan */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#165A7E] text-xs font-mono text-[#78B9CA]">
          <Link
            to="/booking/riwayat"
            className="text-[#B0EDF9] hover:underline inline-flex items-center gap-1"
          >
            <Icon name="clock" size={14} />
            <span>Lihat Riwayat Booking Perangkat Ini</span>
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
