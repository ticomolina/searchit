const CACHE='bye-v1';
const CORE=["./", "index.html", "manifest.webmanifest", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-192.png", "icons/maskable-512.png", "th/01.webp", "th/02.webp", "th/03.webp", "th/04.webp", "th/05.webp", "th/06.webp", "th/07.webp", "th/08.webp", "th/09.webp", "th/10.webp", "th/11.webp", "th/12.webp", "th/13.webp", "th/14b.webp", "th/15.webp", "th/16.webp", "th/j-cover.webp", "th/j02.webp", "th/j03.webp", "th/j04.webp", "th/j05.webp", "th/j06.webp", "th/j07.webp", "th/j08.webp", "th/j09.webp", "th/j10.webp", "th/j11.webp", "th/j12.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(r.mode==='navigate'){ // la página: red primero (para ver actualizaciones), caché si no hay internet
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('./',cp));return res}).catch(()=>caches.match('./')));return}
  // imágenes, fuentes y demás: caché primero, y se guardan al usarlas
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res})));
});
