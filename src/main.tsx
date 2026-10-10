import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Registrasi Service Worker untuk PWA
if ('serviceWorker' in navigator && typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('[PWA] Service Worker aktif:', reg.scope);
        }
      })
      .catch((err) => {
        console.warn('[PWA] Gagal meregistrasi Service Worker:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);

