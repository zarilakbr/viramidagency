/**
 * @file src/pages/ContactPage.tsx
 * Halaman rute terukur untuk Kontak & Inquiry ViramidAgency (/kontak).
 * Menampilkan formulir inquiry proyek, direct channel WhatsApp/Email, dan info studio.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Icon } from '../components/ui/Icon';
import { KONTAK_AGENCY } from '../data/content';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('layanan') || 'Website';

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    whatsapp: '',
    kebutuhan: initialService,
    anggaran: '',
    pesan: '',
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Hubungi Kami - Konsultasi & Kolaborasi ViramidAgency';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.nama.trim()) errs.nama = 'Nama lengkap wajib diisi.';
    if (!formData.email.trim()) {
      errs.email = 'Alamat email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Format email tidak valid.';
    }
    if (!formData.whatsapp.trim()) {
      errs.whatsapp = 'Nomor WhatsApp wajib diisi.';
    } else if (!/^[0-9+\-\s]{8,18}$/.test(formData.whatsapp.trim())) {
      errs.whatsapp = 'Nomor WhatsApp tidak valid.';
    }
    if (!formData.pesan.trim() || formData.pesan.trim().length < 15) {
      errs.pesan = 'Mohon ceritakan sedikit tentang proyek Anda (minimal 15 karakter).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Siapkan pesan otomatis WhatsApp
    const waText = encodeURIComponent(
      `*Halo ViramidAgency, saya ingin mengajukan inquiry proyek:*\n\n` +
      `• *Nama:* ${formData.nama}\n` +
      `• *Email:* ${formData.email}\n` +
      `• *WhatsApp:* ${formData.whatsapp}\n` +
      `• *Kebutuhan:* ${formData.kebutuhan}\n` +
      `• *Anggaran:* ${formData.anggaran || '-'}\n` +
      `• *Pesan:* ${formData.pesan}\n\n` +
      `Mohon info ketersediaan dan diskusi lanjutnya. Terima kasih!`
    );

    window.open(`https://wa.me/${KONTAK_AGENCY.whatsappNomor}?text=${waText}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <main className="relative w-full min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 bg-[#04344C] overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B0EDF9]/5 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 left-1/4 w-[500px] h-[300px] bg-[#074563]/60 blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container className="max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#78B9CA] mb-6">
          <Link to="/" className="hover:text-[#B0EDF9] transition-colors flex items-center gap-1">
            <Icon name="arrow-left" size={13} />
            <span>Beranda</span>
          </Link>
          <span>/</span>
          <span className="text-[#B0EDF9]">Kontak</span>
        </div>

        {/* Header Seksi */}
        <div className="text-center md:text-left mb-12 md:mb-16">
          <Eyebrow variant="cyan" className="mb-3 inline-block">
            KOMUNIKASI &amp; INQUIRY
          </Eyebrow>

          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#B0EDF9] tracking-[-0.02em] mb-4 text-balance">
            Mulai Diskusikan Proyek Digital Anda
          </h1>

          <p className="text-sm sm:text-base text-[#78B9CA] max-w-2xl leading-relaxed text-balance">
            Sampaikan ide, kebutuhan website, atau rencana peluncuran aplikasi produk digital Anda. Kami siap memberikan masukan arsitektural dan estimasi pengerjaan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Kolom Kiri: Direct Channels & Studio Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h2 className="font-heading font-bold text-2xl text-[#B0EDF9] mb-3">
                Mari Berkolaborasi
              </h2>
              <p className="text-sm text-[#78B9CA] leading-relaxed">
                Kami menyambut diskusi santai maupun konsultasi mendalam untuk kebutuhan brand, website, &amp; aplikasi digital Anda.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-[#165A7E] pt-6">
              {/* WhatsApp Direct */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#074563] border border-[#165A7E] text-[#B0EDF9] flex items-center justify-center shrink-0">
                  <Icon name="message-square" size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-[#78B9CA] block">
                    Respon Cepat WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/${KONTAK_AGENCY.whatsappNomor}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#B0EDF9] hover:underline"
                  >
                    {KONTAK_AGENCY.whatsappDisplay}
                  </a>
                </div>
              </div>

              {/* Email Direct */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#074563] border border-[#165A7E] text-[#B0EDF9] flex items-center justify-center shrink-0">
                  <Icon name="mail" size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-[#78B9CA] block">
                    Surel / Email Resmi
                  </span>
                  <a
                    href={`mailto:${KONTAK_AGENCY.email}`}
                    className="text-sm font-semibold text-[#B0EDF9] hover:underline"
                  >
                    {KONTAK_AGENCY.email}
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#074563] border border-[#165A7E] text-[#B0EDF9] flex items-center justify-center shrink-0">
                  <Icon name="instagram" size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-[#78B9CA] block">
                    Instagram Studio
                  </span>
                  <a
                    href={KONTAK_AGENCY.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#B0EDF9] hover:underline"
                  >
                    {KONTAK_AGENCY.instagram}
                  </a>
                </div>
              </div>

              {/* Lokasi Studio */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#074563] border border-[#165A7E] text-[#B0EDF9] flex items-center justify-center shrink-0">
                  <Icon name="map-pin" size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-[#78B9CA] block">
                    Lokasi Studio
                  </span>
                  <span className="text-sm text-[#B0EDF9]">
                    {KONTAK_AGENCY.lokasi}
                  </span>
                </div>
              </div>
            </div>

            {/* Alternatif Jadwalkan Langsung */}
            <div className="p-6 rounded-2xl bg-[#074563]/60 border border-[#165A7E]">
              <span className="text-xs font-mono text-[#B0EDF9] uppercase font-bold block mb-1">
                Jadwal Diskusi 1-on-1
              </span>
              <p className="text-xs text-[#78B9CA] leading-relaxed mb-4">
                Ingin memilih langsung slot tanggal &amp; jam Google Meet tanpa menunggu balasan pesan?
              </p>
              <Link
                to="/booking"
                className="w-full h-10 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Buka Kalender Booking</span>
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          </div>

          {/* Kolom Kanan: Formulir Inquiry */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#074563] border border-[#165A7E]">
              {isSubmitted ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#B0EDF9] text-[#04344C] flex items-center justify-center mb-4">
                    <Icon name="check" size={28} />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-[#B0EDF9] mb-2">
                    Inquiry Telah Diteruskan
                  </h3>
                  <p className="text-sm text-[#78B9CA] max-w-md leading-relaxed mb-6">
                    Pesan Anda telah dibuka di WhatsApp tim kami. Kami akan merespon secepatnya dalam jam kerja.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="h-10 px-6 rounded-full border border-[#165A7E] text-[#B0EDF9] font-heading text-xs hover:border-[#B0EDF9] transition-colors"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="font-heading font-bold text-xl text-[#B0EDF9] mb-1">
                    Formulir Spesifikasi Proyek
                  </h3>

                  {/* Field: Nama */}
                  <div>
                    <label htmlFor="nama" className="block text-xs font-mono text-[#B0EDF9] mb-1.5 uppercase tracking-wider">
                      Nama Lengkap <span className="text-[#B0EDF9]">*</span>
                    </label>
                    <input
                      type="text"
                      id="nama"
                      value={formData.nama}
                      onChange={(e) => {
                        setFormData({ ...formData, nama: e.target.value });
                        if (errors.nama) setErrors({ ...errors, nama: undefined });
                      }}
                      placeholder="e.g. Zaril Akbar"
                      className={`w-full px-4 py-3 bg-[#04344C] border rounded-xl text-sm text-[#B0EDF9] placeholder:text-[#78B9CA]/50 focus:outline-none focus:ring-1 focus:ring-[#B0EDF9] transition-all ${
                        errors.nama ? 'border-[#B0EDF9] ring-1 ring-[#B0EDF9]' : 'border-[#165A7E]'
                      }`}
                    />
                    {errors.nama && (
                      <span className="text-[11px] font-mono text-[#B0EDF9] mt-1 block">{errors.nama}</span>
                    )}
                  </div>

                  {/* Grid 2: Email & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-[#B0EDF9] mb-1.5 uppercase tracking-wider">
                        Surel / Email <span className="text-[#B0EDF9]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="nama@perusahaan.com"
                        className={`w-full px-4 py-3 bg-[#04344C] border rounded-xl text-sm text-[#B0EDF9] placeholder:text-[#78B9CA]/50 focus:outline-none focus:ring-1 focus:ring-[#B0EDF9] transition-all ${
                          errors.email ? 'border-[#B0EDF9] ring-1 ring-[#B0EDF9]' : 'border-[#165A7E]'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] font-mono text-[#B0EDF9] mt-1 block">{errors.email}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="block text-xs font-mono text-[#B0EDF9] mb-1.5 uppercase tracking-wider">
                        Nomor WhatsApp <span className="text-[#B0EDF9]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={(e) => {
                          setFormData({ ...formData, whatsapp: e.target.value });
                          if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
                        }}
                        placeholder="08123456789"
                        className={`w-full px-4 py-3 bg-[#04344C] border rounded-xl text-sm text-[#B0EDF9] placeholder:text-[#78B9CA]/50 focus:outline-none focus:ring-1 focus:ring-[#B0EDF9] transition-all ${
                          errors.whatsapp ? 'border-[#B0EDF9] ring-1 ring-[#B0EDF9]' : 'border-[#165A7E]'
                        }`}
                      />
                      {errors.whatsapp && (
                        <span className="text-[11px] font-mono text-[#B0EDF9] mt-1 block">{errors.whatsapp}</span>
                      )}
                    </div>
                  </div>

                  {/* Grid 2: Kebutuhan & Anggaran */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="kebutuhan" className="block text-xs font-mono text-[#B0EDF9] mb-1.5 uppercase tracking-wider">
                        Kebutuhan Layanan
                      </label>
                      <select
                        id="kebutuhan"
                        value={formData.kebutuhan}
                        onChange={(e) => setFormData({ ...formData, kebutuhan: e.target.value })}
                        className="w-full px-4 py-3 bg-[#04344C] border border-[#165A7E] rounded-xl text-sm text-[#B0EDF9] focus:outline-none focus:ring-1 focus:ring-[#B0EDF9]"
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
                      <label htmlFor="anggaran" className="block text-xs font-mono text-[#B0EDF9] mb-1.5 uppercase tracking-wider">
                        Estimasi Anggaran
                      </label>
                      <select
                        id="anggaran"
                        value={formData.anggaran}
                        onChange={(e) => setFormData({ ...formData, anggaran: e.target.value })}
                        className="w-full px-4 py-3 bg-[#04344C] border border-[#165A7E] rounded-xl text-sm text-[#B0EDF9] focus:outline-none focus:ring-1 focus:ring-[#B0EDF9]"
                      >
                        <option value="">Pilih Rentang Anggaran</option>
                        <option value="500 Ribu - 1 Juta">Rp 500 Ribu – Rp 1 Juta</option>
                        <option value="1 - 5 Juta">Rp 1 Juta – Rp 5 Juta</option>
                        <option value="5 - 15 Juta">Rp 5 Juta – Rp 15 Juta</option>
                        <option value="> 15 Juta">&gt; Rp 15 Juta</option>
                      </select>
                    </div>
                  </div>

                  {/* Field: Pesan */}
                  <div>
                    <label htmlFor="pesan" className="block text-xs font-mono text-[#B0EDF9] mb-1.5 uppercase tracking-wider">
                      Ceritakan Kebutuhan Proyek <span className="text-[#B0EDF9]">*</span>
                    </label>
                    <textarea
                      id="pesan"
                      rows={4}
                      value={formData.pesan}
                      onChange={(e) => {
                        setFormData({ ...formData, pesan: e.target.value });
                        if (errors.pesan) setErrors({ ...errors, pesan: undefined });
                      }}
                      placeholder="Ceritakan gambaran bisnis, target audiens, fitur utama yang diinginkan, atau estimasi deadline..."
                      className={`w-full px-4 py-3 bg-[#04344C] border rounded-xl text-sm text-[#B0EDF9] placeholder:text-[#78B9CA]/50 focus:outline-none focus:ring-1 focus:ring-[#B0EDF9] transition-all resize-y ${
                        errors.pesan ? 'border-[#B0EDF9] ring-1 ring-[#B0EDF9]' : 'border-[#165A7E]'
                      }`}
                    />
                    {errors.pesan && (
                      <span className="text-[11px] font-mono text-[#B0EDF9] mt-1 block">{errors.pesan}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer mt-2"
                  >
                    <span>Kirim &amp; Diskusikan via WhatsApp</span>
                    <Icon name="arrow-right" size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};
