/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { BackgroundGradients } from './components/BackgroundGradients';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll handling helper for HashRouter anchors
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};

export default function App() {
  return (
    <HashRouter>
      <ScrollManager />
      <div className="min-h-screen bg-background text-foreground flex flex-col font-body selection:bg-orange/30 selection:text-foreground relative">
        {/* Latar Belakang Solid Arsitektural */}
        <BackgroundGradients />

        {/* Navigation Bar (Tinggi 64px) */}
        <Navbar />

        {/* Main Routed Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/karya/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />

        {/* Back to Top Navigation */}
        <BackToTop />
      </div>
    </HashRouter>
  );
}
