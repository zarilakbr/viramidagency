import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './ui/Reveal';
import { Container } from './ui/Container';
import { Icon } from './ui/Icon';
import { PROFIL_AGENCY, NILAI_KERJA, DAFTAR_TIM, KONTAK_AGENCY } from '../data/content';
import zarilPhoto from '../assets/images/zaril-akbar.jpg';

/**
 * AboutSection
 * Menampilkan filosofi agency, prinsip kerja, serta portret tim kolektif
 * dengan foto resmi Founder Zaril Akbar secara default proporsional,
 * rapi, dan dilengkapi efek hover zoom frame yang halus.
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
          number="05"
          title="Tentang Agency"
          subtitle="Pendekatan dedikatif yang menggabungkan presisi desain arsitektural dan keandalan teknologi digital."
        />

      {/* Dua Kolom: Cerita Filosofi & Nilai Kerja */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
        {/* Kolom Kiri: Cerita Singkat Agency */}
        <Reveal className="lg:col-span-6 flex flex-col gap-5">
          <span className="text-xs uppercase font-mono tracking-wider text-orange font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" />
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
          <span className="text-xs uppercase font-mono tracking-wider text-cyan font-semibold flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
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
                  <p className="text-sm text-muted/90 leading-relaxed pl-6 max-w-[62ch]">
                    {nilai.deskripsi}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Daftar Anggota Tim (Kolektif) Terstruktur Rapi & Sempurna Secara Default */}
      {DAFTAR_TIM && DAFTAR_TIM.length > 0 && (
        <div className="pt-12 border-t border-border">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-purple block mb-1">
                Kolektif
              </span>
              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
                Orang di Balik Karya
              </h3>
            </div>
            <span className="text-xs font-mono text-muted">
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
                <div className="group bg-surface border border-border rounded-xl p-5 hover:border-orange transition-all duration-300 flex flex-col justify-between h-full hover:shadow-lg">
                  <div>
                    {/* Frame Foto Portrait Proporsional dengan Animasi Zoom Frame */}
                    <div className="w-full aspect-[4/5] rounded-lg overflow-hidden bg-background border border-border mb-4 relative select-none">
                      {anggota.foto ? (
                        <img
                          src={anggota.foto}
                          alt={`${anggota.nama} - ${anggota.peran}`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-surface/40 text-center">
                          <div className="w-16 h-16 rounded-full border border-border bg-surface flex items-center justify-center mb-3 group-hover:border-orange transition-colors">
                            <span className="font-heading font-bold text-xl text-foreground">
                              {getInitials(anggota.nama)}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-muted">
                            Viramid Specialist
                          </span>
                        </div>
                      )}

                      {/* Badge Khusus Founder untuk Zaril Akbar */}
                      {anggota.nama === 'Zaril Akbar' && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full border border-border bg-background/90 text-[10px] font-mono text-cyan flex items-center gap-1.5 shadow backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                          <span>Founder</span>
                        </div>
                      )}
                    </div>

                    {/* Informasi Nama & Peran */}
                    <h4 className="font-heading font-bold text-lg text-foreground group-hover:text-orange transition-colors">
                      {anggota.nama}
                    </h4>
                    <p className="text-xs text-muted font-mono mt-1">
                      {anggota.peran}
                    </p>
                  </div>

                  {/* Keterangan Lokasi / Kolaborator */}
                  <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-[11px] font-mono text-muted">
                    <span>{anggota.nama === 'Zaril Akbar' ? KONTAK_AGENCY.lokasi : 'Studio Kolektif'}</span>
                    <span className="text-orange group-hover:translate-x-1 transition-transform duration-200">
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
