// Convierte una página de vista previa (preview/paginas/*.json) en una plantilla
// de Shopify (templates/product.X.json) con todos los textos, precios y colores.
// Las imágenes y videos no se incluyen: se suben desde el editor del tema.
// Valida cada ajuste contra el schema de su sección para que Shopify no rechace el archivo.
// Uso: node tools/build-plantilla.mjs preview/paginas/rama-luz-buyer2.json templates/product.rama-luz.json
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [entrada, salida] = process.argv.slice(2);
const pagina = JSON.parse(fs.readFileSync(path.resolve(entrada), 'utf8'));
const OMITIR = new Set(['image_picker', 'video', 'product', 'font_picker']);
const errores = [];

const schemaDe = (tipo) => {
  const src = fs.readFileSync(path.join(ROOT, 'sections', tipo + '.liquid'), 'utf8');
  return JSON.parse(src.match(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/)[1]);
};

const limpiar = (valores, defs, donde) => {
  const out = {};
  for (const [id, valor] of Object.entries(valores || {})) {
    const def = defs.find((d) => d.id === id);
    if (!def) { errores.push(`${donde}: el ajuste "${id}" no existe`); continue; }
    if (OMITIR.has(def.type)) continue;
    if (def.type === 'select' && !def.options.some((o) => o.value === String(valor))) {
      errores.push(`${donde}: "${valor}" no es una opción de "${id}"`); continue;
    }
    out[id] = def.type === 'select' ? String(valor) : valor;
  }
  return out;
};

const plantilla = { sections: {}, order: [] };
const usados = {};
for (const sec of pagina.secciones) {
  const schema = schemaDe(sec.tipo);
  usados[sec.tipo] = (usados[sec.tipo] || 0) + 1;
  const key = sec.tipo.replace(/^pp-/, '').replace(/-/g, '_') + (usados[sec.tipo] > 1 ? '_' + usados[sec.tipo] : '');
  const entry = { type: sec.tipo, settings: limpiar(sec.settings, schema.settings || [], sec.tipo) };
  if (sec.blocks && sec.blocks.length) {
    entry.blocks = {}; entry.block_order = [];
    sec.blocks.forEach((b, i) => {
      const def = (schema.blocks || []).find((d) => d.type === b.type);
      if (!def) { errores.push(`${sec.tipo}: el bloque "${b.type}" no existe`); return; }
      const id = `${b.type}_${i + 1}`;
      entry.blocks[id] = { type: b.type, settings: limpiar(b.settings, def.settings || [], `${sec.tipo} › ${b.type}`) };
      entry.block_order.push(id);
    });
  }
  plantilla.sections[key] = entry;
  plantilla.order.push(key);
}

if (errores.length) { console.error(errores.join('\n')); process.exit(1); }
fs.writeFileSync(path.resolve(salida), JSON.stringify(plantilla, null, 2) + '\n');
console.log('OK →', salida, `(${plantilla.order.length} secciones)`);
