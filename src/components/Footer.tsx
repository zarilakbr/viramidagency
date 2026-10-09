import React from 'react';
import { Logo } from './Logo';
import { TriColorLine } from './ThreeArcsMotif';
import { KONTAK_AGENCY, PROFIL_AGENCY } from '../data/content';

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
    <footer className="relative bg-[#342056]/95 backdrop-blur-md border-t border-[#5a3c8e]/70">
      {/* Motif garis tiga warna tipis di bagian paling atas footer */}
      <TriColorLine />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Col 1: Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Logo size={40} showText={true} />
            <p className="text-sm text-[#B8A9D4] max-w-sm leading-relaxed">
              {PROFIL_AGENCY.tagline}
            </p>
            <span className="text-xs text-[#B8A9D4]/80 font-mono">
              📍 {KONTAK_AGENCY.lokasi}
            </span>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F3FF]">
              Navigasi Halaman
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-[#B8A9D4]">
              <li>
                <a
                  href="#layanan"
                  onClick={(e) => scrollToSection(e, 'layanan')}
                  className="hover:text-[#F97316] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded"
                >
                  Layanan Unggulan
                </a>
              </li>
              <li>
                <a
                  href="#karya"
                  onClick={(e) => scrollToSection(e, 'karya')}
                  className="hover:text-[#F97316] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded"
                >
                  Karya &amp; Portofolio
                </a>
              </li>
              <li>
                <a
                  href="#proses"
                  onClick={(e) => scrollToSection(e, 'proses')}
                  className="hover:text-[#F97316] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded"
                >
                  Alur Proses Kerja
                </a>
              </li>
              <li>
                <a
                  href="#tentang"
                  onClick={(e) => scrollToSection(e, 'tentang')}
                  className="hover:text-[#F97316] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded"
                >
                  Tentang ViramidAgency
                </a>
              </li>
              <li>
                <a
                  href="#kontak"
                  onClick={(e) => scrollToSection(e, 'kontak')}
                  className="hover:text-[#F97316] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded"
                >
                  Mulai Diskusi Proyek
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak & Sosial */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F3FF]">
              Komunikasi &amp; Hubungan
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-[#B8A9D4]">
              <a
                href={`mailto:${KONTAK_AGENCY.email}`}
                className="hover:text-[#22D3C5] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded flex items-center gap-2"
              >
                <span>✉️</span>
                <span>{KONTAK_AGENCY.email}</span>
              </a>
              <a
                href={`https://wa.me/${KONTAK_AGENCY.whatsappNomor}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F97316] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded flex items-center gap-2"
              >
                <span>💬</span>
                <span>WhatsApp ({KONTAK_AGENCY.whatsappDisplay})</span>
              </a>
              <a
                href={KONTAK_AGENCY.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C26FE0] transition-colors focus-visible:outline-2 focus-visible:outline-[#22D3C5] rounded flex items-center gap-2"
              >
                <span>📷</span>
                <span>Instagram ({KONTAK_AGENCY.instagram})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#5a3c8e]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8A9D4]">
          <p>© {currentYear} ViramidAgency. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="text-xs text-[#B8A9D4]/70">
            Didesain dan direkayasa untuk brand &amp; website berkinerja tinggi.
          </p>
        </div>
      </div>
    </footer>
  );
};
