import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { PROFIL_AGENCY, NILAI_KERJA, DAFTAR_TIM } from '../data/content';

export const AboutSection: React.FC = () => {
  const getInitials = (nama: string) => {
    const parts = nama.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nama.slice(0, 2).toUpperCase() || 'VA';
  };

  return (
    <section id="tentang" className="py-24 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeading
        number="04"
        title="Tentang Agency"
        subtitle="Pendekatan dedikatif yang menggabungkan presisi desain dan keandalan teknologi digital."
      />

      {/* Dua Kolom: Cerita & Nilai Kerja */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        {/* Kolom Kiri: Cerita Singkat Agency */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          <span className="text-xs uppercase font-semibold tracking-wider text-[#F97316]">
            Filosofi &amp; Komitmen
          </span>
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F4F3FF] tracking-tight leading-snug">
            Menciptakan karya yang tidak hanya memikat visual, namun terukur dampaknya.
          </h3>
          <p className="text-base text-[#B8A9D4] leading-relaxed">
            {PROFIL_AGENCY.cerita}
          </p>
        </motion.div>

        {/* Kolom Kanan: Daftar Nilai Kerja */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          <span className="text-xs uppercase font-semibold tracking-wider text-[#22D3C5]">
            Prinsip Kerja
          </span>
          <div className="flex flex-col gap-5">
            {NILAI_KERJA.map((nilai, index) => (
              <motion.div
                key={nilai.nomor}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="p-6 bg-[#412a6a]/90 border border-[#5a3c8e] rounded-2xl hover:border-[#F97316] transition-colors duration-200 shadow-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-[#F97316] font-bold">
                    {nilai.nomor}
                  </span>
                  <h4 className="font-heading font-bold text-lg text-[#F4F3FF]">
                    {nilai.judul}
                  </h4>
                </div>
                <p className="text-sm text-[#B8A9D4] leading-relaxed pl-7">
                  {nilai.deskripsi}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Daftar Anggota Tim */}
      {DAFTAR_TIM && DAFTAR_TIM.length > 0 && (
        <div className="pt-12 border-t border-[#5a3c8e]">
          <div className="mb-8">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#C26FE0] block mb-2 font-mono">
              Kolektif
            </span>
            <h3 className="font-heading font-bold text-2xl text-[#F4F3FF]">
              Orang di Balik Karya
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DAFTAR_TIM.map((anggota, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#412a6a]/90 border border-[#5a3c8e] rounded-2xl p-6 flex items-center gap-5 hover:border-[#F97316]/70 transition-colors shadow-lg"
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3b2361] to-[#271742] border border-[#5a3c8e] flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                  {anggota.foto ? (
                    <img
                      src={anggota.foto}
                      alt={anggota.nama}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="font-mono text-base font-bold text-[#F4F3FF]">
                      {getInitials(anggota.nama)}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-[#F4F3FF]">
                    {anggota.nama}
                  </h4>
                  <p className="text-xs text-[#B8A9D4] mt-1 font-mono">
                    {anggota.peran}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
