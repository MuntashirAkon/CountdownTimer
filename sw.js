/**
 * SW.js - Service Worker
 */

importScripts('/cache-polyfill.min.js');


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('ADACT').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/app.js',
                '/js/jquery.min.js',
                '/js/bootstrap.min.js',
                '/main.css',
                '/css/bootstrap.min.css',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});