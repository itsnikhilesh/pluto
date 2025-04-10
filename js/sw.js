// sw.js - Service Worker File

const CACHE_NAME = 'my-site-cache-v1';
const ASSETS_TO_CACHE = [
    'PLUTO/index.html',
    'PLUTO/css/style.css',
    'PLUTO/js/script.js',
    'PLUTO/images/burger-icon.png',
    'PLUTO/images/burger1.png',
    'PLUTO/images/burger2.png',
    'PLUTO/images/customer1.png',
    'PLUTO/images/deliciousfood.png',
    'PLUTO/images/dessert-icon.png',
    'PLUTO/images/drinks-icon.png',
    'PLUTO/images/hero-food.png',
    'PLUTO/images/mobile-app.png',
    'PLUTO/images/pasta1.png',
    'PLUTO/images/pasta2.png',
    'PLUTO/images/pizza-icon.png',
    'PLUTO/images/pizza1.png',
    'PLUTO/images/pizza2.png',
    'PLUTO/images/pluto1.png',
    'PLUTO/images/salad-icon.png',
    'PLUTO/images/special-offer.png',

  ];

// Install event - caches important files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Fetch event - serves cached content when available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});