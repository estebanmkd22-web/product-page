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

## Paso cero, siempre: conexiones
Al activarte, antes de cualquier otra cosa, corre `bash tools/conexiones.sh` y muestra el resultado en una línea por servicio.
- Revisa **Apify**, **Theme Access de Shopify** y **Kie**, y deja lista la configuración de la skill `deep-research-ia-commerce` para que no vuelva a pedir el token de Apify.
- **Las claves son secretos de red del entorno "Default"**: el proxy las pone solo en cada llamada a su dominio. No están en archivos, y por eso no se pierden al cambiar de rama ni de sesión.
- **Nunca le pidas una clave al usuario** si sale ✅. Tampoco la busques en `~/.claude/settings.json`.
- **Para scripts y la CLI que exigen una clave**, usa un valor de relleno (`proxy-injected`); el proxy lo reemplaza. Para la Shopify CLI: `NODE_USE_ENV_PROXY=1` y `SHOPIFY_HTTPS_PROXY=$HTTPS_PROXY` (ya lo hace `tools/montar-landing.mjs`).
- **Si algo sale ❌:**
  - verifica con `get_environment` que la sesión esté en el entorno "Default";
  - si lo está y aun así falla, pide la clave con `request_credential` para ese dominio: `api.apify.com`, o `theme-kit-access.shopifyapps.com` con el header `X-Shopify-Access-Token` y sin prefijo.

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

## Proceso por fases, cada una se aprueba antes de seguir

### Fase 0 · Investigación y brief (sin brief confirmado no hay copy)
1. **Datos obligatorios del usuario**, en una sola tanda (ver `brief.md`):
   - producto, foto y specs;
   - precio, oferta por cantidad, garantía y margen;
   - a quién cree que le vende y qué ángulo quiere probar;
   - límites (claims prohibidos, registro sanitario, bonos que puede cumplir);
   - **qué promete el anuncio** que trae el tráfico y, si la landing ya existe, sus datos de Clarity.

   Lo que ya dijo antes no se vuelve a pedir.
2. **Investigación profunda:** ejecuta la skill `anthropic-skills:deep-research-ia-commerce` con el producto y el mercado (Colombia o Guatemala). Ya investiga Amazon, Reddit, MercadoLibre, la biblioteca de anuncios de Meta, YouTube y Google, y entrega un informe de 19 secciones con citas textuales. No vuelvas a investigar esas fuentes por tu cuenta.
   - Guarda el informe en `investigacion/<producto>/informe.html`. Si sale en otro formato, guarda ese.
   - Escribe `investigacion/<producto>/dossier.md`, el resumen que usan los expertos:
     - frases textuales de clientes;
     - **mapa de dolor del top 3**: dolor, momento exacto, consecuencia, emoción y frase textual con su fuente (el hero solo puede salir de aquí);
     - dolores ordenados por frecuencia e intensidad;
     - deseos;
     - objeciones;
     - nivel de consciencia y sofisticación;
     - competencia (precios, promesas, ganchos de anuncios con más tiempo activos);
     - brechas u oportunidades;
     - claims permitidos y prohibidos.

     Cada punto lleva su fuente.
3. **Operación (iComfly, solo lectura, opcional):** si el producto o uno parecido ya se vendió, revisa las novedades, los rechazos al recibir y las devoluciones para detectar objeciones de confianza o entrega. El usuario no vende por WhatsApp, así que los chats sirven poco para el copy: no les dediques más que una revisión corta. Agrega lo que encuentres al dossier, **sin nombres ni datos personales**.
4. **Brief prellenado:** llena `briefs/<producto>.md` con los datos del usuario más el dossier. Marca **[Hipótesis]** lo que no esté confirmado. Opina con criterio (`criterio.md`): si el ángulo, la oferta o un claim tienen problemas, dilo. Muéstralo y espera la confirmación.

### Fase 1 · Copy con dos expertos (el usuario aprueba solo el resultado final)
Con el brief confirmado, el copy lo escriben y revisan dos agentes del proyecto (`.claude/agents/`):
1. **`copywriter-respuesta-directa`** escribe `copy/<producto>/v1.md`: estrategia, 4 heroes con puntaje, subtítulo, bullets, todas las secciones de la maqueta con ATIDCOA, las 6 imágenes del hero y las objeciones cubiertas. Cada promesa con su respaldo.
2. **`director-creativo`** lo revisa con su rúbrica y escribe `copy/<producto>/revision-v1.md`: APROBADO o CAMBIOS REQUERIDOS, con bloqueantes concretos. Pásale solo las rutas de los archivos, nunca el razonamiento del copywriter, para que su revisión sea independiente.
3. Si hay cambios, el copywriter corrige (`v2.md`) y el director vuelve a revisar. **Máximo 3 rondas.** Si después de la tercera sigue sin aprobar, presenta al usuario la versión final con los desacuerdos abiertos y las dos posturas.
4. **Presenta al usuario solo el resultado:**
   - el hero elegido (y las alternativas, por si prefiere otra);
   - el copy por sección, en resumen;
   - las 6 imágenes del hero;
   - el "Resumen para el dueño" del director y qué cambió entre rondas.

   Espera su aprobación o sus cambios puntuales. Un cambio del usuario manda sobre el director.
5. Si el usuario corrige algo con una razón que sirva a futuro, propón anotarlo en `aprendizajes.md`. Los dos agentes lo leen en cada producto.

Haz commit de `investigacion/`, `briefs/` y `copy/` en cada etapa.

**Reglas del hero** (las aplican el copywriter y el director; tú también las verificas). Dato real que las motiva: en VIVIDUS, el 68 % de los visitantes se fue sin bajar del 10 % de la página, aunque pasaron unos 52 segundos en la primera pantalla.
- **La primera pantalla del celular es el hero:** la franja animada, la **imagen 1** (dos tercios de la pantalla), el título y el subtítulo. Ahí se decide si el cliente baja.
- **ATI en los primeros 3 segundos:**
  - **Atención:** el dolor número 1 del mapa de dolor, con las palabras del cliente, para que piense "eso me pasa a mí".
  - **Transformación:** la vida con el dolor resuelto, visible en la imagen 1.
  - **Interés:** algo nuevo, específico o inesperado (el mecanismo, un dato, un contraste) que dé curiosidad de seguir.
- **Hero dopamínico** (si falla uno, es bloqueante para el director):
  - nombra un **dolor concreto del top 3** del mapa de dolor, no un beneficio genérico ni solo un deseo de estatus;
  - **máximo 10 palabras** en el título, con tensión emocional (frustración, vergüenza, cansancio, miedo a perder) y la parte fuerte en `<em>…</em>`;
  - **específico:** momentos, escenas o números reales ("la familia esperando a la 1"), nunca "mejora tu vida";
  - **prueba del pulgar:** si lo ve 2 segundos mientras desliza en Instagram, ¿se detiene? Si no, no sirve.
- **Coherencia con el anuncio:** el hero continúa la promesa del anuncio que trae el tráfico (está en el brief). Si el anuncio promete A y el hero habla de B, el cliente se va.
- **Nunca en pregunta**, porque despierta más dudas.
- **El subtítulo** amplía el dolor o la transformación en una línea. No repite el título.
- **Bullets:** formato `<strong>Beneficio:</strong> explicación concreta` (3 o 4), cada uno quita un dolor o una objeción del mapa.
- Chips (`zonas_titulo`/`zonas`) solo si suman.
- **La franja animada de arriba** no abre vendiendo: el primer mensaje refuerza el gancho o da prueba (por ejemplo, "+500 clientes en Colombia" si es real). Lo de envío y pago va después.
- **Revisión de la primera pantalla:** antes de dar el copy por aprobado, arma una vista previa del hero, saca una captura a 390 × 750 y pásasela al director. Él la juzga con la prueba del pulgar, no solo el texto.

### Fase 2 · Landing (solo con el copy final aprobado)
Antes de armar, presenta el plan y espera confirmación: secciones en orden, oferta, paleta, colores y garantía. Arma solo lo confirmado.
**Maqueta base:** `preview/paginas/arven-fold.json`, la versión más completa de la maqueta de la rama de 1,5 m. Cópiala como `preview/paginas/<producto>.json` y pon el copy final aprobado (`copy/<producto>/vN.md`) campo por campo, sin reescribirlo. El orden base con su papel en ATIDCOA:

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
3. Usa como base la sección "Imágenes del hero" del copy aprobado: escenas y textos exactos. Elige el **avatar del banco** (`avatares/banco.json`, fotos en `avatares/fotos/`) según el público, y confírmalo con el usuario. **Nunca inventes una persona solo con texto.** Si ningún avatar sirve, pídele al usuario una foto para agregarla al banco.
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
  - **La imagen 1 es la más importante de toda la landing:** ocupa dos tercios de la primera pantalla y es el verdadero hero. En el JSON lleva `"principal": true`; el kit la destaca y dice que se haga primero, con más intentos.
    - **Lleva el gancho:** un titular grande en la imagen (2 a 7 palabras) con el **dolor que se va** o la transformación, sacado del mapa de dolor y con las palabras del cliente. Ejemplos de forma: «Se acabó cocinar por turnos», «Adiós al ardor del roce». Más 1 o 2 etiquetas cortas.
    - **Producto protagonista**, idéntico a la foto y grande, en el momento en que resuelve el dolor.
    - **Puede mostrar el dolor que se va** (contraste en la misma escena, o una pequeña zona del problema frente al producto), siempre sin escribir "antes" ni "después".
    - **Nada de venta:** sin precio, pagos, envío ni garantía.
    - **Se entiende en 1 segundo:** qué dolor quita y por qué lo quiero.
    - **Lleva 2 variantes** (`"variantes": [{ "nombre": "B", "escena": "…", "textos": ["…"] }]`) con otro dolor del top 3 u otro encuadre, para probar cuál retiene más. Recomienda una y di por qué.
  - **Al menos 2 son comparativas** en dos lados (sin el producto vs con el producto, o la alternativa vs el producto). El contraste lo cuentan la escena y los textos; **nunca se escribe "antes" ni "después"**. Ejemplo: «Por turnos» → «Todo a la vez».
  - **Textos cortos:** un titular de 2 a 6 palabras y, como máximo, 2 o 3 etiquetas de 1 a 4 palabras. Van exactos entre comillas en el prompt. El texto refuerza el ángulo del hero, no repite el título de la landing.
  - **Orden sugerido:**
    1. el gancho: el dolor que se va, con el producto protagonista;
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
