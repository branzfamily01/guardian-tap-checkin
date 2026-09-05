const CACHE_NAME='guardian-tap-checkin-v6';
const APP_SHELL=['./','./index.html','./style.css?v=20260906-3','./app.js?v=20260906-3','./manual.html','./my-hub.json'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const req=event.request;
  const url=new URL(req.url);
  if(url.origin===location.origin){
    event.respondWith(fetch(req).then(response=>{
      const copy=response.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));
      return response;
    }).catch(async()=>{
      const cached=await caches.match(req);
      if(cached)return cached;
      if(req.mode==='navigate')return caches.match('./index.html');
      throw new Error('offline');
    }));
  }
});