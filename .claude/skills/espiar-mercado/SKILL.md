---
name: espiar-mercado
description: Encuentra los productos de mi mismo nicho que se están vendiendo en el país (Colombia o Guatemala) y cómo los venden (promesa, dolor, transformación, mecanismo, prueba y oferta) para decidir si vale la pena entrar, apalancarse del ángulo y la transformación que ya funcionan, y definir mi plus de producto u oferta con extras para no competir por precio. Antes de gastar define qué se busca (mi producto, Google Trends y TikTok orgánico) y arma un plan de consultas "término - modificador de oferta" (ej. "cinturilla - contra entrega") con costo; con el plan aprobado barre la biblioteca de Meta, filtra lo que no comunica, agrupa por producto competidor con señales de que vende, profundiza en anunciantes y landings, y entrega un mapa con veredicto y estrategia de entrada. Úsala cuando el usuario diga "qué está corriendo la competencia", "espiar el nicho", "productos de mi nicho", "ángulos u ofertas de la competencia", "vale la pena entrar", "cómo diferenciarme", "biblioteca de Meta / TikTok", "Google Trends", "cómo lo venden otros", "validar antes de testear", o antes de la Fase 0 de landing-producto con un producto nuevo.
---

# Espiar el mercado local antes de testear

## Por qué existe
Para saber **qué productos de mi mismo nicho se están vendiendo en el país y cómo los venden**: qué prometen, qué dolor tocan y qué transformación ofrecen. Con eso se decide:
1. **¿Vale la pena entrar?**
2. **¿Me apalanco del ángulo y de la transformación que ya funcionan?** Si el mercado ya los validó, es más barato que inventar uno.
3. **¿Cuál es mi plus?** Uno de dos:
   - **de producto:** algo que mi producto hace o tiene y el de ellos no;
   - **de oferta:** extras que suben el valor percibido, para **no competir por precio**.

La unidad de análisis es el **producto de la competencia**, no el anuncio suelto. Los anuncios y las landings son la evidencia de cómo se vende cada producto. Si un dato no ayuda a estas 3 decisiones, sobra.

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

## Paso 1 · Mi producto e hipótesis (no gasta nada)
Sin conocer mi producto no se puede encontrar el plus. Junta en una sola tanda, sin volver a pedir lo que ya esté en `investigacion/<producto>/` o `briefs/<producto>.md`:
- **Mi producto:** qué es, specs reales, qué trae, foto o enlace del proveedor, y qué tiene distinto (material, tamaño, función, accesorios).
- **Números:** costo, precio objetivo y margen. Definen cuánto se puede invertir en extras sin bajar el precio.
- **Extras posibles:** qué podría sumar a la oferta, por ejemplo un regalo complementario, una segunda unidad, una garantía más fuerte, una guía o asesoría, o un empaque. Incluye cuánto cuesta cada uno.
- **País (CO o GT)** y nombre de carpeta en kebab-case.

Luego escribe la hipótesis en 4 líneas:
- **Problema** que resuelve el producto.
- **Quién lo sufre** y en qué momento.
- **Cómo creemos que lo nombra** la gente: producto, dolor y resultado.
- **Oferta** que pensamos dar.

## Paso 2 · Semillas → Google Trends (cómo nombra la gente el problema)
Propón **6–8 semillas** en 4 grupos y **espera el "sí"**:

| Grupo | Ejemplo (faja) |
|---|---|
| Producto: nombre genérico y regionalismos del país | cinturilla, faja reductora, faja colombiana |
| Problema, en palabras del cliente | barriga, gordito de la espalda, abdomen posparto |
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
Con Trends y TikTok elige **2–4 términos** validados: producto o sub-nicho, y al menos uno de dolor si tuvo volumen. Cruza cada término con los **modificadores de oferta** del país:
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

## Paso 6 · Elegir los productos de la competencia y profundizar (aprobación)
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

## Paso 7 · Ficha de cada producto de la competencia (lo hace Claude, mirando de verdad)
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

## Paso 8 · Entregable: `investigacion/<producto>/mercado/mapa-mercado.md`
Termina en una decisión. Cada afirmación lleva su enlace. Nada inventado.

```markdown
# Mapa de mercado · <Producto> · <País> · <fecha>

## 1. Veredicto: ¿vale la pena entrar?
**Sí · Sí, con diferenciación · No**, en 3 líneas con el porqué.
| Criterio | Lectura | Evidencia |
|---|---|---|
| Demanda | Trends: volumen, tendencia, temporada | |
| Validación | cuántos productos del nicho muestran señales de que venden | |
| Saturación | cuántos venden lo mismo, con el mismo ángulo y la misma oferta | |
| Espacio para un plus | ¿hay algo que nadie ofrece en producto u oferta? | |
| Precio y margen | rango de precio del mercado frente a mi costo: ¿me alcanza para extras sin bajar el precio? | |
Competencia validada no es motivo para no entrar: es la prueba de que se vende. Lo que decide es si hay espacio para un plus y si el margen aguanta.

## 2. Productos de la competencia
Una ficha por producto (Paso 7), primero los validados.

## 3. Qué se repite en el nicho
| | Lo dominante | Quién lo usa | Ejemplo |
|---|---|---|---|
| Promesa | | | |
| Dolor | | | |
| Transformación | | | |
| Mecanismo | | | |
| Oferta | | | |
Más: precio típico y rango · la oferta más agresiva · las debilidades que comparten todos.

## 4. Cómo nombra la gente el problema
Trends (vocabulario, lo que sube, regiones) + TikTok (sub-nichos, ganchos, dudas reales).

## 5. Estrategia de entrada: mismo ángulo + mi plus
- **Ángulo y transformación a apalancar:** el validado, con su evidencia.
- **Plus de producto:** qué tiene mi producto que el de ellos no, y cómo se demuestra en el anuncio y en la landing. Si no hay, se dice.
- **Plus de oferta (para no competir por precio):** extras que suben el valor percibido.
  | Extra | Costo para mí | Qué objeción o deseo resuelve | Valor percibido | ¿Alguien lo da? |
  Regla: cada extra debe quitar una objeción del nicho o reforzar la transformación; no se suma relleno. El costo de los extras no se come el margen.
- **Plus de mensaje:** la misma transformación, pero más específica, con mecanismo o con mejor prueba. Atacar las debilidades del punto 2.
- **Precio:** dentro del rango del mercado, sostenido por el valor de la oferta. No ser el más barato.

## 6. Qué testear
2–3 variantes, cada una con: ángulo, gancho de ejemplo, promesa del hero, oferta y formato (estático y video).
Qué NO copiar (claims riesgosos o médicos, lo que ya está quemado).
```
En el chat, presenta solo el veredicto, la tabla de productos (una línea por ficha), la estrategia de entrada y qué testear. Si el usuario lo quiere para el equipo, publícalo como artifact con las capturas.

## Cómo se conecta con `landing-producto`
- La Fase 0 de `landing-producto` usa el mapa: va al `dossier.md` (competencia) y al brief (ángulos, oferta, qué promete el anuncio). No se vuelve a revisar Meta.
- El `copywriter-respuesta-directa` y el `director-creativo` leen el mapa: el hero no puede sonar igual al de la competencia y debe atacar el hueco elegido.
- `deep-research-ia-commerce` sigue siendo la fuente de **voz del cliente** (reseñas, Reddit, MercadoLibre). Esta skill es la fuente de **qué hace la competencia local**.

## Commit
Haz commit de `investigacion/<producto>/mercado/` en la rama de trabajo.

## Errores conocidos
- `⚠️ <fuente>: …` en una consulta no frena las demás. Repite solo esa con `--solo`.
- Consulta "vacía": prueba otra forma de escribir el término o el modificador antes de concluir que no hay mercado.
- Si `creativos` baja 0 imágenes, las URLs vencieron: corre `anuncios --solo …` y enseguida `creativos`.
- Landings vacías o que no cargan: repite esa sola con `--url`; si sigue fallando, anótalo y sigue.
