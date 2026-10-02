// Revisa los límites de Shopify en el {% schema %} de cada sección,
// para que el archivo guarde sin errores en el editor de código.
// Uso: node tools/validar-schema.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const LIMITES = { label: 70, info: 500, name: 25 };
let errores = 0;

function revisar(archivo, donde, settings = []) {
  for (const s of settings) {
    for (const [campo, max] of Object.entries(LIMITES)) {
      if (campo === 'name') continue;
      if (typeof s[campo] === 'string' && s[campo].length > max) {
        console.log(`✗ ${archivo} · ${donde} · ${s.id || s.type}: "${campo}" tiene ${s[campo].length} caracteres (máx ${max})`);
        errores++;
      }
    }
    for (const o of s.options || []) {
      if (o.label.length > LIMITES.label) {
        console.log(`✗ ${archivo} · ${donde} · ${s.id}: opción "${o.label}" muy larga`);
        errores++;
      }
    }
  }
}

for (const f of fs.readdirSync(path.join(ROOT, 'sections')).filter((f) => f.endsWith('.liquid'))) {
  const src = fs.readFileSync(path.join(ROOT, 'sections', f), 'utf8');
  const schema = JSON.parse(src.match(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/)[1]);
  if (schema.name.length > LIMITES.name) { console.log(`✗ ${f}: nombre "${schema.name}" muy largo`); errores++; }
  revisar(f, 'settings', schema.settings);
  for (const b of schema.blocks || []) revisar(f, `bloque ${b.type}`, b.settings);
}
console.log(errores ? `\n${errores} problema(s)` : 'Todo OK');
process.exit(errores ? 1 : 0);
