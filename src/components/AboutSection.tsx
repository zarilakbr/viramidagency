import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './ui/Reveal';
import { Container } from './ui/Container';
import { Eyebrow } from './ui/Eyebrow';
import { Icon } from './ui/Icon';
import { PROFIL_AGENCY, NILAI_KERJA, DAFTAR_TIM, KONTAK_AGENCY } from '../data/content';

/**
 * AboutSection
 * Menampilkan filosofi agency, prinsip kerja, serta portret tim kolektif
 * dengan foto resmi Founder Zaril Akbar.
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
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
    <section id="tentang" className="my-[72px] sm:my-[120px] scroll-mt-20">
      <Container>
        <SectionHeading
          number="06"
          eyebrowText="FILOSOFI & PROFIL"
          title="Tentang Agency"
          subtitle="Pendekatan dedikatif yang menggabungkan presisi desain arsitektural dan keandalan teknologi digital."
        />

        {/* Dua Kolom: Cerita Filosofi & Nilai Kerja */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Kolom Kiri: Cerita Singkat Agency */}
          <Reveal className="lg:col-span-6 flex flex-col gap-5">
            <Eyebrow variant="cyan">
              FILOSOFI &amp; KOMITMEN
            </Eyebrow>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#B0EDF9] tracking-[-0.02em] leading-[1.3] text-balance">
              Menciptakan karya yang tidak hanya memikat visual, namun terukur dampaknya.
            </h3>
            <p className="text-base text-[#78B9CA] leading-[1.75] max-w-[62ch]">
              {PROFIL_AGENCY.cerita}
            </p>
          </Reveal>

          {/* Kolom Kanan: Daftar Nilai Kerja */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <Eyebrow variant="cyan" className="mb-1">
              PRINSIP KERJA
            </Eyebrow>
            <div className="flex flex-col gap-4">
              {NILAI_KERJA.map((nilai, index) => (
                <Reveal
                  key={nilai.nomor}
                  delayIndex={index}
                >
                  <div className="p-5 bg-[#074563] border border-[#165A7E] rounded-xl hover:border-[#B0EDF9] transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-[#B0EDF9] font-bold">
                        [{nilai.nomor}]
                      </span>
                      <h4 className="font-heading font-bold text-base sm:text-lg text-[#B0EDF9]">
                        {nilai.judul}
                      </h4>
                    </div>
                    <p className="text-sm text-[#78B9CA] leading-relaxed pl-6 max-w-[62ch]">
                      {nilai.deskripsi}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Daftar Anggota Tim (Kolektif) */}
        {DAFTAR_TIM && DAFTAR_TIM.length > 0 && (
          <div className="pt-12 border-t border-[#165A7E]">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <Eyebrow variant="cyan" className="mb-1">
                  KOLEKTIF &amp; TALENTA
                </Eyebrow>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#B0EDF9]">
                  Orang di Balik Karya
                </h3>
              </div>
              <span className="text-xs font-mono text-[#78B9CA]">
                Kepemimpinan &amp; Kolaborator Teknis Studio
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DAFTAR_TIM.map((anggota, idx) => (
                <Reveal
                  key={idx}
                  delayIndex={idx}
                  className="h-full"
                >
                  <div className="group bg-[#074563] border border-[#165A7E] rounded-2xl p-5 hover:border-[#B0EDF9] transition-all duration-300 flex flex-col justify-between h-full hover:shadow-lg">
                    <div>
                      {/* Frame Foto Portrait Proporsional */}
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#04344C] border border-[#165A7E] mb-4 relative select-none">
                        {anggota.foto ? (
                          <img
                            src={anggota.foto}
                            alt={`${anggota.nama} - ${anggota.peran}`}
                            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#04344C] text-center">
                            <div className="w-16 h-16 rounded-full border border-[#165A7E] bg-[#074563] flex items-center justify-center mb-3 group-hover:border-[#B0EDF9] transition-colors">
                              <span className="font-heading font-bold text-xl text-[#B0EDF9]">
                                {getInitials(anggota.nama)}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[#78B9CA]">
                              Viramid Specialist
                            </span>
                          </div>
                        )}

                        {/* Badge Khusus Founder untuk Zaril Akbar */}
                        {anggota.nama === 'Zaril Akbar' && (
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full border border-[#165A7E] bg-[#04344C]/95 text-xs font-mono text-[#B0EDF9] flex items-center gap-1.5 shadow backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B0EDF9] animate-pulse" />
                            <span>Founder</span>
                          </div>
                        )}
                      </div>

                      {/* Informasi Nama & Peran */}
                      <h4 className="font-heading font-bold text-lg text-[#B0EDF9] group-hover:underline transition-colors">
                        {anggota.nama}
                      </h4>
                      <p className="text-xs text-[#78B9CA] font-mono mt-1">
                        {anggota.peran}
                      </p>
                    </div>

                    {/* Keterangan Lokasi / Kolaborator */}
                    <div className="mt-4 pt-3 border-t border-[#165A7E] flex items-center justify-between text-xs font-mono text-[#78B9CA]">
                      <span>{anggota.nama === 'Zaril Akbar' ? KONTAK_AGENCY.lokasi : 'Studio Kolektif'}</span>
                      <span className="text-[#B0EDF9] group-hover:translate-x-1 transition-transform duration-200">
                        <Icon name="arrow-right" size="sm" />
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
