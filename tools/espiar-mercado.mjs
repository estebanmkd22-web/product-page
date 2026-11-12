// Espía el mercado local de un nicho en 3 fuentes (Google Trends, biblioteca de Meta y TikTok) vía Apify.
// Lo usa la skill espiar-mercado. El token de Apify es secreto de red del entorno: el proxy lo agrega en api.apify.com.
//
// Uso (siempre con NODE_USE_ENV_PROXY=1 node --no-warnings):
//   tools/espiar-mercado.mjs palabras  <producto> --pais CO "faja reductora" "faja colombiana"
//   tools/espiar-mercado.mjs anuncios  <producto> --pais CO "faja reductora" "cinturilla" [--meta 30] [--tiktok 20]
//   tools/espiar-mercado.mjs creativos <producto> [--top 12]      (justo después de "anuncios": las URLs vencen)
//   tools/espiar-mercado.mjs landings  <producto> [--top 8] [--url https://otra.com/products/x,...]
//
// Todo se guarda en investigacion/<producto>/mercado/.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [modo, producto, ...resto] = process.argv.slice(2);
const opt = (k, d) => { const i = resto.indexOf('--' + k); return i > -1 ? resto[i + 1] : d; };
const palabras = resto.filter((x, i) => !x.startsWith('--') && !(i > 0 && resto[i - 1].startsWith('--')));
const pais = opt('pais', 'CO').toUpperCase();
if (!modo || !producto) { console.error('Uso: espiar-mercado.mjs palabras|anuncios|landings <producto> --pais CO "kw1" "kw2"'); process.exit(1); }

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
  console.log(`Google Trends · ${pais} · ${palabras.length} palabras`);
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

// ── 2) ANUNCIOS: Meta (biblioteca, activos en el país) + TikTok (Creative Center top ads + búsqueda orgánica) ──
async function modoAnuncios() {
  if (!palabras.length) throw new Error('Faltan palabras clave');
  const nMeta = Number(opt('meta', 30)), nTik = Number(opt('tiktok', 20));
  console.log(`Anuncios · ${pais} · ${palabras.join(' | ')}`);
  const urlMeta = (kw) => `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=${pais}&q=${encodeURIComponent(kw)}&search_type=keyword_unordered&media_type=all`;
  const [meta, cc, org] = await Promise.all([
    actor('curious_coder~facebook-ads-library-scraper', { urls: palabras.map((k) => ({ url: urlMeta(k) })), count: nMeta * palabras.length, scrapeAdDetails: false }, 'Meta Ad Library'),
    Promise.all(palabras.map((k) => actor('codebyte~tiktok-creative-center-top-ads', { country: [pais], period: '180', search_query: k, limit: nTik, sort_by: 'impression' }, `TikTok Creative Center "${k}"`))).then((a) => a.flat()),
    actor('clockworks~tiktok-scraper', { searchQueries: palabras, resultsPerPage: nTik, searchSection: '/video', shouldDownloadVideos: false, shouldDownloadCovers: false, shouldDownloadSubtitles: false }, 'TikTok orgánico'),
  ]);

  const anuncios = [];
  for (const a of meta) {
    const s = a.snapshot || {};
    const card = (s.cards || [])[0] || {};
    anuncios.push({
      fuente: 'meta', id: a.ad_archive_id, anunciante: a.page_name || s.page_name,
      formato: s.display_format, activo: a.is_active, dias_activo: dias(a.start_date), copias: a.collation_count || 1,
      plataformas: a.publisher_platform, copy: corto(s.body?.text || card.body, 600), titulo: corto(s.title || card.title, 120),
      cta: s.cta_text, landing: s.link_url || card.link_url,
      imagen: s.images?.[0]?.original_image_url || card.original_image_url || s.videos?.[0]?.video_preview_image_url || card.video_preview_image_url,
      video: s.videos?.[0]?.video_hd_url || s.videos?.[0]?.video_sd_url || card.video_hd_url || null,
      enlace: `https://www.facebook.com/ads/library/?id=${a.ad_archive_id}`,
    });
  }
  for (const a of cc) {
    anuncios.push({
      fuente: 'tiktok-ads', id: a.id, anunciante: a.brand_name || '—', formato: 'VIDEO', ctr: a.ctr, likes: a.like,
      gasto: a.cost_readable || a.cost, copy: corto(a.ad_title, 600), duracion_s: a.video_info?.duration,
      imagen: a.video_info?.cover, video: a.video_info?.video_url?.['720p'] || Object.values(a.video_info?.video_url || {})[0] || null,
      enlace: `https://ads.tiktok.com/business/creativecenter/topads/${a.id}/pc/es`,
    });
  }
  for (const v of org) {
    anuncios.push({
      fuente: 'tiktok-organico', id: v.id, anunciante: v.authorMeta?.name, formato: 'VIDEO', es_anuncio: v.isAd || false,
      vistas: v.playCount, likes: v.diggCount, compartidos: v.shareCount, comentarios: v.commentCount,
      dias_publicado: dias(v.createTime), copy: corto(v.text, 600), duracion_s: v.videoMeta?.duration,
      imagen: v.videoMeta?.coverUrl, enlace: v.webVideoUrl,
    });
  }

  // Señal de "ganador": en Meta, días activo + copias duplicadas (escalan lo que funciona); en TikTok, CTR o vistas.
  for (const a of anuncios) {
    if (a.fuente === 'meta') a.puntaje = Math.round(Math.min(a.dias_activo || 0, 120) + 10 * Math.min(a.copias - 1, 10));
    else if (a.fuente === 'tiktok-ads') a.puntaje = Math.round((a.ctr || 0) * 1000 + (a.likes || 0) / 100);
    else a.puntaje = Math.round(Math.log10((a.vistas || 0) + 1) * 20);
  }
  // Quita duplicados exactos de Meta (mismo anunciante + mismo copy): se queda el de más puntaje.
  const vistos = new Map();
  for (const a of anuncios.sort((x, y) => y.puntaje - x.puntaje)) {
    const k = a.fuente + '|' + a.anunciante + '|' + a.copy.slice(0, 120);
    if (!vistos.has(k)) vistos.set(k, a); else vistos.get(k).variantes = (vistos.get(k).variantes || 1) + 1;
  }
  const lista = [...vistos.values()];
  guardar('anuncios.json', lista);

  // Anunciantes y landings (dominios propios, no WhatsApp).
  const porAnunciante = {};
  for (const a of lista.filter((x) => x.fuente === 'meta')) {
    const p = (porAnunciante[a.anunciante] ||= { anunciante: a.anunciante, anuncios: 0, maxDias: 0, video: 0, imagen: 0, whatsapp: 0, landings: new Set() });
    p.anuncios += a.variantes || 1; p.maxDias = Math.max(p.maxDias, a.dias_activo || 0);
    a.formato === 'VIDEO' ? p.video++ : p.imagen++;
    if (/whatsapp|wa\.me/.test(a.landing || '')) p.whatsapp++; else if (a.landing) p.landings.add(a.landing.split('?')[0]);
  }
  const anunciantes = Object.values(porAnunciante).map((p) => ({ ...p, landings: [...p.landings] })).sort((a, b) => b.anuncios - a.anuncios || b.maxDias - a.maxDias);
  guardar('anunciantes.json', anunciantes);

  const meta2 = lista.filter((a) => a.fuente === 'meta');
  const resumen = {
    pais, palabras, fecha: new Date().toISOString().slice(0, 10),
    meta: { anuncios: meta2.length, anunciantes: anunciantes.length, video: meta2.filter((a) => a.formato === 'VIDEO').length, imagen: meta2.filter((a) => a.formato !== 'VIDEO').length, a_whatsapp: meta2.filter((a) => /whatsapp|wa\.me/.test(a.landing || '')).length, mas_de_30_dias: meta2.filter((a) => (a.dias_activo || 0) >= 30).length },
    tiktok_ads: lista.filter((a) => a.fuente === 'tiktok-ads').length,
    tiktok_organico: lista.filter((a) => a.fuente === 'tiktok-organico').length,
  };
  guardar('resumen.json', resumen);

  let md = `# Anuncios del nicho · ${producto} · ${pais} · ${resumen.fecha}\n\nPalabras: ${palabras.join(' · ')}\n\n`;
  md += `**Meta:** ${resumen.meta.anuncios} anuncios únicos de ${resumen.meta.anunciantes} anunciantes · ${resumen.meta.video} video / ${resumen.meta.imagen} estáticos · ${resumen.meta.a_whatsapp} mandan a WhatsApp · ${resumen.meta.mas_de_30_dias} llevan 30+ días activos.\n`;
  md += `**TikTok:** ${resumen.tiktok_ads} en Creative Center · ${resumen.tiktok_organico} videos orgánicos.\n\n`;
  md += `## Top anunciantes en Meta\n| Anunciante | Anuncios | Máx. días | Video/Img | WhatsApp | Landing |\n|---|---|---|---|---|---|\n`;
  for (const p of anunciantes.slice(0, 15)) md += `| ${p.anunciante} | ${p.anuncios} | ${p.maxDias} | ${p.video}/${p.imagen} | ${p.whatsapp} | ${p.landings[0] || '—'} |\n`;
  const fila = (a) => `- **[${a.puntaje}] ${a.anunciante}** · ${a.formato}${a.dias_activo != null ? ` · ${a.dias_activo} días` : ''}${a.copias > 1 ? ` · ${a.copias} copias` : ''}${a.ctr ? ` · CTR ${a.ctr}` : ''}${a.vistas ? ` · ${a.vistas.toLocaleString('es-CO')} vistas` : ''}${a.es_anuncio ? ' · ANUNCIO' : ''} · [ver](${a.enlace})${a.landing ? ` · [landing](${a.landing})` : ''}\n  > ${a.copy.slice(0, 280) || '(sin texto)'}\n`;
  md += `\n## Meta · videos ganadores (más días activos / copias)\n` + meta2.filter((a) => a.formato === 'VIDEO').slice(0, 12).map(fila).join('');
  md += `\n## Meta · estáticos ganadores\n` + meta2.filter((a) => a.formato !== 'VIDEO').slice(0, 12).map(fila).join('');
  md += `\n## TikTok · Creative Center (anuncios pagados, por impresiones)\n` + (lista.filter((a) => a.fuente === 'tiktok-ads').slice(0, 10).map(fila).join('') || '- Sin resultados para este país y palabras.\n');
  md += `\n## TikTok · orgánico (por vistas)\n` + lista.filter((a) => a.fuente === 'tiktok-organico').slice(0, 12).map(fila).join('');
  guardar('anuncios.md', md);
  console.log(`\nGuardado: investigacion/${producto}/mercado/anuncios.md, anuncios.json, anunciantes.json, resumen.json`);
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
  const top = Number(opt('top', 8));
  const anunciantes = leer('anunciantes.json');
  const urls = [];
  for (const p of anunciantes) { const u = p.landings[0]; if (u && !urls.some((x) => new URL(x).host === new URL(u).host)) urls.push(u); if (urls.length >= top) break; }
  // Landings extra que pase el usuario: --url https://a.com/products/x,https://b.com/...
  for (const u of (opt('url', '') || '').split(',').filter(Boolean)) urls.push(u);
  if (!urls.length) { console.log('Ningún anunciante top tiene landing propia (todos mandan a WhatsApp). Eso también es un hallazgo.'); return; }
  console.log(`Landings · ${urls.length}`);
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
  const n = Number(opt('top', 12));
  const lista = leer('anuncios.json');
  const elegidos = [
    ...lista.filter((a) => a.fuente === 'meta' && a.formato !== 'VIDEO' && a.imagen).slice(0, n),
    ...lista.filter((a) => a.fuente === 'meta' && a.formato === 'VIDEO' && a.imagen).slice(0, Math.ceil(n / 2)),
    ...lista.filter((a) => a.fuente === 'tiktok-ads' && a.imagen).slice(0, Math.ceil(n / 2)),
  ];
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
  guardar('anuncios.json', lista);
  console.log(`\nGuardado: ${items.length} imágenes en investigacion/${producto}/mercado/creativos/ (ruta en anuncios.json → archivo)`);
}

const modos = { palabras: modoPalabras, anuncios: modoAnuncios, creativos: modoCreativos, landings: modoLandings };
if (!modos[modo]) { console.error(`Modo desconocido: ${modo}`); process.exit(1); }
await modos[modo]();
