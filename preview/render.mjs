// Vista previa local de las secciones PP (sin Shopify).
// Uso: node preview/render.mjs preview/paginas/<archivo>.json
// Genera preview/out/<archivo>.html simulando los filtros básicos de Shopify.
import { Liquid, Tag } from 'liquidjs';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const page = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

const engine = new Liquid({ root: [path.join(ROOT, 'sections'), path.join(ROOT, 'snippets')], extname: '.liquid', jsTruthy: false });

// --- Tags propios de Shopify ---
class RawBlock extends Tag {
  constructor(token, remain, liquid, wrap) {
    super(token, remain, liquid);
    this.wrap = wrap; this.tpls = [];
    const name = token.name;
    while (remain.length) {
      const t = remain.shift();
      if (t.name === 'end' + name) return;
      this.tpls.push(liquid.parser.parseToken(t, remain));
    }
  }
  *render(ctx, emitter) {
    if (!this.wrap) return;
    emitter.write(this.wrap[0]);
    yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
    emitter.write(this.wrap[1]);
  }
}
engine.registerTag('schema', class extends RawBlock { constructor(t, r, l) { super(t, r, l, null); } });
engine.registerTag('style', class extends RawBlock { constructor(t, r, l) { super(t, r, l, ['<style>', '</style>']); } });
engine.registerTag('javascript', class extends RawBlock { constructor(t, r, l) { super(t, r, l, ['<script>', '</script>']); } });
engine.registerTag('form', class extends RawBlock { constructor(t, r, l) { super(t, r, l, ['<form method="post" action="/cart/add">', '</form>']); } });

// --- Filtros de Shopify simplificados ---
const kw = (args) => Object.fromEntries(args.filter(Array.isArray));
const money = (c) => {
  const v = Number(c || 0) / 100;
  return (page.moneda || 'Q') + v.toLocaleString(page.locale || 'es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
engine.registerFilter('money', money);
engine.registerFilter('money_without_trailing_zeros', (c) => money(c).replace(/[.,]00$/, ''));
engine.registerFilter('asset_url', (f) => '../../assets/' + f);
engine.registerFilter('stylesheet_tag', (u) => `<link rel="stylesheet" href="${u}">`);
engine.registerFilter('image_url', (img, ...args) => {
  if (!img) return '';
  const src = typeof img === 'string' ? img : img.src;
  const o = kw(args);
  return src + (src.includes('?') ? '&' : '?') + 'width=' + (o.width || 1200);
});
engine.registerFilter('image_tag', (url, ...args) => {
  const o = kw(args);
  const attrs = Object.entries(o).filter(([k]) => k !== 'widths' && k !== 'loading')
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`).join(' ');
  return `<img src="${url}" ${attrs}>`;
});
engine.registerFilter('video_tag', (v) => `<video src="${v.src}" loop muted playsinline preload="none"></video>`);
engine.registerFilter('placeholder_svg_tag', () => '<svg viewBox="0 0 10 10" style="width:100%;height:100%;background:#ddd"></svg>');
engine.registerFilter('payment_type_svg_tag', (t) => `<span>${t}</span>`);
engine.registerFilter('color_mix', (a, b, w) => {
  const h = (x) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16));
  const [c1, c2] = [h(a), h(b)]; const p = Number(w) / 100;
  return '#' + c1.map((v, i) => Math.round(v * p + c2[i] * (1 - p)).toString(16).padStart(2, '0')).join('');
});

// --- Lee defaults del schema y arma section/blocks ---
function schemaOf(file) {
  const src = fs.readFileSync(path.join(ROOT, 'sections', file + '.liquid'), 'utf8');
  return JSON.parse(src.match(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/)[1]);
}
function defaults(settings = []) {
  const o = {};
  for (const s of settings) if (s.id) o[s.id] = s.default ?? (s.type === 'checkbox' ? false : null);
  return o;
}

let html = '';
for (const [i, sec] of page.secciones.entries()) {
  const schema = schemaOf(sec.tipo);
  const preset = schema.presets?.[0] || {};
  const blocksSrc = sec.blocks || preset.blocks || [];
  const blocks = blocksSrc.map((b, j) => {
    const def = schema.blocks.find((x) => x.type === b.type);
    return { id: `b${j}`, type: b.type, shopify_attributes: '', settings: { ...defaults(def.settings), ...(b.settings || {}) } };
  });
  const section = { id: `s${i}`, settings: { ...defaults(schema.settings), ...(preset.settings || {}), ...(sec.settings || {}) }, blocks };
  const body = await engine.renderFile(sec.tipo, { section, product: page.producto, shop: { enabled_payment_types: [] } });
  html += `<${schema.tag || 'div'} class="shopify-section ${schema.class || ''}">${body}</${schema.tag || 'div'}>\n`;
}

const out = path.join(ROOT, 'preview', 'out', path.basename(process.argv[2], '.json') + '.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.titulo || 'Vista previa'}</title>
<style>body{margin:0;font-family:Assistant,system-ui,-apple-system,Segoe UI,Roboto,sans-serif}:root{--font-heading-family:Assistant,system-ui,sans-serif}</style></head><body>${html}</body></html>`);
console.log('OK →', path.relative(ROOT, out));
