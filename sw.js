const CACHE = "quizs02-7339c996b9";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon.svg", "IMAGES/crane.png", "IMAGES/crane.png", "IMAGES/crane.png", "IMAGES/crane.png", "IMAGES/crane.png", "IMAGES/crane.png", "IMAGES/crane.png", "IMAGES/crane.png", "IMAGES/crane.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
    }
    return res;
  })));
});
