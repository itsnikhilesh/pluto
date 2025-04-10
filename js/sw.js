// sw.js - Service Worker File

const CACHE_NAME = 'my-site-cache-v1';
const ASSETS_TO_CACHE = [
    // '/EBOOK/',
    // '/EBOOK/index.html',
    // '/EBOOK/css/bootstrap-icons.css',
    // '/EBOOK/css/bootstrap.min.css',
    // '/EBOOK/css/templatemo-ebook-landing.min.css',  
    // '/EBOOK/js/bootstrap.bundle.min.js',
    // '/EBOOK/js/click-scroll.js',
    // '/EBOOK/js/custom.js',
    // '/EBOOK/js/jquery.min.js',
    // '/EBOOK/js/jquery.sticky.js',
    // '/EBOOK/images/avatar/businessman-sitting-by-table-cafe.jpg',
    // '/EBOOK/images/avatar/circle-scatter-haikei.png',
    // '/EBOOK/images/avatar/education-online-books.png',
    // '/EBOOK/images/avatar/portrait-mature-smiling-authoress-sitting-desk.jpg',
    // '/EBOOK/images/avatar/tablet-screen-contents.jpg'
    '/Pluto/index.html',
    'Pluto/css/style.css',
    '/Pluto/js/script.js',
    '/Pluto/images/burger-icon.png',
    'Pluto/images/burger1.png',
    'Pluto/images/burger2.png',
    'Pluto/images/customer1.png',
    'Pluto/images/deliciousfood.png',
    'Pluto/images/dessert-icon.png',
    'Pluto/images/drinks-icon.png',
    'Pluto/images/hero-food.png',
    'Pluto/images/mobile-app.png',
    'Pluto/images/pasta1.png',
    'Pluto/images/pasta2.png',
    'Pluto/images/pizza-icon.png',
    'Pluto/images/pizza1.png',
    'Pluto/images/pizza2.png',
    'Pluto/images/pluto1.png',
    'Pluto/images/salad-icon.png',
    'Pluto/images/special-offer.png',

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