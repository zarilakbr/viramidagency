import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, MapPin, Instagram, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { KONTAK_AGENCY } from '../data/content';

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
}

interface ContactSectionProps {
  initialService?: string;
}

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

  // Update kebutuhan if initialService changes
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatMessageText = (): string => {
    const lines = [
      `Halo ViramidAgency, saya ingin berdiskusi mengenai proyek:`,
      ``,
      `• Nama: ${formData.nama.trim()}`,
      `• Kontak (Email/WA): ${formData.kontak.trim()}`,
      `• Kebutuhan: ${formData.kebutuhan}`,
      `• Anggaran: ${formData.anggaran ? formData.anggaran : 'Belum ditentukan'}`,
      ``,
      `Detail Kebutuhan:`,
      `${formData.pesan.trim()}`,
    ];
    return lines.join('\n');
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);
    const text = formatMessageText();
    const url = `https://wa.me/${KONTAK_AGENCY.whatsappNomor}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const text = formatMessageText();
    const subject = `Inquiry Proyek ${formData.kebutuhan} - ${formData.nama.trim()}`;
    const url = `mailto:${KONTAK_AGENCY.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(text)}`;
    window.location.href = url;
  };

  return (
    <section id="kontak" className="py-24 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        number="05"
        title="Ceritakan proyekmu."
        subtitle="Sampaikan ide, tantangan, atau rencana peluncuran produk digital Anda. Kami siap berdiskusi."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Kolom Kiri: Detail Kontak */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          <div>
            <h3 className="font-heading font-bold text-2xl text-[#F4F3FF] mb-3">
              Mari Berkolaborasi
            </h3>
            <p className="text-sm text-[#B8A9D4] leading-relaxed">
              Kami menyambut diskusi santai maupun konsultasi mendalam untuk kebutuhan brand &amp; website Anda.
            </p>
          </div>

          <div className="flex flex-col gap-5 border-t border-[#5a3c8e] pt-6">
            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#412a6a] border border-[#5a3c8e] flex items-center justify-center text-[#F97316] shrink-0">
                <MessageSquare size={18} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#B8A9D4] mb-1">
                  WhatsApp
                </span>
                <a
                  href={`https://wa.me/${KONTAK_AGENCY.whatsappNomor}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-sm sm:text-base text-[#F4F3FF] hover:text-[#F97316] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded"
                >
                  {KONTAK_AGENCY.whatsappDisplay}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#412a6a] border border-[#5a3c8e] flex items-center justify-center text-[#22D3C5] shrink-0">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#B8A9D4] mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${KONTAK_AGENCY.email}`}
                  className="font-medium text-sm sm:text-base text-[#F4F3FF] hover:text-[#22D3C5] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded"
                >
                  {KONTAK_AGENCY.email}
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#412a6a] border border-[#5a3c8e] flex items-center justify-center text-[#C26FE0] shrink-0">
                <Instagram size={18} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#B8A9D4] mb-1">
                  Instagram
                </span>
                <a
                  href={KONTAK_AGENCY.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-sm sm:text-base text-[#F4F3FF] hover:text-[#C26FE0] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded"
                >
                  {KONTAK_AGENCY.instagram}
                </a>
              </div>
            </div>

            {/* Lokasi */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#412a6a] border border-[#5a3c8e] flex items-center justify-center text-[#B8A9D4] shrink-0">
                <MapPin size={18} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#B8A9D4] mb-1">
                  Lokasi
                </span>
                <span className="font-mono text-sm text-[#F4F3FF]">
                  {KONTAK_AGENCY.lokasi}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kolom Kanan: Formulir */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 bg-[#412a6a]/90 border border-[#5a3c8e] rounded-2xl p-7 sm:p-10 shadow-xl backdrop-blur-sm"
        >
          <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-6" noValidate>
            {/* Field: Nama */}
            <div>
              <label htmlFor="nama" className="block text-xs font-semibold uppercase tracking-wider text-[#F4F3FF] mb-2">
                Nama Lengkap <span className="text-[#F97316]">*</span>
              </label>
              <input
                id="nama"
                type="text"
                placeholder="cth. Budi Setiawan"
                value={formData.nama}
                onChange={(e) => {
                  setFormData({ ...formData, nama: e.target.value });
                  if (errors.nama) setErrors({ ...errors, nama: undefined });
                }}
                className={`w-full px-4 py-3 bg-[#271742] border rounded-xl text-[#F4F3FF] text-sm placeholder:text-[#B8A9D4]/50 focus:outline-none transition-colors ${
                  errors.nama
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-[#5a3c8e] focus:border-[#22D3C5]'
                }`}
                aria-invalid={!!errors.nama}
                aria-describedby={errors.nama ? 'nama-error' : undefined}
              />
              {errors.nama && (
                <p id="nama-error" className="text-xs text-rose-400 mt-1.5">
                  {errors.nama}
                </p>
              )}
            </div>

            {/* Field: Email atau WhatsApp */}
            <div>
              <label htmlFor="kontak-input" className="block text-xs font-semibold uppercase tracking-wider text-[#F4F3FF] mb-2">
                Email atau Nomor WhatsApp <span className="text-[#F97316]">*</span>
              </label>
              <input
                id="kontak-input"
                type="text"
                placeholder="cth. budi@perusahaan.com atau 08123456789"
                value={formData.kontak}
                onChange={(e) => {
                  setFormData({ ...formData, kontak: e.target.value });
                  if (errors.kontak) setErrors({ ...errors, kontak: undefined });
                }}
                className={`w-full px-4 py-3 bg-[#271742] border rounded-xl text-[#F4F3FF] text-sm placeholder:text-[#B8A9D4]/50 focus:outline-none transition-colors ${
                  errors.kontak
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-[#5a3c8e] focus:border-[#22D3C5]'
                }`}
                aria-invalid={!!errors.kontak}
                aria-describedby={errors.kontak ? 'kontak-error' : undefined}
              />
              {errors.kontak && (
                <p id="kontak-error" className="text-xs text-rose-400 mt-1.5">
                  {errors.kontak}
                </p>
              )}
            </div>

            {/* Field: Jenis Kebutuhan & Anggaran */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Jenis Kebutuhan */}
              <div>
                <label htmlFor="kebutuhan" className="block text-xs font-semibold uppercase tracking-wider text-[#F4F3FF] mb-2">
                  Jenis Kebutuhan <span className="text-[#F97316]">*</span>
                </label>
                <select
                  id="kebutuhan"
                  value={formData.kebutuhan}
                  onChange={(e) => {
                    setFormData({ ...formData, kebutuhan: e.target.value });
                    if (errors.kebutuhan) setErrors({ ...errors, kebutuhan: undefined });
                  }}
                  className={`w-full px-4 py-3 bg-[#271742] border rounded-xl text-[#F4F3FF] text-sm focus:outline-none transition-colors cursor-pointer ${
                    errors.kebutuhan
                      ? 'border-rose-500 focus:border-rose-500'
                      : 'border-[#5a3c8e] focus:border-[#22D3C5]'
                  }`}
                >
                  <option value="Website">Pengembangan Website</option>
                  <option value="UI/UX">Desain UI/UX</option>
                  <option value="Branding">Branding &amp; Identitas</option>
                  <option value="Konten">Konten &amp; Media Sosial</option>
                  <option value="Lainnya">Lainnya / Konsultasi</option>
                </select>
                {errors.kebutuhan && (
                  <p className="text-xs text-rose-400 mt-1.5">{errors.kebutuhan}</p>
                )}
              </div>

              {/* Anggaran (Opsional) */}
              <div>
                <label htmlFor="anggaran" className="block text-xs font-semibold uppercase tracking-wider text-[#F4F3FF] mb-2">
                  Perkiraan Anggaran <span className="text-[#B8A9D4] text-[10px] lowercase font-normal">(opsional)</span>
                </label>
                <select
                  id="anggaran"
                  value={formData.anggaran}
                  onChange={(e) => setFormData({ ...formData, anggaran: e.target.value })}
                  className="w-full px-4 py-3 bg-[#271742] border border-[#5a3c8e] rounded-xl text-[#F4F3FF] text-sm focus:outline-none focus:border-[#22D3C5] transition-colors cursor-pointer"
                >
                  <option value="">Pilih rentang anggaran</option>
                  <option value="Di bawah Rp 10 Juta">&lt; Rp 10 Juta</option>
                  <option value="Rp 10 - 25 Juta">Rp 10 - 25 Juta</option>
                  <option value="Rp 25 - 50 Juta">Rp 25 - 50 Juta</option>
                  <option value="Di atas Rp 50 Juta">&gt; Rp 50 Juta</option>
                  <option value="Belum Ditentukan">Belum Ditentukan</option>
                </select>
              </div>
            </div>

            {/* Field: Pesan */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="pesan" className="block text-xs font-semibold uppercase tracking-wider text-[#F4F3FF]">
                  Pesan / Gambaran Proyek <span className="text-[#F97316]">*</span>
                </label>
                <span className="font-mono text-xs text-[#B8A9D4]">
                  {formData.pesan.trim().length}/20 min.
                </span>
              </div>
              <textarea
                id="pesan"
                rows={4}
                placeholder="Ceritakan tentang tujuan, ruang lingkup, dan waktu pelaksanaan yang diinginkan..."
                value={formData.pesan}
                onChange={(e) => {
                  setFormData({ ...formData, pesan: e.target.value });
                  if (errors.pesan) setErrors({ ...errors, pesan: undefined });
                }}
                className={`w-full px-4 py-3 bg-[#271742] border rounded-xl text-[#F4F3FF] text-sm placeholder:text-[#B8A9D4]/50 focus:outline-none transition-colors resize-y ${
                  errors.pesan
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-[#5a3c8e] focus:border-[#22D3C5]'
                }`}
                aria-invalid={!!errors.pesan}
                aria-describedby={errors.pesan ? 'pesan-error' : undefined}
              />
              {errors.pesan && (
                <p id="pesan-error" className="text-xs text-rose-400 mt-1.5">
                  {errors.pesan}
                </p>
              )}
            </div>

            {/* Actions: Kirim via WhatsApp + Tautan Kirim via Email */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <Button type="submit" variant="primary" className="w-full sm:w-auto">
                <MessageSquare size={16} strokeWidth={2} />
                <span>Kirim via WhatsApp</span>
                <ArrowUpRight size={16} strokeWidth={2} />
              </Button>

              <button
                type="button"
                onClick={handleEmailClick}
                className="text-xs sm:text-sm text-[#B8A9D4] hover:text-[#22D3C5] transition-colors underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded py-1 px-2 cursor-pointer"
              >
                atau kirim lewat email
              </button>
            </div>

            {isSubmitted && (
              <p className="text-xs text-[#22D3C5] font-mono mt-1">
                Aplikasi obrolan WhatsApp telah dibuka dengan pesan tersusun.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};
