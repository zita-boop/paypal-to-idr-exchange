const CACHE_NAME = "payrupiah-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/faq.html",
  "/term.html",
  "/disclaimer.html",
  "/trust.html",
  "/favicon.ico"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
