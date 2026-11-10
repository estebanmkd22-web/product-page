// Lista todos los espacios de imagen de una página (preview/paginas/*.json) leyendo el schema
// de cada sección: dónde va cada imagen en el personalizador, su formato y el texto que la rodea.
// Uso: node tools/espacios-imagenes.mjs preview/paginas/estufa.json [salida.json]
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [entrada, salida] = process.argv.slice(2);
const pagina = JSON.parse(fs.readFileSync(path.resolve(entrada), 'utf8'));

// Imágenes opcionales que no se generan: reemplazan un ícono, usan la foto del producto o serían fotos falsas de clientes.
const OMITIR = { 'pp-iconos': ['imagen'], 'pp-oferta-tabs': ['imagen'], 'pp-resenas': ['foto'], 'pp-logo': ['imagen'] };
// Formato fijo de las secciones que no tienen ajuste de proporción.
const FIJO = { 'pp-problemas-filas': '1 / 1', 'pp-comparativa': '1 / 1' };
// Encuadre obligatorio de las secciones que recortan y difuminan la foto. En PP · Problemas en filas la foto
// ocupa media tarjeta: en celular se ve casi cuadrada (≈180 × 190 px) y en computador apaisada (≈544 × 300 px,
// solo la franja central), y el borde que toca el texto se difumina. Las filas impares llevan la foto a la
// izquierda; las pares, a la derecha.
const ENCUADRE = {
  'pp-problemas-filas': (i) => {
    const lado = i % 2 === 0 ? 'izquierda' : 'derecha';
    const borde = i % 2 === 0 ? 'derecho' : 'izquierdo';
    return `Esta foto se recorta: en computador solo se ve la franja horizontal del centro y el borde ${borde} se difumina. Pon el objeto principal completo y centrado en la franja del medio (entre el 25 % y el 75 % de la altura), un poco hacia la ${lado}, ocupando como máximo el 60 % del ancho, con aire alrededor. Que nada importante quede arriba, abajo ni en el tercio del borde ${borde}; ese tercio es fondo simple.`;
  },
};
const PIXELES = { '1 / 1': '1080 × 1080', '4 / 5': '1080 × 1350', '4 / 3': '1200 × 900', '3 / 4': '1080 × 1440', '9 / 16': '1080 × 1920', '16 / 9': '1920 × 1080', '3 / 2': '1200 × 800', '2 / 3': '1080 × 1620' };

const schemaDe = (tipo) => {
  const src = fs.readFileSync(path.join(ROOT, 'sections', tipo + '.liquid'), 'utf8');
  return JSON.parse(src.match(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/)[1]);
};
const texto = (v) => String(v || '').replace(/<[^>]+>/g, '').trim();

const espacios = [];
const cuenta = {};
for (const sec of pagina.secciones) {
  const schema = schemaDe(sec.tipo);
  const omitir = OMITIR[sec.tipo] || [];
  const def = (schema.settings || []).find((d) => d.id === 'proporcion');
  const proporcion = FIJO[sec.tipo] || sec.settings?.proporcion || def?.default || '1 / 1';
  cuenta[sec.tipo] = (cuenta[sec.tipo] || 0) + 1;
  const clave = sec.tipo.replace(/^pp-/, '') + (cuenta[sec.tipo] > 1 ? cuenta[sec.tipo] : '');
  const base = { seccion: schema.name, tipo: sec.tipo, proporcion, pixeles: PIXELES[proporcion] || '', titulo_seccion: texto(sec.settings?.titulo) };

  for (const d of schema.settings || []) {
    if (d.type !== 'image_picker' || omitir.includes(d.id)) continue;
    espacios.push({ ...base, id: `${clave}.${d.id}`, donde: d.label });
  }
  (sec.blocks || []).forEach((b, i) => {
    const bdef = (schema.blocks || []).find((x) => x.type === b.type);
    for (const d of bdef?.settings || []) {
      if (d.type !== 'image_picker' || omitir.includes(d.id)) continue;
      const s = b.settings || {};
      const encuadre = ENCUADRE[sec.tipo]?.(i);
      espacios.push({ ...base, ...(encuadre ? { encuadre } : {}), id: `${clave}.${b.type}${i + 1}`, donde: `${bdef.name} ${i + 1}${s.titulo ? ` · ${texto(s.titulo)}` : s.etiqueta ? ` · ${texto(s.etiqueta)}` : ''}`, contexto: texto([s.titulo, s.texto, s.puntos].filter(Boolean).join(' — ')) });
    }
  });
}

espacios.forEach((e, i) => { e.n = i + 1; });
const out = JSON.stringify(espacios, null, 2) + '\n';
if (salida) { fs.writeFileSync(salida, out); console.log(`OK → ${salida} (${espacios.length} espacios)`); }
else process.stdout.write(out);
