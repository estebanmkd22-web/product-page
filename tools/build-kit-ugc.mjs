// Arma el kit de un guion UGC (skill guion-ugc): valida el guion y genera la página para copiar los prompts.
// Falla si hay textos prohibidos (cerebro de Esteban + «No se debe prometer» del brief) o si el avatar no
// está en el banco; avisa si una línea pasa el presupuesto de palabras, si falta la duración, etc.
// Uso: node tools/build-kit-ugc.mjs copy/<producto>/ugc/<etapa>-<n>.json salida.html
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [entrada, salida] = process.argv.slice(2);
if (!entrada || !salida) { console.error('Uso: node tools/build-kit-ugc.mjs guion.json salida.html'); process.exit(1); }
const g = JSON.parse(fs.readFileSync(path.resolve(entrada), 'utf8'));
const banco = JSON.parse(fs.readFileSync(path.join(ROOT, 'avatares/banco.json'), 'utf8')).avatares;
const avatar = banco[g.avatar];
const errores = [], avisos = [];
if (!avatar) errores.push(`El avatar "${g.avatar}" no está en avatares/banco.json`);

// 1. Textos prohibidos en todo anuncio (agentes-ecommerce/cerebro/anuncios.md).
const PROHIBIDOS = [
  [/pag(o|as|a|ar|ás)\s+(al|cuando)\s+(recib|te\s+lleg|llegue)/i, 'pago al recibir'],
  [/contra\s*-?\s*entrega/i, 'contraentrega'],
  [/pag(o|as|a|ás)\s+en\s+(tu\s+)?casa/i, 'pago en casa'],
  [/env[ií]o\s+(express\s+)?(gratis|sin\s+costo|incluido)/i, 'envío gratis'],
  [/(despacho|domicilio)\s+gratis/i, 'envío gratis'],
  [/te\s+lo[s]?\s+enviamos\s+gratis/i, 'envío gratis'],
  [/whats\s*app/i, 'WhatsApp'],
  [/¿\s*sufres/i, '«¿Sufres…?» (política de Meta)'],
  [/antes\s+y\s+despu[eé]s/i, '«antes y después» (se muestra, no se dice)'],
];
// 2. Lo que el brief dice que no se promete (líneas bajo «No se debe prometer»).
const brief = path.join(ROOT, 'briefs', `${g.slug}.md`);
const NO_PROMETER = [];
if (fs.existsSync(brief)) {
  const b = fs.readFileSync(brief, 'utf8');
  const m = b.match(/No se debe prometer[^\n]*\n((?:\s+-[^\n]*\n)+)/i);
  if (m) for (const l of m[1].split('\n')) {
    const t = l.replace(/^\s*-\s*/, '').replace(/\[.*?\]|\(.*?\)|;|\.$/g, '').replace(/["“”]/g, '').trim();
    if (t.length > 3) NO_PROMETER.push(t.split(' sin ')[0].trim());
  }
} else avisos.push(`No encontré briefs/${g.slug}.md: no pude revisar «No se debe prometer».`);

const textos = [];
const recoger = (donde, v) => { if (typeof v === 'string') textos.push([donde, v]); };
recoger('estrategia', g.estrategia);
(g.escenas || []).forEach((e) => ['visual', 'dialogo', 'frame_inicial', 'frame_final', 'video'].forEach((k) => recoger(`Escena ${e.n} · ${k}`, e[k])));
(g.broll || []).forEach((b, i) => ['imagen', 'video', 'capcut', 'objetivo'].forEach((k) => recoger(`B-roll ${i + 1} · ${k}`, b[k])));
(g.variaciones || []).forEach((v, i) => recoger(`Variación ${i + 1}`, v));
(g.edicion || []).forEach((v, i) => recoger(`Edición ${i + 1}`, v));
if (g.copy_meta) Object.entries(g.copy_meta).forEach(([k, v]) => recoger(`Copy Meta · ${k}`, v));
for (const [donde, t] of textos) {
  for (const [re, nombre] of PROHIBIDOS) if (re.test(t)) errores.push(`${donde}: texto prohibido (${nombre})`);
  for (const np of NO_PROMETER) {
    const afirmado = new RegExp(np.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    if (afirmado.test(t) && !/\b(no|nunca|sin)\b[^.]{0,20}$/i.test(t.split(afirmado)[0])) errores.push(`${donde}: promete algo que el brief prohíbe («${np}»)`);
  }
}

// 3. Estructura y ritmo.
const escenas = g.escenas || [];
if (escenas.length < 1) errores.push('El guion no tiene escenas.');
if ((g.broll || []).length < escenas.length) errores.push(`Hay ${escenas.length} escenas y solo ${(g.broll || []).length} B-roll (deben ser 1 a 1).`);
let total = 0;
for (const e of escenas) {
  const palabras = (e.dialogo || '').split(/\s+/).filter(Boolean).length;
  const tope = Math.round((e.segundos_dialogo || 6) * 2.4);
  if (palabras > tope) avisos.push(`Escena ${e.n}: el diálogo tiene ${palabras} palabras; el tope para ${e.segundos_dialogo || 6} s es ${tope}. Córtalo.`);
  const d = String(e.video || '').match(/^Duración:\s*(\d+(?:[.,]\d+)?)\s*s/i);
  if (!d) errores.push(`Escena ${e.n}: el video prompt no empieza con «Duración: Ns.»`);
  else { const s = parseFloat(d[1].replace(',', '.')); if (s > 8) errores.push(`Escena ${e.n}: dura ${s} s (máximo 8).`); total += s; }
  if (avatar && !String(e.video || '').includes(`${avatar.nombre} mira a cámara y dice: '`)) avisos.push(`Escena ${e.n}: el video prompt no tiene «${avatar.nombre} mira a cámara y dice: '…'» (sincronización de labios).`);
  if (e.n === 1 && !e.frame_inicial) errores.push('Escena 1: necesita su frame inicial propio.');
  if (e.n > 1 && e.frame_inicial) avisos.push(`Escena ${e.n}: el frame inicial debe ser el final de la escena anterior; lo dejo como continuidad.`);
}
(g.broll || []).forEach((b, i) => {
  if (!/^Duración:\s*\d/i.test(b.video || '')) errores.push(`B-roll ${i + 1}: el video no empieza con «Duración: Ns.»`);
  if (/dice:\s*'/i.test(b.video || '')) errores.push(`B-roll ${i + 1}: tiene diálogo (el B-roll no lleva personas hablando).`);
});
if (total && total < 30) avisos.push(`El anuncio dura ${total} s; el mínimo es 30 s.`);
if (avatar && g.personaje && !g.personaje.includes(avatar.descripcion)) avisos.push('El personaje no usa la descripción del banco palabra por palabra.');
const PROHIBIDO_CINE = /cinematogr|anam[oó]rf|grano de pel|speed ramp|whip pan|dolly|steadicam|gimbal|holand|color grade|\bLUT\b|bokeh|[eé]pico|impresionante/i;
for (const [donde, t] of textos) if (/frame|video|imagen/.test(donde) && PROHIBIDO_CINE.test(t)) avisos.push(`${donde}: usa una palabra de la lista anti-cinematográfica.`);

avisos.forEach((a) => console.warn('⚠️ ', a));
if (errores.length) { errores.forEach((e) => console.error('❌', e)); console.error(`\n${errores.length} error(es): corrige el guion antes de entregarlo.`); process.exit(1); }

// 4. Página.
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const bloque = (titulo, texto, nota) => `<div class="blk"><div class="blk-h"><b>${esc(titulo)}</b><button type="button" data-copy="${esc(texto)}">Copiar</button></div><pre>${esc(texto)}</pre>${nota ? `<p class="nota">${esc(nota)}</p>` : ''}</div>`;
const refAvatar = avatar?.referencias?.frente || '';
const escenasHtml = escenas.map((e) => `
<article class="esc" id="escena-${e.n}">
  <header><span class="tag">Escena ${e.n} · ${esc(e.rango)}</span><h3>${esc(e.tipo)}</h3><p class="meta">${esc(e.funcion)}</p></header>
  <p class="visual">${esc(e.visual)}</p>
  <p class="dialogo"><b>${esc(avatar?.nombre || 'Personaje')} dice:</b> “${esc(e.dialogo)}”</p>
  ${e.n === 1 ? bloque('Frame inicial 1', e.frame_inicial, e.apoyo_inicial) : '<p class="cont"><b>Frame inicial:</b> usar el frame final de la escena anterior como punto de partida visual.</p>'}
  ${bloque(`Frame final ${e.n}`, e.frame_final, e.apoyo_final)}
  ${bloque(`Video prompt ${e.n}`, e.video)}
</article>`).join('');
const brollHtml = (g.broll || []).map((b, i) => `
<article class="esc broll">
  <header><span class="tag">B-roll ${i + 1} · después de la escena ${esc(b.despues_de)}</span><p class="meta">Sincroniza con: ${esc(b.sincroniza)}</p></header>
  ${bloque(`Imagen B-roll ${i + 1}`, b.imagen, b.apoyo)}
  ${bloque(`Video B-roll ${i + 1}`, b.video)}
  <p class="nota"><b>CapCut:</b> ${esc(b.capcut)} · <b>Objetivo:</b> ${esc(b.objetivo)}</p>
</article>`).join('');
const lista = (arr) => (arr || []).length ? `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '';
const cm = g.copy_meta;
const html = `<title>UGC ${esc(g.producto)} ${esc(g.etapa)}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap">
<style>
/* Layout: ficha del guion arriba, escenas en orden de tiempo, B-roll y edición al final */
:root{--bg:#f3f2ef;--card:#fff;--tx:#1c1b19;--tx2:#5f5a53;--borde:#e0dcd5;--ac:#b24f1c;--soft:#f5e4d9;--ok:#2f7a4f;
--display:"Archivo",system-ui,sans-serif;--text:"Inter",system-ui,sans-serif;--mono:"JetBrains Mono",ui-monospace,monospace}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#151413;--card:#1f1d1b;--tx:#f0ede8;--tx2:#a39c92;--borde:#35312d;--ac:#ec8048;--soft:#3a2418;--ok:#6cc392;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#151413;--card:#1f1d1b;--tx:#f0ede8;--tx2:#a39c92;--borde:#35312d;--ac:#ec8048;--soft:#3a2418;--ok:#6cc392;color-scheme:dark}
body{background:var(--bg);color:var(--tx);font-family:var(--text);font-size:15px;line-height:1.55}
.wrap{max-width:900px;margin:0 auto;padding-block:28px 64px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:22px}
h1{font-family:var(--display);font-weight:800;font-size:clamp(26px,5vw,38px);line-height:1.1;margin:0;text-wrap:balance}
h1 em{font-style:normal;color:var(--ac)}h2{font-family:var(--display);font-size:21px;margin:12px 0 0;border-top:2px solid var(--tx);padding-top:12px}
h3{font-family:var(--display);font-size:18px;margin:0}
.ficha{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px 18px;background:var(--card);border:1px solid var(--borde);border-radius:14px;padding:16px}
.ficha div{min-width:0}.ficha b{display:block;font-size:11px;letter-spacing:.07em;text-transform:uppercase;color:var(--ac)}.ficha p{margin:2px 0 0}
.avatar{display:flex;gap:14px;align-items:center}.avatar img{width:72px;height:72px;object-fit:cover;border-radius:50%;border:2px solid var(--ac)}
.esc{display:grid;gap:10px;background:var(--card);border:1px solid var(--borde);border-radius:14px;padding:16px;min-width:0}
.esc header{display:grid;gap:2px}.tag{font-family:var(--display);font-weight:600;font-size:12px;letter-spacing:.07em;text-transform:uppercase;color:var(--ac)}
.meta,.nota{margin:0;font-size:13px;color:var(--tx2)}.visual{margin:0}.dialogo{margin:0;background:var(--soft);border-radius:10px;padding:10px 12px;font-size:16px}
.cont{margin:0;font-size:14px;color:var(--tx2)}
.blk{display:grid;gap:6px;min-width:0}.blk-h{display:flex;justify-content:space-between;align-items:center;gap:8px}.blk-h b{font-size:14px}
pre{margin:0;white-space:pre-wrap;word-break:break-word;font-family:var(--mono);font-size:13px;background:var(--bg);border:1px solid var(--borde);border-radius:10px;padding:12px;max-height:340px;overflow:auto}
button{font:inherit;font-size:13px;font-weight:500;cursor:pointer;border:1px solid var(--borde);background:var(--card);color:var(--tx);border-radius:8px;padding:5px 10px}
button:hover{border-color:var(--ac)}button:focus-visible{outline:2px solid var(--ac);outline-offset:2px}button.done{border-color:var(--ok);color:var(--ok)}
ul{margin:0;padding-left:20px}.rev{font-weight:600}.rev.ok{color:var(--ok)}
</style>
<div class="wrap">
<header style="display:grid;gap:8px">
  <h1>Guion UGC · <em>${esc(g.producto)}</em></h1>
  <p class="meta">${esc(g.tienda)} · ${esc(g.etapa)} · ${esc(g.estilo)} · ${escenas.length} escenas · ${total} s · 9:16${g.revision ? ` · <span class="rev ${g.revision.veredicto === 'APROBADO' ? 'ok' : ''}">Director: ${esc(g.revision.veredicto)}</span>` : ''}</p>
</header>
<section class="ficha">
  <div class="avatar" style="grid-column:1/-1">${refAvatar ? `<img src="${esc(refAvatar)}" alt="${esc(avatar.nombre)}">` : ''}<div><b>Personaje (banco)</b><p>${esc(avatar.nombre)} · ${esc(avatar.perfil)}</p><p class="nota">Adjunta su foto (${esc(refAvatar)}) en cada frame.</p></div></div>
  <div><b>Estrategia</b><p>${esc(g.estrategia)}</p></div>
  <div><b>Continúa el gancho</b><p>${esc(g.hook_continua)}</p></div>
</section>
${bloque('Personaje (pégalo igual en cada frame)', g.personaje)}
<h2>Escenas principales</h2>
${escenasHtml}
<h2>B-roll (1 por escena)</h2>
${brollHtml}
<h2>Variaciones</h2>${lista(g.variaciones)}
<h2>Notas de edición</h2>${lista(g.edicion)}
${cm ? `<h2>Copy de Meta que acompaña al video</h2>${bloque('Texto principal', cm.texto)}${bloque('Título', cm.titulo)}${bloque('Descripción', cm.descripcion)}` : ''}
<p class="nota">Frames: ChatGPT, Nano Banana o Seedream, con la foto del personaje y del producto. Video: Kling, Seedance, Veo o Runway.</p>
</div>
<script>
document.addEventListener('click',async e=>{const b=e.target.closest('button[data-copy]');if(!b)return;const t=b.getAttribute('data-copy'),l=b.textContent;
const ok=()=>{b.textContent='Copiado';b.classList.add('done');setTimeout(()=>{b.textContent=l;b.classList.remove('done')},1500)};
try{await navigator.clipboard.writeText(t);ok()}catch(_){const ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok()}catch(__){}ta.remove()}});
</script>`;
fs.writeFileSync(salida, html);
console.log(`OK → ${salida} (${escenas.length} escenas, ${(g.broll || []).length} B-roll, ${total} s)${avisos.length ? ` · ${avisos.length} aviso(s)` : ''}`);
