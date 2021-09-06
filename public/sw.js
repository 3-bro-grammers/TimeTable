var CACHE_NAME = 'timetable';
var urlsToCache = [
  'index.html',
  'assets/logo.png',
  'assets/Madras_Institute_of_Technology_logo.png'
  ];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  });