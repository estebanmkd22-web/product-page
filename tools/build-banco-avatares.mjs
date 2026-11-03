// Página del banco de avatares: cada personaje con su foto, perfil, descripción y landings donde se usa.
// Uso: node tools/build-banco-avatares.mjs salida.html   (las fotos se publican junto a la página en avatares/fotos/)
import fs from 'node:fs';

const banco = JSON.parse(fs.readFileSync(new URL('../avatares/banco.json', import.meta.url), 'utf8')).avatares;
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const salida = process.argv[2];

const tarjetas = Object.entries(banco).map(([id, a]) => {
  const foto = Object.values(a.referencias).find(Boolean);
  const tomas = Object.values(a.referencias).filter(Boolean).length;
  return `<article class="card">
  ${foto ? `<img src="${esc(foto)}" alt="${esc(a.nombre)}">` : '<div class="vacio">Sin foto</div>'}
  <div class="info"><h2>${esc(a.nombre)} <small>${esc(id)}</small></h2>
  <div class="chips"><span>${esc(a.mercado)}</span><span>${tomas}/4 tomas</span>${a.usos?.length ? a.usos.map((u) => `<span class="uso">${esc(u)}</span>`).join('') : '<span>Sin usar</span>'}</div>
  <p class="perfil">${esc(a.perfil)}</p><p>${esc(a.descripcion)}</p></div></article>`;
}).join('');

fs.writeFileSync(salida, `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Banco de avatares</title>
<style>
:root{--bg:#faf6f1;--card:#fff;--tx:#2a2624;--tx2:#6f6560;--ac:#c2562b;--suave:#f6e6dc;--borde:#eadfd5}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#1c1a19;--card:#262321;--tx:#f2ece7;--tx2:#b5aaa3;--ac:#e07a4f;--suave:#3a2a22;--borde:#3a3431}}
:root[data-theme="dark"]{--bg:#1c1a19;--card:#262321;--tx:#f2ece7;--tx2:#b5aaa3;--ac:#e07a4f;--suave:#3a2a22;--borde:#3a3431}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
.wrap{max-width:980px;margin:0 auto;padding:24px 16px 64px}h1{margin:0 0 4px;font-size:26px}.sub{color:var(--tx2);margin:0 0 20px}
.grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
.card{background:var(--card);border:1px solid var(--borde);border-radius:16px;overflow:hidden}
.card img,.vacio{display:block;width:100%;aspect-ratio:3/4;object-fit:cover;object-position:top;background:var(--suave)}.vacio{display:grid;place-items:center;color:var(--ac);font-weight:700}
.info{padding:14px}h2{margin:0 0 6px;font-size:18px}h2 small{font-weight:400;color:var(--tx2);font-size:13px}
.chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}.chips span{font-size:12px;border:1px solid var(--borde);border-radius:99px;padding:1px 8px;color:var(--tx2)}.chips .uso{border-color:var(--ac);color:var(--ac)}
p{margin:0 0 6px;color:var(--tx2);font-size:14px}.perfil{color:var(--tx);font-weight:600}
</style></head><body><div class="wrap">
<h1>Banco de avatares</h1><p class="sub">${Object.keys(banco).length} personajes. Sus fotos se adjuntan en cada imagen donde aparecen, para que siempre salga la misma persona.</p>
<div class="grid">${tarjetas}</div></div></body></html>`);
console.log(`OK → ${salida} (${Object.keys(banco).length} avatares)`);
