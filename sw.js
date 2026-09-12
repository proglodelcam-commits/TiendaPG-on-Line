// PG del Campo — Service Worker v1.0.0
// Estrategia: Network-first con cache fallback

var CACHE_NAME = 'pg-del-campo-v1';
var ASSETS = [
  './',
  './index.html',
  './tienda.html',
  './fidelidad.html',
  './admin.html',
  './enlaces.html',
  './manifest.webmanifest',
  './icons/favicon.png',
  './icons/favicon-32x32.png',
  './icons/favicon-16x16.png',
  './icons/apple-touch-icon.png',
  './icons/android-chrome-192x192.png',
  './icons/android-chrome-512x512.png'
];

// Instalar: pre-cachea los assets principales
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Cacheando assets principales');
      return cache.addAll(ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activar: limpia caches viejas
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE_NAME;
        }).map(function(key) {
          console.log('[SW] Eliminando cache vieja:', key);
          return caches.delete(key);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch: network-first, cache fallback
self.addEventListener('fetch', function(event) {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') return;

  // No cachear requests de API externas (Google, etc.)
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).then(function(response) {
      // Si la red responde, actualizamos cache y devolvemos
      if (response.ok) {
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseClone);
        });
      }
      return response;
    }).catch(function() {
      // Si no hay red, servimos desde cache
      return caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        // Fallback a index.html para navegación SPA
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Offline', { status: 503, statusText: 'Sin conexión' });
      });
    })
  );
});
