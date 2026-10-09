import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './ui/Reveal';
import { Icon } from './ui/Icon';
import { PROFIL_AGENCY, NILAI_KERJA, DAFTAR_TIM, KONTAK_AGENCY } from '../data/content';

/**
 * AboutSection
 * Menampilkan filosofi agency, prinsip kerja, serta kartu eksklusif
 * Frame-Breakout (Pop-out dari frame) untuk Founder Zaril Akbar,
 * dilengkapi interaktivitas langsung ke WhatsApp dan tim spesialis.
 */
export const AboutSection: React.FC = () => {
  const getInitials = (nama: string) => {
    const parts = nama.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nama.slice(0, 2).toUpperCase() || 'VA';
  };

  // Founder & Tim Spesialis
  const founder = DAFTAR_TIM.find((t) => t.nama === 'Zaril Akbar') || DAFTAR_TIM[0];
  const specialistTeam = DAFTAR_TIM.filter((t) => t.nama !== 'Zaril Akbar');

  return (
    <section id="tentang" className="section-container section-spacing scroll-mt-20">
      <SectionHeading
        number="04"
        title="Tentang Agency"
        subtitle="Pendekatan dedikatif yang menggabungkan presisi desain arsitektural dan keandalan teknologi digital."
      />

      {/* Grid Utama: Filosofi & Nilai Kerja (Kiri) vs Founder Frame-Breakout Card (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        {/* Kolom Kiri: Cerita & Nilai Kerja (7 Kolom) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          {/* Cerita Filosofi */}
          <Reveal className="flex flex-col gap-4">
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

          {/* Daftar Nilai Kerja */}
          <div className="flex flex-col gap-4 pt-2">
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

        {/* Kolom Kanan: Founder Spotlight dengan Frame-Breakout Effect 3D (5 Kolom) */}
        <Reveal className="lg:col-span-5 flex justify-center w-full">
          <div className="relative group w-full max-w-[390px] mx-auto mt-16 sm:mt-20">
            {/* Ambient Aura Glow di belakang kartu (Muncul & Melebar saat hover) */}
            <div
              className="absolute -inset-1.5 bg-gradient-to-tr from-orange/30 via-cyan/20 to-purple/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              aria-hidden="true"
            />

            {/* Kotak Frame Utama dengan aksen garis arsitektural */}
            <div className="relative pt-24 sm:pt-28 pb-7 px-6 sm:px-7 bg-surface/95 border border-border rounded-2xl group-hover:border-orange/60 transition-all duration-300 shadow-xl flex flex-col items-center text-center">
              {/* Sudut Aksen Khas Studio (Top-Left & Bottom-Right) */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-orange/60 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan/60 pointer-events-none" />

              {/* FOTO FRAME-BREAKOUT: Fisik foto MENEMBUS batas atas frame */}
              <div className="absolute -top-14 sm:-top-20 left-1/2 -translate-x-1/2 w-44 sm:w-52 aspect-[3/4] z-20">
                {/* Aura cahaya di belakang kepala */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-orange/40 via-cyan/20 to-transparent blur-md -z-10 group-hover:scale-105 transition-transform duration-300" />

                {/* Foto Portrait Zaril Akbar */}
                <img
                  src={founder.foto || '/images/zaril-akbar.jpg'}
                  alt={`${founder.nama} - ${founder.peran}`}
                  className="w-full h-full object-cover object-top rounded-2xl border-2 border-border shadow-2xl group-hover:border-orange group-hover:-translate-y-2 group-hover:scale-[1.03] transition-all duration-300 select-none"
                  loading="lazy"
                />

                {/* Badge Status Mengapung di Sudut Foto */}
                <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full border border-border bg-background/90 text-[10px] font-mono text-cyan flex items-center gap-1.5 shadow-md backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  <span>Founder</span>
                </div>
              </div>

              {/* Konten Keterangan Founder di Bawah Foto */}
              <div className="w-full flex flex-col items-center mt-2">
                {/* Gelar & Jabatan */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-background/70 text-[11px] font-mono text-cyan mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  <span>{founder.peran}</span>
                </span>

                {/* Nama Founder */}
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground group-hover:text-orange transition-colors tracking-tight">
                  {founder.nama}
                </h3>

                {/* Lokasi NTB */}
                <span className="text-xs font-mono text-muted flex items-center justify-center gap-1.5 mt-1">
                  <Icon name="map-pin" size="sm" className="text-orange" />
                  <span>{KONTAK_AGENCY.lokasi}</span>
                </span>

                {/* Kutipan Visi Founder */}
                <blockquote className="mt-4 pt-4 border-t border-border/80 text-xs sm:text-sm text-muted/90 italic max-w-[34ch] leading-relaxed font-sans">
                  &ldquo;Karya digital terbaik lahir dari perpaduan presisi kode, kedalaman estetika, dan komitmen mendalam terhadap dampak bisnis klien.&rdquo;
                </blockquote>

                {/* Spesifikasi Keahlian Founder */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                  <span className="px-2 py-0.5 rounded border border-border bg-background/60 text-[10px] font-mono text-muted">
                    Bespoke Code
                  </span>
                  <span className="px-2 py-0.5 rounded border border-border bg-background/60 text-[10px] font-mono text-muted">
                    Creative Vision
                  </span>
                  <span className="px-2 py-0.5 rounded border border-border bg-background/60 text-[10px] font-mono text-muted">
                    UI/UX Architecture
                  </span>
                </div>

                {/* Tombol Interaktif Diskusi Langsung dengan Founder */}
                <a
                  href={`https://wa.me/${KONTAK_AGENCY.whatsappNomor}?text=${encodeURIComponent(
                    `Halo ${founder.nama}, saya ingin berkonsultasi mengenai rencana proyek bersama ViramidAgency.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 w-full py-2.5 px-4 rounded border border-border bg-background hover:bg-orange hover:border-orange text-foreground text-xs font-mono font-medium transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-md"
                >
                  <Icon name="message-square" size="sm" className="text-orange group-hover/btn:text-foreground transition-colors" />
                  <span>Konsultasi dengan {founder.nama}</span>
                  <Icon name="arrow-up-right" size="sm" className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Daftar Anggota Tim Spesialis */}
      {specialistTeam && specialistTeam.length > 0 && (
        <div className="pt-10 border-t border-border">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-purple block mb-1">
                Kolektif
              </span>
              <h3 className="font-heading font-bold text-2xl text-foreground">
                Spesialis di Balik Karya
              </h3>
            </div>
            <span className="text-xs font-mono text-muted">
              Kolaborator Teknis &amp; Strategi Produk
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {specialistTeam.map((anggota, idx) => (
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
