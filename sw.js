const V='pai-v6',CORE=['./','index.html','manifest.webmanifest','fonts/open-sans.woff2','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
const net=fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res});
if(r.mode==='navigate'){e.respondWith(net.catch(()=>caches.match('index.html').then(m=>m||caches.match('./'))));return}
e.respondWith(caches.match(r).then(m=>m?(net.catch(()=>{}),m):net))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncached:true}).then(l=>l.length?l[0].focus():clients.openWindow('./')))});
