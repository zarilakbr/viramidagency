/**
 * @file src/pages/BookingHistoryPage.tsx
 * Halaman riwayat pemesanan jadwal pada perangkat ini (/booking/riwayat).
 * Pengguna dapat meninjau jadwal dan membatalkan permintaan jika diperlukan.
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
    <main className="w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      <Container className="max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-xs font-mono font-medium text-cyan mb-2">
              <Icon name="clock" size={14} />
              <span>Penyimpanan Lokal Perangkat</span>
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
              Riwayat Jadwal Pertemuan
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Daftar seluruh permintaan jadwal konsultasi yang pernah diajukan melalui browser ini.
            </p>
          </div>

          <Link
            to="/booking"
            className="py-2.5 px-4 rounded-lg bg-orange hover:bg-orange-hover text-navy font-heading font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Icon name="calendar" size={16} />
            <span>Buat Jadwal Baru</span>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center text-muted gap-3">
            <span className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Memuat riwayat booking...</span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && history.length === 0 && (
          <div className="py-16 px-6 text-center border border-dashed border-border rounded-2xl bg-surface/40 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-navy border border-border flex items-center justify-center text-muted mb-4">
              <Icon name="calendar" size={24} />
            </div>
            <h2 className="font-heading font-bold text-lg text-foreground mb-1">
              Belum Ada Jadwal Pertemuan
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-md mb-6 leading-relaxed">
              Kamu belum pernah mengajukan jadwal konsultasi pada perangkat ini. Mulai konsultasi gratis dengan tim ViramidAgency sekarang.
            </p>
            <Link
              to="/booking"
              className="py-3 px-6 rounded-xl bg-orange text-navy font-heading font-bold text-sm"
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
                  className={`p-5 sm:p-6 rounded-xl border transition-all ${
                    isCancelled
                      ? 'border-border/40 bg-surface/30 opacity-70'
                      : 'border-border bg-surface hover:border-muted/80 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-sm text-cyan">
                        {item.kodeBooking}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold uppercase ${
                          isCancelled
                            ? 'bg-surface border border-border text-muted line-through'
                            : 'bg-orange/15 border border-orange/40 text-orange'
                        }`}
                      >
                        {isCancelled ? 'Dibatalkan' : 'Menunggu Konfirmasi'}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-muted">
                      Diajukan: {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-muted block font-mono text-[11px]">Jenis Sesi:</span>
                      <span className="font-heading font-bold text-foreground">
                        {item.jenisPertemuanNama} ({item.durasiMenit} Menit)
                      </span>
                      <span className="text-muted text-xs block">{formatLabel}</span>
                    </div>

                    <div>
                      <span className="text-muted block font-mono text-[11px]">Waktu Pertemuan:</span>
                      <span className="font-heading font-semibold text-foreground">
                        {item.tanggal}
                      </span>
                      <span className="font-mono text-orange block">
                        {item.jamMulai} - {item.jamSelesai} {BOOKING_CONFIG.timezoneLabel}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted block font-mono text-[11px]">Data Pemesan:</span>
                      <span className="font-medium text-foreground block">{item.nama}</span>
                      <span className="font-mono text-muted text-xs block">{item.whatsapp}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs text-muted/90 italic truncate max-w-md">
                      "{item.topik}"
                    </p>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      {!isCancelled && (
                        <>
                          <a
                            href={getWhatsAppBookingUrl(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-1.5 px-3 rounded-lg bg-orange/15 hover:bg-orange/25 border border-orange/40 text-orange font-mono text-xs transition-colors inline-flex items-center gap-1.5"
                          >
                            <Icon name="message-square" size={13} />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => downloadIcsFile(item)}
                            className="py-1.5 px-3 rounded-lg bg-surface hover:bg-surface-hover border border-border text-foreground font-mono text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Icon name="download" size={13} />
                            <span>.ICS</span>
                          </button>

                          <button
                            type="button"
                            disabled={cancellingId === item.id}
                            onClick={() => handleCancel(item.id, item.kodeBooking)}
                            className="py-1.5 px-3 rounded-lg bg-surface hover:bg-red-500/10 border border-border hover:border-red-400 text-muted hover:text-red-400 font-mono text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <Icon name="trash" size={13} />
                            <span>Batalkan</span>
                          </button>
                        </>
                      )}

                      {isCancelled && (
                        <span className="text-xs font-mono text-muted italic">
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
