/**
 * @file public/sw.js
 * Service Worker untuk PWA ViramidAgency.
 * Mendukung offline caching, update instan, dan penanganan aman untuk media video.
 */

const CACHE_NAME = 'viramid-pwa-v1';

// Aset statis inti yang dicache pada saat instalasi
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/apple-touch-icon.png',
];

// Event Install: Pre-cache aset utama
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Beberapa aset gagal di-precache:', err);
      });
    })
  );
  self.skipWaiting();
});

// Event Activate: Bersihkan cache versi lama & klaim client langsung
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Event Fetch: Strategi Cache Cerdas
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Hanya proses method GET
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Bypass cache untuk video banner (video streaming menggunakan Range headers)
  if (url.pathname.includes('/videos/') || request.headers.get('range')) {
    return;
  }

  // 1. Permintaan Navigasi HTML (SPA Route): Network-first dengan fallback ke cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Salin response ke cache untuk akses offline berikutnya
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          // Jika offline, kembalikan index.html dari cache agar React Router tetap berjalan
          const cache = await caches.open(CACHE_NAME);
          const cachedIndex = await cache.match('/index.html');
          return cachedIndex || cache.match('/');
        })
    );
    return;
  }

  // 2. Permintaan Aset Statis (JS, CSS, Gambar, Fonts): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === 'basic'
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
