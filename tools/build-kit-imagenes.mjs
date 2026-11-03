// Arma el kit de imágenes de una landing: une los espacios (tools/espacios-imagenes.mjs) con la ficha
// visual y los prompts, arma el prompt final de cada espacio y genera la página de revisión.
// Versión 2 (kit.version = 2): prompts en español para usar a mano en ChatGPT, divididos en partes
// (escena y persona por imagen; ficha, producto y reglas para toda la landing) con historial de cambios.
// Uso: node tools/build-kit-imagenes.mjs imagenes-ia/estufa-espacios.json imagenes-ia/estufa-prompts.json salida.html
import fs from 'node:fs';

const [fEspacios, fPrompts, salida] = process.argv.slice(2);
const espacios = JSON.parse(fs.readFileSync(fEspacios, 'utf8'));
const kit = JSON.parse(fs.readFileSync(fPrompts, 'utf8'));
const banco = JSON.parse(fs.readFileSync(new URL('../avatares/banco.json', import.meta.url), 'utf8')).avatares;
const avatar = kit.avatar ? banco[kit.avatar] : null;
if (kit.avatar && !avatar) throw new Error(`El avatar "${kit.avatar}" no está en avatares/banco.json`);
const refsAvatar = avatar ? Object.values(avatar.referencias).filter(Boolean) : [];
// Un espacio puede usar otro avatar del banco con su propio campo "avatar" (varios personajes en una landing).
const avDe = (p) => {
  const id = (p && p.avatar) || kit.avatar;
  if (id && !banco[id]) throw new Error(`El avatar "${id}" no está en avatares/banco.json`);
  return id ? banco[id] : null;
};
const refsDe = (a) => (a ? Object.values(a.referencias).filter(Boolean) : []);
const esHombre = (a) => a && a.genero === 'hombre';
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const faltan = espacios.filter((e) => !kit.espacios[e.id]).map((e) => e.id);
const sobran = Object.keys(kit.espacios).filter((id) => !espacios.some((e) => e.id === id));
if (faltan.length) console.warn('Sin prompt:', faltan.join(', '));
if (sobran.length) console.warn('Prompts sin espacio en la plantilla:', sobran.join(', '));

// Prompt final que se envía al generador.
export const promptFinal = (e, p) => [
  kit.estilo_en,
  p.producto ? kit.producto_en : '',
  p.persona && avDe(p) ? `The ${esHombre(avDe(p)) ? 'man' : 'woman'} must be exactly the same person as in the attached character reference photos (${avDe(p).descripcion_en}) — same face, skin tone, hair and build.` : '',
  p.prompt,
  `Aspect ratio ${e.proporcion.replace(/\s/g, '')}.`,
  kit.reglas_en,
].filter(Boolean).join(' ');

// ChatGPT genera cuadrada, vertical u horizontal; el resto se recorta después.
const FORMATO_CHATGPT = (p) => {
  const [a, b] = p.split('/').map(Number);
  if (a === b) return { pedir: 'cuadrada (1:1)', recorte: '' };
  return a < b ? { pedir: 'vertical (2:3)', recorte: p === '2/3' ? '' : `recórtala a ${p.replace('/', ':')}` } : { pedir: 'horizontal (3:2)', recorte: p === '3/2' ? '' : `recórtala a ${p.replace('/', ':')}` };
};
const adjuntosDe = (p) => [p.producto ? 'la foto del producto' : '', p.persona && avDe(p) ? `la foto de ${avDe(p).nombre}` : '', ...(p.adjuntar || [])].filter(Boolean);
const promptV2 = (e, p) => {
  const f = FORMATO_CHATGPT(e.proporcion.replace(/\s/g, ''));
  const adj = adjuntosDe(p);
  return [
    adj.length ? `Usa como referencia ${adj.join(' y ')} que te adjunto.` : '',
    p.producto ? `Producto: ${kit.producto}` : '',
    p.persona && avDe(p) ? `Persona: debe ser exactamente ${esHombre(avDe(p)) ? 'el mismo hombre' : 'la misma mujer'} de la foto adjunta (${avDe(p).descripcion.replace(/\.$/, "")}), con la misma cara, tono de piel, cabello y contextura. ${p.persona_accion || ''}`.trim() : '',
    `Escena: ${p.escena}`,
    `Ambiente: ${p.ambiente ? p.ambiente : Object.entries(kit.ficha).filter(([k]) => !(p.sin_escenario && k === 'escenario')).map(([, v]) => v).join(' ')}`,
    `Formato: imagen ${f.pedir}.${kit.archivo ? ` Cuando la imagen esté lista, conviértela y entrégamela como archivo ${kit.archivo.toUpperCase()} para descargar.` : ''}`,
    `Reglas: ${kit.reglas}`,
  ].filter(Boolean).join('\n\n');
};
const V2 = kit.version === 2;
const items = espacios.map((e) => {
  const p = kit.espacios[e.id];
  if (!p) return { ...e, final: '' };
  const extra = V2 ? { formato: FORMATO_CHATGPT(e.proporcion.replace(/\s/g, '')), adjuntos: adjuntosDe(p) } : {};
  return { ...e, ...p, ...extra, final: V2 ? promptV2(e, p) : promptFinal(e, p) };
});
fs.writeFileSync(fPrompts.replace(/-prompts\.json$/, '-final.json'), JSON.stringify(items.map(({ n, id, proporcion, pixeles, producto, persona, final }) => ({ n, id, proporcion, pixeles, producto: !!producto, avatar: persona ? ((kit.espacios[id] || {}).avatar || kit.avatar) : null, referencias_avatar: persona ? refsDe(avDe(kit.espacios[id])) : [], prompt: final })), null, 2) + '\n');

const grupos = [];
for (const it of items) {
  let g = grupos.find((x) => x.seccion === it.seccion);
  if (!g) grupos.push(g = { seccion: it.seccion, titulo: it.titulo_seccion, items: [] });
  g.items.push(it);
}
const fichaV = V2 ? { ...kit.ficha, producto: kit.producto, reglas: kit.reglas } : kit.ficha;
const ficha = Object.entries(fichaV).map(([k, v]) => `<div class="f"><b>${esc(k[0].toUpperCase() + k.slice(1))}</b><p>${esc(v)}</p></div>`).join('');
const idsUsados = [...new Set(items.filter((it) => it.persona && it.final).map((it) => it.avatar || kit.avatar).filter(Boolean))];
if (kit.avatar && !idsUsados.includes(kit.avatar)) idsUsados.unshift(kit.avatar);
const bloqueAvatar = idsUsados.map((id) => {
  const a = banco[id];
  const refs = Object.entries(a.referencias).map(([k, v]) => `<figure>${v ? `<img src="${esc(v)}" alt="">` : '<div class="vacio">Pendiente</div>'}<figcaption>${esc(k.replace('_', ' '))}</figcaption></figure>`).join('');
  return `<div class="avatar"><h2>Avatar: ${esc(a.nombre)} <small>${esc(id)} · ${esc(a.estado)}</small></h2><p>${esc(a.descripcion)}</p><div class="refs">${refs}</div>${refsDe(a).length ? '' : '<p class="aviso">Sin fotos de referencia todavía: las imágenes con este avatar no se generan hasta crear y aprobar el avatar.</p>'}</div>`;
}).join('');
const tarjetas = grupos.map((g) => `
<section class="grupo">
  <h2>${esc(g.seccion)}${g.titulo ? `<small>${esc(g.titulo)}</small>` : ''}</h2>
  ${g.items.map((it) => `
  <article class="card${it.final ? '' : ' falta'}">
    <div class="top"><span class="n">${it.n}</span><div><h3>${esc(it.donde)}${(it.historial || []).length ? ' <span class="mod">Modificada</span>' : ''}</h3>
      <div class="chips"><span>${esc(it.proporcion.replace(/\s/g, ''))}</span>${it.pixeles ? `<span>${esc(it.pixeles)} px</span>` : ''}${it.producto ? '<span class="ref">Con foto del producto</span>' : ''}${it.persona && avDe(it) ? `<span class="ref">Con ${esc(avDe(it).nombre)}</span>` : ''}</div></div></div>
    <p class="que">${esc(it.que || 'Falta el prompt de este espacio.')}</p>
    ${V2 && it.final ? `<dl class="partes"><dt>Escena</dt><dd>${esc(it.escena)}</dd>${it.persona && it.persona_accion ? `<dt>Persona</dt><dd>${esc(it.persona_accion)}</dd>` : ''}<dt>Formato</dt><dd>Pide la imagen ${esc(it.formato.pedir)}${it.formato.recorte ? ` y ${esc(it.formato.recorte)}` : ''}${kit.archivo ? `, en archivo ${esc(kit.archivo.toUpperCase())}` : ''}.</dd><dt>Adjuntar</dt><dd>${it.adjuntos.length ? esc(it.adjuntos.join(' + ')) : 'Nada'}</dd></dl>` : ''}
    ${(it.historial || []).length ? `<ul class="hist">${it.historial.map((h) => `<li><b>${esc(h.fecha)}</b> · ${esc(h.parte)}: ${esc(h.cambio)}</li>`).join('')}</ul>` : ''}
    ${it.final ? `<details><summary>Ver prompt completo</summary><pre>${esc(it.final)}</pre><button data-copy="${esc(it.final)}">Copiar</button></details>` : ''}
  </article>`).join('')}
</section>`).join('');

fs.writeFileSync(salida, `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kit imágenes ${esc(kit.landing)}</title>
<style>
:root{--bg:#faf6f1;--card:#fff;--tx:#2a2624;--tx2:#6f6560;--ac:#c2562b;--suave:#f6e6dc;--borde:#eadfd5}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#1c1a19;--card:#262321;--tx:#f2ece7;--tx2:#b5aaa3;--ac:#e07a4f;--suave:#3a2a22;--borde:#3a3431}}
:root[data-theme="dark"]{--bg:#1c1a19;--card:#262321;--tx:#f2ece7;--tx2:#b5aaa3;--ac:#e07a4f;--suave:#3a2a22;--borde:#3a3431}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
.wrap{max-width:860px;margin:0 auto;padding:24px 16px 64px}
h1{font-size:26px;margin:0 0 4px}.sub{color:var(--tx2);margin:0 0 20px}
.resumen{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px}.resumen span{background:var(--suave);color:var(--ac);font-weight:700;font-size:13px;padding:4px 10px;border-radius:99px}
.ficha{background:var(--card);border:1px solid var(--borde);border-radius:16px;padding:16px;display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));margin-bottom:28px}
.ficha h2{grid-column:1/-1;margin:0;font-size:18px}.f b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--ac)}.f p{margin:2px 0 0;color:var(--tx2);font-size:14px}
.avatar{background:var(--card);border:1px solid var(--borde);border-radius:16px;padding:16px;margin-bottom:28px}.avatar h2{margin:0 0 6px;font-size:18px}.avatar h2 small{font-weight:400;color:var(--tx2);font-size:13px}.avatar p{margin:0 0 12px;color:var(--tx2);font-size:14px}
.refs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.refs figure{margin:0}.refs img,.vacio{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:10px;background:var(--suave)}.vacio{display:grid;place-items:center;color:var(--ac);font-size:12px;font-weight:700}.refs figcaption{font-size:11px;text-align:center;color:var(--tx2);margin-top:4px;text-transform:capitalize}.aviso{color:var(--ac)!important;font-weight:600;margin:12px 0 0!important}
.grupo h2{font-size:18px;margin:28px 0 10px;display:flex;flex-direction:column}.grupo h2 small{font-weight:400;color:var(--tx2);font-size:14px}
.card{background:var(--card);border:1px solid var(--borde);border-radius:14px;padding:14px;margin-bottom:10px}.card.falta{border-color:#d33}
.top{display:flex;gap:12px;align-items:flex-start}.n{flex:0 0 34px;height:34px;border-radius:50%;background:var(--ac);color:#fff;font-weight:800;display:grid;place-items:center}
h3{margin:4px 0 6px;font-size:15px}.chips{display:flex;gap:6px;flex-wrap:wrap}.chips span{font-size:12px;border:1px solid var(--borde);border-radius:99px;padding:1px 8px;color:var(--tx2)}.chips .ref{border-color:var(--ac);color:var(--ac)}
.que{margin:10px 0 0}.mod{font-size:11px;background:var(--ac);color:#fff;border-radius:99px;padding:1px 8px;vertical-align:middle}
.partes{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;margin:10px 0 0;font-size:14px}.partes dt{font-weight:700;color:var(--ac)}.partes dd{margin:0;color:var(--tx2)}
.hist{margin:10px 0 0;padding:8px 10px 8px 26px;background:var(--suave);border-radius:10px;font-size:13px}details{margin-top:8px}summary{cursor:pointer;color:var(--ac);font-weight:600}
pre{white-space:pre-wrap;word-break:break-word;background:var(--bg);border:1px solid var(--borde);border-radius:10px;padding:10px;font-size:12.5px;margin:8px 0}
button{background:var(--ac);color:#fff;border:0;border-radius:10px;padding:8px 14px;font-weight:700;cursor:pointer}
</style></head><body><div class="wrap">
<h1>Kit de imágenes · ${esc(kit.landing)}</h1>
<p class="sub">${V2 ? 'Para hacer a mano en ChatGPT, en una misma conversación y en este orden. Para cambiar algo, indica el número de la imagen y la parte (escena, persona o formato).' : 'Espacios sacados de la plantilla, en el orden en que aparecen en el personalizador. Revisa los prompts antes de generar.'}</p>
<div class="resumen"><span>${items.length} imágenes</span><span>${items.filter((i) => i.producto).length} con foto del producto</span>${faltan.length ? `<span>${faltan.length} sin prompt</span>` : ''}</div>
<div class="ficha"><h2>Ficha visual</h2>${ficha}</div>
${bloqueAvatar}
${tarjetas}
</div>
<script>document.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(!b)return;navigator.clipboard.writeText(b.dataset.copy).then(()=>{b.textContent='Copiado';setTimeout(()=>b.textContent='Copiar',1500)}).catch(()=>{})});</script>
</body></html>`);
console.log(`OK → ${salida} (${items.length} espacios${faltan.length ? `, ${faltan.length} sin prompt` : ''})`);
