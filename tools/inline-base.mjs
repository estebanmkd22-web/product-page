// Copia src/pp-base.css dentro de cada sección, entre los marcadores
// /* PP-BASE:START */ y /* PP-BASE:END */, para que cada sección sea
// un único archivo que se pega en Shopify sin dependencias.
// Uso: node tools/inline-base.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const base = fs.readFileSync(path.join(ROOT, 'src/pp-base.css'), 'utf8').trim();
const iconos = fs.readFileSync(path.join(ROOT, 'src/pp-iconos.liquid'), 'utf8').trim();
const re = /\/\* PP-BASE:START \*\/[\s\S]*?\/\* PP-BASE:END \*\//;
// Los íconos van entre estos comentarios Liquid; se pueden repetir varias veces por sección
const reIco = /{%- comment -%}PP-ICONOS:START{%- endcomment -%}[\s\S]*?{%- comment -%}PP-ICONOS:END{%- endcomment -%}/g;
const bloqueIco = `{%- comment -%}PP-ICONOS:START{%- endcomment -%}\n${iconos}\n{%- comment -%}PP-ICONOS:END{%- endcomment -%}`;

for (const f of fs.readdirSync(path.join(ROOT, 'sections')).filter((f) => f.startsWith('pp-'))) {
  const file = path.join(ROOT, 'sections', f);
  const src = fs.readFileSync(file, 'utf8');
  if (!re.test(src)) continue;
  const out = src
    .replace(re, () => `/* PP-BASE:START */\n${base}\n/* PP-BASE:END */`)
    .replace(reIco, () => bloqueIco);
  fs.writeFileSync(file, out);
  console.log('base actualizada →', f);
}
