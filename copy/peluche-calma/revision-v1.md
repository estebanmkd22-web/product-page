# Revisión · Peluche de calma · v1 · CAMBIOS REQUERIDOS

Base de verificación: brief confirmado y `analisis-video.md` (hace de dossier en este producto). Cada respaldo citado se revisó contra esas dos fuentes.

## Rúbrica
| # | Criterio | Nota | Por qué |
|---|---|---|---|
| 1 | Claridad en 3 segundos | 4 | El título no dice qué es el producto, pero la imagen 1 y el subtítulo A lo resuelven en una lectura. |
| 2 | Consciencia y sofisticación | 4 | Arranca en el regalo y en la noche, como pide el brief §2; no abre con specs. |
| 3 | Ángulo | 4 | «Regalo que sí se usa + calma» se sostiene en hero, dolores, galería, oferta y reseñas; la comparativa se va al ángulo 2 (vs. pantalla), lo cual es aceptable. |
| 4 | Especificidad y voz del cliente | 4 | Usa las frases textuales del video («no estimulan, acompañan», «se vuelve parte de su rutina») y detalles concretos (barriguita, mesa de noche, 35 cm). |
| 5 | Objeciones | 4 | Todas las del brief tienen respuesta; las pilas quedan parcial con razón (dato sin confirmar). Falta cómo se eligen los 2 modelos del x2. |
| 6 | Credibilidad y claims | 2 | Sin claims médicos y con precios reales, bien. Pero la garantía promete «te lo cambiamos» sin confirmar, hay una cita inventada sin marca en el título de reseñas y los títulos de pp-resultados-zona presentan resultados inventados. |
| 7 | Oferta y separación hero/oferta | 3 | El hero no vende, bien. La oferta tiene un hueco operativo: el x2 no dice cómo se eligen los 2 modelos, que es justo la razón del pack («uno para tu bebé y otro para regalar»). |
| 8 | Brevedad y ritmo | 4 | Títulos cortos y una idea por sección; los bullets del hero están en el límite de largo. |
| 9 | Lenguaje local | 5 | Tuteo colombiano natural: «prende», «barriguita», «clóset», «repisa», «pagas al recibir». |
| 10 | Aprendizajes | 4 | Ningún título en pregunta, títulos cortos, sin precio tachado, hero sin venta. Cumple. |
| 11 | Imágenes del hero | 4 | La 1 retiene y muestra el producto; hay 2 comparativas (2 y 4) sin «antes/después» y sin venta; peluche fuera de la cuna. La 6 está recargada y el texto de la 1 repite el título. |
| 12 | Políticas | 4 | Sin promesas de sueño ni de salud. «Terminas agotada» y «tú también descansas» son tolerables; no las endurezcas en anuncios. |

## Bloqueantes (obligatorios)
1. **[pp-garantia · texto] Garantía con un compromiso que el dueño no ha confirmado.** «te lo cambiamos» no está en el brief (§4 solo dice «60 días por daños de fábrica»). Dejar un pendiente con un texto falso por defecto es peligroso, porque la landing se monta automáticamente. Cambia el texto por defecto por lo que sí está confirmado: «Tienes 60 días de garantía si tu peluche presenta un daño de fábrica. Envío gratis y pagas al recibir.» Solo si el dueño confirma que es cambio, se vuelve a «te lo cambiamos». Además, la alternativa que propones («te respondemos») es floja: no la uses.

2. **[pp-resenas · titulo] Cita inventada presentada como si la hubiera dicho un cliente.** `“Por fin <em>un regalo que sí usamos.</em>”` va entre comillas y en primera persona plural, sin la marca de «Testimonio de ejemplo». No hay reseñas reales (brief §5), así que eso es prueba inventada. Quita las comillas y la voz de cliente: `Un regalo que <em>sí se usa</em>`.

3. **[pp-resultados-zona · zonas] Resultados inventados en los títulos.** Los títulos «Su favorito en la mesa de noche» y «Mi sobrino lo adora» y textos como «ahora cada noche me pide que prenda las estrellas» son resultados de clientes que no existen, y el campo `titulo` no lleva la marca de ejemplo (solo `nombre`). Con pp-resenas son 7 testimonios de ejemplo en una landing sin una sola reseña real: se ve armado. Convierte la sección en un selector de modelo, sin citas:
   - Conejo · titulo «Tierno para los más pequeños» · texto «Estrellas de colores en la pared y música suave desde su barriguita.»
   - Unicornio · titulo «La pared llena de colores» · texto igual.
   - Dinosaurio · titulo «Para el pequeño aventurero» · texto igual.
   - Pingüino · titulo «Azul, con barriga blanca» (dato del brief) · texto igual.
   - `nombre`: vacío o «Modelo conejo», etc. · nota: «Imágenes ilustrativas.» (quita «Testimonios de ejemplo»).

4. **[pp-comparativa · nombre_b y filas] La columna B mezcla dos alternativas y las filas no le aplican a las dos.** «Celular o lámpara» no cuadra con «Sonido · Lo que salga en el video» ni con «Tu celular · Ocupado al lado de la cama» (una lámpara no suena ni ocupa el celular), y el título dice «vs. la pantalla». Deja una sola alternativa, el celular, que es el contraste más fuerte del brief («el celular estimula»):
   - nombre_b: «El celular» · sub_b: «Videos para dormirlo»
   - texto: «Frente al celular con videos a la hora de dormir.»
   - fila Luz · no_b: «Pantalla brillante cerca de su cara»
   - fila Rutina · no_b: «Un video distinto cada noche» (en vez de «Cambia cada noche», que no dice nada).
   - Las demás filas se quedan como están.

5. **[pp-oferta-tabs · pack 2 · detalle] El x2 no dice cómo se eligen los 2 modelos.** La razón del pack es «uno para tu bebé y otro para regalar», y quien regala casi siempre quiere un modelo distinto. Si no se dice, el cliente duda o llega lo que no esperaba, y eso es una devolución en contraentrega. Cambia el detalle por «2 peluches · elige los 2 modelos · $119.950 c/u» y agrega a FAQ 3: «Si llevas 2, puedes elegir el mismo modelo o dos distintos.» Antes de publicar, confirma con el dueño que el formulario permite elegir 2 modelos. Si no lo permite, escribe «te escribimos por WhatsApp para confirmar los modelos», solo si eso es lo que se hace de verdad.

## Mejoras (recomendadas)
1. **[oferta · regalos, packs, FAQ 7] «Tarjeta de regalo del 10%» confunde en una landing de regalos**: suena a una tarjeta para entregar con el regalo. Llámala «Bono del 10% para tu próxima compra».
2. **[Imagen 1 · textos] El titular de la imagen («Calma a la hora de dormir») repite el título del hero.** Usa la imagen para lo que el título no dice: titular «Estrellas en la pared» y etiquetas «Música suave» · «Luz tenue».
3. **[Imagen 6] Demasiados elementos** (4 modelos, árbol, caja, niña y mano adulta). Para escala basta con un modelo en brazos de la niña, con los otros 3 en la repisa detrás, y sin la mano adulta. Menos elementos también bajan el riesgo de errores en ChatGPT.
4. **[Bullets del hero 1 y 3] Recórtalos.** Bullet 1: «<strong>Estrellas suaves en la pared:</strong> no estimulan, acompañan.» Bullet 3: «<strong>Parte de su rutina:</strong> el mismo momento tranquilo cada noche.»
5. **[Oferta] No hay ancla de precio.** El brief dice que el precio sugerido en Dropi es $89.900 y la tienda vende a $139.900. Si el buyer ve otro anuncio más barato, aquí no hay nada que justifique la diferencia, salvo los bonos sin valor. Que el dueño lo sepa; no se inventa ninguna ancla.
6. **[FAQ 4 / pendientes] Pilas.** Agrega a pendientes: confirmar con Dropi si trae pilas y de qué tipo. En contraentrega, si un regalo llega sin pilas en Navidad, el cliente se queja o lo devuelve.

## Lo que está bien y no se toca
- La disciplina de claims: nada de «duerme toda la noche», ni efectos médicos, ni temporizador, ni volumen, ni pilas incluidas. Es exactamente lo que pide el brief.
- La regla de seguridad del sueño aplicada en todo: mesa de noche o repisa, nunca en la cuna (FAQ 2, pasos, galería e imágenes).
- Los precios y la cuenta del x2 ($119.950 c/u, ahorras $39.900 frente a 2 × $139.900), sin precio tachado.
- El grid de dolores: las 4 alternativas del brief, con un remate corto y textual del video.
- La nota de montaje del video (modelos que no se venden y marcas ajenas): es correcta y no se puede saltar.
- Imágenes 2 y 4: comparativas limpias, sin «antes/después» y sin nada de venta.

## Elección del hero
Firmo la **1**: «El regalo que sí se usa: <em>calma a la hora de dormir</em>». Es el ángulo confirmado, con las palabras del video, y le habla a la mamá y a quien regala en plena temporada de Navidad. Su única debilidad es que no dice qué es el producto, y eso lo resuelven la imagen 1 (con el ajuste de la mejora 2) y el subtítulo A. La 3 queda como variante de prueba si la 1 rinde poco con mamás que compran para su propio bebé.

## Resumen para el dueño
El copy está bien encaminado: el título es el correcto, no promete nada médico y respeta la seguridad del bebé. Antes de aprobarlo hay que corregir 5 cosas. No prometer «te lo cambiamos» en la garantía hasta que usted lo confirme. Quitar una frase entre comillas que parece de un cliente real. Cambiar los «testimonios» por modelo por la descripción de cada peluche. Arreglar la tabla de comparación. Explicar cómo se eligen los 2 modelos en el pack de 2. Para publicar, además necesitamos de usted: el código real del 10%, si la garantía es cambio o devolución, si el formulario deja elegir 2 modelos, si trae pilas, y el video recortado sin las otras marcas.
