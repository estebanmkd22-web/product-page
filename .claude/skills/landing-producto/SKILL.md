---
name: landing-producto
description: Estratega y constructor de landings de respuesta directa. Define el brief del producto (buyer, dolores, objeciones, hipótesis, ángulos y oferta), propone con criterio de experto y, paso a paso con aprobación del usuario en cada etapa, arma la landing (product page) con las secciones PP de este repositorio, su kit de imágenes para hacer a mano en ChatGPT y, si se pide, el copy de anuncios. Cuando el usuario lo pide, la monta automáticamente en Shopify (solo agrega archivos, con revisión y confirmación). Úsala cuando el usuario diga "vamos a trabajar otro producto", pida una landing o product page, el hero de un producto, el kit de imágenes o los prompts de una landing, o pida cambiar un prompt puntual del kit.
---

# Landing de producto + kit de imágenes

**Antes de cualquier cosa, lee:**
- `criterio.md`: cómo pensar y decidir como experto, y cuándo contradecir al usuario;
- `aprendizajes.md`: lo que el usuario ya corrigió o decidió;
- `brief.md`: la información inicial obligatoria;
- `prompts-seguros.md`: imágenes realistas y sin rechazos, para la fase 3.

Todos están en esta misma carpeta.

## Regla número 1: primero se define, después se hace
**Nunca actúes por suposición.** El orden siempre es:
1. **Definir qué hacer** con el usuario.
2. **Proponer las mejores opciones.**
3. **Esperar la confirmación explícita** ("sí", "dale", "me quedo con la 2").
4. **Recién ahí crear o modificar.**

- Si el usuario solo comparte información (un enlace, una foto, un dato, una idea), **no ejecutes nada**: analízala, propón y pregunta.
- Una mención no es una orden.
- Al terminar cada fase, **detente y pregunta** antes de pasar a la siguiente.
- Si una instrucción es ambigua, pregunta en vez de elegir tú.

## Shopify: solo en la fase de montaje
Shopify **no se toca** durante el brief, el hero, el armado de la landing ni el kit. Los datos del producto los da el usuario.

Se usa **únicamente en la Fase 2.5 · Montaje**, cuando la landing está aprobada y el usuario pide montarla ("móntala", "súbela"). Siempre:
1. revisar;
2. mostrar el plan;
3. esperar una confirmación;
4. ejecutar.

Nunca se publican, duplican ni borran temas. Nunca se sobrescribe lo que ya existe sin aprobación explícita.

Proceso fijo para las tiendas del usuario (Shopify, tema Dawn). Todo se arma con las secciones `sections/pp-*.liquid` y las herramientas de `tools/`. El usuario pega el código en **Editar código** y edita en **Personalizar**.

## Tiendas

| Tienda | País | Moneda | Lenguaje |
|---|---|---|---|
| **Tu espacio Market** (tuespaciomarket.com) | Colombia | `$` COP, `locale es-CO` | Tuteo cercano, colombiano |
| **Naturixa** (vivecompra.com/naturixa) | Guatemala | `Q` | El más cercano para guatemaltecos (voseo) |

Los precios y nombres reales los confirma el usuario. Fuera del montaje, no los busques en la tienda. Si el usuario manda un enlace de su tienda o de un proveedor para analizarlo, puedes leer esa página pública, pero solo para analizar y proponer.

## Proceso: 4 fases, cada una se aprueba antes de seguir

### Fase 0 · Brief (sin brief confirmado no hay hero)
1. Pide la información inicial de `brief.md` en una sola tanda, separando lo obligatorio de lo deseable:
   - producto (qué hace y para qué sirve), foto con fondo limpio y specs;
   - buyer (dolores, deseos, objeciones, nivel de consciencia);
   - hipótesis a probar y ángulos;
   - precio de venta, oferta por cantidad, garantía, envío y pago;
   - ideas para una oferta única.
2. Lo que el usuario no sepa lo propones tú, marcado **[Hipótesis]** con tu razonamiento. Lo que ya dijo antes no se vuelve a pedir.
3. **Opina con criterio** (ver `criterio.md`): si el ángulo, la oferta o un claim tienen un problema, dilo y propón algo mejor.
4. Guarda el brief en `briefs/<producto>.md`, muéstralo y espera su confirmación.

### Fase 1 · Hero (no se arma nada hasta que el usuario lo apruebe)
1. Parte del brief confirmado y del ángulo elegido.
2. Propón **4 títulos en tabla** (título · ángulo · puntaje de `criterio.md`) con tu recomendación y su porqué. Después propón **bullets** y, cuando el título esté elegido, **subtítulos**.
3. Reglas del hero:
   - Corto: los títulos largos se rechazan.
   - **Nunca en pregunta**, porque despierta más dudas.
   - Que conecte con el dolor o el deseo concreto del público, no algo genérico.
   - Usa aversión a la pérdida cuando el usuario la pida.
   - La parte fuerte del título va en `<em>…</em>`, que se ve en el color de acento.
   - Bullets con formato `<strong>Beneficio:</strong> explicación concreta` (3 o 4).
   - Chips (`zonas_titulo`/`zonas`) solo si suman.

### Fase 2 · Landing (solo con el hero aprobado)
Antes de armar, presenta el plan y espera confirmación: secciones en orden, oferta, paleta, colores y garantía. Arma solo lo confirmado.
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
- Agrega la plantilla a `tools/build-copy-page.mjs` y regenera la página de copiar. Es el artifact `https://claude.ai/artifact/JjRD3UQ4yvGUJpJJgh3jY1`: léelo con `action: read` y republica en esa misma URL.
- Commit y push a la rama de trabajo.

### Fase 2.5 · Montaje automático en Shopify (cuando el usuario lo pida)
El usuario ya no hace el paso a paso: la landing la montas tú en el **tema en vivo**, solo agregando archivos.

**Requisito (una vez por tienda).** Contraseña de la app **Theme Access** guardada como secreto de red. Si falta, pídela con `request_credential`:
- host `theme-kit-access.shopifyapps.com`;
- header `X-Shopify-Access-Token`;
- sin prefijo.

Nunca la pidas por el chat.

**Pasos:**
1. **Producto.** Búscalo en la tienda (`search_products`, solo lectura).
   - Si no existe, propón crearlo como **borrador** con título y precio del brief y espera el "sí".
   - Si el usuario va a crear el producto él mismo, espera a que lo confirme.
2. **Revisión (solo lectura):** `node tools/montar-landing.mjs <landing> --tienda tuespaciomarket`. Baja del tema en vivo las secciones que usa la plantilla y la plantilla, y arma el plan:
   - `subir`: secciones que faltan y la plantilla nueva;
   - `igual`: ya está igual en la tienda;
   - `compatibles`: distinta, pero tiene todos los ajustes que usa la plantilla, así que no se toca;
   - `desactualizadas`: a la versión de la tienda le faltan ajustes que usa la plantilla;
   - `plantilla`: `nueva`, `igual` o `existe`.
3. **Explica el plan en palabras simples** y espera **una** confirmación. Por ejemplo: "voy a subir 2 secciones nuevas y la plantilla; no toco nada más".
   - Si hay **desactualizadas**, explica qué otras landings usan esa sección y el riesgo de actualizarla. Solo con aprobación explícita usa `--actualizar pp-x,pp-y`. La alternativa es crear una sección nueva.
   - Si la plantilla **existe**, no la sobrescribas: tiene lo editado en Personalizar, fotos incluidas. Solo con aprobación explícita usa `--sobrescribir-plantilla`, o crea la plantilla con otro nombre.
4. **Subir:** el mismo comando con `--subir`. Guarda el respaldo de lo que había en `respaldos/<tienda>/<fecha>/`; haz commit de ese respaldo.
5. **Asignar la plantilla al producto:** `graphql_mutation` con `productUpdate(product: { id, templateSuffix: "<landing>" })`. La app le pide confirmación al usuario.
6. **Verificar:**
   - abre `https://<dominio>/products/<handle>` con Playwright en 390 px;
   - comprueba que cargan las secciones PP;
   - manda captura y enlace al usuario.
7. **Siguiente paso:** el kit de imágenes. Las imágenes, cuando el usuario las tenga en WebP, se subirán y pondrán en la plantilla en un paso futuro. Hoy las sube él en Personalizar.

**Reglas de seguridad:**
- Solo `--nodelete` y solo los archivos del plan.
- Una sección nueva o una plantilla nueva no cambian ninguna página hasta asignarlas, por eso agregar es seguro.
- **No asignes la plantilla** a un producto que ya tiene otra landing vendiendo, sin confirmación.

**Tiendas configuradas en la herramienta:** `tuespaciomarket` (sdv0ep-if.myshopify.com). **Naturixa queda pendiente**: hace falta su dominio `.myshopify.com` y su contraseña de Theme Access; se agrega en `TIENDAS` dentro de `tools/montar-landing.mjs`.

Si la herramienta falla por red o contraseña, no improvises con otro método. Di qué falló y, solo como respaldo, da el paso a paso manual.

### Fase 3 · Kit de imágenes (a mano en ChatGPT; solo cuando el usuario lo pida)
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
      "principal": true,
      "variantes": [{ "nombre": "B", "escena": "…", "textos": ["…"] }],
      "textos": ["Solo en el hero: textos exactos"],
      "comparativa": "Solo si es comparativa: lado izquierdo …; lado derecho …",
      "historial": []
    }
  }
}
```
La herramienta arma sola el prompt completo: qué adjuntar, producto, avatar, escena, ambiente, formato de ChatGPT (cuadrada, vertical u horizontal, más el recorte) y reglas.

**Reglas de las imágenes** (además de `prompts-seguros.md`: realismo y cero rechazos):
- **Siempre en .webp, y debe quedar muy claro en cada prompt.** El generador de imágenes de ChatGPT entrega PNG por defecto y no puede generar WebP directo. Por eso la herramienta arma cada prompt así:
  - abre con "ENTREGA OBLIGATORIA: el archivo final debe ser .webp";
  - cierra con un "PASO FINAL OBLIGATORIO": ChatGPT convierte la imagen a WebP con su herramienta de análisis (Python), con el ancho del espacio y calidad 80, y entrega el enlace del .webp.

  El kit trae además un "mensaje de conversión" para copiar si ChatGPT igual entrega PNG. No quites estas líneas de ningún prompt.
- **Imágenes del hero (galería, imagen 1 a 6): SÍ llevan texto y venden solas.** Es la excepción a "sin texto".
  - **Objetivo:** quitar el dolor y despertar interés por el producto. El producto es el protagonista y la solución se ve.
  - **El hero convence, no vende.** Ninguna imagen del hero lleva nada de venta: ni precio, ni descuento, ni oferta, ni "pagas al recibir", ni envío, ni garantía, ni llamados como "compra ya". Esos ganchos ya están en la oferta con pestañas. El texto habla solo del producto, el beneficio y la transformación.
  - **La imagen 1 es la más importante de toda la landing.** Es lo primero que se ve al entrar y la que retiene o pierde al cliente en un segundo. En el JSON lleva `"principal": true`; el kit la destaca y dice que se haga primero, con más intentos.
    - **Producto protagonista:** idéntico a la foto, grande (entre el 50 y el 70 % del encuadre), completo y nítido, en un contexto real que dice para qué sirve. Nada compite con él.
    - **Texto:** la promesa del ángulo en 2 a 6 palabras (sin copiar el título de la landing palabra por palabra) y, como máximo, 2 o 3 etiquetas de beneficio. Legible en un celular de 390 px.
    - **Se entiende en 1 segundo, sin leer el resto:** qué es, qué resuelve y por qué es deseable.
    - **No es comparativa.** Las comparativas van de la 2 en adelante. No muestra el dolor sin el producto.
    - **Lleva 2 variantes** (`"variantes": [{ "nombre": "B", "escena": "…", "textos": ["…"] }]`) con otro encuadre u otra promesa, para que el usuario elija o pruebe cuál retiene más. Recomienda una y di por qué.
  - **Al menos 2 son comparativas** en dos lados (sin el producto vs con el producto, o la alternativa vs el producto). El contraste lo cuentan la escena y los textos; **nunca se escribe "antes" ni "después"**. Ejemplo: «Por turnos» → «Todo a la vez».
  - **Textos cortos:** un titular de 2 a 6 palabras y, como máximo, 2 o 3 etiquetas de 1 a 4 palabras. Van exactos entre comillas en el prompt. El texto refuerza el ángulo del hero, no repite el título de la landing.
  - **Orden sugerido:**
    1. promesa principal con el producto;
    2. comparativa del dolor resuelto;
    3. mecanismo o característica clave con etiquetas;
    4. segunda comparativa (frente a la alternativa cara o vieja);
    5. resultado en uso real con el avatar;
    6. versatilidad o un segundo uso que despierte deseo (otro espacio, otro momento, otro detalle del producto).
  - **En el JSON del kit:** `"textos": ["…"]` y, si es comparativa, `"comparativa": "lado izquierdo: …; lado derecho: …"`. La herramienta agrega la excepción a la regla de "sin textos" solo en esa imagen.
  - **Revisa la ortografía en la imagen generada.** ChatGPT a veces se equivoca en las tildes; si pasa, se le pide corregir solo el texto.
  - **Cuidado con los productos del cuerpo** (ARVEN, banda): la comparativa muestra comodidad y uso, nunca una "curación" ni cambios corporales. Así la imagen sirve también para anuncios sin romper las políticas de Meta.
- Las de dolor (grid de dolores) no muestran el producto nuevo y no llevan texto.
- Fuera del hero, ninguna imagen lleva texto. Las de galería con texto encima dejan el tercio inferior simple y más oscuro.
- No se generan fotos para reseñas, porque serían clientes falsos.
- Tampoco para íconos ni para la foto del pack, que usa la del producto.

### Fase 4 · Anuncios (opcional, solo cuando el usuario lo pida)
Copy de anuncios para Meta o TikTok, a partir del brief y del ángulo de la landing:
- gancho, cuerpo y llamado a la acción;
- 3 a 5 variantes por ángulo, cada una con la hipótesis que prueba;
- siguiendo las políticas de anuncios (ver `criterio.md` §5).

## Cambios puntuales en los prompts
El usuario indica **número de imagen + parte**, por ejemplo: "imagen 7, escena: sin niños".
- **Escena, persona o formato de una imagen:** cambia solo ese campo de ese espacio y agrega en su `historial` una entrada `{ "fecha", "parte", "cambio" }`. No toques ningún otro espacio. La tarjeta se marca como "Modificada".
- **Ficha, producto, reglas o avatar:** afectan a todas las imágenes. Antes de cambiar, di cuáles se ven afectadas y espera confirmación.
- Si el cambio llega como comentario en el artifact del kit, la tarjeta comentada es la imagen. Responde ahí mismo.
- Regenera el kit, republícalo en la **misma URL** y haz commit.

## Reglas de trabajo con el usuario
- **No modificar lo que no pidió.** Si pide cambiar un título, cambia solo ese título. Si una sección compartida necesita algo nuevo, crea una sección nueva o un ajuste con valor por defecto que deje igual a las demás landings.
- **Si la página ya tiene fotos, nunca le pidas volver a pegar la plantilla**: dale los cambios a mano para Personalizar (sección → campo → texto exacto). Pegar la plantilla solo sirve para landings nuevas sin fotos.
- **El montaje lo haces tú (Fase 2.5).** El paso a paso manual es solo el respaldo, cuando la herramienta no puede:
  1. Editar código → sections → crear o pegar las secciones nuevas o actualizadas.
  2. Editar código → templates → crear `product.<p>` y pegar.
  3. Asignar la plantilla al producto.
  4. Personalizar → subir fotos y videos → Guardar.

  Di qué secciones hay que crear o volver a pegar. Si la plantilla usa un ajuste que la versión de la tienda no tiene, el editor no guarda.
- Confirma que un cambio no afecta a las otras landings y explica por qué.
- Respuestas en español, claras y cortas. Tablas para comparar opciones. Una recomendación, no un menú infinito.
- **No le des la razón por defecto.** Evalúa cada idea con `criterio.md`. Si tiene un problema, dilo con la razón y una alternativa mejor; la decisión final es del usuario.
- Cuando el usuario corrija algo con una razón que sirva a futuro, propón anotarlo en `aprendizajes.md`.

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
