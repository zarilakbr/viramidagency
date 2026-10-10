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
      {/* 1. Hero: Video Banner 1 dengan Overlay Navy-900 60% */}
      <Hero />

      {/* 2. Tech Stack Marquee */}
      <TechnologyStack />

      {/* 3. Layanan Keahlian: Latar ORANYE Solid #F97316 */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* 4. Karya Pilihan: Navy-900 #0A0A2E */}
      <PortfolioSection />

      {/* 5. Banner Video 2: Tengah (Di antara Karya & Proses) */}
      <VideoBanner banner={midBanner} variant="mid" />

      {/* 6. Proses Kerja: Surface Navy-800 #12123F */}
      <ProcessSection />

      {/* 7. Paket Layanan: Navy-900 dengan Paket Tengah Oranye Solid */}
      <PricingSection />

      {/* 8. Profil Studio & Tim: Surface Navy-800 #12123F */}
      <AboutSection />

      {/* 9. FAQ: Latar Krem #F4F3FF, Teks Navy-900 */}
      <FaqSection />

      {/* 10. Kontak Langsung: Surface Navy-800 */}
      <ContactSection initialService={selectedService} />

      {/* 11. Pita CTA Penuh: Solid Oranye #F97316 */}
      <CtaBanner />
    </main>
  );
};
