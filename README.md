# CASA ACTIVA · PWA 1.2

Aplicación estática de ejercicios en casa, pensada para móvil y adaptable a ordenador. Lista para publicar en **GitHub Pages**; no requiere Node, compilación, servidor propio ni una cuenta dentro de la app.

**Estado de esta entrega:** archivos preparados, sin repositorio creado ni web publicada desde esta conversación. La instalación real y la comprobación sin conexión en los dispositivos finales quedan pendientes de la publicación.

## Contenido

Se conserva la biblioteca de la versión 1.1: 18 ejercicios y 9 rutinas, con fichas de técnica, temporizador, favoritos, hábitos, historial, peso opcional y exportación/importación de progreso. **9 ejercicios tienen imágenes realistas generadas con IA y 9 conservan sus esquemas anteriores.** Esta actualización convierte la app en PWA; no completa los modelos restantes.

La PWA añade:

- Manifest e iconos para instalación en navegadores compatibles.
- Caché local de la app y las 18 imágenes WebP, una vez terminada la primera carga con conexión.
- Botones de instalar, compartir enlace y aplicar una actualización disponible.
- Aviso de estado sin conexión y ayuda de instalación.
- Actualizaciones que esperan a una confirmación. Una sesión activa se pausa y se guarda antes de recargar, siempre que el navegador permita guardar.

No ofrece cuentas, sincronización, notificaciones push, alarmas garantizadas con la pantalla bloqueada ni evaluación automática de técnica.

## Publicar desde la web de GitHub

1. En tu cuenta **Playsonne**, crea un repositorio llamado **casa-activa**. Elige **Public** y activa **Add README** para inicializarlo. El código y los archivos del repositorio quedarán visibles; no subas datos personales.
2. Descomprime el ZIP de esta entrega. En el repositorio, abre **Add file → Upload files**. Arrastra el **contenido** de la carpeta descomprimida: `index.html`, los demás archivos y las carpetas `assets`, `icons` y `tools`. No subas el ZIP ni una carpeta contenedora que deje `index.html` un nivel más abajo.
3. Confirma la subida en la rama `main`. Es normal sustituir el README inicial por el de la app.
4. Abre **Settings → Pages**. En **Build and deployment**, elige **Deploy from a branch**. Selecciona `main` y `/(root)`. Pulsa **Save**.
5. Espera al despliegue y abre **Visit site** en esa misma pantalla. Con la dirección estándar de Pages, el enlace previsto será `https://playsonne.github.io/casa-activa/`. No se considera publicado hasta que GitHub lo confirme.
6. Abre ese enlace, espera al indicador **Lista para usar sin conexión**, y comprueba una rutina, una ficha y el guardado de un favorito. Después activa el modo avión y vuelve a abrir la app. Los enlaces a fuentes o vídeos externos necesitan internet.
7. En Android abre el enlace en Chrome y usa **Instalar app** o la opción del menú de instalación. En iPhone/iPad, Safari → Compartir → Añadir a pantalla de inicio. En ordenador, Chrome o Edge ofrecen instalación desde su menú o barra de direcciones. Las opciones dependen del navegador; la web funciona también sin instalar.

GitHub Pages admite repositorios públicos con GitHub Free, dentro de sus condiciones y límites. La dirección `github.io` usa HTTPS, necesario para el service worker en producción. Un archivo abierto con doble clic no reproduce una instalación PWA ni el modo sin conexión.

## Compartir y conservar el progreso

El botón Compartir usa la dirección publicada, sin añadir el nombre, peso ni historial. En navegadores compatibles abre el panel de compartir; de lo contrario muestra el enlace para copiarlo. La app no exige una cuenta de GitHub a sus visitantes.

El progreso vive en `localStorage` del navegador y se separa por ruta de publicación. No se envía al repositorio. La caché del service worker contiene solo archivos públicos de la app, no las copias de seguridad ni los registros del usuario. Otras personas con acceso al mismo perfil del navegador podrían acceder al progreso.

**Para trasladar datos desde el HTML anterior o Google Sites:** abre la versión antigua → Preferencias → Exportar; abre la nueva dirección → Preferencias → Importar. Se mantiene el formato de copias de CASA ACTIVA v1. No se transfiere automáticamente el almacenamiento entre orígenes distintos. La instalación puede usar un contexto de almacenamiento distinto según el navegador; conserva siempre una copia antes de trasladarte.

**Nunca subas las copias JSON personales a un repositorio público.** Compártelas únicamente cuando quieras entregar esos datos a otra persona. GitHub Pages y las webs externas mantienen sus propias políticas, incluida la recogida de información técnica de las visitas por el alojamiento.

## Actualizar la aplicación

Los archivos son editables. Tras cambiar HTML, JS, CSS, manifest, iconos o imágenes, ejecuta desde la carpeta del proyecto:

```sh
python tools/update_cache.py
```

El script no tiene dependencias externas: calcula una nueva versión de caché a partir del contenido y regenera `sw.js`. Sube los archivos modificados y `sw.js` en el mismo cambio. No es necesario ejecutarlo para publicar este ZIP por primera vez: ya está preparado.

Cuando una versión nueva esté descargada, aparecerá **Actualizar**. La app no recarga por sí sola una sesión activa. Si no se pulsa ese botón, el navegador también puede activar la nueva versión al cerrar todas las ventanas de la app y volver a abrirla.

Si el navegador libera la caché, habrá que cargar de nuevo la aplicación con internet. El modo sin conexión no sustituye la exportación del progreso.

## Estructura

```text
index.html               Entrada de la app (debe quedar en la raíz publicada)
styles.css / pwa.css      Diseño y controles de PWA
app.js                   Interfaz, entrenamientos y guardado local
data.js                  Ejercicios, rutinas, hábitos y fuentes
illustrations.js         Esquemas vectoriales originales
realistic.js             Referencias a las fotografías simuladas
assets/                  Imágenes WebP locales y sus dimensiones
icons/                   Iconos de aplicación y de instalación
manifest.webmanifest     Metadatos de instalación
sw.js                    Caché local y ciclo de actualización
tools/update_cache.py    Regeneración de la versión de caché
tools/sw.template.js     Plantilla del service worker
.nojekyll                Publicación estática sin Jekyll
```

## Comprobaciones realizadas

- Sintaxis de todos los archivos JavaScript, manifiesto, rutas y tamaños de iconos.
- Interfaz en Chromium, con los recursos en memoria: navegación, las 18 fichas, ampliación, favoritos, entrenamiento guiado y ayuda. Sin errores de JavaScript; sin desbordamiento horizontal entre 320 y 1365 píxeles.
- Pruebas unitarias del service worker en Node con caché y red simuladas: 34 recursos, respuestas sin red, aislamiento por ruta, exclusión de enlaces externos y copias personales, conservación de la versión anterior ante un fallo y activación explícita de una actualización.
- El navegador de prueba no permite navegar a direcciones web en este entorno. **No se ha verificado aquí una instalación real ni el service worker sobre GitHub Pages.** Compruébalos siguiendo el paso 6 después del despliegue.

## Uso responsable

Contenido educativo general, no una prescripción individual. Las ilustraciones generadas con IA pueden contener imprecisiones y no acreditan una técnica correcta. Sigue las instrucciones, usa una carga controlable y consulta la sección de seguridad. Esta entrega no modifica las recomendaciones de salud de la versión 1.1 ni añade promesas de pérdida de peso.

## Referencias de publicación y PWA

- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Fuente de publicación: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- HTTPS: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- Instalación PWA: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
- Service workers: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
- Datos técnicos del alojamiento: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
