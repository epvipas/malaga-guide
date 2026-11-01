const V = 'malaga-v1';
const CORE = ["vendor/leaflet.js", "vendor/leaflet.css", "./", "index.html", "data.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "favicon.png", "img/cover.svg", "img/e1.svg", "img/e10.svg", "img/e11.svg", "img/e12.svg", "img/e13.svg", "img/e14.svg", "img/e15.svg", "img/e16.svg", "img/e17.svg", "img/e18.svg", "img/e19.svg", "img/e2.svg", "img/e20.svg", "img/e21.svg", "img/e22.svg", "img/e23.svg", "img/e24.svg", "img/e25.svg", "img/e26.svg", "img/e27.svg", "img/e28.svg", "img/e29.svg", "img/e3.svg", "img/e30.svg", "img/e31.svg", "img/e32.svg", "img/e33.svg", "img/e34.svg", "img/e4.svg", "img/e5.svg", "img/e6.svg", "img/e7.svg", "img/e8.svg", "img/e9.svg", "img/hotel.svg", "img/nA.svg", "img/nB.svg", "img/nC.svg", "img/nD.svg", "img/nE.svg", "img/nF.svg", "img/s1.svg", "img/s10.svg", "img/s11.svg", "img/s12.svg", "img/s13.svg", "img/s14.svg", "img/s15.svg", "img/s16.svg", "img/s17.svg", "img/s18.svg", "img/s19.svg", "img/s2.svg", "img/s20.svg", "img/s21.svg", "img/s22.svg", "img/s23.svg", "img/s24.svg", "img/s25.svg", "img/s26.svg", "img/s3.svg", "img/s4.svg", "img/s5.svg", "img/s6.svg", "img/s7.svg", "img/s8.svg", "img/s9.svg", "img/transit.svg"];
const EXT = [];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE).then(() => Promise.all(EXT.map(u => c.add(u).catch(() => {}))))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V && k !== 'malaga-tiles').map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (u.hostname.endsWith('basemaps.cartocdn.com')) {
    // map tiles: cache as you browse so viewed areas work offline
    e.respondWith(caches.open('malaga-tiles').then(c => c.match(e.request).then(hit => {
      const net = fetch(e.request).then(r => { if (r.ok || r.type === 'opaque') c.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(hit => {
    const net = fetch(e.request).then(r => {
      if (r.ok && (u.origin === location.origin || u.hostname.includes('unpkg') || u.hostname.includes('fonts.g'))) caches.open(V).then(c => c.put(e.request, r.clone()));
      return r;
    }).catch(() => hit || caches.match('index.html'));
    return hit || net;
  }));
});
