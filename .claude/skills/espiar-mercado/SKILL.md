---
name: espiar-mercado
description: Investiga cómo anuncia la competencia LOCAL (Colombia o Guatemala) un producto o nicho antes de testearlo, sin búsquedas eternas ni anuncios basura. Primero define qué se busca (hipótesis, vocabulario con Google Trends e indicios en TikTok orgánico), arma un plan de consultas "término - modificador de oferta" (ej. "cinturilla - contra entrega") con costo y tope, y solo con el plan aprobado barre la biblioteca de Meta, filtra lo que no comunica, elige por variedad de oferta y ángulo, profundiza en los anunciantes clave y sus landings, y entrega un mapa de mercado con ángulos, dolores, promesas, ofertas, huecos y los ángulos recomendados para testear. Úsala cuando el usuario diga "qué está corriendo la competencia", "espiar el nicho", "anuncios del nicho", "ángulos u ofertas de la competencia", "palabras clave del producto", "biblioteca de Meta / TikTok", "Google Trends", "cómo lo venden otros", "validar antes de testear", o antes de la Fase 0 de landing-producto con un producto nuevo.
---

# Espiar el mercado local antes de testear

## Por qué existe
Para responder **4 decisiones** antes de gastar en un test. Si un dato no sirve a una de ellas, sobra:
1. **¿Entro o no?** Demanda y saturación en el país.
2. **¿Con qué ángulo pruebo primero?** Lo que ya está funcionando localmente, no una idea propia.
3. **¿Qué promete mi hero?** Algo que no suene igual a lo que todos repiten.
4. **¿Qué oferta tengo que superar?** Precio, combos, contraentrega, envío, garantía.

## El problema que resuelve
En la biblioteca de anuncios, con palabras mal elegidas la búsqueda no termina: llegan marcas, tiendas físicas y anuncios que no comunican nada, que solo "parecen ganadores" porque llevan muchos días corriendo. Eso gasta tiempo, tokens y saldo de Apify. Por eso esta skill funciona **de lo barato y amplio a lo caro y preciso**, y **nada caro se corre sin un plan aprobado**.

## Principios (no negociables)
- **Claridad antes de gastar.** Hay 3 puntos de aprobación: semillas, plan de búsqueda y anunciantes a profundizar.
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

## Paso 1 · Hipótesis (no gasta nada)
Con lo que diga el usuario y lo que ya exista en `investigacion/<producto>/` o `briefs/<producto>.md`, escribe 4 líneas:
- **Problema** que resuelve el producto.
- **Quién lo sufre** y en qué momento.
- **Cómo creemos que lo nombra** la gente: producto, dolor y resultado.
- **Oferta** que pensamos dar.

Pregunta solo lo que falte: producto, **país (CO o GT)** y nombre de carpeta en kebab-case.

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

Muestra la tabla de rendimiento por consulta. Solo las que "dan para más" se repiten, **con aprobación**:
```bash
... espiar-mercado.mjs anuncios <producto> --solo 1,3 --n 50
```
Los resultados se acumulan; no se repiten anuncios.

## Paso 6 · Profundizar en los anunciantes clave (aprobación)
De la tabla de anunciantes que comunican, propón **3–5** con ofertas o ángulos **distintos entre sí**. Prioriza los que tengan más anuncios del producto, copias o variantes. No tomes 5 iguales.
```bash
... espiar-mercado.mjs anunciante <producto> --ids <page_id>,<page_id> [--n 40]
```
Trae **todos** sus anuncios activos, no solo los que encontró la consulta. Ahí aparecen sus otros ganchos y ofertas, y se ve cuánto está invirtiendo en el producto.

Después, de una vez:
```bash
... espiar-mercado.mjs creativos <producto> --top 15   # justo después: las URLs de Meta vencen en horas
... espiar-mercado.mjs landings  <producto> --top 6    # una por dominio, primero los profundizados
```

## Paso 7 · Análisis (lo hace Claude, mirando de verdad)
Trabaja **solo sobre la selección**: unos 20–30 anuncios y unas 6 landings. No leas `anuncios.json` completo, que gasta tokens sin sumar.
- **Estáticos:** ábrelos con `Read` en `mercado/creativos/`. Mira el formato (antes/después, producto con beneficios, testimonio, oferta/precio, comparación, notas, chat), el texto sobre la imagen y la promesa.
- **Videos:** no se pueden ver. Usa la portada, el copy y su primera frase, que suele ser el gancho. Si uno es clave, pídele al usuario que te cuente sus primeros 3 segundos.
- **Landings:** abre con `Read` el hero y la captura completa, y lee el `.txt`.

Por cada anuncio de la selección:

| Campo | Opciones |
|---|---|
| Ángulo | dolor/agitación · transformación · prueba social · comparación · mecanismo/educación · aspiración · miedo/riesgo · curiosidad · precio/oferta · comodidad |
| Dolor | el dolor concreto, textual |
| Gancho | primera frase textual |
| Formato | estático o video, con su tipo |
| Oferta | las etiquetas, más el precio si aparece |
| Destino | web o WhatsApp |

## Paso 8 · Entregable: `investigacion/<producto>/mercado/mapa-mercado.md`
Cada afirmación lleva su enlace. Nada inventado.

```markdown
# Mapa de mercado · <Producto> · <País> · <fecha>

## 1. Resumen en 5 líneas
(demanda, saturación, ángulo dominante, oferta típica, la mejor oportunidad)

## 2. Cómo nombra la gente el problema
Trends (volumen, subiendo, regiones) + TikTok (hashtags/sub-nichos, ganchos, dudas). Términos usados y descartados, y por qué.

## 3. Búsqueda y saturación
Tabla de consultas con su veredicto · anunciantes que comunican · % video vs estático · % WhatsApp vs web.
Lectura: virgen (< 5 anunciantes que comunican) · en crecimiento · saturado (muchos anunciantes, mismos ángulos y ofertas).

## 4. Ángulos
| Ángulo | # anuncios | Anunciantes | Mejor ejemplo (enlace) | Dolor que toca |

## 5. Dolores tocados y frases textuales

## 6. Top 10 ganchos textuales (con enlace)

## 7. Creativos: patrones de estáticos y de videos

## 8. Landings: estructura de la promesa
| Landing | Promesa del hero (textual) | Tipo (dolor/resultado/mecanismo) | Bullets | Orden de secciones | Prueba social |

## 9. Fondos de oferta del nicho
| Anunciante | Precio | Ancla | Combo/2x1 | Envío | Contraentrega | Regalo | Garantía | Urgencia | Destino |
Precio típico y rango · la oferta más agresiva · la que más se repite.

## 10. Huecos
Ángulos que nadie usa, dolores (de TikTok o del dossier) que nadie toca, promesas que todos repiten, oferta que nadie da.

## 11. Recomendación para testear
- 2–3 ángulos, cada uno con: hipótesis, gancho de ejemplo, formato (estático y video) y la promesa del hero que lo continúa.
- Oferta sugerida frente a la del mercado.
- Qué NO copiar (claims riesgosos o médicos, lo que ya está quemado).
```
En el chat, presenta solo el resumen, la tabla de ángulos, los fondos de oferta y la recomendación. Si el usuario lo quiere para el equipo, publícalo como artifact con las capturas.

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
