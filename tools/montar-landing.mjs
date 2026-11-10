// Monta una landing en el tema en vivo de Shopify con la Shopify CLI (contraseña de Theme Access).
// Solo AGREGA: sube las secciones que faltan y la plantilla nueva. Nunca sobrescribe una sección
// o plantilla que ya existe, salvo que se nombre a mano con --actualizar (y el usuario lo aprobó).
// Antes de subir, guarda un respaldo de lo que había en respaldos/<tienda>/<fecha>/.
//
// Uso:
//   node tools/montar-landing.mjs <landing> --tienda tuespaciomarket            → solo revisa y muestra el plan
//   node tools/montar-landing.mjs <landing> --tienda tuespaciomarket --subir    → sube lo del plan
//   … --actualizar pp-resenas,pp-oferta-tabs   sobrescribe esas secciones existentes (solo con aprobación)
//   … --sobrescribir-plantilla                 reemplaza la plantilla si ya existe (borra lo editado en Personalizar)
//
// La contraseña es un secreto de red del entorno: el proxy la pone en el encabezado X-Shopify-Access-Token
// de las llamadas a theme-kit-access.shopifyapps.com. Aquí solo se pasa un valor de relleno.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const TIENDAS = {
  tuespaciomarket: { store: 'sdv0ep-if.myshopify.com', dominio: 'tuespaciomarket.com' },
};
const CLI = ['-y', '@shopify/cli@3.94.3'];

const args = process.argv.slice(2);
const landing = args[0];
const opt = (k) => { const i = args.indexOf('--' + k); return i > -1 ? (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true) : null; };
const tienda = TIENDAS[opt('tienda') || 'tuespaciomarket'];
if (!landing || !tienda) { console.error('Uso: node tools/montar-landing.mjs <landing> --tienda tuespaciomarket [--subir]'); process.exit(1); }
const subir = !!opt('subir');
const actualizar = new Set(String(opt('actualizar') || '').split(',').filter(Boolean));
const sobrescribirPlantilla = !!opt('sobrescribir-plantilla');

const fPlantilla = `templates/product.${landing}.json`;
if (!fs.existsSync(path.join(ROOT, fPlantilla))) { console.error(`No existe ${fPlantilla}: arma primero la plantilla.`); process.exit(1); }

const cli = (sub, extra) => execFileSync('npx', [...CLI, 'theme', sub, '--store', tienda.store, '--password', 'shptka_relleno', '--live', ...extra], {
  encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, SHOPIFY_CLI_NO_ANALYTICS: '1' }, maxBuffer: 64 * 1024 * 1024,
});

// Secciones que usa la plantilla.
const plantilla = JSON.parse(fs.readFileSync(path.join(ROOT, fPlantilla), 'utf8'));
const tipos = [...new Set(Object.values(plantilla.sections).map((s) => s.type))];
const archivos = tipos.map((t) => `sections/${t}.liquid`);

// 1. Bajar del tema en vivo lo que podría chocar (solo esos archivos).
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tema-'));
for (const d of ['sections', 'templates']) fs.mkdirSync(path.join(tmp, d), { recursive: true });
cli('pull', ['--path', tmp, ...[...archivos, fPlantilla].flatMap((f) => ['--only', f])]);
const enVivo = (f) => { const p = path.join(tmp, f); return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null; };
const normal = (s) => s.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').trim();
const schemaDe = (src) => { const m = src.match(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/); return m ? JSON.parse(m[1]) : {}; };

// 2. Plan.
const plan = { subir: [], igual: [], compatibles: [], desactualizadas: [], plantilla: null };
for (const t of tipos) {
  const f = `sections/${t}.liquid`;
  const local = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const vivo = enVivo(f);
  if (vivo === null) { plan.subir.push(f); continue; }
  if (normal(vivo) === normal(local)) { plan.igual.push(f); continue; }
  // Distinta: ¿la versión de la tienda tiene todos los ajustes y bloques que usa esta plantilla?
  const sv = schemaDe(vivo);
  const ids = new Set((sv.settings || []).map((x) => x.id));
  const bloques = Object.fromEntries((sv.blocks || []).map((b) => [b.type, new Set((b.settings || []).map((x) => x.id))]));
  const faltan = [];
  for (const s of Object.values(plantilla.sections).filter((s) => s.type === t)) {
    for (const k of Object.keys(s.settings || {})) if (!ids.has(k)) faltan.push(k);
    for (const b of Object.values(s.blocks || {})) {
      if (!bloques[b.type]) { faltan.push(`bloque ${b.type}`); continue; }
      for (const k of Object.keys(b.settings || {})) if (!bloques[b.type].has(k)) faltan.push(`${b.type}.${k}`);
    }
  }
  if (actualizar.has(t)) plan.subir.push(f);
  else if (faltan.length) plan.desactualizadas.push({ f, faltan: [...new Set(faltan)] });
  else plan.compatibles.push(f);
}
const plantillaViva = enVivo(fPlantilla);
plan.plantilla = plantillaViva === null ? 'nueva' : normal(plantillaViva) === normal(fs.readFileSync(path.join(ROOT, fPlantilla), 'utf8')) ? 'igual' : sobrescribirPlantilla ? 'sobrescribir' : 'existe';
if (plan.plantilla === 'nueva' || plan.plantilla === 'sobrescribir') plan.subir.push(fPlantilla);

console.log(JSON.stringify(plan, null, 2));
if (plan.desactualizadas.length) console.log('\nBLOQUEADO: hay secciones en la tienda a las que les faltan ajustes que usa la plantilla. Actualizarlas cambia las otras landings que las usan: pide aprobación y vuelve a correr con --actualizar <secciones>.');
if (plan.plantilla === 'existe') console.log('\nBLOQUEADO: la plantilla ya existe en la tienda y es distinta. Sobrescribirla borra lo editado en Personalizar (fotos incluidas): pide aprobación y usa --sobrescribir-plantilla.');
if (!subir) { console.log('\nSolo revisión. Nada se subió.'); process.exit(0); }
if (plan.desactualizadas.length || plan.plantilla === 'existe') process.exit(2);
if (!plan.subir.length) { console.log('\nNada que subir.'); process.exit(0); }

// 3. Respaldo de lo que había en la tienda de cada archivo que se va a tocar.
const fecha = new Date().toISOString().replace(/[:.]/g, '-');
const dirRespaldo = path.join(ROOT, 'respaldos', opt('tienda') || 'tuespaciomarket', fecha);
for (const f of plan.subir) {
  const v = enVivo(f);
  if (v !== null) { fs.mkdirSync(path.dirname(path.join(dirRespaldo, f)), { recursive: true }); fs.writeFileSync(path.join(dirRespaldo, f), v); }
}

// 4. Subir solo esos archivos, sin borrar nada en la tienda.
// La CLI exige una carpeta con estructura de tema: se arma una con solo los archivos a subir.
const envio = fs.mkdtempSync(path.join(os.tmpdir(), 'envio-'));
for (const d of ['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates']) fs.mkdirSync(path.join(envio, d), { recursive: true });
for (const f of plan.subir) fs.copyFileSync(path.join(ROOT, f), path.join(envio, f));
const salida = cli('push', ['--path', envio, '--allow-live', '--nodelete', ...plan.subir.flatMap((f) => ['--only', f])]);
console.log(salida.trim().split('\n').slice(-5).join('\n'));
console.log(`\nSubidos: ${plan.subir.join(', ')}`);
if (fs.existsSync(dirRespaldo)) console.log(`Respaldo: ${path.relative(ROOT, dirRespaldo)}`);
