import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './Button';

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

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll detection for frosted glass header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to detect active section when on home page
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

  // Lock body scroll when mobile menu is open
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#1e1136]/75 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Zone - Logo on left */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#F97316] focus-visible:outline-offset-4 rounded-xl group"
          aria-label="ViramidAgency Beranda"
        >
          <Logo size={36} showText={true} />
        </a>

        {/* Nav Links (Desktop) - Clean & Floating without boxy container */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B8A9D4]"
          aria-label="Navigasi Utama"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative py-1 transition-colors duration-200 hover:text-[#F4F3FF] focus-visible:outline-2 focus-visible:outline-[#F97316] focus-visible:outline-offset-4 rounded-sm ${
                  isActive ? 'text-[#F4F3FF] font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F97316]"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Zone (Desktop) - Hubungi Kami */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            as="a"
            href="#kontak"
            onClick={(e) => handleNavClick(e, '#kontak')}
            variant="primary"
            className="!h-10 !px-5 text-xs font-semibold tracking-wide shadow-md shadow-[#F97316]/15 hover:shadow-[#F97316]/30 transition-all"
          >
            Hubungi Kami
          </Button>
        </div>

        {/* Mobile Action & Menu Trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#kontak"
            onClick={(e) => handleNavClick(e, '#kontak')}
            className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#F97316] text-[#24133f] active:scale-95 transition-transform"
          >
            Hubungi
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F4F3FF] hover:text-[#F97316] transition-colors focus-visible:outline-2 focus-visible:outline-[#F97316] rounded-lg"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Responsive Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-20 bg-[#1a0f30]/95 backdrop-blur-2xl z-40 flex flex-col justify-between px-6 py-8 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono tracking-widest uppercase text-[#B8A9D4]/70 px-2">
              Menu Navigasi
            </span>
            <nav className="flex flex-col gap-2" aria-label="Navigasi Mobile">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-2xl font-heading font-bold flex items-center justify-between py-3.5 px-3 rounded-xl transition-all ${
                      isActive
                        ? 'text-[#F97316] bg-[#342056]/60'
                        : 'text-[#F4F3FF] hover:text-[#F97316] active:bg-[#342056]/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#B8A9D4] font-mono font-normal">
                      0{index + 1}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="pt-8 mt-auto flex flex-col gap-4">
            <Button
              as="a"
              href="#kontak"
              onClick={(e) => handleNavClick(e, '#kontak')}
              variant="primary"
              className="w-full text-center py-3.5 font-semibold text-sm shadow-lg shadow-[#F97316]/20"
            >
              Mulai Diskusi Proyek
            </Button>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#B8A9D4]/70 px-2">
              <span>Jakarta Selatan, ID</span>
              <span>© {new Date().getFullYear()} ViramidAgency</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
