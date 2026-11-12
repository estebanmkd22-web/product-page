// Espía cómo anuncia la competencia LOCAL un nicho (Colombia o Guatemala), vía Apify. Lo usa la skill espiar-mercado.
// El token de Apify es secreto de red del entorno: el proxy lo agrega en api.apify.com.
//
// Flujo: de lo barato y amplio a lo caro y preciso. Nada caro se corre sin un plan aprobado.
//   1. palabras   <producto> --pais CO "t1" "t2" ...            Google Trends: cómo nombra la gente el problema
//   2. tiktok     <producto> --pais CO "t1" "t2" [--n 15]       TikTok orgánico: vocabulario, hashtags, sub-nichos, ganchos
//   3. plan       <producto> --pais CO --terminos "a,b" [--mods "contra entrega,envío gratis"] [--relevantes "a,b"] [--n 20]
//                 Arma la matriz término × modificador de oferta ("cinturilla - contra entrega"), con costo. NO gasta.
//   4. anuncios   <producto> [--solo 1,3] [--n 50]              Corre el plan en la biblioteca de Meta, filtra lo que no
//                 comunica y elige por variedad de oferta y ángulo. --solo repite consultas puntuales con más resultados.
//   5. anunciante <producto> --ids <page_id,...>                Todos los anuncios activos de los anunciantes elegidos
//   6. creativos  <producto> [--top 15]                         Imágenes de la selección (justo después: las URLs vencen)
//   7. landings   <producto> [--top 6] [--url https://...]      Capturas y oferta de las landings de la selección
// Siempre: NODE_USE_ENV_PROXY=1 node --no-warnings tools/espiar-mercado.mjs <modo> ...
// Todo se guarda en investigacion/<producto>/mercado/.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [modo, producto, ...resto] = process.argv.slice(2);
const opt = (k, d) => { const i = resto.indexOf('--' + k); return i > -1 ? resto[i + 1] : d; };
const palabras = resto.filter((x, i) => !x.startsWith('--') && !(i > 0 && resto[i - 1].startsWith('--')));
const pais = opt('pais', 'CO').toUpperCase();
if (!modo || !producto) { console.error('Uso: espiar-mercado.mjs palabras|tiktok|plan|anuncios|anunciante|creativos|landings <producto> [opciones] (ver cabecera)'); process.exit(1); }

const DIR = path.join(ROOT, 'investigacion', producto, 'mercado');
fs.mkdirSync(DIR, { recursive: true });
const guardar = (f, d) => fs.writeFileSync(path.join(DIR, f), typeof d === 'string' ? d : JSON.stringify(d, null, 2));
const leer = (f) => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const API = 'https://api.apify.com/v2';

// Lanza un actor, espera a que termine (hasta ~8 min) y devuelve sus items. Si falla, devuelve [] con aviso.
async function actor(id, input, nombre) {
  try {
    const r = await fetch(`${API}/acts/${id}/runs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
    const j = await r.json();
    if (!j.data) throw new Error(j.error?.message || JSON.stringify(j).slice(0, 200));
    const run = j.data.id;
    let estado = j.data.status;
    for (let i = 0; i < 96 && ['READY', 'RUNNING'].includes(estado); i++) {
      await esperar(5000);
      estado = (await (await fetch(`${API}/actor-runs/${run}`)).json()).data.status;
    }
    if (estado !== 'SUCCEEDED') throw new Error(`terminó en ${estado}`);
    // Se baja por páginas y con reintentos: las landings traen capturas pesadas y a veces el servidor corta.
    const items = [];
    for (let off = 0; ; off += 5) {
      let pag;
      for (let t = 0; t < 4 && !pag; t++) {
        try { pag = await (await fetch(`${API}/actor-runs/${run}/dataset/items?clean=true&offset=${off}&limit=5`)).json(); }
        catch { await esperar(3000 * (t + 1)); }
      }
      if (!pag) throw new Error('no se pudo bajar el resultado');
      items.push(...pag);
      if (pag.length < 5) break;
    }
    console.log(`  ✅ ${nombre}: ${items.length} resultados`);
    return items;
  } catch (e) {
    console.log(`  ⚠️  ${nombre}: ${e.message}`);
    return [];
  }
}

const dias = (unix) => (unix ? Math.max(0, Math.round((Date.now() / 1000 - unix) / 86400)) : null);
const corto = (t, n = 400) => (t || '').replace(/\s+/g, ' ').trim().slice(0, n);

// ── 1) PALABRAS: Google Trends (12 meses) por palabra: interés, búsquedas relacionadas y regiones ──
async function modoPalabras() {
  if (!palabras.length) throw new Error('Faltan palabras clave');
  console.log(`Google Trends · ${pais} · ${palabras.length} palabras · costo aprox. ${usd((palabras.length + 1) * COSTO.trends)}`);
  // Una corrida por palabra (búsquedas relacionadas y regiones) y otra comparando hasta 5 palabras en la misma escala.
  const [items, comp] = await Promise.all([
    actor('apify~google-trends-scraper', { searchTerms: palabras, geo: pais, timeRange: '', maxItems: palabras.length }, 'Google Trends (por palabra)'),
    palabras.length > 1 ? actor('apify~google-trends-scraper', { searchTerms: [palabras.slice(0, 5).join(',')], isMultiple: true, geo: pais, timeRange: '', maxItems: 1 }, 'Google Trends (comparación)') : [],
  ]);
  const comparacion = {};
  const linea = comp[0]?.interestOverTime_timelineData || [];
  palabras.slice(0, 5).forEach((w, i) => {
    const v = linea.map((p) => p.value?.[i] ?? 0);
    comparacion[w] = v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null;
  });
  const res = items.map((x) => {
    const serie = (x.interestOverTime_timelineData || []).map((p) => p.value?.[0] ?? 0);
    const prom = (a) => (a.length ? Math.round(a.reduce((s, v) => s + v, 0) / a.length) : 0);
    const ult = serie.slice(-12), prev = serie.slice(-24, -12);
    return {
      palabra: x.searchTerm,
      volumen_comparado: comparacion[x.searchTerm] ?? null,
      promedio12m: prom(serie),
      tendencia: prev.length && prom(prev) ? Math.round(((prom(ult) - prom(prev)) / prom(prev)) * 100) + '%' : 'sin datos',
      serie,
      top: (x.relatedQueries_top || []).map((q) => ({ q: q.query, v: q.value })),
      subiendo: (x.relatedQueries_rising || []).map((q) => ({ q: q.query, v: q.formattedValue })),
      regiones: (x.interestBySubregion || []).filter((r) => r.hasData?.[0]).slice(0, 6).map((r) => `${r.geoName} ${r.value[0]}`),
    };
  });
  guardar('trends.json', res);
  let md = `# Palabras clave · ${producto} · ${pais}\n\nFuente: Google Trends, últimos 12 meses \n\n- **Volumen comparado:** las palabras (hasta 5) en la misma escala 0–100; sirve para ver cuál busca más la gente.\n- **Tendencia:** últimas 12 semanas contra las 12 anteriores, dentro de cada palabra.\n\n| Palabra | Volumen comparado | Tendencia | Regiones fuertes |\n|---|---|---|---|\n`;
  for (const r of [...res].sort((a, b) => (b.volumen_comparado ?? -1) - (a.volumen_comparado ?? -1))) md += `| ${r.palabra} | ${r.volumen_comparado ?? '—'} | ${r.tendencia} | ${r.regiones.join(', ') || '—'} |\n`;
  md += `\n## Búsquedas relacionadas (candidatas a palabra clave)\n`;
  for (const r of res) md += `\n**${r.palabra}**\n- Top: ${r.top.slice(0, 10).map((q) => q.q).join(' · ') || '—'}\n- Subiendo: ${r.subiendo.slice(0, 10).map((q) => `${q.q} (${q.v})`).join(' · ') || '—'}\n`;
  guardar('palabras.md', md);
  console.log(`\nGuardado: investigacion/${producto}/mercado/palabras.md y trends.json`);
}

// Costos aproximados medidos en Apify (nov. 2026), para estimar antes de correr.
const COSTO = { meta: 0.00075, trends: 0.006, tiktok: 0.004, landing: 0.012, imagen: 0.003 };
const usd = (n) => `${n.toFixed(2)} USD`;

// Modificadores de oferta por país: filtran a quien vende producto físico con oferta (la competencia real) y dejan
// fuera marcas, tiendas físicas y anuncios que no comunican. La búsqueda es literal: se prueban las variantes.
const MODS = {
  CO: ['contra entrega', 'contraentrega', 'envío gratis', 'pago al recibir', 'paga en casa'],
  GT: ['contra entrega', 'envío gratis', 'paga al recibir', 'pago al recibir', 'toda Guatemala'],
};
const sinTilde = (t) => (t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const lista = (k) => (opt(k, '') || '').split(',').map((x) => x.trim()).filter(Boolean);

// Señales de oferta en el copy (o en la landing). Un anuncio sin oferta no sirve para ver "fondos de oferta".
const OFERTAS = {
  contraentrega: /contra ?entrega|pag(o|a|as|ue) al recibir|paga(s)? en (casa|tu casa)|pagas? cuando (llegue|recibas)/,
  envio_gratis: /envio gratis|envio sin costo|envio gratuito/,
  combo: /2 ?x ?1|3 ?x ?2|combo|kit|pack|lleva \d|\d+ unidades|segunda (unidad|a mitad)|x2\b|x3\b/,
  descuento: /descuento|% ?(off|dcto|de descuento)|\d{2} ?%|rebaja|antes \$|ahorra/,
  precio: /(\$|q|cop)\s?\d{2,3}([.,]\d{3})+|\d{2,3}\.\d{3}/,
  regalo: /regalo|obsequio|\bbono\b|gratis (un|una|el|la|tu)\b|lleva gratis/,
  garantia: /garantia|devolucion|satisfaccion garantizada/,
  urgencia: /solo hoy|ultimas? unidades|quedan|agotado|tiempo limitado|hasta (hoy|agotar)|promo(cion)? (termina|valida)/,
  whatsapp_cta: /escribenos|whatsapp|wa\.me|haz tu pedido por/,
};
const ofertasDe = (t) => { const x = sinTilde(t); return Object.keys(OFERTAS).filter((k) => OFERTAS[k].test(x)); };

// ── 2) TIKTOK ORGÁNICO: indicios del problema (vocabulario, hashtags, sub-nichos, ganchos, dudas de comentarios) ──
async function modoTiktok() {
  if (!palabras.length) throw new Error('Faltan palabras');
  const n = Number(opt('n', 15));
  console.log(`TikTok orgánico · ${palabras.join(' | ')} · ${n} por palabra · costo aprox. ${usd(palabras.length * n * COSTO.tiktok)}`);
  const items = await actor('clockworks~tiktok-scraper', { searchQueries: palabras, resultsPerPage: n, searchSection: '/video', shouldDownloadVideos: false, shouldDownloadCovers: false, shouldDownloadSubtitles: false }, 'TikTok orgánico');
  const videos = items.map((v) => ({
    id: v.id, autor: v.authorMeta?.name, busqueda: v.searchQuery, vistas: v.playCount || 0, likes: v.diggCount, comentarios: v.commentCount,
    compartidos: v.shareCount, dias: dias(v.createTime), es_anuncio: !!v.isAd, texto: corto(v.text, 400),
    hashtags: (v.hashtags || []).map((h) => sinTilde(h.name)).filter(Boolean), enlace: v.webVideoUrl,
  })).sort((a, b) => b.vistas - a.vistas);
  guardar('tiktok.json', videos);
  const cuenta = {};
  for (const v of videos) for (const h of new Set(v.hashtags)) if (!/^(fyp|foryou|parati|viral|tiktok|xyzbca|foryoupage|paratii?)/.test(h)) cuenta[h] = (cuenta[h] || 0) + 1;
  const hashtags = Object.entries(cuenta).sort((a, b) => b[1] - a[1]).slice(0, 30);
  const respuestas = videos.filter((v) => /^respuesta a @|^replying to @/i.test(v.texto));
  const fila = (v) => `- **${v.vistas.toLocaleString('es-CO')} vistas** · @${v.autor} · ${v.dias ?? '?'} días${v.es_anuncio ? ' · ANUNCIO' : ''} · [ver](${v.enlace})\n  > ${v.texto || '(sin texto)'}\n`;
  let md = `# TikTok orgánico · ${producto} · ${pais}\n\nBúsquedas: ${palabras.join(' · ')} · ${videos.length} videos.\n\n`;
  md += `Para qué sirve: confirmar cómo nombra la gente el problema, encontrar sub-nichos (hashtags) que se vuelven términos de búsqueda y ángulos, y ver qué ganchos enganchan.\n\n`;
  md += `## Hashtags que se repiten (sub-nichos y vocabulario)\n${hashtags.map(([h, c]) => `#${h} (${c})`).join(' · ') || '—'}\n\n`;
  md += `## Videos con más vistas (gancho = primera frase)\n${videos.slice(0, 15).map(fila).join('')}\n`;
  md += `## Respuestas a comentarios (dudas y objeciones reales)\n${respuestas.slice(0, 10).map(fila).join('') || '- Ninguna en esta muestra.\n'}`;
  guardar('tiktok.md', md);
  console.log(`\nGuardado: investigacion/${producto}/mercado/tiktok.md y tiktok.json`);
}

// ── 3) PLAN: matriz término × modificador de oferta. No gasta: se muestra y se aprueba antes de correr "anuncios" ──
function modoPlan() {
  const terminos = lista('terminos');
  if (!terminos.length) throw new Error('Falta --terminos "a,b"');
  const mods = lista('mods').length ? lista('mods') : MODS[pais] || MODS.CO;
  const n = Number(opt('n', 20));
  // Palabras que deben aparecer en el copy para que el anuncio cuente como del nicho (por defecto, las de los términos).
  const relevantes = lista('relevantes').length ? lista('relevantes') : [...new Set(terminos.flatMap((t) => sinTilde(t).split(/\s+/)).filter((w) => w.length >= 4))];
  // Si se pasa --matriz "termino:mod1|mod2;termino2:mod1" se usa tal cual; si no, todos contra todos.
  const matriz = opt('matriz', '');
  const pares = matriz
    ? matriz.split(';').flatMap((x) => { const [t, ms] = x.split(':'); return ms.split('|').map((m) => [t.trim(), m.trim()]); })
    : terminos.flatMap((t) => mods.map((m) => [t, m]));
  const consultas = pares.map(([t, m], i) => ({ n: i + 1, termino: t, modificador: m, q: `${t} - ${m}`, cantidad: n }));
  const plan = { pais, fecha: new Date().toISOString().slice(0, 10), relevantes, consultas, costo_estimado_usd: +(consultas.length * n * COSTO.meta).toFixed(3) };
  guardar('plan.json', plan);
  let md = `# Plan de búsqueda en Meta · ${producto} · ${pais}\n\nCada consulta se escribe como en la biblioteca: \`término - modificador\` (el anuncio debe traer las dos cosas).\n\n| # | Consulta | Anuncios |\n|---|---|---|\n`;
  for (const c of consultas) md += `| ${c.n} | ${c.q} | ${c.cantidad} |\n`;
  md += `\n- **Palabras de relevancia** (al menos una debe aparecer en el copy): ${relevantes.join(', ')}\n`;
  md += `- **Costo estimado:** ${usd(plan.costo_estimado_usd)} (${consultas.length} consultas × ${n} anuncios).\n`;
  md += `- **Regla de corte:** si una consulta trae más de la mitad irrelevante, el término se descarta; si sus últimos anuncios ya no traen anunciantes nuevos, no se pide más. Solo las consultas "da para más" se repiten con \`--solo <n> --n 50\`.\n`;
  guardar('plan.md', md);
  console.log(md);
}

// Convierte un anuncio crudo del actor de Meta al formato de trabajo.
function anuncioMeta(a, consulta) {
  const s = a.snapshot || {};
  const card = (s.cards || [])[0] || {};
  const copy = corto([s.body?.text, card.body, s.title, card.title, s.link_description].filter(Boolean).join(' · '), 700);
  return {
    id: a.ad_archive_id, page_id: a.page_id || s.page_id, anunciante: a.page_name || s.page_name, consulta,
    formato: s.display_format, dias_activo: dias(a.start_date), copias: a.collation_count || 1,
    copy, cta: s.cta_text, landing: s.link_url || card.link_url || null,
    imagen: s.images?.[0]?.original_image_url || card.original_image_url || s.videos?.[0]?.video_preview_image_url || card.video_preview_image_url || null,
    video: s.videos?.[0]?.video_hd_url || s.videos?.[0]?.video_sd_url || card.video_hd_url || null,
    enlace: `https://www.facebook.com/ads/library/?id=${a.ad_archive_id}`,
  };
}
const urlConsulta = (q) => `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=${pais}&q=${encodeURIComponent(q)}&search_type=keyword_unordered&media_type=all`;

// Corre tareas de a pocas para no lanzar 10 actores a la vez.
async function enTandas(tareas, k = 4) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: k }, async () => { while (i < tareas.length) { const j = i++; out[j] = await tareas[j](); } }));
  return out;
}

// Clasifica, filtra y elige por variedad. Se llama después de "anuncios" y de "anunciante".
function procesar(todos, relevantes) {
  const rel = relevantes.map(sinTilde);
  for (const a of todos) {
    a.ofertas = ofertasDe(a.copy + ' ' + (a.landing || ''));
    a.relevante = rel.some((w) => sinTilde(a.copy).includes(w)) || !!a.profundizado;
    a.comunica = a.relevante && a.ofertas.filter((o) => o !== 'whatsapp_cta').length > 0 && a.copy.length >= 60;
    a.motivo_descarte = a.comunica ? null : !a.relevante ? 'no es del nicho' : a.copy.length < 60 ? 'no comunica (copy vacío o muy corto)' : 'sin oferta';
    a.destino = !a.landing ? '—' : /whatsapp|wa\.me|m\.me|messenger/.test(a.landing) ? 'whatsapp' : 'web';
  }
  // Variedad: un representante por anunciante + formato + combinación de oferta. Desempate: copias y días activo.
  const grupos = new Map();
  for (const a of todos.filter((x) => x.comunica)) {
    const k = `${a.page_id || a.anunciante}|${a.formato === 'VIDEO' ? 'v' : 'i'}|${[...a.ofertas].sort().join('+')}`;
    const g = grupos.get(k);
    if (!g) grupos.set(k, { ...a, variantes: 1 });
    else { g.variantes++; if ((a.copias - g.copias) * 1000 + (a.dias_activo - g.dias_activo) > 0) grupos.set(k, { ...a, variantes: g.variantes }); }
  }
  const porAnunciante = {};
  for (const a of todos.filter((x) => x.comunica)) {
    const k = a.page_id || a.anunciante;
    const p = (porAnunciante[k] ||= { page_id: a.page_id, anunciante: a.anunciante, anuncios: 0, max_dias: 0, max_copias: 1, video: 0, imagen: 0, whatsapp: 0, ofertas: new Set(), landings: new Set(), profundizado: false });
    p.anuncios++; p.max_dias = Math.max(p.max_dias, a.dias_activo || 0); p.max_copias = Math.max(p.max_copias, a.copias);
    a.formato === 'VIDEO' ? p.video++ : p.imagen++;
    a.ofertas.forEach((o) => p.ofertas.add(o));
    if (a.destino === 'whatsapp') p.whatsapp++; else if (a.landing) p.landings.add(a.landing.split('?')[0]);
    if (a.profundizado) p.profundizado = true;
  }
  const anunciantes = Object.values(porAnunciante).map((p) => ({ ...p, ofertas: [...p.ofertas], landings: [...p.landings] }))
    .sort((a, b) => b.anuncios - a.anuncios || b.max_copias - a.max_copias || b.max_dias - a.max_dias);
  const orden = new Map(anunciantes.map((p, i) => [p.page_id || p.anunciante, i]));
  const max = Number(opt('max', 30));
  const seleccion = [...grupos.values()].sort((a, b) => (orden.get(a.page_id || a.anunciante) - orden.get(b.page_id || b.anunciante)) || b.copias - a.copias || b.dias_activo - a.dias_activo).slice(0, max);
  return { anunciantes, seleccion };
}

function escribirResultados(todos, plan, porConsulta) {
  const { anunciantes, seleccion } = procesar(todos, plan.relevantes);
  guardar('anuncios.json', todos);
  guardar('anunciantes.json', anunciantes);
  guardar('seleccion.json', seleccion);
  const ok = todos.filter((a) => a.comunica);
  const motivos = {};
  for (const a of todos.filter((x) => !x.comunica)) motivos[a.motivo_descarte] = (motivos[a.motivo_descarte] || 0) + 1;
  let md = `# Anuncios del nicho · ${producto} · ${plan.pais} · ${new Date().toISOString().slice(0, 10)}\n\n`;
  md += `**${todos.length}** anuncios traídos → **${ok.length}** comunican (del nicho + con oferta + copy real) → **${seleccion.length}** en la selección por variedad.\n`;
  md += `Descartados: ${Object.entries(motivos).map(([k, v]) => `${v} ${k}`).join(' · ') || 'ninguno'}.\n`;
  md += `De los que comunican: ${ok.filter((a) => a.formato === 'VIDEO').length} video / ${ok.filter((a) => a.formato !== 'VIDEO').length} estáticos · ${ok.filter((a) => a.destino === 'whatsapp').length} a WhatsApp / ${ok.filter((a) => a.destino === 'web').length} a web.\n\n`;
  if (porConsulta) {
    md += `## Rendimiento de cada consulta (regla de corte)\n| # | Consulta | Traídos | Comunican | Anunciantes nuevos | Veredicto |\n|---|---|---|---|---|---|\n`;
    for (const c of porConsulta) md += `| ${c.n} | ${c.q} | ${c.traidos} | ${c.comunican} | ${c.nuevos} | ${c.veredicto} |\n`;
    md += `\n`;
  }
  md += `## Anunciantes que comunican (candidatos a profundizar)\n| Anunciante | page_id | Anuncios | Máx. copias | Máx. días | Video/Img | Ofertas | Destino |\n|---|---|---|---|---|---|---|---|\n`;
  for (const p of anunciantes.slice(0, 20)) md += `| ${p.anunciante}${p.profundizado ? ' ✓' : ''} | ${p.page_id} | ${p.anuncios} | ${p.max_copias} | ${p.max_dias} | ${p.video}/${p.imagen} | ${p.ofertas.join(', ')} | ${p.landings[0] || (p.whatsapp ? 'WhatsApp' : '—')} |\n`;
  md += `\n## Selección por variedad de oferta y formato (lo que se analiza)\n`;
  for (const a of seleccion) md += `- **${a.anunciante}** · ${a.formato} · ${a.dias_activo} días${a.copias > 1 ? ` · ${a.copias} copias` : ''}${a.variantes > 1 ? ` · ${a.variantes} variantes` : ''} · ofertas: ${a.ofertas.join(', ')} · ${a.destino} · [ver](${a.enlace})${a.destino === 'web' ? ` · [landing](${a.landing})` : ''}\n  > ${a.copy.slice(0, 300)}\n`;
  guardar('anuncios.md', md);
  console.log(`\n${todos.length} traídos → ${ok.length} comunican → ${seleccion.length} seleccionados. Guardado: investigacion/${producto}/mercado/anuncios.md`);
}

// ── 4) ANUNCIOS: corre el plan aprobado en la biblioteca de Meta, una corrida por consulta ──
async function modoAnuncios() {
  const plan = leer('plan.json');
  const solo = lista('solo').map(Number);
  const nForzado = opt('n', null);
  const consultas = plan.consultas.filter((c) => !solo.length || solo.includes(c.n)).map((c) => ({ ...c, cantidad: Number(nForzado || c.cantidad) }));
  const costo = consultas.reduce((s, c) => s + c.cantidad * COSTO.meta, 0);
  console.log(`Meta · ${plan.pais} · ${consultas.length} consultas · costo aprox. ${usd(costo)}`);
  const previos = fs.existsSync(path.join(DIR, 'anuncios.json')) ? leer('anuncios.json') : [];
  const porId = new Map(previos.map((a) => [a.id, a]));
  const vistosAntes = new Set(previos.map((a) => a.page_id));
  const resultados = await enTandas(consultas.map((c) => () => actor('curious_coder~facebook-ads-library-scraper', { urls: [{ url: urlConsulta(c.q) }], count: c.cantidad, scrapeAdDetails: false }, `"${c.q}"`)));
  const porConsulta = [];
  consultas.forEach((c, i) => {
    const crudos = resultados[i].map((a) => anuncioMeta(a, c.q));
    procesar(crudos, plan.relevantes);
    const comunican = crudos.filter((a) => a.comunica);
    // Anunciantes nuevos en la segunda mitad: si ya no aparecen nuevos, pedir más no aporta.
    const mitad = comunican.slice(Math.floor(comunican.length / 2));
    const antes = new Set([...vistosAntes, ...comunican.slice(0, Math.floor(comunican.length / 2)).map((a) => a.page_id)]);
    const nuevos = new Set(mitad.filter((a) => !antes.has(a.page_id)).map((a) => a.page_id)).size;
    const veredicto = !crudos.length ? 'vacía: probar otra variante' : comunican.length < crudos.length / 2 ? 'basura: descartar término' : crudos.length >= c.cantidad && nuevos >= 2 ? 'da para más' : 'agotada';
    porConsulta.push({ n: c.n, q: c.q, traidos: crudos.length, comunican: comunican.length, nuevos, veredicto });
    for (const a of crudos) if (!porId.has(a.id)) porId.set(a.id, a);
  });
  const todos = [...porId.values()];
  const anteriores = fs.existsSync(path.join(DIR, 'consultas.json')) ? leer('consultas.json') : [];
  const historial = [...anteriores.filter((x) => !porConsulta.some((y) => y.n === x.n)), ...porConsulta].sort((a, b) => a.n - b.n);
  guardar('consultas.json', historial);
  escribirResultados(todos, plan, historial);
}

// ── 5) ANUNCIANTE: todos los anuncios activos de los anunciantes elegidos (su página completa, no solo la consulta) ──
async function modoAnunciante() {
  const ids = lista('ids');
  if (!ids.length) throw new Error('Falta --ids <page_id,...> (sale de la tabla de anunciantes en anuncios.md)');
  const plan = leer('plan.json');
  const n = Number(opt('n', 40));
  console.log(`Anunciantes · ${ids.length} · hasta ${n} anuncios c/u · costo aprox. ${usd(ids.length * n * COSTO.meta)}`);
  const res = await enTandas(ids.map((id) => () => actor('curious_coder~facebook-ads-library-scraper', {
    urls: [{ url: `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=${plan.pais}&view_all_page_id=${id}&media_type=all&search_type=page` }], count: n, scrapeAdDetails: false,
  }, `página ${id}`)));
  const todos = leer('anuncios.json');
  const porId = new Map(todos.map((a) => [a.id, a]));
  for (const a of res.flat().map((x) => ({ ...anuncioMeta(x, 'página completa'), profundizado: true }))) {
    if (porId.has(a.id)) porId.get(a.id).profundizado = true; else porId.set(a.id, a);
  }
  escribirResultados([...porId.values()], plan, fs.existsSync(path.join(DIR, 'consultas.json')) ? leer('consultas.json') : null);
}

// ── 3) LANDINGS: abre las landings de los anunciantes top en celular (vía Apify, porque la red del entorno no deja
// entrar directo a tiendas ajenas), saca capturas y extrae promesa, estructura y oferta ──
const FUNCION_PAGINA = `async function pageFunction(context) {
  const { page, request } = context;
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(4000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const hero = (await page.screenshot({ type: 'jpeg', quality: 60 })).toString('base64');
  const alto = await page.evaluate(() => document.body.scrollHeight);
  const completa = (await page.screenshot({ type: 'jpeg', quality: 35, fullPage: alto < 16000 })).toString('base64');
  const datos = await page.evaluate(() => {
    const txt = (s) => [...document.querySelectorAll(s)].map((e) => e.innerText.replace(/\\s+/g, ' ').trim()).filter(Boolean);
    const cuerpo = document.body.innerText;
    const busca = (re) => [...new Set((cuerpo.match(re) || []).map((s) => s.replace(/\\s+/g, ' ').trim()))].slice(0, 12);
    return {
      titulo: document.title, h1: txt('h1').slice(0, 3), h2: txt('h2').slice(0, 20), h3: txt('h3').slice(0, 20),
      precios: busca(/(?:\\$|Q|COP)\\s?[\\d.,]{3,}/g),
      oferta: busca(/[^.\\n]{0,60}(?:2x1|3x2|x2|x3|lleva \\d|paga \\d|combo|kit|pack|descuento|% ?off|ahorra)[^.\\n]{0,60}/gi),
      pago_envio: busca(/[^.\\n]{0,50}(?:contra ?entrega|pago al recibir|paga al recibir|env[ií]o gratis|garant[ií]a|devoluci[oó]n|cuotas)[^.\\n]{0,50}/gi),
      urgencia: busca(/[^.\\n]{0,50}(?:solo hoy|últimas|quedan|agotado|tiempo limitado|oferta termina)[^.\\n]{0,40}/gi),
      resenas: busca(/[^.\\n]{0,30}(?:reseñas|opiniones|clientes satisfechos|estrellas)[^.\\n]{0,30}/gi),
      texto: cuerpo.replace(/\\n{2,}/g, '\\n').slice(0, 15000), largo_px: document.body.scrollHeight,
    };
  });
  return { url: request.url, hero, completa, ...datos };
}`;

async function modoLandings() {
  const top = Number(opt('top', 6));
  // Landings de los anunciantes que comunican, primero los profundizados; una por dominio.
  const anunciantes = leer('anunciantes.json').sort((a, b) => b.profundizado - a.profundizado);
  const urls = [];
  for (const p of anunciantes) { const u = p.landings[0]; if (u && !urls.some((x) => new URL(x).host === new URL(u).host)) urls.push(u); if (urls.length >= top) break; }
  // Landings extra que pase el usuario: --url https://a.com/products/x,https://b.com/...
  for (const u of lista('url')) urls.push(u);
  if (!urls.length) { console.log('Ningún anunciante de la selección tiene landing propia (todos mandan a WhatsApp). Eso también es un hallazgo.'); return; }
  console.log(`Landings · ${urls.length} · costo aprox. ${usd(urls.length * COSTO.landing)}`);
  const items = await actor('apify~playwright-scraper', {
    startUrls: urls.map((url) => ({ url })), linkSelector: '', pageFunction: FUNCION_PAGINA, maxPagesPerCrawl: urls.length,
    proxyConfiguration: { useApifyProxy: true }, downloadMedia: true, downloadCss: true, maxRequestRetries: 2,
  }, 'Landings (Apify)');
  fs.mkdirSync(path.join(DIR, 'landings'), { recursive: true });
  const res = [];
  for (const [i, x] of items.entries()) {
    const nombre = `${String(i + 1).padStart(2, '0')}-${new URL(x.url).host.replace(/^www\./, '')}`;
    if (x.hero) fs.writeFileSync(path.join(DIR, 'landings', `${nombre}-hero.jpg`), Buffer.from(x.hero, 'base64'));
    if (x.completa) fs.writeFileSync(path.join(DIR, 'landings', `${nombre}-completa.jpg`), Buffer.from(x.completa, 'base64'));
    fs.writeFileSync(path.join(DIR, 'landings', `${nombre}.txt`), x.texto || '');
    const { hero, completa, texto, ...resto } = x;
    res.push({ ...resto, captura: `landings/${nombre}-hero.jpg`, captura_completa: `landings/${nombre}-completa.jpg`, texto: `landings/${nombre}.txt` });
  }
  for (const u of urls) if (!items.some((x) => x.url === u)) res.push({ url: u, error: 'no cargó' });
  guardar('landings.json', res);
  console.log(`\nGuardado: investigacion/${producto}/mercado/landings.json, capturas y textos en landings/`);
}

// ── 4) CREATIVOS: baja las imágenes de los anuncios top (estáticos completos y portada de los videos) para mirarlas.
// La red del entorno no deja entrar a los CDN de Meta/TikTok, así que se bajan vía Apify. Las URLs de Meta vencen en
// horas: corre este modo justo después de "anuncios". ──
async function modoCreativos() {
  const n = Number(opt('top', 15));
  // Solo de la selección por variedad: estáticos completos y portadas de video.
  const elegidos = leer('seleccion.json').filter((a) => a.imagen).slice(0, n);
  if (!elegidos.length) { console.log('No hay imágenes para bajar.'); return; }
  console.log(`Creativos · ${elegidos.length} imágenes`);
  const items = await actor('apify~playwright-scraper', {
    startUrls: elegidos.map((a) => ({ url: a.imagen, userData: { id: String(a.id) } })), linkSelector: '', maxPagesPerCrawl: elegidos.length,
    pageFunction: `async function pageFunction(context) {
      const { request, page } = context;
      const r = await page.context().request.get(request.url);
      return { id: request.userData.id, tipo: r.headers()['content-type'] || '', b64: (await r.body()).toString('base64') };
    }`,
    proxyConfiguration: { useApifyProxy: true }, maxRequestRetries: 1,
  }, 'Creativos (Apify)');
  fs.mkdirSync(path.join(DIR, 'creativos'), { recursive: true });
  for (const x of items) {
    const a = elegidos.find((e) => String(e.id) === x.id);
    if (!a || !x.b64) continue;
    const ext = /png/.test(x.tipo) ? 'png' : /webp/.test(x.tipo) ? 'webp' : 'jpg';
    const f = `creativos/${a.fuente}-${a.formato === 'VIDEO' ? 'portada' : 'estatico'}-${String(a.id).slice(-8)}.${ext}`;
    fs.writeFileSync(path.join(DIR, f), Buffer.from(x.b64, 'base64'));
    a.archivo = f;
  }
  guardar('seleccion.json', elegidos.concat(leer('seleccion.json').filter((a) => !elegidos.includes(a) && !elegidos.some((e) => e.id === a.id))));
  console.log(`\nGuardado: ${items.length} imágenes en investigacion/${producto}/mercado/creativos/ (ruta en seleccion.json → archivo)`);
}

const modos = { palabras: modoPalabras, tiktok: modoTiktok, plan: modoPlan, anuncios: modoAnuncios, anunciante: modoAnunciante, creativos: modoCreativos, landings: modoLandings };
if (!modos[modo]) { console.error(`Modo desconocido: ${modo}`); process.exit(1); }
await modos[modo]();
