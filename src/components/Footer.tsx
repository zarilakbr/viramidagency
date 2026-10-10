import React from 'react';
import { Logo } from './Logo';
import { TriColorLine } from './ThreeArcsMotif';
import { Container } from './ui/Container';
import { Icon } from './ui/Icon';
import { KONTAK_AGENCY, PROFIL_AGENCY } from '../data/content';

/**
 * Footer
 * Eksklusif 2 Warna: HEX #04344C & HEX #B0EDF9.
 * Font Judul: Gastilo.
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = id;
    }
  };

  return (
    <footer className="relative bg-[#022131] border-t border-[#165A7E]">
      {/* Garis aksen 1px cyan tunggal */}
      <TriColorLine />

      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Col 1: Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Logo size={36} showText={true} />
            <p className="text-sm text-[#78B9CA] max-w-sm leading-relaxed">
              {PROFIL_AGENCY.tagline}
            </p>
            <span className="text-xs text-[#78B9CA] font-mono flex items-center gap-2">
              <Icon name="map-pin" size="sm" className="text-[#B0EDF9]" />
              <span>{KONTAK_AGENCY.lokasi}</span>
            </span>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-[#B0EDF9]">
              Navigasi Halaman
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-[#78B9CA]">
              <li>
                <a
                  href="#layanan"
                  onClick={(e) => scrollToSection(e, 'layanan')}
                  className="hover:text-[#B0EDF9] transition-colors rounded-sm"
                >
                  Layanan Unggulan
                </a>
              </li>
              <li>
                <a
                  href="#karya"
                  onClick={(e) => scrollToSection(e, 'karya')}
                  className="hover:text-[#B0EDF9] transition-colors rounded-sm"
                >
                  Karya &amp; Portofolio
                </a>
              </li>
              <li>
                <a
                  href="#proses"
                  onClick={(e) => scrollToSection(e, 'proses')}
                  className="hover:text-[#B0EDF9] transition-colors rounded-sm"
                >
                  Alur Proses Kerja
                </a>
              </li>
              <li>
                <a
                  href="#paket"
                  onClick={(e) => scrollToSection(e, 'paket')}
                  className="hover:text-[#B0EDF9] transition-colors rounded-sm"
                >
                  Paket Layanan
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => scrollToSection(e, 'faq')}
                  className="hover:text-[#B0EDF9] transition-colors rounded-sm"
                >
                  Pertanyaan Umum (FAQ)
                </a>
              </li>
              <li>
                <a
                  href="#kontak"
                  onClick={(e) => scrollToSection(e, 'kontak')}
                  className="hover:text-[#B0EDF9] transition-colors rounded-sm"
                >
                  Mulai Diskusi Proyek
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak & Sosial */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-[#B0EDF9]">
              Komunikasi &amp; Hubungan
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-[#78B9CA]">
              <a
                href={`mailto:${KONTAK_AGENCY.email}`}
                className="hover:text-[#B0EDF9] transition-colors rounded-sm flex items-center gap-2 font-mono text-xs"
              >
                <Icon name="mail" size="sm" className="text-[#B0EDF9]" />
                <span>{KONTAK_AGENCY.email}</span>
              </a>
              <a
                href={`https://wa.me/${KONTAK_AGENCY.whatsappNomor}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#B0EDF9] transition-colors rounded-sm flex items-center gap-2 font-mono text-xs"
              >
                <Icon name="message-square" size="sm" className="text-[#B0EDF9]" />
                <span>WhatsApp ({KONTAK_AGENCY.whatsappDisplay})</span>
              </a>
              <a
                href={KONTAK_AGENCY.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#B0EDF9] transition-colors rounded-sm flex items-center gap-2 font-mono text-xs"
              >
                <Icon name="instagram" size="sm" className="text-[#B0EDF9]" />
                <span>Instagram ({KONTAK_AGENCY.instagram})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#165A7E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78B9CA]">
          <p>© {currentYear} ViramidAgency. Seluruh hak cipta dilindungi.</p>
          <p className="text-[#78B9CA]/60">
            Didesain dan direkayasa untuk platform LMS &amp; website berkinerja tinggi.
          </p>
        </div>
      </Container>
    </footer>
  );
};
