/* CASA ACTIVA PWA 1.2 — assets locales; no alojamiento externo de imágenes. */
const EXERCISE_IMAGES={"squat":[{"width":396,"height":960,"src":"./assets/squat_0.webp"},{"width":396,"height":960,"src":"./assets/squat_1.webp"}],"dbrow":[{"width":470,"height":935,"src":"./assets/dbrow_0.webp"},{"width":470,"height":935,"src":"./assets/dbrow_1.webp"}],"floorpress":[{"width":680,"height":500,"src":"./assets/floorpress_0.webp"},{"width":680,"height":500,"src":"./assets/floorpress_1.webp"}],"curl":[{"width":600,"height":960,"src":"./assets/curl_0.webp"},{"width":600,"height":960,"src":"./assets/curl_1.webp"}],"press":[{"width":404,"height":960,"src":"./assets/press_0.webp"},{"width":404,"height":960,"src":"./assets/press_1.webp"}],"rower":[{"width":680,"height":747,"src":"./assets/rower_0.webp"},{"width":680,"height":747,"src":"./assets/rower_1.webp"}],"bike":[{"width":546,"height":960,"src":"./assets/bike_0.webp"},{"width":546,"height":960,"src":"./assets/bike_1.webp"}],"elliptical":[{"width":651,"height":960,"src":"./assets/elliptical_0.webp"},{"width":651,"height":960,"src":"./assets/elliptical_1.webp"}],"bridge":[{"width":680,"height":341,"src":"./assets/bridge_0.webp"},{"width":680,"height":341,"src":"./assets/bridge_1.webp"}]};
const IMAGE_PHASES={
 squat:['Preparación de pie','Descenso controlado'],
 dbrow:['Brazos extendidos','Codos hacia atrás'],
 floorpress:['Preparación: codos apoyados','Empuje: brazos arriba'],
 curl:['Barra abajo','Flexión de codos'],
 press:['Pesas junto a los hombros','Empuje hacia arriba'],
 rower:['Recogida','Final del tirón'],
 bike:['Pedalada · fase A','Pedalada · fase B'],
 elliptical:['Zancada · fase A','Zancada · fase B'],
 bridge:['Cadera apoyada','Elevación de la pelvis']
};
function hasRealisticImage(id){return Object.hasOwn(EXERCISE_IMAGES,id);}
function isLandscapeImage(id){return hasRealisticImage(id)&&EXERCISE_IMAGES[id][0].width>EXERCISE_IMAGES[id][0].height;}
function phaseLabel(id,phase){return IMAGE_PHASES[id]?.[phase?1:0]||(phase?'Movimiento / posición final':'Preparación / posición inicial');}
function visualNote(id){return hasRealisticImage(id)?'Ilustraciones realistas generadas con IA, no fotografías. Toca para ampliar. Pueden contener imprecisiones: revisa los pasos escritos y adapta el recorrido.':'Esquemas orientativos. Este ejercicio conserva por ahora la ilustración anterior. Toca para ampliar y revisa los pasos escritos.';}
function scene(id,phase=0,label=true){
 if(!hasRealisticImage(id))return schematicScene(id,phase,label);
 const n=phase?1:0,asset=EXERCISE_IMAGES[id][n];
 const alt=`${EX[id]?.name||id}: ${phaseLabel(id,n)}. Ilustración generada con IA.`;
 return `<span class="exercise-svg realistic-scene ${label?'captioned':''} ${isLandscapeImage(id)?'landscape':''}" data-exercise="${id}" data-phase="${n}"><img src="${asset.src}" alt="${esc(alt)}" width="${asset.width}" height="${asset.height}" decoding="async" draggable="false">${label?`<span class="scene-cue">${esc(phaseLabel(id,n))}</span>`:''}</span>`;
}
