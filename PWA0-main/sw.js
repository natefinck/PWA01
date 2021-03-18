const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

//list of local resources we always want to be cached
const PRECACHE_URLS = [
  'index.html',
  './', //alias for index.html
  'css/style.css',
  'js/main.js',
  'images/hello-icon-128.png',
  'images/hello-icon-144.png',
  'images/hello-icon-152.png',
  'images/hello-icon-192.png',
  'images/hello-icon-256.png',
  'images/hello-icon-512.png',
  'images/hello-icon-196maskable.png',
  'sw.js'
];

//the install handler takes care of precaching our resources as directed
self.addEventListener('install', function(event) {
  event.waitUntil(
   caches.open(PRECACHE).then(function(cache) {
    return cache.addAll(PRECACHE_URLS);
   })
  )
});

//activate handler
self.addEventListener('activate', event => {
  console.log('service worker activating');
});

//fetch handler
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || getch(event.request);
    })
  );
});

