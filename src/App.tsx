/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { BackgroundGradients } from './components/BackgroundGradients';
import { ConsultationModal } from './components/ConsultationModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProcessPage } from './pages/ProcessPage';
import { PricingPage } from './pages/PricingPage';
import { FaqPage } from './pages/FaqPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll handling helper: scroll to top on clean route change
const ScrollManager: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />

      <div className="min-h-screen bg-background text-foreground flex flex-col font-body selection:bg-[#B0EDF9] selection:text-[#04344C] relative">
        {/* Latar Belakang Solid Arsitektural */}
        <BackgroundGradients />

        {/* Navigation Bar (Tinggi 64px) */}
        <Navbar />

        {/* Main Routed Content */}
        <div className="relative z-10 flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/layanan" element={<ServicesPage />} />
            <Route path="/karya" element={<PortfolioPage />} />
            <Route path="/karya/:slug" element={<ProjectDetailPage />} />
            <Route path="/proses" element={<ProcessPage />} />
            <Route path="/paket" element={<PricingPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/tentang" element={<AboutPage />} />
            <Route path="/kontak" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/booking/sukses" element={<BookingSuccessPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />

        {/* Back to Top Navigation */}
        <BackToTop />

        {/* Modal Pilihan Konsultasi Cepat (WhatsApp vs Email vs Kalender) */}
        <ConsultationModal />
      </div>
    </BrowserRouter>
  );
}
