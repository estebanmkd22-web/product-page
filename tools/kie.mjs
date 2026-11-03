// Genera imágenes del kit con Kie (GPT Image 2.5, image-to-image): sube la foto del producto y las del avatar,
// crea la tarea, espera el resultado y lo descarga.
// Uso: NODE_USE_ENV_PROXY=1 node --no-warnings tools/kie.mjs imagenes-ia/estufa-prompts.json --n 1,7 --modelos sunburst,flare --res 1K
// La clave va como secreto de red del entorno (KIE_API_KEY); el proxy la agrega en api.kie.ai y kieai.redpandaai.co.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const fPrompts = args[0];
const opt = (k, d) => { const i = args.indexOf('--' + k); return i > -1 ? args[i + 1] : d; };
const numeros = opt('n', '').split(',').filter(Boolean).map(Number);
const modelos = opt('modelos', 'sunburst').split(',');
const resolucion = opt('res', '1K');
const salidaDir = path.join(ROOT, fPrompts.replace(/-prompts\.json$/, ''), opt('carpeta', 'prueba'));

const kit = JSON.parse(fs.readFileSync(fPrompts, 'utf8'));
const finales = JSON.parse(fs.readFileSync(fPrompts.replace(/-prompts\.json$/, '-final.json'), 'utf8'));
const AUTH = { Authorization: `Bearer ${process.env.KIE_API_KEY || '$KIE_API_KEY'}` };
const fCache = path.join(ROOT, 'imagenes-ia', 'subidas.json');
const cache = fs.existsSync(fCache) ? JSON.parse(fs.readFileSync(fCache, 'utf8')) : {};
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
// Kie guarda los archivos subidos unos días; se vuelven a subir pasados 2.
const VIGENCIA = 2 * 24 * 3600 * 1000;

async function subir(rel) {
  const c = cache[rel];
  if (c && Date.now() - c.fecha < VIGENCIA) return c.url;
  const abs = path.join(ROOT, rel);
  const ext = path.extname(rel).slice(1).replace('jpg', 'jpeg');
  const r = await fetch('https://kieai.redpandaai.co/api/file-base64-upload', {
    method: 'POST', headers: { ...AUTH, 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64Data: `data:image/${ext};base64,${fs.readFileSync(abs).toString('base64')}`, uploadPath: 'pp-referencias', fileName: path.basename(rel) }),
  }).then((x) => x.json());
  const url = r.data?.downloadUrl || r.data?.fileUrl;
  if (!url) throw new Error(`No se pudo subir ${rel}: ${JSON.stringify(r)}`);
  cache[rel] = { url, fecha: Date.now() };
  fs.writeFileSync(fCache, JSON.stringify(cache, null, 2) + '\n');
  return url;
}

async function generar(modelo, prompt, refs, proporcion) {
  const r = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
    method: 'POST', headers: { ...AUTH, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: `gpt-image-2-5-${modelo}-image-to-image`, input: { prompt, input_urls: refs, aspect_ratio: proporcion, resolution: resolucion } }),
  }).then((x) => x.json());
  const id = r.data?.taskId;
  if (!id) throw new Error(`Kie no creó la tarea: ${JSON.stringify(r)}`);
  for (let i = 0; i < 120; i++) {
    await esperar(5000);
    const t = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${id}`, { headers: AUTH }).then((x) => x.json());
    const estado = t.data?.state;
    if (estado === 'success') return JSON.parse(t.data.resultJson).resultUrls[0];
    if (estado === 'fail') throw new Error(`Falló la tarea ${id}: ${t.data.failMsg || JSON.stringify(t.data)}`);
  }
  throw new Error(`La tarea ${id} no terminó a tiempo`);
}

// GPT Image 2.5 no tiene 4:5; se genera en el formato más cercano y se recorta después.
const FORMATO = { '4/5': '3:4' };
fs.mkdirSync(salidaDir, { recursive: true });
const urlProducto = await subir(kit.referencia_archivo);
for (const n of numeros) {
  const e = finales.find((x) => x.n === n);
  if (!e) { console.warn(`No existe el espacio ${n}`); continue; }
  const refs = [...(e.producto ? [urlProducto] : []), ...(await Promise.all(e.referencias_avatar.map(subir)))];
  const p = e.proporcion.replace(/\s/g, '');
  for (const m of modelos) {
    const url = await generar(m, e.prompt, refs, FORMATO[p] || p.replace('/', ':'));
    const archivo = path.join(salidaDir, `${String(n).padStart(2, '0')}-${m}.png`);
    fs.writeFileSync(archivo, Buffer.from(await fetch(url).then((x) => x.arrayBuffer())));
    console.log(`OK ${n} ${m} → ${path.relative(ROOT, archivo)}  (${url})`);
  }
}
