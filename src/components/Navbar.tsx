import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import { Icon } from './ui/Icon';
import { KONTAK_AGENCY } from '../data/content';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Layanan', href: '#layanan', id: 'layanan' },
  { label: 'Karya', href: '#karya', id: 'karya' },
  { label: 'Proses', href: '#proses', id: 'proses' },
  { label: 'Tentang', href: '#tentang', id: 'tentang' },
  { label: 'Kontak', href: '#kontak', id: 'kontak' },
];

/**
 * Navbar ViramidAgency
 * Standar:
 * - Tinggi 64px (h-16)
 * - Menempel di atas (fixed z-50)
 * - Border bawah & latar muncul setelah scroll (transisi 200ms)
 * - Ikon melalui Icon.tsx
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
          ? 'bg-background/95 border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="section-container h-full flex items-center justify-between">
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
          className="hidden md:flex items-center gap-8 text-sm font-medium text-muted"
          aria-label="Navigasi Utama"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative py-1 transition-colors duration-200 hover:text-foreground rounded-sm ${
                  isActive ? 'text-foreground font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Zone (Desktop) */}
        <div className="hidden md:flex items-center">
          <Button
            as="a"
            href="#kontak"
            onClick={(e) => handleNavClick(e, '#kontak')}
            variant="primary"
            className="!h-9 !px-4 text-xs font-semibold"
          >
            Hubungi Kami
          </Button>
        </div>

        {/* Mobile Action & Menu Trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#kontak"
            onClick={(e) => handleNavClick(e, '#kontak')}
            className="text-xs font-semibold px-3 py-1.5 rounded-md bg-orange text-background hover:bg-orange-hover transition-colors"
          >
            Hubungi
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-foreground hover:text-orange transition-colors rounded-md"
            aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <Icon name="close" size="md" /> : <Icon name="menu" size="md" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-background/98 z-40 flex flex-col justify-between px-6 py-8 border-t border-border overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono tracking-wider uppercase text-muted">
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
                    className={`text-xl font-heading font-bold flex items-center justify-between py-3 px-3 rounded-md transition-colors ${
                      isActive
                        ? 'text-orange bg-surface border border-border'
                        : 'text-foreground hover:text-orange hover:bg-surface/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-muted font-mono font-normal">
                      0{index + 1}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-border mt-auto flex flex-col gap-4">
            <Button
              as="a"
              href="#kontak"
              onClick={(e) => handleNavClick(e, '#kontak')}
              variant="primary"
              className="w-full text-center py-3"
            >
              Mulai Diskusi Proyek
            </Button>
            <div className="flex items-center justify-between text-xs font-mono text-muted">
              <span>{KONTAK_AGENCY.lokasi}</span>
              <span>© {new Date().getFullYear()} ViramidAgency</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
