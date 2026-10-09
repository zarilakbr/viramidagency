import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { TechnologyStack } from '../components/TechnologyStack';
import { ServicesSection } from '../components/ServicesSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { ProcessSection } from '../components/ProcessSection';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';

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
      <Hero />
      <TechnologyStack />
      <ServicesSection onSelectService={handleSelectService} />
      <PortfolioSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection initialService={selectedService} />
    </main>
  );
};
