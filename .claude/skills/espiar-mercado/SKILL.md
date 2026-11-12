---
name: espiar-mercado
description: Encuentra los productos de mi mismo nicho que se están vendiendo en el país (Colombia o Guatemala) y cómo los venden (promesa, dolor, transformación, mecanismo, prueba y oferta) para decidir si vale la pena entrar, apalancarse del ángulo y la transformación que ya funcionan, y definir mi plus de producto u oferta con extras para no competir por precio. Antes de gastar define qué se busca (mi producto, Google Trends y TikTok orgánico) y arma un plan de consultas "término - modificador de oferta" (ej. "cinturilla - contra entrega") con costo; con el plan aprobado barre la biblioteca de Meta, filtra lo que no comunica, agrupa por producto competidor con señales de que vende, profundiza en anunciantes y landings, y entrega un mapa con veredicto y estrategia de entrada. Va entre la investigación profunda (dolores) y el brief. Úsala cuando el usuario diga "qué está corriendo la competencia", "espiar el nicho", "productos de mi nicho", "ángulos u ofertas de la competencia", "vale la pena entrar", "cómo diferenciarme", "biblioteca de Meta / TikTok", "Google Trends", "cómo lo venden otros", "validar antes de testear", o antes de la Fase 0 de landing-producto con un producto nuevo.
---

# Espiar el mercado local antes de testear

## Por qué existe
Es el puente entre la **investigación profunda** y el **brief**. El proceso del producto es:

`deep-research-ia-commerce` → `dossier.md` (dolores) → **`espiar-mercado`** (ángulo y si vale la pena entrar) → `brief` → copywriter → director

La investigación profunda dice **qué le duele al cliente**. Esta skill dice **qué ya está vendiendo la competencia local con esos dolores** y con eso decide:
1. **¿Vale la pena entrar?**
2. **¿Cuál es el ángulo?** Se elige cruzando cada dolor del dossier con lo que la competencia ya explota:
   - apalancarse de uno que el mercado ya validó;
   - o atacar un dolor fuerte que nadie anuncia.
3. **¿Cuál es mi plus?** De producto, de ángulo (otro avatar o sub-nicho para el mismo producto) o de oferta con extras. Así **no se compite por precio**.

**Por qué hace falta en dropshipping:** con el catálogo público de Dropi, cualquiera vende el mismo producto, con el mismo costo y las mismas fotos. Si todos lo venden igual, la única palanca que queda es el precio y gana quien más baja. Esta skill detecta eso **antes** de armar la landing, y busca por dónde no pelear por precio.

**Lo que NO hace:**
- No investiga la voz del cliente: eso es la investigación profunda.
- No escribe copy: eso es el copywriter.
- Su salida es la decisión de entrada y el ángulo con evidencia, listos para el brief.

La unidad de análisis es el **producto de la competencia**, no el anuncio suelto. Los anuncios y las landings son la evidencia de cómo se vende cada producto.

## El problema que resuelve
En la biblioteca de anuncios, con palabras mal elegidas la búsqueda no termina: llegan marcas, tiendas físicas y anuncios que no comunican nada, que solo "parecen ganadores" porque llevan muchos días corriendo. Eso gasta tiempo, tokens y saldo de Apify. Por eso esta skill funciona **de lo barato y amplio a lo caro y preciso**, y **nada caro se corre sin un plan aprobado**.

## Principios (no negociables)
- **Claridad antes de gastar.** Hay 3 puntos de aprobación: semillas, plan de búsqueda y productos de la competencia a profundizar.
- **El método del usuario: `término - modificador de oferta`.** En la biblioteca de Meta, el usuario busca `cinturilla - contra entrega`, y así trae solo anuncios que tienen las dos cosas. El modificador de oferta filtra a quien vende producto físico con oferta, que es la competencia real. En la prueba, 9 de 10 anuncios de `cinturilla - contra entrega` servían.
- **La búsqueda es literal.** "contra entrega" y "contraentrega", o "envío" con tilde y sin tilde, traen anuncios distintos. Se prueban las variantes que use el mercado.
- **Un anuncio cuenta si comunica, no por sus días.** Tiene que ser del nicho, tener una oferta y tener copy real. Los días activo y las copias solo **desempatan**.
- **Variedad, no ranking.** El objetivo es ver los distintos fondos de oferta y ángulo del nicho. Por eso se elige un anuncio representativo por anunciante, formato y oferta.
- **Corte explícito.** Si una consulta trae basura, el término se descarta. Si ya no trae anunciantes nuevos, no se pide más.

## Herramientas
Todo pasa por Apify con `tools/espiar-mercado.mjs`. El token es secreto de red del entorno: nunca lo pidas por el chat. Siempre se corre así:
```bash
NODE_USE_ENV_PROXY=1 node --no-warnings tools/espiar-mercado.mjs <modo> <producto> [opciones]
```
- La red del entorno **no deja entrar directo** a tiendas ajenas ni a los CDN de Meta/TikTok. Por eso landings e imágenes también se bajan vía Apify. No las abras con Playwright local ni con curl.
- La biblioteca **oficial de anuncios de TikTok solo tiene anuncios de Europa**; para Colombia y Guatemala no sirve. TikTok se usa en su **búsqueda orgánica**, como fuente de indicios: vocabulario, sub-nichos, ganchos y dudas.
- Dropkiller está conectado, pero el plan es FREE y su MCP responde bloqueado. Si el usuario sube a Advanced, úsalo para las transcripciones de video, que es el hueco principal.
- Costos medidos (nov. 2026):
  - Meta: unos 0,00075 USD por anuncio.
  - Trends: unos 0,006 USD por palabra.
  - TikTok: unos 0,004 USD por video.
  - Landing: unos 0,012 USD cada una.

  Una investigación completa, bien planeada, cuesta **unos 0,20–0,40 USD**. El script muestra el costo antes de cada paso.

Todo queda en `investigacion/<producto>/mercado/`.

## Paso 0 · Conexión
Corre `bash tools/conexiones.sh`; basta con **Apify ✅**. Si sale ❌, sigue lo que dice `landing-producto`: verificar el entorno Default y usar `request_credential` para `api.apify.com`.

## Paso 1 · Insumos: dossier, mi producto y números (no gasta nada)
1. **Dossier.** Lee `investigacion/<producto>/dossier.md`: mapa de dolor, dolores por frecuencia e intensidad, deseos, objeciones y frases textuales.
   - **Si no existe**, propón correr primero `deep-research-ia-commerce`. Sin dolores verificados, el cruce del Paso 8 no tiene base.
   - Si el usuario quiere avanzar igual, trabaja con dolores marcados **[Hipótesis]** y avísale que el veredicto queda débil.
2. **Mi producto:** qué es, specs reales, qué trae, enlace o ID de Dropi o del proveedor, y qué tiene distinto (material, tamaño, función, accesorios).
3. **Números:** costo, precio objetivo y margen. Definen cuánto se puede invertir en extras sin bajar el precio.
4. **Extras posibles:** regalo complementario, segunda unidad, garantía más fuerte, guía o asesoría, empaque, con el costo de cada uno.
5. **País (CO o GT)** y carpeta. Debe ser la misma de la investigación profunda.

No vuelvas a pedir lo que ya esté en el dossier o en `briefs/<producto>.md`.

## Paso 2 · Semillas → Google Trends (cómo nombra la gente el problema)
Propón **6–8 semillas** en 4 grupos y **espera el "sí"**:

| Grupo | Ejemplo (faja) |
|---|---|
| Producto: nombre genérico y regionalismos del país | cinturilla, faja reductora, faja colombiana |
| Problema, en palabras del cliente (**sale del mapa de dolor del dossier**) | barriga, gordito de la espalda, abdomen posparto |
| Resultado | cintura de avispa, reloj de arena |
| Uso o comprador | faja posparto, faja para hombre |

```bash
... espiar-mercado.mjs palabras <producto> --pais CO "semilla 1" "semilla 2" ...
```
Lee `mercado/palabras.md` y saca de ahí:
- **El vocabulario real.** El volumen comparado dice qué palabra usa la gente. En la prueba, "cinturilla" tenía 72 y "faja reductora" 2: buscar con la segunda era perder el tiempo.
- **Las palabras de dolor.** Por ejemplo, búsquedas tipo "cómo quitar…".
- **Lo que está subiendo.** Es demanda nueva y un posible ángulo que nadie usa todavía.
- **Regiones y temporada.**

Una palabra con volumen 0 en el país no va a Meta, pero se anota.

## Paso 3 · TikTok orgánico (indicios del problema)
Con las 2–4 mejores palabras de Trends, máximo 15 videos por palabra:
```bash
... espiar-mercado.mjs tiktok <producto> --pais CO "palabra 1" "palabra 2" --n 15
```
De `mercado/tiktok.md` sale:
- **Hashtags que se repiten = sub-nichos.** Por ejemplo #fajaposparto o #fajaparahombre. Se vuelven términos del plan y posibles ángulos.
- **La primera frase de los videos con más vistas = ganchos** que enganchan en ese problema.
- **Respuestas a comentarios = dudas y objeciones reales.** Por ejemplo talla, si se nota bajo la ropa o si da calor.

## Paso 4 · Plan de búsqueda en Meta (no gasta; **aprobación obligatoria**)
Con Trends y TikTok elige **2–4 términos** validados: producto o sub-nicho, y al menos uno por cada dolor del **top 3 del dossier**, si tuvo volumen. Así se sabe qué dolores ya explota la competencia y cuáles no. Cruza cada término con los **modificadores de oferta** del país:
- **CO:** contra entrega · contraentrega · envío gratis · pago al recibir · paga en casa
- **GT:** contra entrega · envío gratis · paga al recibir · pago al recibir · toda Guatemala. **Valida esta lista con el usuario**: el vocabulario guatemalteco cambia.

```bash
... espiar-mercado.mjs plan <producto> --pais CO --terminos "cinturilla,faja posparto" \
    [--mods "contra entrega,envío gratis"] [--relevantes "cinturilla,faja,posparto"] [--n 20]
# o una matriz a medida:  --matriz "cinturilla:contra entrega|contraentrega;faja posparto:envío gratis"
```
- No hace falta cruzar todo con todo. Usa la matriz para quedarte con las combinaciones con sentido, **6–8 consultas como máximo**.
- `--relevantes`: palabras de las que al menos una debe estar en el copy para que el anuncio cuente como del nicho. Incluye el producto y los sub-nichos.
- Muestra `mercado/plan.md` con las consultas, el costo y la regla de corte. **Espera el "sí".** El usuario puede quitar, agregar o cambiar modificadores.

## Paso 5 · Correr el plan y aplicar la regla de corte
```bash
... espiar-mercado.mjs anuncios <producto>
```
Cada consulta corre por separado (20 anuncios por defecto), y luego el script:
1. **Filtra.** El anuncio debe ser del nicho, tener al menos una oferta y tener copy real (60 caracteres o más). Los demás quedan como descartados, con su motivo.
2. **Etiqueta las ofertas:** contraentrega, envío gratis, combo, descuento, precio, regalo, garantía, urgencia y CTA a WhatsApp. También marca el destino: web o WhatsApp.
3. **Da un veredicto por consulta:**

   | Veredicto | Qué significa | Qué hacer |
   |---|---|---|
   | da para más | trajo el máximo y siguen apareciendo anunciantes nuevos | repetirla con más anuncios |
   | agotada | ya no aparecen anunciantes nuevos | no pedir más |
   | basura | más de la mitad no era del nicho | descartar el término |
   | vacía | no trajo nada | probar otra variante de escritura |

4. **Elige por variedad:** un representante por anunciante, formato y oferta (máximo 30), en `seleccion.json`.
5. **Agrupa por producto de la competencia** (`productos.json`), con sus señales de que vende.

Muestra la tabla de rendimiento por consulta. Solo las que "dan para más" se repiten, **con aprobación**:
```bash
... espiar-mercado.mjs anuncios <producto> --solo 1,3 --n 50
```
Los resultados se acumulan; no se repiten anuncios.

## Paso 6 · Dropi: ¿es un producto de catálogo público? (solo lectura, gratis)
Con la herramienta de Dropi (`list_products`, con `search` = una palabra del nombre y `get_stock: true`) busca **mi producto y sus equivalentes** en el catálogo:
- **Cuántos proveedores** lo tienen, a qué **costo** y con qué **precio sugerido**. Di siempre la moneda.
- **Stock.** Mucho stock en varios proveedores es señal de que se vende mucho y de que lo venden muchos.
- **Precio piso del mercado:** costo de Dropi + flete + un margen mínimo. Por debajo de eso nadie gana.

Luego compáralo con la competencia (Paso 8):
- **¿Los productos de la competencia son el mismo de Dropi?** Mira el nombre, las fotos de la landing y las specs. Si lo son, es **competencia directa** con el mismo costo que tú.
- **Riesgo de guerra de precios:** es alto si varios anunciantes venden el mismo producto de Dropi, con el mismo ángulo y la misma oferta, y a un precio cercano al piso.

La cuenta de Dropi conectada muestra el catálogo de su país. Si el análisis es de Guatemala y la cuenta es de Colombia, dilo y usa el costo que dé el usuario.

## Paso 7 · Elegir los productos de la competencia y profundizar (aprobación)
`anuncios.md` trae la tabla **Productos de la competencia**:
- Agrupa por página de producto. Si el anuncio manda a WhatsApp, cuenta un producto por anunciante.
- Muestra las **señales de que vende**: varios anuncios activos, creativo duplicado (lo están escalando), 30+ días activo, o que lo vendan varios anunciantes.
- **Validado** = 2 señales o más.

Propón **4–6 productos**:
- **Primero los validados.** Son la prueba de que el mercado compra ese ángulo y esa transformación.
- **Luego 1–2 que vayan por otro camino** (otro ángulo u otra oferta), para comparar.

Si un producto se ve muy parecido al tuyo, inclúyelo siempre: es tu competencia directa.

Con la aprobación, profundiza en sus anunciantes y baja creativos y landings:
```bash
... espiar-mercado.mjs anunciante <producto> --ids <page_id>,<page_id> [--n 40]   # todos sus anuncios activos
... espiar-mercado.mjs creativos  <producto> --top 15                            # justo después: las URLs vencen
... espiar-mercado.mjs landings   <producto> --top 6                             # una por producto, validados primero
```

## Paso 8 · Ficha de cada producto de la competencia (lo hace Claude, mirando de verdad)
Por cada producto elegido, junta su evidencia: sus 2–4 mejores anuncios (`productos.json` → `ejemplos`), sus creativos y su landing. No leas `anuncios.json` completo, que gasta tokens sin sumar.
- **Estáticos:** ábrelos con `Read` en `mercado/creativos/`.
- **Videos:** no se pueden ver. Usa la portada, el copy y su primera frase. Si uno es clave, pídele al usuario que te cuente sus primeros 3 segundos.
- **Landing:** abre con `Read` el hero y la captura completa, y lee el `.txt`.

Llena esta ficha. Lo textual va entre comillas y con su enlace:

| Campo | Qué poner |
|---|---|
| Producto | qué es, en una línea, y qué tan parecido es al mío (igual / similar / sustituto) |
| Promesa | la frase principal, textual (hero de la landing o gancho del anuncio) |
| Dolor que toca | el dolor concreto, con sus palabras |
| Transformación | **antes → después** que vende (qué cambia en la vida del cliente) |
| Mecanismo | por qué dice que funciona (varillas, compresión, material, tecnología) |
| Prueba | testimonios, antes/después, número de clientes, reseñas, demostraciones |
| Oferta completa | precio, ancla tachada, combos, regalos, envío, contraentrega, garantía, urgencia |
| Formatos | estático o video, y de qué tipo |
| Señales de que vende | las del script, más lo que se vea al profundizar |
| Debilidades | qué no dice, qué objeción no responde, qué promete sin probar, dónde se ve barato o poco confiable |

### El cruce que define el ángulo: dolor × competencia
Toma cada dolor del dossier (top 3 y los siguientes con buena frecuencia) y crúzalo con las fichas:

| Dolor (dossier) | Fuerza en VOC (frecuencia e intensidad) | Productos que lo atacan | ¿Alguno validado? | Cómo lo ejecutan (promesa y oferta) | Cuadrante |
|---|---|---|---|---|---|

| Cuadrante | Cómo se ve | Qué significa |
|---|---|---|
| **Validado con espacio** | lo atacan 1–3 productos, venden, pero la ejecución es floja o la oferta es genérica | **El mejor ángulo**: el mercado ya probó que compra, y se gana con el plus |
| **Validado saturado** | muchos lo atacan, con la misma promesa, la misma oferta y precio cerca del piso | Solo con un plus claro (producto, avatar u oferta); si no hay, es guerra de precios |
| **Hueco** | dolor fuerte en VOC y nadie lo anuncia | Oportunidad sin validar: va como ángulo **secundario** del test, no como el principal |
| **Débil** | poca VOC y nadie lo anuncia | Descartar |

**Ángulo diferenciado sin cambiar de producto.** En dropshipping el mismo producto se puede vender a otro avatar o para otro uso: posparto, gym, hombre, oficina, regalo. Si el dolor general está saturado pero un sub-nicho (de TikTok o del dossier) no lo ataca nadie, ese es el ángulo.

## Paso 9 · Entregable: `investigacion/<producto>/mercado/mapa-mercado.md`
Termina en una decisión. Cada afirmación lleva su enlace. Nada inventado.

```markdown
# Mapa de mercado · <Producto> · <País> · <fecha>

## 1. Veredicto: ¿vale la pena entrar?
**Sí · Sí, con diferenciación · No**, en 3 líneas con el porqué.
| Criterio | Lectura | Evidencia |
|---|---|---|
| Demanda | Trends: volumen, tendencia, temporada | |
| Validación | cuántos productos del nicho muestran señales de que venden | |
| Catálogo Dropi | ¿es el mismo producto de catálogo público? cuántos proveedores, costo, precio sugerido | |
| Guerra de precios | cuántos venden el mismo producto, con el mismo ángulo y oferta, cerca del precio piso | |
| Espacio para un plus | ¿hay un dolor o avatar sin explotar, o una oferta que nadie da? | |
| Margen | mi costo frente al rango de precio: ¿alcanza para extras sin bajar el precio? | |
**Regla:** competencia validada no es motivo para no entrar, porque prueba que se vende. Es **No** cuando todos venden el mismo producto de Dropi, igual, cerca del piso, y no hay plus de producto, ni de ángulo, ni margen para un plus de oferta.

## 2. Dolor × competencia (de aquí sale el ángulo)
La tabla del cruce con su cuadrante, y el **ángulo recomendado** con su evidencia: el dolor (cita del dossier) y el mercado (productos y enlaces).

## 3. Productos de la competencia
Una ficha por producto (Paso 8), primero los validados. Marca cuáles son el mismo producto de Dropi.

## 4. Qué se repite en el nicho
| | Lo dominante | Quién lo usa | Ejemplo |
|---|---|---|---|
| Promesa | | | |
| Dolor | | | |
| Transformación | | | |
| Mecanismo | | | |
| Oferta | | | |
Más: precio típico, rango y precio piso de Dropi · la oferta más agresiva · las debilidades que comparten todos.

## 5. Mi plus (para no competir por precio)
- **Plus de producto:** qué tiene mi producto que el de ellos no, y cómo se demuestra. Si no hay, se dice.
- **Plus de ángulo:** el avatar o sub-nicho que nadie ataca, si aplica.
- **Plus de oferta:**
  | Extra | Costo para mí | Qué objeción del dossier o deseo resuelve | Valor percibido | ¿Alguien lo da? |
  Cada extra quita una objeción o refuerza la transformación; no se suma relleno. El costo de los extras no se come el margen.
- **Plus de mensaje:** la misma transformación, pero más específica, con mecanismo o con mejor prueba, atacando las debilidades de la competencia.
- **Precio:** dentro del rango del mercado, sostenido por el valor de la oferta. No ser el más barato.

## 6. Para el brief (se copia en `briefs/<producto>.md`)
- **§4 Ángulos e hipótesis:** el ángulo principal recomendado y 1–2 secundarios. Cada uno con su dolor, su cuadrante y su evidencia de mercado, y la hipótesis "Creemos que <público> compra más con <ángulo> porque <razón>. Lo sabremos si <métrica>."
- **§5 Oferta:** precio en el rango del mercado, oferta por cantidad y extras elegidos con su costo.
- **§7 Competencia:** quién lo vende, a qué precio y con qué promesa (las 3–5 fichas clave), y **qué hacemos distinto**.
- **Qué NO copiar:** claims riesgosos o médicos, promesas quemadas.
- **Qué promete el anuncio:** el gancho propuesto para el anuncio que trae el tráfico, coherente con el ángulo.
```
En el chat, presenta solo el veredicto, el cruce dolor × competencia con el ángulo recomendado, el plus y el bloque para el brief. **El ángulo principal lo decide el usuario**: tú recomiendas con evidencia. Si el usuario lo quiere para el equipo, publícalo como artifact con las capturas.

## Cómo se conecta con `landing-producto`
- Va en la **Fase 0**, después de la investigación profunda y antes del brief.
- Su bloque **"Para el brief"** llena las secciones 4, 5 y 7 de `briefs/<producto>.md`. La sección de competencia del `dossier.md` remite al mapa. La biblioteca de Meta que revisa la investigación profunda es general; el mapa es la fuente local y la que decide.
- Con el brief confirmado, el `copywriter-respuesta-directa` **usa el ángulo del brief**, no elige otro. Lee el mapa para no sonar igual a la competencia y para explotar el plus.
- El `director-creativo` revisa que el copy sostenga ese ángulo y que el hero no suene igual a los productos validados del mapa.

## Commit
Haz commit de `investigacion/<producto>/mercado/` en la rama de trabajo.

## Errores conocidos
- `⚠️ <fuente>: …` en una consulta no frena las demás. Repite solo esa con `--solo`.
- Consulta "vacía": prueba otra forma de escribir el término o el modificador antes de concluir que no hay mercado.
- Si `creativos` baja 0 imágenes, las URLs vencieron: corre `anuncios --solo …` y enseguida `creativos`.
- Landings vacías o que no cargan: repite esa sola con `--url`; si sigue fallando, anótalo y sigue.
