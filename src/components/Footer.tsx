import React from 'react';
import { Logo } from './Logo';
import { TriColorLine } from './ThreeArcsMotif';
import { Container } from './ui/Container';
import { Icon } from './ui/Icon';
import { KONTAK_AGENCY, PROFIL_AGENCY } from '../data/content';

/**
 * Footer
 * Ritme Warna: navy-950 (#070722).
 * Standar:
 * - Garis tipis oranye tunggal
 * - Token Oranye + Navy baku tanpa cyan/ungu
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
    <footer className="relative bg-navy-950 border-t border-navy-700">
      {/* Garis aksen 1px oranye tunggal di bagian atas footer */}
      <TriColorLine />

      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Col 1: Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Logo size={36} showText={true} />
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              {PROFIL_AGENCY.tagline}
            </p>
            <span className="text-xs text-muted font-mono flex items-center gap-2">
              <Icon name="map-pin" size="sm" className="text-orange" />
              <span>{KONTAK_AGENCY.lokasi}</span>
            </span>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-cream">
              Navigasi Halaman
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              <li>
                <a
                  href="#layanan"
                  onClick={(e) => scrollToSection(e, 'layanan')}
                  className="hover:text-orange transition-colors rounded-sm"
                >
                  Layanan Unggulan
                </a>
              </li>
              <li>
                <a
                  href="#karya"
                  onClick={(e) => scrollToSection(e, 'karya')}
                  className="hover:text-orange transition-colors rounded-sm"
                >
                  Karya &amp; Portofolio
                </a>
              </li>
              <li>
                <a
                  href="#proses"
                  onClick={(e) => scrollToSection(e, 'proses')}
                  className="hover:text-orange transition-colors rounded-sm"
                >
                  Alur Proses Kerja
                </a>
              </li>
              <li>
                <a
                  href="#paket"
                  onClick={(e) => scrollToSection(e, 'paket')}
                  className="hover:text-orange transition-colors rounded-sm"
                >
                  Paket Layanan
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => scrollToSection(e, 'faq')}
                  className="hover:text-orange transition-colors rounded-sm"
                >
                  Pertanyaan Umum (FAQ)
                </a>
              </li>
              <li>
                <a
                  href="#kontak"
                  onClick={(e) => scrollToSection(e, 'kontak')}
                  className="hover:text-orange transition-colors rounded-sm"
                >
                  Mulai Diskusi Proyek
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak & Sosial */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-cream">
              Komunikasi &amp; Hubungan
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted">
              <a
                href={`mailto:${KONTAK_AGENCY.email}`}
                className="hover:text-orange transition-colors rounded-sm flex items-center gap-2 font-mono text-xs"
              >
                <Icon name="mail" size="sm" className="text-orange" />
                <span>{KONTAK_AGENCY.email}</span>
              </a>
              <a
                href={`https://wa.me/${KONTAK_AGENCY.whatsappNomor}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange transition-colors rounded-sm flex items-center gap-2 font-mono text-xs"
              >
                <Icon name="message-square" size="sm" className="text-orange" />
                <span>WhatsApp ({KONTAK_AGENCY.whatsappDisplay})</span>
              </a>
              <a
                href={KONTAK_AGENCY.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange transition-colors rounded-sm flex items-center gap-2 font-mono text-xs"
              >
                <Icon name="instagram" size="sm" className="text-orange" />
                <span>Instagram ({KONTAK_AGENCY.instagram})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <p>© {currentYear} ViramidAgency. Seluruh hak cipta dilindungi.</p>
          <p className="text-muted/60">
            Didesain dan direkayasa untuk brand &amp; website berkinerja tinggi.
          </p>
        </div>
      </Container>
    </footer>
  );
};
