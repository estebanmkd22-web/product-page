---
name: landing-producto
description: Crea la landing (product page) de un producto nuevo en Shopify con las secciones PP de este repositorio y su kit de imágenes para hacer a mano en ChatGPT. Úsala cuando el usuario diga "vamos a trabajar otro producto", pida una landing o product page, el hero de un producto, el kit de imágenes o los prompts de una landing, o pida cambiar un prompt puntual del kit.
---

# Landing de producto + kit de imágenes

Proceso fijo para las tiendas del usuario (Shopify, tema Dawn). Todo se arma con las secciones `sections/pp-*.liquid` y las herramientas de `tools/`. El usuario pega el código en **Editar código** y edita en **Personalizar**.

## Tiendas

| Tienda | País | Moneda | Lenguaje |
|---|---|---|---|
| **Tu espacio Market** (tuespaciomarket.com) | Colombia | `$` COP, `locale es-CO` | Tuteo cercano, colombiano |
| **Naturixa** (vivecompra.com/naturixa) | Guatemala | `Q` | El más cercano para guatemaltecos (voseo) |

El conector de Shopify está ligado a Tu espacio Market. Antes de escribir, busca el producto ahí (`search_products`) para ver precio y nombre reales. Si no existe, dile que lo cree; no inventes IDs. `cdn.shopify.com` está bloqueado: las fotos de la tienda se bajan por `https://tuespaciomarket.com/cdn/shop/files/<archivo>?width=…`.

## Proceso: 3 fases, cada una se aprueba antes de seguir

### Fase 1 · Hero (no se arma nada hasta que el usuario lo apruebe)
1. Reúne el público, el ángulo y los datos reales: specs, oferta, garantía y fotos. Si falta un dato que va en el copy, pregúntalo; nunca lo inventes.
2. Propón **4 títulos en tabla** (título · ángulo) con tu recomendación y su porqué. Después propón **bullets** y, cuando el título esté elegido, **subtítulos**.
3. Reglas del hero:
   - Corto: los títulos largos se rechazan.
   - **Nunca en pregunta**, porque despierta más dudas.
   - Que conecte con el dolor o el deseo concreto del público, no algo genérico.
   - Usa aversión a la pérdida cuando el usuario la pida.
   - La parte fuerte del título va en `<em>…</em>`, que se ve en el color de acento.
   - Bullets con formato `<strong>Beneficio:</strong> explicación concreta` (3 o 4).
   - Chips (`zonas_titulo`/`zonas`) solo si suman.

### Fase 2 · Landing
**Maqueta base:** `preview/paginas/arven-fold.json`, la versión más completa de la maqueta de la rama de 1,5 m. Cópiala como `preview/paginas/<producto>.json` y adapta el copy. El orden base con su papel en ATIDCOA:

| Sección | Papel |
|---|---|
| pp-estilos (paleta + fuente) · pp-logo (si hay logo) · pp-ticker | Marco |
| pp-hero-oferta | **A**tención |
| pp-iconos | Atención |
| pp-oferta-tabs | **D**eseo + **Ac**ción (oferta) |
| pp-videos o pp-carrusel-imagenes | **Siempre justo debajo de la oferta** |
| pp-grid-dolores | **I**nterés (dolor) |
| pp-galeria-ideas / pp-resultados-zona | **T**ransformación |
| pp-problemas-filas | Interés (cómo funciona, ingredientes o partes) |
| pp-pasos · pp-esperar | Deseo (facilidad, qué pasa después) |
| pp-comparativa | **C**omparación |
| pp-resenas · pp-faq | **O**bjeciones |
| pp-garantia (antes o después de reseñas, según el producto) | Objeciones |
| pp-boton-fijo | **Ac**ción (aparece solo después de ver la oferta: `aparecer: despues_oferta`) |

Quita lo que no aplique, como pp-libre o pp-resultados-zona si no hay zonas. Si el usuario manda una sección de ejemplo (captura de otra página), **créala como sección nueva** `sections/pp-<nombre>.liquid` siguiendo las existentes: base CSS entre `/* PP-BASE:START/END */`, íconos de `src/pp-iconos.liquid`, schema en español, preset con textos por defecto y registro en `tools/build-copy-page.mjs` y `README.md`.

**Copy (todo con ATIDCOA):**
- Títulos cortos, con el ángulo del hero repetido en toda la landing.
- **Cero datos inventados.** Si pones un precio tachado, un tiempo de entrega o una cifra de ejemplo, avísale al usuario que debe cambiarlo.
- Las reseñas de ejemplo van con `"nombre": "Testimonio de ejemplo"`.
- Las FAQ van con nombre y ciudad: "Marta de Bogotá pregunta: …".
- Sin promesas médicas (curar, tratar hongos, etc.).
- Si un claim del usuario es falso o riesgoso, avísale. Por ejemplo, "sin perfume" cuando sí tiene fragancia.
- Las imágenes de resultados llevan la nota "Imágenes ilustrativas".

**Armado y verificación:**
```bash
node preview/render.mjs preview/paginas/<p>.json                     # vista previa → preview/out/<p>.html
node tools/build-plantilla.mjs preview/paginas/<p>.json templates/product.<p>.json
node tools/validar-schema.mjs                                         # si tocaste secciones
node tools/inline-base.mjs                                            # si tocaste src/pp-base.css o src/pp-iconos.liquid
```
- Revisa en celular (390 px) con Playwright, ocultando `.pp-fijo`.
- Corrige lo que se vea apretado, por ejemplo nombres de pack largos.
- Manda capturas del hero y la oferta al usuario.
- Agrega la plantilla (y las secciones nuevas o cambiadas) a `tools/build-copy-page.mjs` para que queden registradas.
- **Entrega del código: una página de copiar por landing.** Genera con `tools/build-copy-page.mjs` una página que tenga solo la plantilla y las secciones que esa landing necesita crear o volver a pegar, con los pasos arriba, y publícala como artifact propio (por ejemplo, "ARVEN Fold Care · Landing 1"). Si la landing cambia, republica en esa misma URL. **Nunca entregues el código como archivo para descargar.** La página grande de copiar (`https://claude.ai/artifact/JjRD3UQ4yvGUJpJJgh3jY1`) no se republica en cada landing.
- Commit y push a la rama de trabajo.

### Fase 3 · Kit de imágenes (a mano en ChatGPT)
1. `node tools/espacios-imagenes.mjs preview/paginas/<p>.json imagenes-ia/<p>-espacios.json`. Lista cada espacio en el orden del personalizador, con su formato.
2. Escribe `imagenes-ia/<p>-prompts.json` en **formato versión 2** (ver abajo), en español.
3. Elige el **avatar del banco** (`avatares/banco.json`, fotos en `avatares/fotos/`) según el público, y confírmalo con el usuario. **Nunca inventes una persona solo con texto.** Si ningún avatar sirve, pídele al usuario una foto para agregarla al banco.
4. `node tools/build-kit-imagenes.mjs imagenes-ia/<p>-espacios.json imagenes-ia/<p>-prompts.json <scratchpad>/kit-<p>.html`.
5. Publica el kit como artifact, con la foto del avatar en `files` (`avatares/fotos/<archivo>`), y dale el enlace al usuario.

Kie (`tools/kie.mjs`) está **en pausa por decisión del usuario**: no generes imágenes por API salvo que lo pida.

**Formato versión 2 del kit:**
```json
{
  "version": 2,
  "landing": "Nombre",
  "avatar": "co-mama-01",
  "referencia_archivo": "imagenes/<p>/producto.png",
  "ficha": { "escenario": "…", "luz": "…", "paleta": "…", "estilo": "…" },
  "producto": "Cómo debe verse el producto, idéntico a la foto adjunta, sin piezas de más.",
  "reglas": "Sin textos, letreros ni logos dentro de la imagen. Manos naturales.",
  "espacios": {
    "<id del espacio>": {
      "que": "Qué logra esta imagen dentro de ATIDCOA (para el usuario).",
      "producto": true, "persona": true,
      "escena": "Lo que pasa en la imagen: acción, encuadre, objetos.",
      "persona_accion": "Qué hace el avatar en esta imagen.",
      "historial": []
    }
  }
}
```
La herramienta arma sola el prompt completo: qué adjuntar, producto, avatar, escena, ambiente, formato de ChatGPT (cuadrada, vertical u horizontal, más el recorte) y reglas.

**Reglas de las imágenes:**
- Las de dolor no muestran el producto nuevo.
- Las de galería con texto encima dejan el tercio inferior simple y más oscuro.
- No se generan fotos para reseñas, porque serían clientes falsos.
- Tampoco para íconos ni para la foto del pack, que usa la del producto.

## Kit de anuncios
Cuando el usuario manda referentes de anuncios: lectura rápida de cada uno, opciones de texto en tabla con recomendación, y solo con los textos aprobados se arman los prompts (mismo `tools/build-kit-imagenes.mjs`, un espacio por anuncio). Guarda cada referente en `imagenes-ia/referentes/<p>/anuncio-N.webp`, ponlo en el campo `referente` del espacio (la tarjeta lo muestra) y en `adjuntar`, y publícalo en `files` del artifact. Los prompts no nombran zonas del cuerpo (piel, busto, entrepierna): describen solo lo que se ve (top, pretina, marca rosada). Sin hongos ni promesas médicas, y textos en primera persona o impersonales (política de Meta). Formato en WEBP.

## Cambios puntuales en los prompts
El usuario indica **número de imagen + parte**, por ejemplo: "imagen 7, escena: sin niños".
- **Escena, persona o formato de una imagen:** cambia solo ese campo de ese espacio y agrega en su `historial` una entrada `{ "fecha", "parte", "cambio" }`. No toques ningún otro espacio. La tarjeta se marca como "Modificada".
- **Ficha, producto, reglas o avatar:** afectan a todas las imágenes. Antes de cambiar, di cuáles se ven afectadas y espera confirmación.
- Si el cambio llega como comentario en el artifact del kit, la tarjeta comentada es la imagen. Responde ahí mismo.
- Regenera el kit, republícalo en la **misma URL** y haz commit.

## Reglas de trabajo con el usuario
- **No modificar lo que no pidió.** Si pide cambiar un título, cambia solo ese título. Si una sección compartida necesita algo nuevo, crea una sección nueva o un ajuste con valor por defecto que deje igual a las demás landings.
- **Si la página ya tiene fotos, nunca le pidas volver a pegar la plantilla**: dale los cambios a mano para Personalizar (sección → campo → texto exacto). Pegar la plantilla solo sirve para landings nuevas sin fotos.
- **Siempre el paso a paso exacto, numerado:**
  1. Editar código → sections → crear o pegar las secciones nuevas o actualizadas.
  2. Editar código → templates → crear `product.<p>` y pegar.
  3. Asignar la plantilla al producto.
  4. Personalizar → subir fotos y videos → Guardar.

  Di qué secciones hay que crear o volver a pegar. Si la plantilla usa un ajuste que la versión de la tienda no tiene, el editor no guarda.
- Confirma que un cambio no afecta a las otras landings y explica por qué.
- Respuestas en español, claras y cortas. Tablas para comparar opciones. Una recomendación, no un menú infinito.

## Notas técnicas
- **Dawn oculta los `div:empty`.** Ningún div decorativo vacío: lleva un `<span></span>` dentro.
- Las plantillas omiten imágenes, videos y fuentes. La fuente de títulos va en `head_extra` del JSON de vista previa y en pp-estilos.
- Límites del schema: label ≤ 70 caracteres y nombre de sección ≤ 25 (`tools/validar-schema.mjs`).
- Después de tocar `src/pp-base.css` o `src/pp-iconos.liquid`: `node tools/inline-base.mjs`. Agregar un ícono implica volver a pegar las secciones que lo usan.
- Botón de compra por defecto: EasySell (contraentrega).

## Pendiente: fondos animados
El usuario quiere fondos animados en algunas secciones. Todavía no hay estilo elegido. Antes de implementarlo, pide un ejemplo o arma una página de muestra con 5 estilos livianos (degradado en movimiento, formas flotantes, partículas, patrón deslizante, brillo que recorre) con la paleta de la landing.

Reglas cuando se implemente:
- Ajuste "Fondo animado" con valor por defecto "Ninguno".
- Movimiento lento.
- Nada o casi nada en la oferta.
- Contraste para el texto.
- Respetar `prefers-reduced-motion`.
- Nunca video de fondo.
