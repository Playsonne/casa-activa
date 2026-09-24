/* CASA ACTIVA PWA 1.4.0. No libraries, analytics or data uploads. */
(() => {
 'use strict';
 const VERSION='1.4.0';
 const base=new URL('./',document.baseURI);
 const status=document.getElementById('pwa-status');
 const statusText=document.getElementById('pwa-status-text');
 const installButton=document.getElementById('pwa-install');
 const updateButton=document.getElementById('pwa-update');
 const dialog=document.getElementById('pwa-dialog');
 let installPrompt=null, registration=null, offlineReady=false, failure='', reloadRequested=false;
 let installed=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const notify=text=>window.CasaApp?.notify(text);
 const closeIcon='<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m6 6 12 12M6 18 18 6"/></svg>';
 function show(title,body){
  dialog.innerHTML=`<div class="modal-head"><h2 id="pwa-dialog-title">${escape(title)}</h2><button class="icon-btn" data-pwa-action="close" aria-label="Cerrar">${closeIcon}</button></div><div class="pwa-dialog-body">${body}</div>`;
  if(!dialog.open)dialog.showModal();
 }
 function renderStatus(){
  status.className='pwa-status'+(offlineReady?' ready':'')+(!navigator.onLine?' offline':'')+(failure?' warning':'');
  statusText.textContent=failure||(offlineReady?(navigator.onLine?'Lista para usar sin conexión':'Sin conexión · app disponible'):(navigator.onLine?'Preparando modo sin conexión…':'Sin red · abre antes la app con conexión'));
  installButton.hidden=installed;
  updateButton.hidden=!registration?.waiting;
 }
 async function readCacheStatus(){
  const worker=navigator.serviceWorker?.controller||registration?.active;
  if(!worker)return;
  try{
   const result=await new Promise((resolve,reject)=>{
    const channel=new MessageChannel();
    const timer=setTimeout(()=>{channel.port1.close();reject(Error('Tiempo agotado'));},5000);
    channel.port1.onmessage=ev=>{clearTimeout(timer);channel.port1.close();resolve(ev.data);};
    worker.postMessage({type:'STATUS'},[channel.port2]);
   });
   offlineReady=Boolean(result?.offlineReady);
   if(!offlineReady&&!failure)failure='Contenido sin conexión incompleto; vuelve a abrir con red';
   renderStatus();
  }catch{/* Status is informational. Never claim offline readiness on a timeout. */}
 }
 function help(){
  show('Tu app, también sin conexión',`
   <p>CASA ACTIVA se puede abrir con su enlace o instalar con su propio icono. No necesitas una cuenta de la app.</p>
   <div class="pwa-device"><strong>Estado en este navegador</strong><p>${escape(statusText.textContent)}</p></div>
   <h3>Para entrenar sin internet</h3><p>Abre la dirección publicada con conexión y espera a «Lista para usar sin conexión». Se guardan la app y las imágenes. Los enlaces a fuentes y vídeos externos siguen necesitando internet.</p>
   <p>El navegador puede liberar espacio. Conserva una copia de tu progreso desde <strong>Preferencias → Exportar</strong>. El modo sin conexión no es una copia de seguridad.</p>
   <h3>Instalar</h3>${installHelp()}
   <div class="pwa-dialog-actions"><button class="btn btn-light" data-pwa-action="share">Compartir enlace</button><button class="btn btn-primary" data-pwa-action="close">Entendido</button></div>
   <p class="pwa-version">CASA ACTIVA PWA ${VERSION} · Guardado local, sin sincronización entre dispositivos.</p>`);
 }
 function installHelp(){
  return `<div class="pwa-device"><strong>Android</strong><p>Abre el enlace en Chrome. Usa «Instalar app» o el menú del navegador → «Instalar aplicación» / «Añadir a pantalla de inicio». La opción depende del navegador y de que la app esté publicada.</p></div>
   <div class="pwa-device"><strong>iPhone / iPad</strong><p>Abre el enlace en Safari → Compartir → Añadir a pantalla de inicio. Activa «Abrir como app web» si aparece.</p></div>
   <div class="pwa-device"><strong>Ordenador</strong><p>En Chrome o Edge, usa el icono de instalación de la barra de direcciones o el menú del navegador. También puedes seguir usándola como web.</p></div>`;
 }
 async function install(){
  if(installed){help();return;}
  if(installPrompt){
   const prompt=installPrompt;installPrompt=null;
   try{await prompt.prompt();await prompt.userChoice;}catch{show('Instala CASA ACTIVA',installHelp());}
   renderStatus();
  }else{
   show('Instala CASA ACTIVA',`<p>La instalación se hace desde el navegador. Si has abierto el enlace dentro de WhatsApp u otra app, ábrelo primero en tu navegador habitual.</p>${installHelp()}<p>No hace falta instalarla para usarla o compartirla.</p><div class="pwa-dialog-actions"><button class="btn btn-primary" data-pwa-action="close">Entendido</button></div>`);
  }
 }
 function sharedURL(){return base.href;}
 function shareFallback(){
  show('Comparte tu espacio para entrenar',`<p>Este enlace comparte solo la app. No incluye tu nombre, peso, hábitos ni historial.</p><label class="field">Enlace público<input id="pwa-share-url" class="pwa-link" type="url" readonly value="${escape(sharedURL())}" autocomplete="off"></label><div class="pwa-dialog-actions"><button class="btn btn-light" data-pwa-action="close">Cerrar</button><button class="btn btn-primary" data-pwa-action="copy-link">Copiar enlace</button></div>`);
 }
 async function share(){
  if(!/^https?:$/.test(base.protocol)||['localhost','127.0.0.1','[::1]'].includes(base.hostname)){
   show('Publica primero la app',`<p>Esta dirección es una prueba local, no un enlace público. Al publicar la carpeta en GitHub Pages, «Compartir» utilizará automáticamente la dirección real de la app.</p><div class="pwa-dialog-actions"><button class="btn btn-primary" data-pwa-action="close">Entendido</button></div>`);return;
  }
  if(navigator.share){
   try{await navigator.share({title:'CASA ACTIVA',text:'Rutinas y ejercicios para entrenar en casa, a tu ritmo.',url:sharedURL()});return;}
   catch(e){if(e.name==='AbortError')return;}
  }
  shareFallback();
 }
 async function copyLink(){
  const input=document.getElementById('pwa-share-url');if(!input)return;
  try{await navigator.clipboard.writeText(input.value);notify('Enlace copiado. Puedes pegarlo en WhatsApp.');}
  catch{input.focus();input.select();let done=false;try{done=document.execCommand('copy');}catch{}notify(done?'Enlace copiado.':'Enlace seleccionado. Usa Copiar en el menú.');}
 }
 function update(){
  if(!registration?.waiting){notify('No hay una actualización preparada.');return;}
  const active=window.CasaApp?.hasActiveSession();
  show('Hay una nueva versión',`<p>${active?'Tu entrenamiento está en curso. Lo pausaremos y guardaremos antes de recargar. Después podrás reanudarlo.':'La nueva versión ya está preparada. Actualizar recargará la app; tus registros locales se conservan.'}</p><p>También puedes cerrar este aviso y actualizar al terminar.</p><div class="pwa-dialog-actions"><button class="btn btn-light" data-pwa-action="close">Más tarde</button><button class="btn btn-primary" data-pwa-action="apply-update">${active?'Guardar y actualizar':'Actualizar ahora'}</button></div>`);
 }
 async function applyUpdate(){
  if(!registration?.waiting){dialog.close();return;}
  if(!window.CasaApp?.prepareForReload()){
   show('Conserva antes tu progreso',`<p>El navegador no permite guardar los datos ahora. Cierra este aviso y exporta una copia desde Preferencias antes de recargar.</p><div class="pwa-dialog-actions"><button class="btn btn-primary" data-pwa-action="close">Entendido</button></div>`);return;
  }
  reloadRequested=true;
  registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});
  dialog.close();notify('Aplicando la actualización…');
 }
 document.addEventListener('click',event=>{
  const button=event.target.closest('[data-pwa-action]');if(!button)return;
  const handlers={install,share,help,update,'apply-update':applyUpdate,'copy-link':copyLink,close:()=>dialog.close()};
  Promise.resolve(handlers[button.dataset.pwaAction]?.()).catch(()=>notify('No se pudo completar esta acción. Puedes seguir usando la app.'));
 });
 window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;renderStatus();});
 window.addEventListener('appinstalled',()=>{installed=true;installPrompt=null;renderStatus();notify('CASA ACTIVA instalada.');});
 const display=matchMedia('(display-mode: standalone)');
 display.addEventListener?.('change',()=>{installed=display.matches||navigator.standalone===true;renderStatus();});
 window.addEventListener('online',()=>{renderStatus();registration?.update().catch(()=>{});readCacheStatus();});
 window.addEventListener('offline',renderStatus);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')readCacheStatus();});
 renderStatus();
 if(!('serviceWorker' in navigator)||!window.isSecureContext||!/^https?:$/.test(location.protocol)){
  failure='Publica con HTTPS para instalar y usar sin conexión';renderStatus();return;
 }
 navigator.serviceWorker.addEventListener('controllerchange',()=>{
  if(reloadRequested){location.reload();return;}
  readCacheStatus();
 });
 navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(reg=>{
  registration=reg;renderStatus();
  reg.addEventListener('updatefound',()=>{
   const worker=reg.installing;if(!worker)return;
   worker.addEventListener('statechange',()=>{
    if(worker.state==='installed')setTimeout(()=>{renderStatus();readCacheStatus();},100);
    if(worker.state==='redundant'&&!reg.active){failure='No se pudo preparar el modo sin conexión';renderStatus();}
   });
  });
  navigator.serviceWorker.ready.then(()=>readCacheStatus());
  reg.update().catch(()=>{});
 }).catch(()=>{failure='Modo sin conexión no disponible en este navegador';renderStatus();});
})();
