/**
 * @file src/components/FaqSection.tsx
 * Seksi Pertanyaan Umum (FAQ) dengan akordeon interaktif, animasi halus, dan aksesibilitas keyboard.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from './ui/Container';
import { SectionHeading } from './SectionHeading';
import { DAFTAR_FAQ } from '../data/content';
import { Icon } from './ui/Icon';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(DAFTAR_FAQ[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-[72px] sm:py-[120px] bg-[#04344C] text-[#B0EDF9] border-y border-[#165A7E] scroll-mt-16">
      <Container className="max-w-4xl">
        <SectionHeading
          number="05"
          eyebrowText="TRANSPARANSI & TANYA JAWAB"
          title="Pertanyaan Umum"
          subtitle="Jawaban transparan seputar proses kerja sama, pengembangan platform LMS & Web, kepemilikan kode sumber, dan alur pengerjaan di ViramidAgency."
        />

        {/* Daftar Akordeon FAQ */}
        <div className="flex flex-col gap-3.5" role="region" aria-label="Accordion Pertanyaan Umum">
          {DAFTAR_FAQ.map((item, index) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#B0EDF9] bg-[#074563] shadow-lg'
                    : 'border-[#165A7E] bg-[#074563]/60 hover:border-[#B0EDF9]/70'
                }`}
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFaq(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      const nextBtn = document.getElementById(`faq-btn-${DAFTAR_FAQ[index + 1]?.id}`);
                      nextBtn?.focus();
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      const prevBtn = document.getElementById(`faq-btn-${DAFTAR_FAQ[index - 1]?.id}`);
                      prevBtn?.focus();
                    }
                  }}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B0EDF9]"
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-[#B0EDF9] pr-2">
                    {item.pertanyaan}
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#B0EDF9] text-[#04344C] rotate-180 shadow-sm'
                        : 'bg-[#04344C] border border-[#165A7E] text-[#B0EDF9]'
                    }`}
                  >
                    <Icon name="chevron-down" size={16} />
                  </div>
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
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#78B9CA] leading-relaxed border-t border-[#165A7E] pt-4">
                        {item.jawaban}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
