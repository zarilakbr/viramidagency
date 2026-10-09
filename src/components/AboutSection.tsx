import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './ui/Reveal';
import { PROFIL_AGENCY, NILAI_KERJA, DAFTAR_TIM } from '../data/content';

/**
 * AboutSection
 * Standar:
 * - Dua kolom: Filosofi dan Prinsip Kerja
 * - Space Grotesk 700, teks rata kiri, max-w-[65ch]
 * - 1px border, tanpa shadow tebal
 * - Container 1200px, section-spacing 120px (mobile 72px)
 */
export const AboutSection: React.FC = () => {
  const getInitials = (nama: string) => {
    const parts = nama.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nama.slice(0, 2).toUpperCase() || 'VA';
  };

  return (
    <section id="tentang" className="section-container section-spacing scroll-mt-20">
      <SectionHeading
        number="04"
        title="Tentang Agency"
        subtitle="Pendekatan dedikatif yang menggabungkan presisi desain dan keandalan teknologi digital."
      />

      {/* Dua Kolom: Cerita & Nilai Kerja */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
        {/* Kolom Kiri: Cerita Singkat Agency */}
        <Reveal className="lg:col-span-6 flex flex-col gap-5">
          <span className="text-xs uppercase font-mono tracking-wider text-orange font-semibold">
            Filosofi &amp; Komitmen
          </span>
          <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground tracking-[-0.02em] leading-[1.3] text-balance">
            Menciptakan karya yang tidak hanya memikat visual, namun terukur dampaknya.
          </h3>
          <p className="text-base text-muted/90 leading-[1.75] max-w-[62ch]">
            {PROFIL_AGENCY.cerita}
          </p>
        </Reveal>

        {/* Kolom Kanan: Daftar Nilai Kerja */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <span className="text-xs uppercase font-mono tracking-wider text-cyan font-semibold mb-1">
            Prinsip Kerja
          </span>
          <div className="flex flex-col gap-4">
            {NILAI_KERJA.map((nilai, index) => (
              <Reveal
                key={nilai.nomor}
                delayIndex={index}
              >
                <div className="p-5 bg-surface border border-border rounded-lg hover:border-orange transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-orange font-bold">
                      {nilai.nomor}
                    </span>
                    <h4 className="font-heading font-bold text-base sm:text-lg text-foreground">
                      {nilai.judul}
                    </h4>
                  </div>
                  <p className="text-sm text-muted leading-relaxed pl-6 max-w-[65ch]">
                    {nilai.deskripsi}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Daftar Anggota Tim */}
      {DAFTAR_TIM && DAFTAR_TIM.length > 0 && (
        <div className="pt-10 border-t border-border">
          <div className="mb-6">
            <span className="text-xs uppercase font-mono tracking-wider text-purple block mb-1">
              Kolektif
            </span>
            <h3 className="font-heading font-bold text-2xl text-foreground">
              Orang di Balik Karya
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DAFTAR_TIM.map((anggota, idx) => (
              <Reveal
                key={idx}
                delayIndex={idx}
              >
                <div className="bg-surface border border-border rounded-lg p-5 flex items-center gap-4 hover:border-orange transition-colors duration-200">
                  {/* Avatar dengan Aspect Ratio Tetap */}
                  <div className="w-14 h-14 rounded-md bg-background border border-border flex items-center justify-center shrink-0 overflow-hidden">
                    {anggota.foto ? (
                      <img
                        src={anggota.foto}
                        alt={anggota.nama}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-mono text-sm font-bold text-foreground">
                        {getInitials(anggota.nama)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <h4 className="font-heading font-bold text-base text-foreground">
                      {anggota.nama}
                    </h4>
                    <p className="text-xs text-muted mt-0.5 font-mono">
                      {anggota.peran}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
