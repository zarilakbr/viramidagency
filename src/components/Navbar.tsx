/**
 * @file src/components/Navbar.tsx
 * Navbar utama ViramidAgency.
 * Responsif penuh di semua ukuran layar (Mobile, Tablet, Desktop) tanpa breakpoint gap.
 * Eksklusif 2 Warna: HEX #04344C (Deep Teal) & HEX #B0EDF9 (Ice Cyan).
 * Tipografi Gastilo pada elemen heading/tombol.
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Icon } from './ui/Icon';
import { KONTAK_AGENCY } from '../data/content';
import { Container } from './ui/Container';
import { openConsultationModal } from './ConsultationModal';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Layanan', href: '/layanan', id: 'layanan' },
  { label: 'Karya', href: '/karya', id: 'karya' },
  { label: 'Proses', href: '/proses', id: 'proses' },
  { label: 'Paket', href: '/paket', id: 'paket' },
  { label: 'FAQ', href: '/faq', id: 'faq' },
  { label: 'Tentang', href: '/tentang', id: 'tentang' },
  { label: 'Kontak', href: '/kontak', id: 'kontak' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu mobile saat rute berubah atau tombol Escape ditekan
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Pantau rute aktif untuk highlight navbar
  useEffect(() => {
    const matched = NAV_ITEMS.find((item) => location.pathname === item.href);
    if (matched) {
      setActiveSection(matched.id);
    } else {
      setActiveSection('');
    }
  }, [location.pathname]);

  // Cegah body scrolling saat menu mobile terbuka
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate(href);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#04344C]/40 backdrop-blur-xl border-b border-[#165A7E]/40 shadow-sm'
            : 'bg-transparent backdrop-blur-sm border-b border-[#165A7E]/20'
        }`}
      >
        <Container className="h-full flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 rounded-sm cursor-pointer select-none"
            aria-label="ViramidAgency Beranda"
          >
            <Logo size={32} showText={true} />
          </a>

          {/* Desktop Navigation (Layar Lebar: 1024px+) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-[#78B9CA]"
            aria-label="Navigasi Utama"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'text-[#B0EDF9] font-bold bg-[#074563]/80 border border-[#165A7E]'
                      : 'hover:text-[#B0EDF9] hover:bg-[#074563]/40'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Zone (Desktop & Tablet Lebar) - Buka Pilihan Konsultasi Cepat */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => openConsultationModal()}
              className="h-9 px-4 rounded-lg bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] text-xs font-heading font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
            >
              <Icon name="message-square" size={14} />
              <span>Konsultasi Proyek</span>
            </button>
          </div>

          {/* Mobile & Tablet Trigger Bar (< 1024px) */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <button
              type="button"
              onClick={() => openConsultationModal()}
              className="text-xs font-heading font-bold px-3 py-1.5 rounded-lg bg-[#B0EDF9] text-[#04344C] hover:bg-[#C8F4FC] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
            >
              <Icon name="message-square" size={13} />
              <span>Konsultasi</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-[#B0EDF9] hover:text-[#C8F4FC] bg-[#074563]/80 backdrop-blur-md border border-[#165A7E] rounded-xl transition-all cursor-pointer active:scale-95"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <Icon name="close" size={20} strokeWidth={2} />
              ) : (
                <Icon name="menu" size={20} strokeWidth={2} />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile & Tablet Fullscreen Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 bg-[#04344C] z-40 flex flex-col justify-between p-6 border-t border-[#165A7E] overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menu Navigasi Mobile"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#165A7E]">
              <span className="text-xs font-mono tracking-wider uppercase text-[#B0EDF9] font-bold">
                Menu Navigasi Website
              </span>
              <span className="text-xs font-mono text-[#78B9CA]">7 Seksi Utama</span>
            </div>

            <nav className="flex flex-col gap-1.5" aria-label="Navigasi Mobile">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-base font-heading font-bold flex items-center justify-between py-3 px-4 rounded-xl transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#B0EDF9] bg-[#074563] border border-[#B0EDF9] shadow-sm'
                        : 'text-[#78B9CA] hover:text-[#B0EDF9] hover:bg-[#074563]/60 bg-[#074563]/30 border border-[#165A7E]/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#78B9CA] font-mono font-normal">
                      0{index + 1}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-[#165A7E] mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultationModal();
              }}
              className="w-full text-center py-3 px-3 rounded-xl bg-[#B0EDF9] text-[#04344C] font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#C8F4FC] transition-colors cursor-pointer active:scale-[0.98]"
            >
              <Icon name="message-square" size={16} />
              <span>Mulai Konsultasi (WhatsApp / Email)</span>
            </button>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#78B9CA] pt-2">
              <span>{KONTAK_AGENCY.lokasi}</span>
              <span>© {new Date().getFullYear()} ViramidAgency</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
