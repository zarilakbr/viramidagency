import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { Container } from './ui/Container';
import { Icon } from './ui/Icon';
import { Reveal } from './ui/Reveal';
import { CaptchaVerification } from './ui/CaptchaVerification';
import { KONTAK_AGENCY } from '../data/content';
import { openWhatsAppDirectly, getDirectWhatsAppUrl } from '../lib/whatsapp';
import { openConsultationModal } from './ConsultationModal';

interface FormState {
  nama: string;
  kontak: string;
  kebutuhan: string;
  anggaran: string;
  pesan: string;
}

interface FormErrors {
  nama?: string;
  kontak?: string;
  kebutuhan?: string;
  pesan?: string;
  captcha?: string;
}

interface ContactSectionProps {
  initialService?: string;
}

/**
 * ContactSection
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */
export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = '' }) => {
  const [formData, setFormData] = useState<FormState>({
    nama: '',
    kontak: '',
    kebutuhan: initialService || 'Website',
    anggaran: '',
    pesan: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, kebutuhan: initialService }));
    }
  }, [initialService]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama lengkap wajib diisi.';
    } else if (formData.nama.trim().length < 2) {
      newErrors.nama = 'Nama minimal 2 karakter.';
    }

    if (!formData.kontak.trim()) {
      newErrors.kontak = 'Email atau nomor WhatsApp wajib diisi.';
    }

    if (!formData.kebutuhan) {
      newErrors.kebutuhan = 'Pilih jenis kebutuhan proyek.';
    }

    if (!formData.pesan.trim()) {
      newErrors.pesan = 'Pesan proyek wajib diisi.';
    } else if (formData.pesan.trim().length < 20) {
      newErrors.pesan = `Pesan minimal 20 karakter (saat ini ${formData.pesan.trim().length} karakter).`;
    }

    if (!captchaToken) {
      newErrors.captcha = 'Mohon selesaikan verifikasi Cloudflare & reCAPTCHA terlebih dahulu.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatMessageText = (): string => {
    const lines = [
      `Halo ViramidAgency, saya ingin berdiskusi mengenai proyek:`,
      ``,
      `Nama: ${formData.nama.trim()}`,
      `Kontak (Email/WA): ${formData.kontak.trim()}`,
      `Kebutuhan: ${formData.kebutuhan}`,
      `Anggaran: ${formData.anggaran ? formData.anggaran : 'Belum ditentukan'}`,
      ``,
      `Detail Kebutuhan:`,
      `${formData.pesan.trim()}`,
    ];
    return lines.join('\n');
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setErrors((prev) => ({
        ...prev,
        captcha: 'Mohon selesaikan verifikasi Cloudflare & reCAPTCHA terlebih dahulu.',
      }));
      return;
    }
    if (!validate()) return;

    setIsSubmitted(true);
    const text = formatMessageText();
    openWhatsAppDirectly(text);
    setCaptchaToken(null);
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setErrors((prev) => ({
        ...prev,
        captcha: 'Mohon selesaikan verifikasi Cloudflare & reCAPTCHA terlebih dahulu.',
      }));
      return;
    }
    if (!validate()) return;

    const text = formatMessageText();
    const subject = `Inquiry Proyek ${formData.kebutuhan} - ${formData.nama.trim()}`;
    const url = `mailto:${KONTAK_AGENCY.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(text)}`;
    setCaptchaToken(null);
    window.location.href = url;
  };

  return (
    <section id="kontak" className="my-[72px] sm:my-[120px] scroll-mt-20">
      <Container>
        <SectionHeading
          number="07"
          eyebrowText="KOMUNIKASI & INQUIRY"
          title="Ceritakan proyekmu."
          subtitle="Sampaikan ide, kebutuhan website, atau rencana peluncuran aplikasi produk digital Anda. Kami siap berdiskusi."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Kolom Kiri: Detail Kontak */}
          <Reveal className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="font-heading font-bold text-2xl text-[#B0EDF9] mb-3">
                Mari Berkolaborasi
              </h3>
              <p className="text-sm text-[#78B9CA] leading-relaxed max-w-[65ch]">
                Kami menyambut diskusi santai maupun konsultasi mendalam untuk kebutuhan brand, website, &amp; aplikasi digital Anda.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-[#165A7E] pt-6">
              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <Icon name="message-square" size="md" className="text-[#B0EDF9] mt-0.5" />
                <div>
                  <span className="block text-xs uppercase font-mono tracking-wider text-[#78B9CA] mb-0.5">
                    WhatsApp (Aplikasi Langsung)
                  </span>
                  <a
                    href={getDirectWhatsAppUrl()}
                    onClick={(e) => {
                      e.preventDefault();
                      openConsultationModal('Konsultasi via WhatsApp');
                    }}
                    className="font-mono text-sm sm:text-base text-[#B0EDF9] hover:underline transition-all cursor-pointer"
                  >
                    {KONTAK_AGENCY.whatsappDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Icon name="mail" size="md" className="text-[#B0EDF9] mt-0.5" />
                <div>
                  <span className="block text-xs uppercase font-mono tracking-wider text-[#78B9CA] mb-0.5">
                    Email
                  </span>
                  <a
                    href={`mailto:${KONTAK_AGENCY.email}`}
                    className="font-mono text-sm sm:text-base text-[#B0EDF9] hover:underline transition-all"
                  >
                    {KONTAK_AGENCY.email}
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3">
                <Icon name="instagram" size="md" className="text-[#B0EDF9] mt-0.5" />
                <div>
                  <span className="block text-xs uppercase font-mono tracking-wider text-[#78B9CA] mb-0.5">
                    Instagram
                  </span>
                  <a
                    href={KONTAK_AGENCY.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-sm sm:text-base text-[#B0EDF9] hover:underline transition-all"
                  >
                    {KONTAK_AGENCY.instagram}
                  </a>
                </div>
              </div>

              {/* Lokasi */}
              <div className="flex items-start gap-3">
                <Icon name="map-pin" size="md" className="text-[#78B9CA] mt-0.5" />
                <div>
                  <span className="block text-xs uppercase font-mono tracking-wider text-[#78B9CA] mb-0.5">
                    Lokasi
                  </span>
                  <span className="font-mono text-sm text-[#B0EDF9]">
                    {KONTAK_AGENCY.lokasi}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Kolom Kanan: Formulir */}
          <Reveal className="lg:col-span-7 bg-[#074563] border border-[#165A7E] rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-5" noValidate>
              {/* Field: Nama */}
              <div>
                <label htmlFor="nama" className="block text-xs font-semibold uppercase tracking-wider text-[#B0EDF9] mb-1.5 font-mono">
                  Nama Lengkap <span className="text-[#B0EDF9]">*</span>
                </label>
                <input
                  id="nama"
                  type="text"
                  placeholder="Nama Anda"
                  value={formData.nama}
                  onChange={(e) => {
                    setFormData({ ...formData, nama: e.target.value });
                    if (errors.nama) setErrors({ ...errors, nama: undefined });
                  }}
                  className={`w-full px-4 py-3 bg-[#04344C] border rounded-xl text-[#B0EDF9] text-sm placeholder:text-[#78B9CA]/40 transition-colors focus:outline-none focus:ring-1 focus:ring-[#B0EDF9] ${
                    errors.nama ? 'border-[#B0EDF9] ring-1 ring-[#B0EDF9]' : 'border-[#165A7E]'
                  }`}
                  aria-invalid={!!errors.nama}
                  aria-describedby={errors.nama ? 'nama-error' : undefined}
                />
                {errors.nama && (
                  <p id="nama-error" className="text-xs text-[#B0EDF9] font-mono flex items-center gap-1.5 mt-1.5">
                    <Icon name="alert-circle" size={14} />
                    <span>{errors.nama}</span>
                  </p>
                )}
              </div>

              {/* Field: Email atau WhatsApp */}
              <div>
                <label htmlFor="kontak-input" className="block text-xs font-semibold uppercase tracking-wider text-[#B0EDF9] mb-1.5 font-mono">
                  Email atau WhatsApp <span className="text-[#B0EDF9]">*</span>
                </label>
                <input
                  id="kontak-input"
                  type="text"
                  placeholder="cth. nama@perusahaan.com atau 08123456789"
                  value={formData.kontak}
                  onChange={(e) => {
                    setFormData({ ...formData, kontak: e.target.value });
                    if (errors.kontak) setErrors({ ...errors, kontak: undefined });
                  }}
                  className={`w-full px-4 py-3 bg-[#04344C] border rounded-xl text-[#B0EDF9] text-sm placeholder:text-[#78B9CA]/40 transition-colors focus:outline-none focus:ring-1 focus:ring-[#B0EDF9] ${
                    errors.kontak ? 'border-[#B0EDF9] ring-1 ring-[#B0EDF9]' : 'border-[#165A7E]'
                  }`}
                  aria-invalid={!!errors.kontak}
                  aria-describedby={errors.kontak ? 'kontak-error' : undefined}
                />
                {errors.kontak && (
                  <p id="kontak-error" className="text-xs text-[#B0EDF9] font-mono flex items-center gap-1.5 mt-1.5">
                    <Icon name="alert-circle" size={14} />
                    <span>{errors.kontak}</span>
                  </p>
                )}
              </div>

              {/* Field: Kebutuhan & Anggaran */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="kebutuhan" className="block text-xs font-semibold uppercase tracking-wider text-[#B0EDF9] mb-1.5 font-mono">
                    Jenis Kebutuhan <span className="text-[#B0EDF9]">*</span>
                  </label>
                  <select
                    id="kebutuhan"
                    value={formData.kebutuhan}
                    onChange={(e) => {
                      setFormData({ ...formData, kebutuhan: e.target.value });
                      if (errors.kebutuhan) setErrors({ ...errors, kebutuhan: undefined });
                    }}
                    className="w-full px-4 py-3 bg-[#04344C] border border-[#165A7E] rounded-xl text-[#B0EDF9] text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B0EDF9]"
                  >
                    <option value="Website">Pengembangan Website</option>
                    <option value="Aplikasi">Pengembangan Aplikasi (Web &amp; Mobile)</option>
                    <option value="UI/UX">Desain UI/UX</option>
                    <option value="Branding">Branding &amp; Identitas</option>
                    <option value="Konten">Konten &amp; Media Sosial</option>
                    <option value="Lainnya">Lainnya / Konsultasi</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="anggaran" className="block text-xs font-semibold uppercase tracking-wider text-[#B0EDF9] mb-1.5 font-mono">
                    Perkiraan Anggaran <span className="text-[#78B9CA] text-[10px] font-normal">(opsional)</span>
                  </label>
                  <select
                    id="anggaran"
                    value={formData.anggaran}
                    onChange={(e) => setFormData({ ...formData, anggaran: e.target.value })}
                    className="w-full px-4 py-3 bg-[#04344C] border border-[#165A7E] rounded-xl text-[#B0EDF9] text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B0EDF9]"
                  >
                    <option value="">Pilih Rentang Anggaran</option>
                    <option value="500 Ribu - 1 Juta">Rp 500 Ribu – Rp 1 Juta IDR</option>
                    <option value="1 - 5 Juta">Rp 1 Juta – Rp 5 Juta IDR</option>
                    <option value="5 - 15 Juta">Rp 5 Juta – Rp 15 Juta IDR</option>
                    <option value="> 15 Juta">&gt; Rp 15 Juta IDR</option>
                  </select>
                </div>
              </div>

              {/* Field: Pesan */}
              <div>
                <label htmlFor="pesan" className="block text-xs font-semibold uppercase tracking-wider text-[#B0EDF9] mb-1.5 font-mono">
                  Pesan Proyek <span className="text-[#B0EDF9]">*</span>
                </label>
                <textarea
                  id="pesan"
                  rows={4}
                  placeholder="Ceritakan latar belakang bisnis, website atau aplikasi yang diinginkan, target audiens, atau linimasa peluncuran (minimal 20 karakter)..."
                  value={formData.pesan}
                  onChange={(e) => {
                    setFormData({ ...formData, pesan: e.target.value });
                    if (errors.pesan) setErrors({ ...errors, pesan: undefined });
                  }}
                  className={`w-full px-4 py-3 bg-[#04344C] border rounded-xl text-[#B0EDF9] text-sm placeholder:text-[#78B9CA]/40 transition-colors resize-y focus:outline-none focus:ring-1 focus:ring-[#B0EDF9] ${
                    errors.pesan ? 'border-[#B0EDF9] ring-1 ring-[#B0EDF9]' : 'border-[#165A7E]'
                  }`}
                  aria-invalid={!!errors.pesan}
                  aria-describedby={errors.pesan ? 'pesan-error' : undefined}
                />
                <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-[#78B9CA]">
                  <span>
                    {errors.pesan ? (
                      <span className="text-[#B0EDF9] flex items-center gap-1">
                        <Icon name="alert-circle" size={12} />
                        {errors.pesan}
                      </span>
                    ) : (
                      'Minimal 20 karakter'
                    )}
                  </span>
                  <span>{formData.pesan.length} karakter</span>
                </div>
              </div>

              {/* Verifikasi Keamanan Cloudflare Turnstile & reCAPTCHA */}
              <div className="pt-1">
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

              {/* Status Kunci Verifikasi */}
              <div className="mt-1">
                {!captchaToken ? (
                  <div className="p-2.5 rounded-xl bg-[#04344C] border border-[#165A7E] flex items-center gap-2 text-[11px] font-mono text-[#78B9CA]">
                    <span className="w-2 h-2 rounded-full bg-[#165A7E] animate-pulse" />
                    <span>Tombol pengiriman terkunci — Harap centang kotak verifikasi di atas.</span>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-[#04344C] border border-[#B0EDF9] flex items-center gap-2 text-[11px] font-mono text-[#B0EDF9]">
                    <Icon name="check-circle" size={14} className="text-[#B0EDF9]" />
                    <span>Verifikasi Berhasil! Tombol pengiriman aktif.</span>
                  </div>
                )}
              </div>

              {/* Tombol Aksi Simetris */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="submit"
                  disabled={!captchaToken}
                  className={`w-full h-11 sm:h-12 px-4 sm:px-6 rounded-full font-heading font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    !captchaToken
                      ? 'bg-[#074563] border border-[#165A7E]/50 text-[#78B9CA] opacity-50 cursor-not-allowed pointer-events-none select-none'
                      : 'bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] shadow-sm cursor-pointer active:scale-[0.98]'
                  }`}
                >
                  <span>Kirim via WhatsApp</span>
                  <Icon name="arrow-right" size={15} />
                </button>

                <button
                  type="button"
                  disabled={!captchaToken}
                  onClick={handleEmailClick}
                  className={`w-full h-11 sm:h-12 px-4 sm:px-6 rounded-full font-heading font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    !captchaToken
                      ? 'bg-[#04344C] border border-[#165A7E]/40 text-[#78B9CA] opacity-50 cursor-not-allowed pointer-events-none select-none'
                      : 'border border-[#165A7E] bg-[#074563] hover:bg-[#0B567C] text-[#B0EDF9] hover:border-[#B0EDF9] cursor-pointer active:scale-[0.98]'
                  }`}
                >
                  <span>Kirim via Email</span>
                  <Icon name="mail" size={15} />
                </button>
              </div>

              {isSubmitted && (
                <p className="text-xs text-[#B0EDF9] font-mono mt-1 flex items-center gap-1.5">
                  <Icon name="check" size={14} />
                  <span>Formulir terkirim! Pesan telah disiapkan untuk WhatsApp Anda.</span>
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
