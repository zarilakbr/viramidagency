/**
 * @file src/pages/BookingHistoryPage.tsx
 * Halaman riwayat pemesanan jadwal pada perangkat ini (/booking/riwayat).
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../features/booking/services/bookingService';
import { BOOKING_CONFIG } from '../data/booking.config';
import { getWhatsAppBookingUrl } from '../features/booking/lib/whatsappMessage';
import { downloadIcsFile } from '../features/booking/lib/ics';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import type { BookingRecord } from '../features/booking/types';

export const BookingHistoryPage: React.FC = () => {
  const [history, setHistory] = useState<BookingRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const records = await bookingService.getBookingHistory();
      setHistory(records);
    } catch (err) {
      console.error('[BookingHistoryPage] Error loading history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleCancel = async (id: string, kode: string) => {
    const isConfirmed = window.confirm(
      `Apakah kamu yakin ingin membatalkan jadwal pertemuan dengan kode ${kode}? Slot waktu ini akan dibebaskan kembali.`
    );
    if (!isConfirmed) return;

    setCancellingId(id);
    try {
      await bookingService.cancelBooking(id);
      await loadHistory();
    } catch (err) {
      console.error('[BookingHistoryPage] Error cancelling booking:', err);
      alert('Gagal membatalkan booking. Silakan coba lagi.');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <main className="w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 bg-[#04344C]">
      <Container className="max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#165A7E]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#165A7E] bg-[#074563] text-xs font-mono font-medium text-[#B0EDF9] mb-2">
              <Icon name="clock" size={14} />
              <span>Penyimpanan Lokal Perangkat</span>
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#B0EDF9]">
              Riwayat Jadwal Pertemuan
            </h1>
            <p className="text-xs sm:text-sm text-[#78B9CA] mt-1">
              Daftar seluruh permintaan jadwal konsultasi yang pernah diajukan melalui browser ini.
            </p>
          </div>

          <Link
            to="/booking"
            className="py-2.5 px-5 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto shadow-sm"
          >
            <Icon name="calendar" size={16} />
            <span>Buat Jadwal Baru</span>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center text-[#78B9CA] gap-3">
            <span className="w-8 h-8 border-2 border-[#B0EDF9] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Memuat riwayat booking...</span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && history.length === 0 && (
          <div className="py-16 px-6 text-center border border-dashed border-[#165A7E] rounded-2xl bg-[#074563]/40 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-[#04344C] border border-[#165A7E] flex items-center justify-center text-[#B0EDF9] mb-4 shadow-sm">
              <Icon name="calendar" size={24} />
            </div>
            <h2 className="font-heading font-bold text-lg text-[#B0EDF9] mb-1">
              Belum Ada Jadwal Pertemuan
            </h2>
            <p className="text-xs sm:text-sm text-[#78B9CA] max-w-md mb-6 leading-relaxed">
              Kamu belum pernah mengajukan jadwal konsultasi pada perangkat ini. Mulai konsultasi gratis dengan tim ViramidAgency sekarang.
            </p>
            <Link
              to="/booking"
              className="py-3 px-6 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm shadow-sm"
            >
              Jadwalkan Konsultasi Pertama
            </Link>
          </div>
        )}

        {/* Daftar Riwayat */}
        {!isLoading && history.length > 0 && (
          <div className="flex flex-col gap-4">
            {history.map((item) => {
              const isCancelled = item.status === 'dibatalkan';
              const formatLabel =
                item.format === 'online'
                  ? 'Online (Google Meet)'
                  : `Tatap Muka (${BOOKING_CONFIG.kontak.lokasiStudio})`;

              return (
                <div
                  key={item.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                    isCancelled
                      ? 'border-[#165A7E]/40 bg-[#074563]/30 opacity-70'
                      : 'border-[#165A7E] bg-[#074563] hover:border-[#B0EDF9] shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#165A7E]/60">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#B0EDF9]">
                        {item.kodeBooking}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase ${
                          isCancelled
                            ? 'bg-[#04344C] border border-[#165A7E] text-[#78B9CA] line-through'
                            : 'bg-[#04344C] border border-[#165A7E] text-[#B0EDF9]'
                        }`}
                      >
                        {isCancelled ? 'Dibatalkan' : 'Menunggu Konfirmasi'}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-[#78B9CA]">
                      Diajukan: {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-[#78B9CA] block font-mono text-[11px]">Jenis Sesi:</span>
                      <span className="font-heading font-bold text-[#B0EDF9]">
                        {item.jenisPertemuanNama} ({item.durasiMenit} Menit)
                      </span>
                      <span className="text-[#78B9CA] text-xs block">{formatLabel}</span>
                    </div>

                    <div>
                      <span className="text-[#78B9CA] block font-mono text-[11px]">Waktu Pertemuan:</span>
                      <span className="font-heading font-semibold text-[#B0EDF9]">
                        {item.tanggal}
                      </span>
                      <span className="font-mono text-[#B0EDF9] block">
                        {item.jamMulai} - {item.jamSelesai} {BOOKING_CONFIG.timezoneLabel}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#78B9CA] block font-mono text-[11px]">Data Pemesan:</span>
                      <span className="font-medium text-[#B0EDF9] block">{item.nama}</span>
                      <span className="font-mono text-[#78B9CA] text-xs block">{item.whatsapp}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#165A7E]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs text-[#78B9CA] italic truncate max-w-md">
                      "{item.topik}"
                    </p>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      {!isCancelled && (
                        <>
                          <a
                            href={getWhatsAppBookingUrl(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-1.5 px-3 rounded-lg bg-[#04344C] hover:bg-[#0B567C] border border-[#165A7E] text-[#B0EDF9] font-mono text-xs transition-colors inline-flex items-center gap-1.5"
                          >
                            <Icon name="message-square" size={13} />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => downloadIcsFile(item)}
                            className="py-1.5 px-3 rounded-lg bg-[#04344C] hover:bg-[#0B567C] border border-[#165A7E] text-[#B0EDF9] font-mono text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Icon name="download" size={13} />
                            <span>.ICS</span>
                          </button>

                          <button
                            type="button"
                            disabled={cancellingId === item.id}
                            onClick={() => handleCancel(item.id, item.kodeBooking)}
                            className="py-1.5 px-3 rounded-lg bg-[#04344C] hover:bg-[#0B567C] border border-[#165A7E] hover:border-[#B0EDF9] text-[#78B9CA] hover:text-[#B0EDF9] font-mono text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <Icon name="trash" size={13} />
                            <span>Batalkan</span>
                          </button>
                        </>
                      )}

                      {isCancelled && (
                        <span className="text-xs font-mono text-[#78B9CA] italic">
                          Slot jadwal telah dibebaskan
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </main>
  );
};
