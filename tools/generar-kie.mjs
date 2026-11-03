// Genera imágenes con kie.ai (Nano Banana Pro) adjuntando las fotos de referencia.
// Las referencias se pasan como URL pública del repo (raw.githubusercontent.com en un commit ya subido),
// por eso las fotos tienen que estar commiteadas y pusheadas antes de generar.
//
// Uso:
//   node tools/generar-kie.mjs avatar co-mama-01            → crea las tomas que falten del avatar
//   node tools/generar-kie.mjs kit imagenes-ia/estufa-final.json imagenes/estufa/e1.png [n1,n2,...]
//
// Correr con NODE_USE_ENV_PROXY=1 en esta nube (el fetch de Node no usa el proxy por defecto).
// Variables: KIE_API_KEY (el proxy la inyecta si no está), KIE_RES (1K|2K, por defecto 2K),
// REF_SHA (commit con las fotos; por defecto el HEAD de origin).
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const API = 'https://api.kie.ai/api/v1/jobs';
const KEY = process.env.KIE_API_KEY || 'proxy';
const RES = process.env.KIE_RES || '2K';
const REPO = 'estebanmkd22-web/product-page';
const SHA = process.env.REF_SHA || execSync('git ls-remote origin HEAD').toString().split(/\s/)[0];
const url = (p) => `https://raw.githubusercontent.com/${REPO}/${SHA}/${p}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ratio = (r) => r.replace(/\s/g, '').replace('/', ':');

async function api(ruta, body) {
  const res = await fetch(`${API}/${ruta}`, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await res.json();
  if (j.code !== 200) throw new Error(`${ruta}: ${j.code} ${j.msg}`);
  return j.data;
}

async function generar({ prompt, refs, aspect, salida }) {
  if (fs.existsSync(salida)) return console.log('ya existe', salida);
  const { taskId } = await api('createTask', {
    model: 'nano-banana-pro',
    input: { prompt, image_input: refs.map(url), aspect_ratio: aspect, resolution: RES, output_format: 'png' },
  });
  for (let i = 0; i < 120; i++) {
    await sleep(5000);
    const d = await api(`recordInfo?taskId=${taskId}`);
    if (d.state === 'fail') throw new Error(`${salida}: ${d.failMsg || d.failCode}`);
    if (d.state === 'success') {
      const src = JSON.parse(d.resultJson).resultUrls[0];
      const img = await fetch(src);
      if (!img.ok) throw new Error(`${salida}: descarga ${img.status} ${src}`);
      fs.mkdirSync(path.dirname(salida), { recursive: true });
      fs.writeFileSync(salida, Buffer.from(await img.arrayBuffer()));
      return console.log('OK', salida);
    }
  }
  throw new Error(`${salida}: tiempo agotado (task ${taskId})`);
}

// Varias a la vez, sin pasar de `n` simultáneas.
async function enLotes(tareas, n = 4) {
  const errores = [];
  const cola = [...tareas];
  await Promise.all(Array.from({ length: n }, async () => {
    while (cola.length) { const t = cola.shift(); try { await t(); } catch (e) { errores.push(e.message); console.error('ERROR', e.message); } }
  }));
  if (errores.length) process.exitCode = 1;
}

const [modo, ...args] = process.argv.slice(2);

if (modo === 'avatar') {
  const fBanco = 'avatares/banco.json';
  const banco = JSON.parse(fs.readFileSync(fBanco, 'utf8'));
  const id = args[0];
  const av = banco.avatares[id];
  if (!av?.referencias.frente) throw new Error(`El avatar ${id} no existe o no tiene foto de frente`);
  const faltan = Object.keys(banco.tomas_en).filter((t) => !av.referencias[t]);
  await enLotes(faltan.map((toma) => async () => {
    const salida = `avatares/fotos/${id}-${toma.replace('_', '-')}.png`;
    const prompt = `Same person as in the attached photo — identical face, skin tone, freckles, hair, age and build. ` +
      banco.prompt_referencias_en.replace('{descripcion_en}', av.descripcion_en).replace('{toma}', banco.tomas_en[toma]);
    await generar({ prompt, refs: [av.referencias.frente], aspect: toma === 'cuerpo_entero' ? '2:3' : '3:4', salida });
    av.referencias[toma] = salida;
  }));
  fs.writeFileSync(fBanco, JSON.stringify(banco, null, 2) + '\n');
} else if (modo === 'kit') {
  const [fFinal, refProducto, solo] = args;
  const items = JSON.parse(fs.readFileSync(fFinal, 'utf8'));
  const landing = path.basename(fFinal).replace(/-final\.json$/, '');
  const elegidos = solo ? solo.split(',').map(Number) : null;
  await enLotes(items.filter((it) => it.prompt && (!elegidos || elegidos.includes(it.n))).map((it) => () => generar({
    prompt: it.prompt,
    refs: [...(it.producto ? [refProducto] : []), ...it.referencias_avatar],
    aspect: ratio(it.proporcion),
    salida: `imagenes-ia/${landing}/${String(it.n).padStart(2, '0')}-${it.id.replace(/[^\w.-]/g, '_')}.png`,
  })));
} else {
  console.log('Uso: node tools/generar-kie.mjs avatar <id> | kit <X-final.json> <foto-producto> [n1,n2]');
}
