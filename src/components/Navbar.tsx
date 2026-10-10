import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Icon } from './ui/Icon';
import { KONTAK_AGENCY } from '../data/content';
import { Container } from './ui/Container';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Layanan', href: '#layanan', id: 'layanan' },
  { label: 'Karya', href: '#karya', id: 'karya' },
  { label: 'Proses', href: '#proses', id: 'proses' },
  { label: 'Paket', href: '#paket', id: 'paket' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
  { label: 'Tentang', href: '#tentang', id: 'tentang' },
  { label: 'Kontak', href: '#kontak', id: 'kontak' },
];

/**
 * Navbar ViramidAgency
 * Eksklusif 2 Warna: HEX #04344C (Deep Teal) & HEX #B0EDF9 (Ice Cyan).
 * Tipografi Gastilo pada elemen heading/tombol.
 */
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-15% 0px -65% 0px',
      threshold: 0.1,
    });

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

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
    const id = href.replace('#', '');

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#04344C]/95 backdrop-blur-md border-b border-[#165A7E]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Container className="h-full flex items-center justify-between">
        {/* Brand Zone */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 rounded-sm cursor-pointer"
          aria-label="ViramidAgency Beranda"
        >
          <Logo size={32} showText={true} />
        </a>

        {/* Nav Links (Desktop) */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#78B9CA]"
          aria-label="Navigasi Utama"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative py-1 transition-colors duration-200 hover:text-[#B0EDF9] rounded-sm ${
                  isActive ? 'text-[#B0EDF9] font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#B0EDF9]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Zone (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/booking"
            className="h-9 px-4 rounded-lg bg-[#B0EDF9] hover:bg-[#C8F4FC] text-[#04344C] text-xs font-heading font-bold transition-colors flex items-center gap-2 shadow-sm"
          >
            <Icon name="calendar" size={14} />
            <span>Jadwalkan Konsultasi</span>
          </Link>
        </div>

        {/* Mobile Action & Menu Trigger */}
        <div className="flex items-center gap-2.5 md:hidden">
          <Link
            to="/booking"
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#B0EDF9] text-[#04344C] hover:bg-[#C8F4FC] transition-colors flex items-center gap-1.5"
          >
            <Icon name="calendar" size={13} />
            <span>Konsultasi</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#B0EDF9] hover:text-[#C8F4FC] transition-colors rounded-md"
            aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <Icon name="close" size="md" /> : <Icon name="menu" size="md" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-[#04344C]/98 z-40 flex flex-col justify-between px-6 py-8 border-t border-[#165A7E] overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono tracking-wider uppercase text-[#78B9CA]">
              Menu Navigasi
            </span>
            <nav className="flex flex-col gap-1" aria-label="Navigasi Mobile">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-lg font-heading font-bold flex items-center justify-between py-2.5 px-3 rounded-md transition-colors ${
                      isActive
                        ? 'text-[#B0EDF9] bg-[#074563] border border-[#165A7E]'
                        : 'text-[#78B9CA] hover:text-[#B0EDF9] hover:bg-[#074563]/50'
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

          <div className="pt-6 border-t border-[#165A7E] mt-auto flex flex-col gap-4">
            <Link
              to="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3.5 rounded-xl bg-[#B0EDF9] text-[#04344C] font-heading font-bold text-sm flex items-center justify-center gap-2"
            >
              <Icon name="calendar" size={16} />
              <span>Jadwalkan Konsultasi</span>
            </Link>
            <div className="flex items-center justify-between text-xs font-mono text-[#78B9CA]">
              <span>{KONTAK_AGENCY.lokasi}</span>
              <span>© {new Date().getFullYear()} ViramidAgency</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
