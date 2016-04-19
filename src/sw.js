var CACHE_VERSION = __webpack_hash__;
var OFFLINE_CACHE = 'OFFLINE-CACHE';

// Shorthand identifier mapped to specific versioned cache.

self.addEventListener('activate', function(event) {

  // Active worker won't be treated as activated until promise resolves successfully.
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_VERSION && cacheName !== OFFLINE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      ).then(self.clients.claim());
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'cors' && /\/api\//.test(event.request.url)) {
  // If it's cors and match  /api/ (probably data),
  // go to the network and if it fails retrieve from cache
  console.log('cors', event.request.url, event.request);

    var request = event.request;
    event.respondWith(
      fetch(request)
      .then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        return caches.open(OFFLINE_CACHE)
          .then((cache) => cache.put(
            event.request.url, networkResponse));
      })
      .catch(() => {
        // `fetch()` throws an exception when the server is unreachable but not
        // for valid HTTP responses, even `4xx` or `5xx` range.
        return caches.open(OFFLINE_CACHE).then(function(cache) {
          return cache.match(event.request);
        });
      })
    );
  } else {
    // If it's an asset or a same-origin file, first try to retrieve
    // from cache and otherwise get it from the network
    event.respondWith(

      // Opens Cache object
      caches.open(CACHE_VERSION).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          if (response) {
            return response;
          }

          return fetch(event.request.clone())
          .then(networkResponse => {

            // if response is “bad”,
            // just pass it back into the app
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // if response is ok, cache it and
            // give it back into the app
            caches.open(CACHE_VERSION)
              .then((cache) => cache.put(
                event.request, networkResponse.clone()));

            return networkResponse;
          });
        }).catch(function(error) {

          // Handles exceptions that arise from match() or fetch().
          throw error;
        });
      })
    );
  }

});
