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

export const HomePage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');

  const handleSelectService = (serviceName: string) => {
    // Map service name to form select value
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

  return (
    <main>
      {/* 1. Hero: Navy Gelap #0A0A2E */}
      <Hero />

      {/* 2. Tech Stack Marquee */}
      <TechnologyStack />

      {/* 3. Layanan Keahlian: Seksi Terang #F4F3FF (Pemecah Ritme) */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* 4. Karya Unggulan: Navy Gelap #0A0A2E */}
      <PortfolioSection />

      {/* 5. Proses Kerja: Surface #12123F (Sticky Sidebar & Progress) */}
      <ProcessSection />

      {/* 6. Paket Layanan: Navy Gelap #0A0A2E */}
      <PricingSection />

      {/* 7. Profil Founder & Tim (Zaril Akbar): Surface #12123F */}
      <AboutSection />

      {/* 8. FAQ: Seksi Terang #F4F3FF (Pemecah Ritme) */}
      <FaqSection />

      {/* 9. Kontak Langsung: Surface #12123F */}
      <ContactSection initialService={selectedService} />

      {/* 10. Pita CTA Penuh: Solid Oranye #F97316 */}
      <CtaBanner />
    </main>
  );
};
