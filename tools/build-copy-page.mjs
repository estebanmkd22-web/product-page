// Genera la página "Copiar secciones": una tarjeta por sección con botón
// para copiar el código completo (el visor de archivos corta los largos).
// Uso: node tools/build-copy-page.mjs <salida.html>
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = process.argv[2] || path.join(ROOT, 'preview/out/copiar.html');

// Orden y descripción de cada sección en la página
const SECCIONES = [
  { file: 'product.rama-compacta', dir: 'templates', ext: '.json', name: 'Plantilla · Rama de Luz 1.5 m', desc: 'Nueva. Página completa de la rama de 1.5 m (terracota + nórdico, 119.900 / 199.900). Va en templates: crea la plantilla rama-compacta (el nombre del archivo no lo ve el cliente), borra todo, pega y guarda. Antes crea pp-circulos, pp-problemas-filas, pp-oferta-tabs y pp-videos, y vuelve a pegar pp-iconos.' },
  { file: 'pp-circulos', desc: 'Nueva. "La pieza de diseño definitiva": titular con laureles, foto grande con bordes difuminados y 3 círculos con ícono dorado.' },
  { file: 'pp-problemas-filas', desc: 'Nueva. "¿Cansada de pasar horas…?": filas alternadas de foto + tarjeta con ícono terracota, título y check.' },
  { file: 'product.enjuague-v3', dir: 'templates', ext: '.json', name: 'Plantilla · Enjuague (estilo HYDRA)', desc: 'Página completa de iD Whitening para Naturixa con textos, packs, preguntas y colores. Va en la carpeta templates: abre product.enjuague-v3.json, borra todo, pega y guarda.' },
  { file: 'product.rama-luz', dir: 'templates', ext: '.json', name: 'Plantilla · Rama de Luz LED', desc: 'Página completa de la Rama con textos, precios y colores. Va en la carpeta templates: abre product.rama-luz.json, borra todo, pega y guarda. Antes deben estar pegadas las 15 secciones.' },
  { file: 'pp-hero-oferta', desc: 'Galería, estrellas, titular, beneficios y la caja de compra con el botón de EasySell.' },
  { file: 'pp-ticker', desc: 'Franja con mensajes que se mueven: envío gratis, pago al recibir, clientes felices.' },
  { file: 'pp-estilos', desc: 'Opcional. Cambia los colores de todas las secciones PP desde un solo lugar.' },
  { file: 'pp-videos', desc: 'Carrusel de videos verticales que se reproducen solos. Va debajo de la caja de compra.' },
  { file: 'pp-videos-rama', desc: 'Solo para la Rama de Luz (tienda de Colombia). Carrusel de videos de la Rama: fondo crema, flechas ámbar siempre visibles, barra de avance y movimiento automático. Es independiente de PP · Videos.' },
  { file: 'pp-galeria-ideas', desc: 'Nueva. "Ideas para decorar": tarjetas grandes con foto, etiqueta (SALA), título y frase encima. Nieve suave opcional.' },
  { file: 'pp-arco', desc: 'Nueva. "Esta Navidad": franja de color con foto en arco, titular con cursiva dorada y botón a los packs. Nieve suave opcional.' },
  { file: 'pp-oferta-tabs', desc: 'Nueva. Oferta con pestañas (1 / 2 frascos), tarjeta del pack, "Incluido en tu pedido" con contador y regalos que se desbloquean, valor tachado y botón con precio.' },
  { file: 'pp-problema', desc: 'Etiqueta, titular y hasta 3 fotos en fila. Ej: "El cepillo limpia dientes. No limpia esto."' },
  { file: 'pp-grid-dolores', desc: 'Tarjetas con foto, título rojo y texto en 2 columnas, más una frase de cierre.' },
  { file: 'pp-testimonio', desc: 'Pregunta que agita el dolor, cita de un cliente con estrellas y botón de compra.' },
  { file: 'pp-como-funciona', desc: 'Slider de tarjetas con imagen, título y texto que se desliza de lado (o en lista).' },
  { file: 'pp-pasos', desc: 'Modo de uso en pasos numerados con foto y etiqueta (15 ml, 30 seg).' },
  { file: 'pp-faq', desc: 'Preguntas frecuentes que se abren y cierran. Ya trae tus 6 preguntas.' },
  { file: 'pp-antes-despues', desc: 'Nueva. Dos columnas Antes / Después con puntos, imagen comparativa y frase de cierre.' },
  { file: 'pp-iconos', desc: 'Nueva. Franja de 2 a 4 íconos con texto (tarjeta o círculos grandes).' },
  { file: 'pp-zonas', desc: 'Nueva. Imagen con etiquetas sobre puntos, fotos de detalle con nombre y frase de cierre.' },
  { file: 'pp-beneficios', desc: 'Nueva. Imagen central rodeada de beneficios con ícono, título y texto.' },
  { file: 'pp-secuencia', desc: 'Nueva. Imagen principal y fotos en secuencia con flechas (dispersos › se agrupan › los ves).' },
  { file: 'pp-ofertas', desc: 'Nueva. Selector de packs (1, x2, x3) con etiqueta, % de descuento, precio por porción y regalos GRATIS.' },
  { file: 'pp-comparativa', desc: 'Nueva. Tabla tu producto vs. la competencia con checks y equis.' },
  { file: 'pp-datos', desc: 'Nueva. Tarjetas con un dato grande (237 ml, 30 seg, 0% alcohol…).' },
  { file: 'pp-tabs', desc: 'Nueva. "¿Te identificas?": pestañas tipo cápsula que cambian la lista de puntos.' },
  { file: 'pp-timeline', desc: 'Nueva. Línea de tiempo deslizable por etapas con barra de avance.' },
  { file: 'pp-destacado', desc: 'Nueva. Lista con símbolos ("Menos ruido…") o tarjeta de color con firma (el experto).' },
  { file: 'pp-resenas', desc: 'Nueva. Calificación general y tarjetas de reseñas reales con "Ver más".' },
  { file: 'pp-boton-fijo', desc: 'Barra con el botón de compra pegada abajo del celular, aparece al pasar la oferta.' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const cards = SECCIONES.map(({ file, desc }, i) => {
  const { dir = 'sections', ext = '.liquid' } = SECCIONES[i];
  const src = fs.readFileSync(path.join(ROOT, dir, file + ext), 'utf8');
  const name = SECCIONES[i].name || JSON.parse(src.match(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/)[1]).name;
  const lines = src.split('\n').length;
  return `
  <article class="card" id="${file}">
    <header class="card-head">
      <div class="card-title">
        <h2>${esc(name)}</h2>
        <p>${esc(desc)}</p>
      </div>
      <span class="lines">${lines} líneas</span>
    </header>
    <div class="row">
      <span class="label">Nombre del archivo</span>
      <code class="fname">${file}${ext}</code>
      <button class="btn btn-ghost" type="button" data-copy-text="${file}${ext}" id="copy-name-${i}">Copiar nombre</button>
    </div>
    <button class="btn btn-main" type="button" data-copy-target="code-${file}" id="copy-code-${i}">Copiar código completo</button>
    <details>
      <summary>Ver código</summary>
      <textarea id="code-${file}" readonly spellcheck="false" aria-label="Código de ${esc(name)}">${esc(src)}</textarea>
    </details>
  </article>`;
}).join('\n');

const html = `<title>Secciones Naturixa</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
  /* Layout: una columna estrecha de tarjetas, pasos arriba, nada que distraiga del botón de copiar */
  :root {
    --bg: #f6f3f1;
    --surface: #ffffff;
    --fg: #241c1b;
    --muted: #6e6361;
    --line: #e6dfdc;
    --accent: #c5453f;
    --accent-fg: #ffffff;
    --ok: #2e7d55;
    --code-bg: #f9f7f6;
    --f-display: "Bricolage Grotesque", "Figtree", system-ui, sans-serif;
    --f-body: "Figtree", system-ui, -apple-system, "Segoe UI", sans-serif;
    --f-mono: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg: #171312; --surface: #221c1b; --fg: #f3ecea; --muted: #b1a5a2;
      --line: #3a3130; --accent: #e0635c; --accent-fg: #1a0f0e; --ok: #5cc28c; --code-bg: #1c1716;
      color-scheme: dark;
    }
  }
  :root[data-theme="dark"] {
    --bg: #171312; --surface: #221c1b; --fg: #f3ecea; --muted: #b1a5a2;
    --line: #3a3130; --accent: #e0635c; --accent-fg: #1a0f0e; --ok: #5cc28c; --code-bg: #1c1716;
    color-scheme: dark;
  }
  * { box-sizing: border-box; }
  body {
    background: var(--bg); color: var(--fg);
    font: 16px/1.55 var(--f-body);
    padding: 32px 16px 64px;
  }
  .wrap { max-width: 720px; margin: 0 auto; display: grid; gap: 20px; }
  h1, h2 { font-family: var(--f-display); text-wrap: balance; margin: 0; letter-spacing: -0.01em; }
  h1 { font-size: clamp(30px, 6vw, 42px); line-height: 1.05; font-weight: 800; }
  .lead { margin: 8px 0 0; color: var(--muted); max-width: 60ch; }
  .steps {
    margin: 0; padding: 18px 18px 18px 40px; background: var(--surface);
    border: 1px solid var(--line); border-radius: 14px; display: grid; gap: 6px;
  }
  .steps li::marker { color: var(--accent); font-weight: 700; }
  .card {
    background: var(--surface); border: 1px solid var(--line); border-radius: 14px;
    padding: 20px; display: grid; gap: 14px; min-width: 0;
  }
  .card-head { display: flex; gap: 12px; align-items: flex-start; justify-content: space-between; }
  .card-title { min-width: 0; }
  .card-title h2 { font-size: 22px; font-weight: 700; }
  .card-title p { margin: 4px 0 0; color: var(--muted); font-size: 15px; }
  .lines {
    flex: 0 0 auto; font: 500 12px var(--f-mono); color: var(--muted);
    padding: 4px 8px; border: 1px solid var(--line); border-radius: 99px;
    font-variant-numeric: tabular-nums;
  }
  .row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
  .label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); width: 100%; }
  .fname { font: 500 15px var(--f-mono); background: var(--code-bg); border: 1px solid var(--line); padding: 6px 10px; border-radius: 8px; word-break: break-all; }
  .btn {
    font: 700 15px var(--f-body); border-radius: 10px; cursor: pointer;
    transition: transform .1s ease, background .15s ease;
  }
  .btn:active { transform: scale(0.98); }
  .btn:focus-visible, summary:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
  .btn-main {
    width: 100%; min-height: 54px; border: 0;
    background: var(--accent); color: var(--accent-fg); font-size: 17px;
  }
  .btn-ghost { padding: 7px 12px; background: transparent; color: var(--fg); border: 1px solid var(--line); }
  .btn.is-done { background: var(--ok); border-color: var(--ok); color: var(--accent-fg); }
  details summary { cursor: pointer; color: var(--muted); font-size: 14px; font-weight: 600; }
  textarea {
    display: block; width: 100%; height: 260px; margin-top: 10px; resize: vertical;
    font: 12.5px/1.5 var(--f-mono); color: var(--fg); background: var(--code-bg);
    border: 1px solid var(--line); border-radius: 10px; padding: 12px; white-space: pre; overflow: auto;
  }
  .note { color: var(--muted); font-size: 14px; margin: 0; }
  @media (prefers-reduced-motion: reduce) { .btn { transition: none; } }
</style>

<main class="wrap">
  <header>
    <h1>Secciones para tu product page</h1>
    <p class="lead">Cada botón copia el archivo completo. Pégalo en un archivo nuevo dentro de la carpeta <strong>sections</strong> de tu tema.</p>
  </header>

  <ol class="steps">
    <li>En el editor de código, clic derecho sobre <strong>sections</strong> → <strong>New File…</strong></li>
    <li>Toca <strong>Copiar nombre</strong>, pégalo como nombre del archivo y presiona Enter.</li>
    <li>Toca <strong>Copiar código completo</strong>, pégalo en el archivo vacío y guarda con <strong>Ctrl + S</strong>.</li>
  </ol>
${cards}
  <p class="note">Si el botón no copia en tu navegador, abre "Ver código": el texto queda seleccionado y lo copias con Ctrl + C.</p>
</main>

<script>
  function marcar(btn, texto) {
    var original = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', original);
    btn.textContent = texto;
    btn.classList.add('is-done');
    setTimeout(function () { btn.textContent = original; btn.classList.remove('is-done'); }, 2200);
  }
  function seleccionar(area) {
    var det = area.closest('details');
    if (det) det.open = true;
    area.focus();
    area.select();
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    var area = btn.dataset.copyTarget ? document.getElementById(btn.dataset.copyTarget) : null;
    var texto = area ? area.value : btn.dataset.copyText;
    if (texto == null) return;
    var ok = area ? 'Copiado ✓ ahora pégalo en Shopify' : 'Copiado ✓';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(function () { marcar(btn, ok); }, function () {
        if (area) { seleccionar(area); marcar(btn, 'Seleccionado: usa Ctrl + C'); }
      });
    } else if (area) {
      seleccionar(area);
      marcar(btn, 'Seleccionado: usa Ctrl + C');
    }
  });
</script>
`;

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log('OK →', out);
