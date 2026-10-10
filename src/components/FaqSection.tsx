/**
 * @file src/components/FaqSection.tsx
 * Seksi Pertanyaan Umum (FAQ) dengan akordeon interaktif, animasi halus, dan aksesibilitas keyboard.
 * Berperan sebagai seksi pemecah ritme warna (Seksi Terang #F4F3FF) sesuai standar Part C.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Container } from './ui/Container';
import { DAFTAR_FAQ } from '../data/content';
import { Icon } from './ui/Icon';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(DAFTAR_FAQ[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-[72px] sm:py-[120px] bg-[#F4F3FF] text-[#0A0A2E] border-y border-[#D9D8F0]">
      <Container className="max-w-4xl">
        {/* Header Seksi Terang */}
        <div className="text-left mb-10 md:mb-12">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="font-mono text-xs sm:text-sm font-semibold text-orange select-none">
              06 /
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#0A0A2E] tracking-[-0.025em] leading-[1.15]">
              Pertanyaan Umum
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#47486B] max-w-2xl font-normal leading-relaxed mt-3">
            Jawaban transparan seputar proses kerja sama, kepemilikan kode sumber, dan alur pengerjaan di ViramidAgency.
          </p>
        </div>

        {/* Daftar Akordeon FAQ */}
        <div className="flex flex-col gap-3.5" role="region" aria-label="Accordion Pertanyaan Umum">
          {DAFTAR_FAQ.map((item, index) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-orange bg-white shadow-sm ring-1 ring-orange/30'
                    : 'border-[#D9D8F0] bg-white hover:border-[#B5B4DC]'
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
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-[#0A0A2E] pr-2">
                    {item.pertanyaan}
                  </span>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-orange text-navy rotate-180'
                        : 'bg-[#EDEBF8] text-[#0A0A2E]'
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
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#3E3F66] leading-relaxed border-t border-[#F0EFF8] pt-4">
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
