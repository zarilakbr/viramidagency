import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { TechnologyStack } from '../components/TechnologyStack';
import { ServicesSection } from '../components/ServicesSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { ProcessSection } from '../components/ProcessSection';
import { PricingSection } from '../components/PricingSection';
import { AboutSection } from '../components/AboutSection';
import { FaqSection } from '../components/FaqSection';
import { ContactSection } from '../components/ContactSection';
import { CtaBanner } from '../components/CtaBanner';
import { VideoBanner } from '../components/ui/VideoBanner';
import { DAFTAR_BANNER } from '../data/content';

export const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');

  const handleSelectService = (serviceName: string) => {
    if (serviceName.includes('Website')) {
      setSelectedService('Website');
    } else if (serviceName.includes('UI/UX')) {
      setSelectedService('UI/UX');
    } else if (serviceName.includes('Branding')) {
      setSelectedService('Branding');
    } else if (serviceName.includes('Konten')) {
      setSelectedService('Konten');
    } else {
      setSelectedService('Lainnya');
    }
  };

  const midBanner = DAFTAR_BANNER[1];

  return (
    <main>
      {/* 1. Hero: Live Showcase LMS & Clean Layout */}
      <Hero />

      {/* 2. Tech Stack Marquee */}
      <TechnologyStack />

      {/* 3. Layanan Keahlian: Latar Ice Cyan #B0EDF9 */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* 4. Karya Pilihan: Deep Teal #04344C */}
      <PortfolioSection />

      {/* 5. Banner Tengah: Kolaborasi LMS & Web */}
      <VideoBanner banner={midBanner} variant="mid" />

      {/* 6. Proses Kerja: Surface Deep Teal #074563 */}
      <ProcessSection />

      {/* 7. Paket Layanan: Deep Teal #04344C & Ice Cyan #B0EDF9 */}
      <PricingSection />

      {/* 8. Profil Studio & Tim: Surface Deep Teal #074563 */}
      <AboutSection />

      {/* 9. FAQ: Deep Teal #04344C & Ice Cyan #B0EDF9 */}
      <FaqSection />

      {/* 10. Kontak Langsung: Surface Deep Teal #074563 */}
      <ContactSection initialService={selectedService} />

      {/* 11. Pita CTA Penuh: Solid Ice Cyan #B0EDF9 */}
      <CtaBanner />
    </main>
  );
};
