---
name: espiar-mercado
description: Investiga cómo está anunciando la competencia LOCAL (Colombia o Guatemala) un producto o nicho antes de testearlo. Define las palabras clave con Google Trends y con ellas barre la biblioteca de anuncios de Meta y TikTok (Creative Center y orgánico), baja los creativos estáticos y portadas de video, visita las landings de los anunciantes más fuertes y entrega un mapa de mercado con ángulos, dolores, ganchos, estructura de las promesas, ofertas, huecos y los 2–3 ángulos recomendados para testear. Úsala cuando el usuario diga "qué está corriendo la competencia", "espiar el nicho", "ver anuncios del nicho", "ángulos de la competencia", "palabras clave del producto", "biblioteca de Meta / TikTok", "Google Trends", "cómo lo venden otros", "validar el producto antes de testear", o antes de la Fase 0 de landing-producto cuando el producto es nuevo.
---

# Espiar el mercado local antes de testear

Objetivo: en una sola corrida (≈ 15–25 min y ≈ 0,50–1 USD de Apify) saber **qué ángulos, dolores, ganchos, promesas y ofertas** usa la competencia en el país, para no adivinar al hacer el brief, la landing y los anuncios.

Fuentes, todas vía **Apify** (el token es secreto de red del entorno; nunca lo pidas por el chat):

| Fuente | Actor | Qué da |
|---|---|---|
| Google Trends | `apify/google-trends-scraper` | volumen comparado, tendencia, búsquedas relacionadas y en subida, regiones |
| Biblioteca de Meta | `curious_coder/facebook-ads-library-scraper` | anuncios **activos** en el país: copy, formato, días activo, copias, CTA, landing |
| TikTok Creative Center | `codebyte/tiktok-creative-center-top-ads` | anuncios pagados top con CTR y likes (cobertura LATAM baja, puede venir vacío) |
| TikTok orgánico | `clockworks/tiktok-scraper` | videos por palabra con vistas; muchos dropshippers venden con contenido orgánico/Spark |
| Landings y creativos | `apify/playwright-scraper` | capturas en celular, textos, precios y ofertas; imágenes de los anuncios |

> La red del entorno **no deja entrar directo** a tiendas ajenas ni a los CDN de Meta/TikTok: por eso todo pasa por Apify. No intentes abrirlas con Playwright local ni con curl.
> Dropkiller está conectado pero el plan es FREE y su MCP responde bloqueado. Si el usuario sube a Advanced, úsalo como fuente extra (transcripciones de videos, etiquetas de ángulo/gancho) y díselo.

Todo se guarda en `investigacion/<producto>/mercado/`. El script es `tools/espiar-mercado.mjs` y siempre se corre con:
```bash
NODE_USE_ENV_PROXY=1 node --no-warnings tools/espiar-mercado.mjs <modo> <producto> [opciones]
```

## Regla número 1: primero se define, después se gasta
Igual que en `landing-producto`: propones, el usuario confirma, recién ahí ejecutas. Hay **dos puntos de confirmación**:
1. la lista de palabras semilla (antes de Trends);
2. las palabras finales para buscar anuncios (antes de Meta/TikTok, que es lo que más cuesta).

Si el usuario dice "hazlo todo de una", puedes saltarte las confirmaciones, pero muestra igual las palabras que elegiste y por qué.

## Paso 0 · Conexión
Corre `bash tools/conexiones.sh`. Solo necesitas **Apify ✅**. Si sale ❌, sigue lo que dice la skill `landing-producto` (verificar entorno Default y `request_credential` para `api.apify.com`).

## Paso 1 · Datos mínimos (una sola pregunta)
- Producto (qué es y para qué sirve; foto o enlace si hay).
- País: **CO** (Tu espacio Market) o **GT** (Naturixa).
- Nombre corto en kebab-case para la carpeta (`faja-cinturilla`). Si ya existe `investigacion/<producto>/` o `briefs/<producto>.md`, léelos y no vuelvas a pedir lo que ya está.

## Paso 2 · Palabras clave (la base de todo)
La competencia no escribe como tú: escribe como habla el cliente. Arma **6–10 semillas** en 4 grupos y muéstralas en tabla:

| Grupo | Qué es | Ejemplo (faja) |
|---|---|---|
| Producto | nombre genérico + cómo le dicen en el país (regionalismos, marca genérica) | faja reductora, cinturilla, faja colombiana |
| Problema | el dolor o la situación, en palabras del cliente | barriga, abdomen, posparto, "se me sale el gordito" |
| Resultado | el deseo o la transformación | cintura de avispa, moldear figura, reloj de arena |
| Uso / comprador | para quién o cuándo | faja posparto, faja para hombre, faja para gym |

Reglas:
- **Colombia vs Guatemala:** cambian las palabras (CO "cinturilla", "chaleco"; GT puede ser "faja", "corsé"). Si dudas, mete las dos variantes y que Trends decida.
- Palabras de 1–3 términos. Frases largas casi nunca aparecen en el copy de los anuncios.
- Espera el "sí" y corre:
```bash
... espiar-mercado.mjs palabras <producto> --pais CO "semilla 1" "semilla 2" ...
```
Lee `mercado/palabras.md` y propone las **3–5 palabras finales** para anuncios:
- las de más **volumen comparado**;
- las que estén **subiendo** (búsquedas relacionadas en subida = demanda nueva, posible ángulo);
- al menos una del grupo **Problema** (encuentra anuncios de ángulo dolor que no nombran el producto).
- Si una palabra tiene volumen 0 en el país, descártala para anuncios pero anótala.

Muestra: tabla de volumen y tendencia, las búsquedas en subida más útiles, regiones fuertes (sirven para segmentar) y las palabras finales. **Espera confirmación.**

## Paso 3 · Anuncios y creativos
```bash
... espiar-mercado.mjs anuncios  <producto> --pais CO "final 1" "final 2" "final 3" --meta 30 --tiktok 20
... espiar-mercado.mjs creativos <producto> --top 12        # justo después: las URLs de Meta vencen en horas
```
- `--meta` es por palabra (30 × 4 palabras ≈ 120 anuncios ≈ 0,10 USD). Súbelo a 50 si el nicho es grande.
- Si Meta trae pocos anuncios (< 15), el nicho está poco explotado localmente: es un **hallazgo**, no un error. Prueba sinónimos antes de concluir.

Qué cuenta como **señal de ganador** (el script ya ordena por esto, en `puntaje`):
- **Meta:** 30+ días activo (nadie paga meses un anuncio que no vende), varias **copias** o **variantes** del mismo copy (lo están escalando), anunciante con muchos anuncios activos del producto.
- **TikTok Creative Center:** CTR y likes.
- **TikTok orgánico:** vistas altas y recientes; `ANUNCIO` si TikTok lo marca como pagado.
- Anuncio de menos de 7 días = prueba, no ganador. Úsalo para ver hacia dónde se mueve el mercado, no como validación.

## Paso 4 · Landings
```bash
... espiar-mercado.mjs landings <producto> --top 8 [--url https://otra.com/products/x,...]
```
Toma la landing del anunciante top de cada dominio (las que mandan a WhatsApp no tienen landing; **cuenta cuántas son**, dice mucho del mercado). Deja por landing: captura del hero en celular, captura completa, texto completo y lo detectado de precios, ofertas, pago/envío, urgencia y reseñas.

## Paso 5 · Análisis (lo hace Claude, mirando de verdad)
No resumas el JSON: **mira**.
- **Estáticos:** abre con `Read` cada imagen de `mercado/creativos/`. Clasifica el formato (antes/después, producto + beneficios, testimonio, oferta/precio, meme, comparación, notas de iPhone, captura de chat, problema-solución…), el texto sobre la imagen y la promesa.
- **Videos:** no puedes verlos. Trabaja con la **portada**, el **copy** y la **primera línea** del texto (suele ser el gancho). Para TikTok orgánico, la descripción y hashtags. Si un video es clave y el usuario lo puede ver, pídele que te cuente los primeros 3 segundos.
- **Landings:** abre con `Read` la captura del hero y la completa, y lee el `.txt`. Saca la **estructura de la promesa**.

Por cada anuncio de los top 20, clasifica:
| Campo | Opciones |
|---|---|
| Ángulo | dolor/agitación · transformación · prueba social · comparación · educación/mecanismo · aspiración/estatus · miedo/riesgo · curiosidad · precio/oferta · comodidad |
| Dolor que toca | el dolor concreto, con sus palabras textuales |
| Gancho | la primera frase textual |
| Formato | de la lista de arriba (estático) o UGC/demo/testimonio/voz en off/antes-después (video) |
| Oferta | precio, ancla, 2x1/combos, envío gratis, contraentrega, garantía, urgencia |
| Destino | landing propia · WhatsApp · Shopify genérico |

## Paso 6 · Entregable: `investigacion/<producto>/mercado/mapa-mercado.md`
Con esta estructura fija. **Cada afirmación lleva su enlace** (anuncio de la biblioteca o landing). Nada inventado.

```markdown
# Mapa de mercado · <Producto> · <País> · <fecha>

## 1. Resumen en 5 líneas
(¿hay demanda?, ¿qué tan saturado?, ángulo dominante, oferta típica, la mejor oportunidad)

## 2. Palabras clave
Tabla volumen/tendencia · búsquedas en subida · regiones · palabras finales usadas y por qué.

## 3. Saturación
Anuncios activos, anunciantes, % video vs estático, % a WhatsApp vs landing, cuántos con 30+ días.
Lectura: virgen (< 15 anuncios) · en crecimiento · saturado (muchos anunciantes, mismos ángulos).

## 4. Ángulos que se usan
| Ángulo | # anuncios | # ganadores (30+ días) | Mejor ejemplo (enlace) | Dolor que toca |

## 5. Dolores tocados (ordenados por frecuencia) y frases textuales

## 6. Top 10 ganchos textuales (con días activo y enlace)

## 7. Creativos
- Estáticos: patrones visuales que se repiten (formato, texto en imagen, colores, cara/producto).
- Videos: formatos y estructuras que se repiten.

## 8. Landings: estructura de la promesa
| Landing | Promesa del hero (textual) | Tipo (dolor/resultado/mecanismo) | Subtítulo y bullets | Orden de secciones | Prueba social |

## 9. Ofertas
| Anunciante | Precio | Ancla tachada | Packs / 2x1 | Envío | Contraentrega | Garantía | Urgencia |
Precio típico del mercado y rango.

## 10. Huecos y oportunidades
Ángulos que nadie usa, dolores del dossier que nadie toca, promesas que todos repiten (evitar sonar igual),
oferta que nadie da, regiones sin anunciantes fuertes.

## 11. Recomendación para testear
- 2–3 ángulos para el test, cada uno con: hipótesis, gancho de ejemplo, formato sugerido (estático y video), y la promesa del hero que lo continúa.
- Oferta sugerida frente a la del mercado.
- Qué NO copiar (claims riesgosos, promesas médicas, lo que ya está quemado).
```

Además, presenta en el chat solo el resumen: los 5 renglones, la tabla de ángulos, las ofertas y la recomendación. El detalle queda en el archivo.

Si el usuario lo pide para compartir con el equipo, publícalo como artifact con las capturas de los ganadores.

## Cómo se conecta con `landing-producto`
- Si después se hace la landing, **la Fase 0 de `landing-producto` usa este mapa**: pásalo al `dossier.md` (sección competencia: precios, promesas, ganchos de los anuncios con más tiempo activos, brechas) y al brief (ángulos a probar, oferta, qué promete el anuncio). No se vuelve a investigar Meta.
- El `copywriter-respuesta-directa` y el `director-creativo` leen `mercado/mapa-mercado.md` además del dossier: el hero no puede sonar igual al de la competencia y debe atacar el hueco elegido.
- La skill `deep-research-ia-commerce` sigue siendo la fuente de **voz del cliente** (reseñas, Reddit, MercadoLibre). Esta skill es la fuente de **qué hace la competencia local**. Son complementarias.

## Commit
Haz commit de `investigacion/<producto>/mercado/` (incluye capturas y creativos; pesan poco) en la rama de trabajo.

## Errores conocidos
- `⚠️ <fuente>: ...` en una fuente no frena las demás. Repite solo esa con menos resultados.
- TikTok Creative Center vacío para GT o palabras raras: normal; apóyate en TikTok orgánico.
- Landings que no cargan o salen casi vacías (tiendas con mucho JS o con bloqueo): repite con `--url` esa sola; si sigue, anótalo y sigue.
- Creativos: si `creativos` baja 0 imágenes, las URLs vencieron; vuelve a correr `anuncios` y enseguida `creativos`.
