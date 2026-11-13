# Revisión · VIVIDUS 86 V2 · landing-v2 · APROBADO

Alcance: ronda 2 de la landing completa (15 secciones, plantilla `vividus-v3`). Reviso que los 4 bloqueantes de `revision-landing-v1.md` estén resueltos y lo nuevo: la FAQ 2, el grid (bloques 3 y 4, prompts), los íconos y las notas «Imágenes ilustrativas». El título del hero frente a los 60 días y los datos **[POR CONFIRMAR]** son del dueño: están marcados y no se inventa nada, así que no bloquean (van en el resumen).

## Verificación de los bloqueantes de la ronda 1
| # | Pedido | Estado | Comprobación |
|---|---|---|---|
| B1 | No prometer que las fotos son reales | Resuelto | §10 dice `Así llegan <em>hasta tus manos</em>`. La FAQ 1 usa el texto pedido, sin «las fotos». La imagen 2 dice «Estuche de cámara» y la ficha del kit pide el estuche idéntico, con «Sound by KFG». En §5 el título es `Míralos <em>en video real</em>` y las etiquetas van **[POR CONFIRMAR]**. Ya no queda ningún «lo que ves es lo que te llega». La nota está en el grid, la galería, las filas y los pasos (ver la mejora 2, sobre dónde va en las filas). |
| B2 | La garantía es solo de fábrica | Resuelto | El título de §14, la FAQ 4 (sin garantía) y la FAQ 6 («por un defecto de fábrica») quedaron bien. Revisé los otros 7 lugares donde aparece la garantía (franja, subtítulo, bono, cierre de filas, pp-esperar 6, comparativa y texto de §14): todos dicen «de fábrica». |
| B3 | Tachado del pack 2 | Resuelto | `precio_antes` queda vacío y **[POR CONFIRMAR]**, con las dos reglas, así que no se muestra ningún ahorro sin respaldo. El $64.950 c/u sale de dividir el precio real. |
| B4 | «Casi nunca» | Resuelto | Ahora dice `Sin garantía a la vista`, que coincide con lo que respalda el dossier («casi no menciona»). |

## Rúbrica
| # | Criterio | Nota | Por qué |
|---|---|---|---|
| 0 | Hero dopamínico (x2) | 5 | Es la primera pantalla aprobada sin cambios: dolor #1 con el número del cliente, 9 palabras, y la imagen 1 continúa la sorpresa del anuncio. El riesgo con los 60 días es de credibilidad y le toca decidirlo al dueño. |
| 1 | Claridad en 3 segundos | 5 | En el hero se entienden el dolor, la protección y el respaldo. |
| 2 | Consciencia y sofisticación | 5 | Para un mercado en etapa 4-5 entra por la identificación y el mecanismo (el estuche que aguanta), no por «sonido increíble». |
| 3 | Ángulo | 5 | El nuevo bloque 3 del grid (batería) sí se resuelve más abajo, y el ángulo «que no te pase otra vez» llega hasta la oferta, la comparativa y la garantía. |
| 4 | Especificidad y voz del cliente | 4 | «La tapita se quiebra», «Sin estuche, no sirven» y 9 reseñas textuales. «Contigo todo el día» sigue siendo genérico, pero el texto de abajo lo aterriza. |
| 5 | Objeciones | 5 | Las 5 del dossier tienen respuesta. «¿Suenan bien o es pura carcasa?» ya tiene su FAQ, con la cita real de Juliana R. |
| 6 | Credibilidad y claims | 4 | No queda ningún claim sin respaldo. Hay dos frases que describen los videos sin saber qué muestran (mejora 3), y la garantía de 60 días frente a «3 meses» la decide el dueño. |
| 7 | Oferta y separación hero/oferta | 4 | Los bonos son reales, la fecha Black es real y no hay tachados inventados. Faltan datos del dueño (cómo se entrega el 15 %, el tachado del pack 2 y el valor del envío), todos marcados. |
| 8 | Brevedad y ritmo | 5 | Títulos cortos y una idea por sección. Se quitó la repetición de «pagas al recibir» en §14. |
| 9 | Lenguaje local | 5 | Tuteo colombiano natural («la U», «morral», «se quedan mudos», «melísimos»). |
| 10 | Aprendizajes | 5 | Ningún título en pregunta, no promete duración, ningún tachado inventado y el hero no vende. |
| 11 | Imágenes del hero | 5 | Ya no queda el pendiente de la imagen 2. Las cajitas blancas de las imágenes 2 y 4 son genéricas y sin logos, y no hay nada de venta en ninguna imagen. |
| 12 | Políticas | 5 | Sin claims de salud ni de dinero, sin afirmaciones contra terceros que no se puedan probar y sin marcas de terceros en los prompts. |

## Bloqueantes (obligatorios)
Ninguno.

## Mejoras (recomendadas)
1. **[§10 pp-esperar · íconos] Es técnico, pero se corrige antes de montar.** La sección `pp-esperar` solo acepta `reloj` y `calendario` (schema, línea 378). El copy usa `check`, `chat`, `camion`, `pago` y `escudo`, así que el editor no va a guardar la plantilla. Hay dos salidas:
   - poner `calendario` en los bloques 1 a 5 y `reloj` en ninguno (el 6 ya usa `calendario`);
   - si se quieren esos íconos, agregar las opciones al select de `pp-esperar`, con `calendario` como valor por defecto para que las otras landings no cambien. Esto obliga a volver a pegar la sección.

   El copy no cambia.
2. **[§8 pp-problemas-filas · nota]** El copy dice que la sección solo tiene `cierre`, pero también tiene `subtitulo` (schema, línea 403). Hoy la nota queda pegada al respaldo, en la frase grande: «…60 días de garantía. Imágenes ilustrativas.». Cambiarlo así:
   - `subtitulo`: `Imágenes ilustrativas.`
   - `cierre`: `Y si un lado falla de fábrica, tienes 60 días de garantía.`
3. **[§5 pp-videos · texto] · [§13 FAQ 1]** «Así se ven en la mano» y «el estuche de cámara en café o verde, con la pantalla de batería» describen videos que nadie ha confirmado. Es el mismo error que se corrigió con «Así llegan». Cambiarlo así:
   - §5 texto: `Videos reales del producto.` Se le agrega `Así se ven en la mano.` solo si los videos los muestran en la mano.
   - FAQ 1: la descripción queda atada al punto 7 de los pendientes. Si en los videos no salen los dos colores o la pantalla encendida, se quita eso.
   - De paso, que la respuesta abra con `Sí, como en los videos.` en vez de solo «Sí.». La pregunta dice «la foto» y las fotos de la landing son ilustrativas: así el «sí» se apoya en lo que es real.
4. **[§3 pp-iconos · textos]** Esto corrige una sugerencia mía de la ronda 1. «Batería a la vista» y «Bluetooth 5.4» repiten las negritas de los bullets 3 y 4, que quedan justo arriba. Para que la franja de íconos sume algo nuevo: `Parece una cámara` · `Control táctil` (ícono `check`) · `Café o verde` (ícono `estrella` o uno propio). Además, el ícono `estrella` junto a «Parece una cámara» se lee como calificación: mejor subir un ícono propio de cámara en `imagen`.
5. **[§11 pp-comparativa · imagen_b]** El copy no define la imagen del lado «Los de siempre». Hay que dejarla vacía o, si se genera, aplicar la misma regla del grid: «forma genérica, sin logos, que no se parezca a ninguna marca conocida», y agregar «Imágenes ilustrativas» en `texto`.
6. **[§4 oferta · pack 2]** Mientras `precio_antes` esté vacío, el pack 1 muestra ahorro y el pack 2, que es el preseleccionado, no muestra ninguno. Eso puede empujar al pack de menor valor. No es de copy: hay que cerrar el dato del pendiente 8 antes de publicar.

## Lo que está bien y no se toca
- Los 4 bloqueantes quedaron resueltos con el texto exacto que se pidió, sin tocar nada fuera de su alcance.
- La FAQ 2 responde la objeción de «pura carcasa» con la cita textual de Juliana R., que es la mejor prueba disponible.
- En el grid, «Se apagan a mitad de ruta» abre un dolor que la landing sí cierra (las filas, la FAQ 5 y la reseña de Martha V), y «Lo barato sale caro: vuelves a pagar por unos iguales» quedó limpio.
- Los prompts del grid y de las imágenes 2 y 4 del hero piden la cajita genérica sin logos. La ficha del kit pide el estuche idéntico, con «Sound by KFG» y sin agregar «VIVIDUS».
- El bloque 4 de las filas, «Si hay ruido», ahora encaja con «lo que daña a los baratos», y el ENC se presenta como micrófono, no como cancelación de ruido.
- La FAQ 4 separa la caída de la garantía, y la nota final lo explica. Así se evitan discusiones en la entrega.
- Los nombres de la FAQ se marcan como ilustrativos, las reseñas siguen textuales (las volví a revisar contra el brief) y cada dato faltante va **[POR CONFIRMAR]**, con la lista de lo que cambia el 1 de diciembre.
- Las urgencias son reales: el precio Black termina el 30 de noviembre y desde el 1 de diciembre vuelve a $109.900.

## Elección del hero
Firmo el hero aprobado tal como está en `final.md` (con 60 días), con la imagen 1 A publicada y la B como control. La recomendación de la ronda 1 no cambia, y el copywriter la dejó bien preparada en §2:
1. **Volver a 90 días** (decisión de operación). Solo cambia el número en los lugares que lista §2.
2. **Si los 60 días son fijos,** cambiar solo el título a `Cansado de audífonos que <em>no aguantan ni una caída</em>.`
3. **Dejarlo como está** y medirlo en Clarity.

No es bloqueante porque el título no promete duración: el riesgo es que el cliente haga la cuenta («el título dice 3 meses y la garantía cubre 2»), y eso lo decide el dueño.

## Resumen para el dueño
- La landing quedó lista en copy: las 4 correcciones de la ronda anterior están hechas, ya no se promete que las fotos son reales, la garantía dice siempre «de fábrica» y no hay precios tachados ni comparaciones inventadas.
- Una decisión suya: el título dice «no duran ni 3 meses» y la garantía es de 60 días. Le recomiendo volver a 90 días. Si no se puede, el título «Cansado de audífonos que no aguantan ni una caída» ya está listo para cambiar en una línea.
- Antes de montar necesitamos estos datos suyos:
  - qué muestra cada uno de los 3 videos;
  - cómo se entrega el 15 % de la segunda compra;
  - el precio del pack de 2 desde el 1 de diciembre;
  - el tiempo de entrega;
  - el canal para reclamar la garantía;
  - si la caja trae cable;
  - si la variante se llama «Café» o «Marrón»;
  - el valor del envío express.
- Al montar se corrigen dos detalles técnicos: los íconos de la sección «qué pasa después» y dónde va la nota «Imágenes ilustrativas» en las filas.

**Veredicto: APROBADO** · `copy/vividus/revision-landing-v2.md` · 0 bloqueantes.
