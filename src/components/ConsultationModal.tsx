/**
 * @file src/components/ConsultationModal.tsx
 * Dialog modal pilihan konsultasi instan: WhatsApp (Aplikasi Langsung) vs Email Resmi vs Kalender Meeting.
 * Dilengkapi validasi wajib (Nama, Email, Catatan Proyek) serta Verifikasi Keamanan Cloudflare & reCAPTCHA.
 * Eksklusif 2 Warna: HEX #04344C (Deep Teal) & HEX #B0EDF9 (Ice Cyan).
 * Font Judul: Gastilo.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './ui/Icon';
import { Eyebrow } from './ui/Eyebrow';
import { CaptchaVerification } from './ui/CaptchaVerification';
import { KONTAK_AGENCY } from '../data/content';
import { openWhatsAppDirectly, openEmailDirectly } from '../lib/whatsapp';

/**
 * Event helper global agar modal konsultasi dapat dibuka dari tombol manapun di website.
 */
export function openConsultationModal(topikAwal?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-consultation-modal', {
        detail: { topik: topikAwal },
      })
    );
  }
}

export const ConsultationModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [namaKlien, setNamaKlien] = useState('');
  const [emailKlien, setEmailKlien] = useState('');
  const [topikKebutuhan, setTopikKebutuhan] = useState('Website');
  const [pesanTambahan, setPesanTambahan] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const navigate = useNavigate();

  // Dengarkan event global pembukaan modal
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ topik?: string }>;
      if (customEvent.detail?.topik) {
        setTopikKebutuhan(customEvent.detail.topik);
      }
      setCaptchaToken(null);
      setErrors({});
      setIsOpen(true);
    };

    window.addEventListener('open-consultation-modal', handleOpen);
    return () => window.removeEventListener('open-consultation-modal', handleOpen);
  }, []);

  // Pastikan token selalu ter-reset setiap kali modal dibuka kembali
  useEffect(() => {
    if (isOpen) {
      setCaptchaToken(null);
      setErrors({});
    }
  }, [isOpen]);

  // Tutup dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Cegah body scrolling saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!namaKlien.trim()) {
      errs.nama = 'Nama lengkap wajib diisi.';
    }

    if (!emailKlien.trim()) {
      errs.email = 'Alamat email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailKlien.trim())) {
      errs.email = 'Format alamat email tidak valid.';
    }

    if (!pesanTambahan.trim()) {
      errs.pesan = 'Catatan atau rincian kebutuhan proyek wajib diisi.';
    } else if (pesanTambahan.trim().length < 5) {
      errs.pesan = 'Catatan minimal 5 karakter agar kami dapat memahami proyek Anda.';
    }

    if (!captchaToken) {
      errs.captcha = 'Mohon selesaikan verifikasi Cloudflare & reCAPTCHA terlebih dahulu.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildMessageText = () => {
    const lines = [
      `*KONSULTASI PROYEK - VIRAMIDAGENCY*`,
      `────────────────────────────`,
      `• *Nama:* ${namaKlien.trim()}`,
      `• *Email:* ${emailKlien.trim()}`,
      `• *Kebutuhan:* ${topikKebutuhan}`,
      `• *Catatan:* ${pesanTambahan.trim()}`,
      `• *Verifikasi Keamanan:* Terverifikasi (Cloudflare Turnstile & reCAPTCHA)`,
      `────────────────────────────`,
      `_Halo Tim ViramidAgency, saya telah melengkapi formulir konsultasi resmi melalui website. Mohon informasi ketersediaan dan diskusi lanjutnya. Terima kasih!_`,
    ];
    return lines.join('\n');
  };

  const handleSendWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setErrors((prev) => ({
        ...prev,
        captcha: 'Mohon selesaikan verifikasi Cloudflare & reCAPTCHA terlebih dahulu.',
      }));
      return;
    }
    if (!validateForm()) return;
    const text = buildMessageText();
    openWhatsAppDirectly(text);
    setCaptchaToken(null);
    setIsOpen(false);
  };

  const handleSendEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setErrors((prev) => ({
        ...prev,
        captcha: 'Mohon selesaikan verifikasi Cloudflare & reCAPTCHA terlebih dahulu.',
      }));
      return;
    }
    if (!validateForm()) return;
    const subject = `[KONSULTASI PROYEK] ${topikKebutuhan} - ${namaKlien.trim()}`;
    const body = buildMessageText();
    openEmailDirectly(subject, body);
    setCaptchaToken(null);
    setIsOpen(false);
  };

  const handleGoToBooking = () => {
    setIsOpen(false);
    navigate(`/booking?jenis=konsultasi-gratis`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      {/* Backdrop Glassmorphism */}
      <div
        className="fixed inset-0 bg-[#022131]/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-[#04344C] border border-[#B0EDF9] rounded-3xl p-5 sm:p-8 shadow-[0_25px_60px_rgba(2,34,50,0.95)] z-10 animate-in zoom-in-95 fade-in duration-200 my-auto max-h-[92vh] overflow-y-auto">
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-[#074563] border border-[#165A7E] text-[#B0EDF9] hover:border-[#B0EDF9] hover:bg-[#0B567C] transition-all flex items-center justify-center cursor-pointer"
          aria-label="Tutup pilihan konsultasi"
        >
          <Icon name="close" size={18} />
        </button>

        {/* Header Modal */}
        <div className="text-left mb-5 pr-8">
          <Eyebrow variant="cyan" className="mb-2 inline-block">
            KONSULTASI CEPAT &amp; TERVERIFIKASI
          </Eyebrow>

          <h2
            id="consultation-modal-title"
            className="font-heading font-bold text-2xl sm:text-3xl text-[#B0EDF9] tracking-[-0.02em] leading-tight"
          >
            Mulai Konsultasi Bersama Tim
          </h2>

          <p className="text-xs sm:text-sm text-[#78B9CA] mt-1.5 leading-relaxed">
            Lengkapi nama, email, dan catatan kebutuhan Anda. Pilih jalur pengiriman melalui aplikasi WhatsApp langsung atau Email resmi.
          </p>
        </div>

        {/* Form Input Wajib (Nama, Email, Kebutuhan, Catatan) */}
        <div className="bg-[#074563] border border-[#165A7E] rounded-2xl p-4 sm:p-5 mb-5 flex flex-col gap-3.5">
          {/* Baris 1: Nama Lengkap & Email (Wajib) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-[#B0EDF9] uppercase tracking-wider mb-1">
                Nama Lengkap <span className="text-[#B0EDF9] font-bold">*</span>
              </label>
              <input
                type="text"
                value={namaKlien}
                onChange={(e) => {
                  setNamaKlien(e.target.value);
                  if (errors.nama) setErrors((prev) => ({ ...prev, nama: undefined }));
                }}
                placeholder="e.g. Zaril Akbar"
                className={`w-full h-10 px-3 rounded-lg bg-[#04344C] border text-[#B0EDF9] text-xs font-medium placeholder-[#78B9CA]/50 focus:outline-none focus:border-[#B0EDF9] transition-colors ${
                  errors.nama ? 'border-[#B0EDF9] ring-1 ring-[#B0EDF9]' : 'border-[#165A7E]'
                }`}
              />
              {errors.nama && (
                <span className="text-[10px] font-mono text-[#B0EDF9] mt-1 block">
                  {errors.nama}
                </span>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#B0EDF9] uppercase tracking-wider mb-1">
                Alamat Email <span className="text-[#B0EDF9] font-bold">*</span>
              </label>
              <input
                type="email"
                value={emailKlien}
                onChange={(e) => {
                  setEmailKlien(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="nama@perusahaan.com"
                className={`w-full h-10 px-3 rounded-lg bg-[#04344C] border text-[#B0EDF9] text-xs font-medium placeholder-[#78B9CA]/50 focus:outline-none focus:border-[#B0EDF9] transition-colors ${
                  errors.email ? 'border-[#B0EDF9] ring-1 ring-[#B0EDF9]' : 'border-[#165A7E]'
                }`}
              />
              {errors.email && (
                <span className="text-[10px] font-mono text-[#B0EDF9] mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Baris 2: Kebutuhan Proyek */}
          <div>
            <label className="block text-[11px] font-mono text-[#B0EDF9] uppercase tracking-wider mb-1">
              Kategori Kebutuhan Proyek <span className="text-[#B0EDF9] font-bold">*</span>
            </label>
            <select
              value={topikKebutuhan}
              onChange={(e) => setTopikKebutuhan(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#04344C] border border-[#165A7E] text-[#B0EDF9] text-xs font-medium focus:outline-none focus:border-[#B0EDF9] transition-colors cursor-pointer"
            >
              <option value="Website Perusahaan">Website Perusahaan / Institusi</option>
              <option value="Landing Page Produk">Landing Page Penjualan &amp; Promosi</option>
              <option value="Aplikasi Web & Mobile">Aplikasi Web &amp; Mobile Kustom</option>
              <option value="UI/UX & Desain Sistem">UI/UX Design &amp; Figma Prototype</option>
              <option value="Branding & Identitas Visual">Branding &amp; Identitas Visual</option>
              <option value="Konsultasi Kustom">Diskusi Kustom Lainnya</option>
            </select>
          </div>

          {/* Baris 3: Catatan Kebutuhan (Wajib) */}
          <div>
            <label className="block text-[11px] font-mono text-[#B0EDF9] uppercase tracking-wider mb-1">
              Catatan / Gambaran Kebutuhan <span className="text-[#B0EDF9] font-bold">*</span>
            </label>
            <textarea
              rows={3}
              value={pesanTambahan}
              onChange={(e) => {
                setPesanTambahan(e.target.value);
                if (errors.pesan) setErrors((prev) => ({ ...prev, pesan: undefined }));
              }}
              placeholder="Ceritakan gambaran singkat proyek, target audiens, fitur utama yang diinginkan, atau timeline bisnis Anda..."
              className={`w-full p-3 rounded-lg bg-[#04344C] border text-[#B0EDF9] text-xs font-medium placeholder-[#78B9CA]/50 focus:outline-none focus:border-[#B0EDF9] transition-colors resize-none ${
                errors.pesan ? 'border-[#B0EDF9] ring-1 ring-[#B0EDF9]' : 'border-[#165A7E]'
              }`}
            />
            {errors.pesan && (
              <span className="text-[10px] font-mono text-[#B0EDF9] mt-1 block">
                {errors.pesan}
              </span>
            )}
          </div>

          {/* Baris 4: Verifikasi Keamanan Cloudflare Turnstile & reCAPTCHA */}
          <div className="pt-2 border-t border-[#165A7E]/50">
            <CaptchaVerification
              onVerify={(token) => {
                setCaptchaToken(token);
                if (errors.captcha) {
                  setErrors((prev) => ({ ...prev, captcha: undefined }));
                }
              }}
              onReset={() => setCaptchaToken(null)}
              hasError={!!errors.captcha}
              errorMessage={errors.captcha}
            />
          </div>
        </div>

        {/* Status Kunci Verifikasi */}
        <div className="mb-3">
          {!captchaToken ? (
            <div className="p-3 rounded-xl bg-[#04344C] border border-[#165A7E] flex items-center gap-2.5 text-xs font-mono text-[#78B9CA]">
              <span className="w-2 h-2 rounded-full bg-[#165A7E] animate-pulse" />
              <span>Tombol di bawah terkunci — Harap centang kotak verifikasi di atas.</span>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-[#074563] border border-[#B0EDF9] flex items-center gap-2.5 text-xs font-mono text-[#B0EDF9] shadow-[0_0_15px_rgba(176,237,249,0.15)]">
              <Icon name="check-circle" size={15} className="text-[#B0EDF9]" />
              <span>Verifikasi Berhasil! Tombol pengiriman aktif dan siap digunakan.</span>
            </div>
          )}
        </div>

        {/* 2 Opsi Utama: WhatsApp vs Email (Lancar & Cepat) */}
        <div className="flex flex-col gap-3 mb-5">
          {/* Opsi 1: WhatsApp (Langsung Aplikasi) */}
          <button
            type="button"
            disabled={!captchaToken}
            onClick={handleSendWhatsApp}
            className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 group flex items-start gap-3.5 ${
              !captchaToken
                ? 'bg-[#074563]/30 border-[#165A7E]/50 opacity-50 cursor-not-allowed pointer-events-none select-none'
                : 'bg-[#074563] hover:bg-[#0B567C] border-[#B0EDF9] cursor-pointer shadow-lg hover:translate-y-[-1px] active:scale-[0.99]'
            }`}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm transition-colors ${
              !captchaToken ? 'bg-[#04344C] text-[#78B9CA]' : 'bg-[#B0EDF9] text-[#04344C]'
            }`}>
              <Icon name="message-square" size={22} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className={`font-heading font-bold text-sm sm:text-base transition-colors ${
                  !captchaToken ? 'text-[#78B9CA]' : 'text-[#B0EDF9] group-hover:text-white'
                }`}>
                  Kirim via WhatsApp (Aplikasi Langsung)
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  !captchaToken ? 'bg-[#04344C] text-[#78B9CA]' : 'bg-[#B0EDF9] text-[#04344C]'
                }`}>
                  Respon Kilat
                </span>
              </div>
              <p className="text-xs text-[#78B9CA] leading-relaxed">
                Membuka langsung aplikasi WhatsApp Anda dengan pesan terverifikasi tanpa diarahkan ke WA Web.
              </p>
            </div>
          </button>

          {/* Opsi 2: Email Resmi */}
          <button
            type="button"
            disabled={!captchaToken}
            onClick={handleSendEmail}
            className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 group flex items-start gap-3.5 ${
              !captchaToken
                ? 'bg-[#074563]/20 border-[#165A7E]/40 opacity-50 cursor-not-allowed pointer-events-none select-none'
                : 'bg-[#074563]/60 hover:bg-[#074563] border-[#165A7E] hover:border-[#B0EDF9] cursor-pointer shadow-sm hover:translate-y-[-1px] active:scale-[0.99]'
            }`}
          >
            <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              !captchaToken
                ? 'bg-[#04344C] border-[#165A7E]/40 text-[#78B9CA]'
                : 'bg-[#04344C] border-[#165A7E] text-[#B0EDF9] group-hover:border-[#B0EDF9]'
            }`}>
              <Icon name="mail" size={20} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <span className={`font-heading font-bold text-sm sm:text-base transition-colors ${
                  !captchaToken ? 'text-[#78B9CA]' : 'text-[#B0EDF9] group-hover:text-white'
                }`}>
                  Kirim via Email Resmi
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#165A7E] text-[#B0EDF9]">
                  Dokumen
                </span>
              </div>
              <p className="text-xs text-[#78B9CA] leading-relaxed">
                Membuka aplikasi surel Anda ke <span className="font-mono text-[#B0EDF9]">{KONTAK_AGENCY.email}</span> dengan draf lengkap.
              </p>
            </div>
          </button>
        </div>

        {/* Opsi Alternatif: Jadwal Google Meet Terjadwal */}
        <div className="pt-3 border-t border-[#165A7E]/60 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-[#78B9CA]">
          <span className="text-center sm:text-left">
            Butuh jadwal sesi virtual 30 menit?
          </span>
          <button
            type="button"
            onClick={handleGoToBooking}
            className="font-heading font-bold text-xs text-[#B0EDF9] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Icon name="calendar" size={14} />
            <span>Pilih Slot Google Meet di Kalender</span>
            <Icon name="arrow-right" size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
