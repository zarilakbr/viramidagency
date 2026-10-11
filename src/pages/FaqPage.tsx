/**
 * @file src/pages/FaqPage.tsx
 * Halaman rute terukur untuk Pertanyaan Umum ViramidAgency (/faq).
 * Dilengkapi akordeon interaktif, pencarian jawaban, dan aksesibilitas penuh.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from '../components/ui/Container';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Icon } from '../components/ui/Icon';
import { DAFTAR_FAQ, KONTAK_AGENCY } from '../data/content';

export const FaqPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(DAFTAR_FAQ[0]?.id || null);

  useEffect(() => {
    document.title = 'Pertanyaan Umum (FAQ) - ViramidAgency';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
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

      <Container className="max-w-4xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#78B9CA] mb-6">
          <Link to="/" className="hover:text-[#B0EDF9] transition-colors flex items-center gap-1">
            <Icon name="arrow-left" size={13} />
            <span>Beranda</span>
          </Link>
          <span>/</span>
          <span className="text-[#B0EDF9]">Pertanyaan Umum</span>
        </div>

        {/* Header Seksi dengan Ilustrasi Polosan */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center mb-12 md:mb-16">
          <div className="md:col-span-8 text-center md:text-left">
            <Eyebrow variant="cyan" className="mb-3 inline-block">
              TRANSPARANSI &amp; TANYA JAWAB
            </Eyebrow>

            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#B0EDF9] tracking-[-0.02em] mb-4 text-balance">
              Pertanyaan Umum &amp; Jawaban Transparan
            </h1>

            <p className="text-sm sm:text-base text-[#78B9CA] max-w-xl leading-relaxed text-balance mx-auto md:mx-0">
              Jawaban transparan seputar alur kerja sama, pengembangan website &amp; aplikasi, kepemilikan kode sumber, dan garansi teknis di ViramidAgency.
            </p>
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative w-32 sm:w-40 md:w-48 lg:w-56">
              <div
                className="absolute inset-0 bg-[#B0EDF9]/15 blur-2xl rounded-full pointer-events-none -z-10"
                aria-hidden="true"
              />
              <img
                src="/images/faq-storyset.svg"
                alt="Pertanyaan Umum ViramidAgency"
                className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(2,34,50,0.85)] hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Daftar Akordeon FAQ */}
        <div className="flex flex-col gap-3.5 mb-16" role="region" aria-label="Accordion Pertanyaan Umum">
          {DAFTAR_FAQ.map((item) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[#165A7E] bg-[#074563] overflow-hidden transition-colors duration-200"
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B0EDF9] transition-all"
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-[#B0EDF9] leading-snug">
                    {item.pertanyaan}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full bg-[#04344C] border border-[#165A7E] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#B0EDF9] text-[#04344C]' : 'text-[#B0EDF9]'
                    }`}
                    aria-hidden="true"
                  >
                    <Icon name="chevron-down" size={16} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[#165A7E]/40 text-sm text-[#78B9CA] leading-relaxed">
                        {item.jawaban}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Kotak Bantuan Langsung */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#074563] to-[#04344C] border border-[#165A7E] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#B0EDF9] mb-2">
              Punya Pertanyaan Khusus Lainnya?
            </h3>
            <p className="text-xs sm:text-sm text-[#78B9CA] max-w-md leading-relaxed">
              Tim kami siap menjawab pertanyaan teknis, anggaran, maupun konsultasi lingkup proyek Anda secara langsung.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${KONTAK_AGENCY.whatsappNomor}?text=${encodeURIComponent(
                'Halo ViramidAgency, saya ingin menanyakan perihal kerja sama proyek digital.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-6 rounded-full bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] font-heading font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-md"
            >
              <Icon name="message-square" size={15} />
              <span>Tanya via WhatsApp</span>
            </a>
            <Link
              to="/booking"
              className="h-11 px-5 rounded-full border border-[#165A7E] hover:border-[#B0EDF9] text-[#B0EDF9] font-heading font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-all"
            >
              <span>Jadwalkan Konsultasi</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
};
