# Revisión · Control Pro inalámbrico compatible con Nintendo Switch · v6 · CAMBIOS REQUERIDOS

Revisé `copy/control-pro/v6.md` contra el brief (actualizado §4, §5, §6 y §8), el dossier, `criterio.md`, `aprendizajes.md`, `prompts-seguros.md`, mi `revision-v5.md` y la captura `primera-pantalla-v6.png`. En la captura, la imagen 1 es un marcador: se ve el titular «Ahora mandas tú, no el control», la etiqueta «Agarre firme» y, debajo, el título y el subtítulo nuevo.

**Alcance.** El dueño aprobó varias cosas y no las bloqueo: el hero completo (título, subtítulo con «En 10 minutos lo conectas y ya estás jugando», bullets y chips), la frase «90 días de garantía con devolución del dinero», la oferta única con el bono del 15 %, pp-videos con videos reales, las imágenes solo de producto y los textos exactos de las 6 imágenes. Comprobé que todo eso está tal cual en v6. Lo riesgoso de esas decisiones va en «Observaciones para el dueño». Es la sexta ronda, así que solo bloqueo por inventos, incoherencias, claims prohibidos, reglas de imágenes o escenas que no sean solo producto.

## Rúbrica
| # | Criterio | Nota | Por qué |
|---|---|---|---|
| 0 | Hero dopamínico (pesa doble) | 5 | El título tiene 9 palabras y nombra el dolor #1 con la emoción del dossier («rabia»). El titular de la imagen 1 («Ahora mandas tú, no el control») responde al título sin repetirlo. Pasa la prueba del pulgar. Todavía no hay anuncio con el cual empatar. La nota es provisional hasta generar la imagen 1, porque en la captura solo hay un marcador. |
| 1 | Claridad en 3 segundos | 5 | Imagen, título y subtítulo dicen el dolor, la salida, los juegos y que conectarlo es rápido. |
| 2 | Consciencia y sofisticación | 5 | Arranca en el dolor que ya vivió un jugador consciente del problema y de la solución. |
| 3 | Ángulo | 5 | El ángulo de la rabia a maniobrar se sostiene en la franja, el problema, la galería, la comparativa y las 6 imágenes. El bono del 15 % ubica bien el dolor #3 como uso secundario. |
| 4 | Especificidad y voz del cliente | 5 | Cita textual de la palanca, «controlcitos», ~$343.000, lo técnico traducido. |
| 5 | Objeciones | 5 | Las 6 del dossier y las extra tienen respuesta. La 3 depende de que el video de conexión exista (bloqueante 1). |
| 6 | Credibilidad y claims | 4 | Precios, ancla, fecha y 35 % verificados ($276.800 × 0,65 ≈ $179.900). La FAQ 3 ya no promete jugar con cable en la Lite. Pierde un punto porque la página les asigna a los videos un contenido que nadie confirmó (bloqueante 1). |
| 7 | Oferta y separación hero/oferta | 4 | El hero no vende. La oferta apila 5 bonos reales con urgencia real y el ancla de $339.900. Le falta la mecánica del bono del 15 %: hoy es una promesa que el cliente no sabe cómo cobrar (observación 2). |
| 8 | Brevedad y ritmo | 5 | Títulos cortos y una idea por sección. Con una sola frase de garantía, la página se lee más limpia. |
| 9 | Lenguaje local | 5 | Tuteo colombiano natural. |
| 10 | Aprendizajes | 5 | Ningún título en pregunta. No hay venta en el hero ni en las imágenes, ni tachados inventados, ni personas generadas sin avatar. Se respetó el alcance. |
| 11 | Imágenes del hero | 4 | Las 6 escenas son solo de producto, sin personas ni manos. Las comparativas no dicen «antes/después» ni venden, y no hay logos, consolas ni personajes. Pierde un punto por dos contradicciones dentro de los prompts («copiar idéntica» frente a «sin logos», y la regla de luz) y por una cita del dossier que no existe en la variante B (mejoras 1 a 3). |
| 12 | Políticas | 5 | Sin claims de salud ni de dinero. «Compatible con» es descriptivo. Las reseñas de ejemplo no se reutilizan en anuncios. |

## Verificación de la ronda anterior (mejoras de v5)
| Mejora v5 | Estado en v6 |
|---|---|
| M1 · FAQ 3 con cable en la Lite | **Resuelto.** Quedó solo con Bluetooth. |
| M2 · La franja abre con el descuento | **Resuelto en la captura:** no abre con el descuento. Abre a mitad de la lista («…Lite, OLED y Switch 2 · 90 días de garantía…»), no en «Maniobra como se debe». Se confirma al montar. |
| M3 · `linea_regalo` vacía | **Sin verificar.** Sigue vacía. Revisarla al montar. |
| M4 · Momento del dolor #2 en el mapa | **No aplicado** (mejora 4). |

## Bloqueantes (obligatorios)
1. **[pp-videos · etiquetas + pp-faq · 5 · respuesta + «Objeciones cubiertas» · 3] Se le asigna a los videos un contenido que nadie confirmó.** El brief §6 y el §8 solo dicen que el dueño «tiene videos reales». No dicen cuántos son ni qué muestran. Aun así, v6 da por hecho 3 videos (agarre, conexión y jugando), la FAQ 5 promete «en los videos de arriba ves cómo» y la tabla dice que la objeción 3 ya tiene prueba en video. Si no hay un video de la conexión, la página promete una prueba que el cliente no va a encontrar. Cambios:
   - FAQ 5 → `<p>Se conecta por Bluetooth desde el menú Controles de la consola. Si en algún momento se desconecta, sigues jugando con el cable. Y tienes <strong>90 días de garantía con devolución del dinero</strong>.</p>`. La frase «y en los videos de arriba ves cómo» vuelve solo cuando el dueño confirme que tiene un video de la conexión.
   - pp-videos: marcar las 3 etiquetas como «provisionales: se ajustan a lo que muestre cada video». El `texto` pasa a `Videos reales del control, para que lo veas antes de pedirlo.` hasta que se confirme qué muestran.
   - Pendiente 4: agregar al inicio «Confirmar cuántos videos hay y qué muestra cada uno (¿hay uno de la conexión?)».
   - En «Objeciones cubiertas», fila 3, la mención a pp-videos pasa a «(si el dueño confirma el video de la conexión)».

## Mejoras (recomendadas)
1. **[Imágenes · reglas] «Copiar idéntica» choca con «sin logos».** Si la foto del proveedor trae un logo o una marca en los botones, ChatGPT lo va a copiar. Cambia a: «Copia la forma, el color, los botones y la carcasa semitransparente de la foto adjunta. Quita cualquier logo, palabra o marca que tenga la foto».
2. **[Imágenes · reglas] La regla de luz se contradice con las escenas.** La regla dice «luz de TV y lámpara» para todas, pero la 3 pide luz de estudio y la 5, neón. Cambia la regla a: «Luz de TV y lámpara, salvo donde la escena diga otra».
3. **[Imagen 1 · variante B · Respaldo] La cita entre comillas no existe en el dossier.** El dossier no dice «el personaje se mueve solo… y pierdes». Dice «el personaje camina solo» (momento) y «perder partidas» (consecuencia). Cambia a: `[dossier: dolor #1, momento "el personaje camina solo" y consecuencia "perder partidas"]`. Lo mismo vale para el ítem «Camina solo» de pp-grid-dolores, que ya lo parafrasea sin comillas: ahí está bien.
4. **[Mapa de dolor usado · #2 · Momento]** Sigue diciendo «En partidas largas». Copia el dossier: «A los 20 minutos o más, en portátil o con el grip».
5. **[pp-comparativa · fila «Respaldo»] El título y el subtítulo no van con el valor.** «Respaldo / Lo que te cuesta» frente a «90 días de garantía…» se lee raro. Además, `ok_b false` con «Otro par: ~$343.000» da a entender que los controlcitos no tienen ninguna garantía, cosa que no sabemos. Propuesta: subtitulo `Si se dañan los controlcitos` · valor_b `Comprar otro par: ~$343.000`. Así la condición queda del lado de los controlcitos y la frase de garantía de la columna A queda limpia, como pidió el dueño.
6. **[Imagen 1 · variante C · titular]** «La palanca ya no decide tu partida» tiene 7 palabras, y `prompts-seguros.md` pide de 2 a 6 para que no salga con faltas. Si el dueño la aprobó tal cual, se deja y se revisa la ortografía al generarla. Si no, que quede «La palanca ya no decide».

## Observaciones para el dueño (sobre lo que aprobó; no bloquean)
1. **«Responde al instante» (imagen 2) y «Maniobras al instante» (bullet 1)** prometen velocidad de respuesta sin una prueba, igual que el título. Pruebe el control en un juego de carreras antes de pautar. Si se siente algún retraso por Bluetooth, esas frases son las primeras que el cliente va a reclamar.
2. **Bono del 15 % para el segundo control.** Hoy la página no dice cómo se cobra ni hasta cuándo vale (pendiente 3). Si alguien quiere los dos controles en el mismo pedido, no hay forma de pedirlos en la oferta. Defina la mecánica antes de publicar. Por ejemplo: «se aplica si pides el segundo por WhatsApp al confirmar tu pedido».
3. **Garantía sin condiciones.** «90 días de garantía con devolución del dinero», sin condiciones, permite que alguien juegue 89 días y pida la plata por cualquier motivo. Es una decisión válida y vende. Solo asegúrese de que el margen y la operación la aguanten.
4. **«En 10 minutos lo conectas y ya estás jugando».** Pruébelo con el control en la mano, también en una Switch 2: el dossier todavía tiene la Switch 2 como «sin confirmar». Verifique además que la FAQ 5 («sigues jugando con el cable») funcione en la Switch Lite.
5. **El brief está desactualizado en dos puntos.** En el §4, el bullet 4 todavía dice «si falla en 90 días, te devolvemos tu dinero», y la hipótesis todavía habla de «quien se lo regala». Actualícelo para que la próxima versión no reciba la frase vieja.

## Lo que está bien y no se toca
- El hero, idéntico a lo aprobado, con la garantía en una sola frase en toda la página: verifiqué que no queda ningún «si falla».
- La oferta única: Black Days con fecha real, el ancla de $339.900, 5 regalos y el bono del 15 % presentado como bono, no como pack x2.
- pp-videos justo debajo de la oferta, sin botón (la caja de compra está arriba), y la nota de revisar logos y personajes en los videos.
- Las 6 escenas solo de producto: no aparece ninguna persona ni ninguna mano en ningún prompt.
- Las FAQ 1, 7 y 10, honestas sobre «nunca falla», «prende la consola» y «todos los juegos».
- La FAQ 3 corregida y pp-esperar alineada con el subtítulo.

## Elección del hero
Firmo la **imagen 1 A** («Ahora mandas tú, no el control» + «Agarre firme» + «Sticks grandes»). Le da la vuelta al «control que no responde» del título, sin repetirlo, y su escena (el control firme frente a una carrera en plena curva) es la más fácil de leer en 1 segundo sin personas. La **B** queda de segunda opción para una prueba A/B, porque usa la aversión a la pérdida («Deja de perder por el control»). La **C** es la más débil: tiene 7 palabras, y en una foto sin manos es difícil que se note el drift en la palanca.

## Resumen para el dueño
- **Falta un solo cambio**, y es corto. La página dice que en los videos se ve cómo se conecta el control, pero nadie ha confirmado que usted tenga ese video. Mientras no lo confirme, quitamos esa frase de la FAQ 5 y dejamos las etiquetas de los videos como provisionales.
- Todo lo que usted aprobó está tal cual: el hero, la frase de garantía, la oferta única con el bono del 15 %, los videos y las 6 imágenes sin personas.
- Antes de publicar, defina cómo se cobra el bono del 15 % y si tiene fecha límite. Además, pruebe el control en una Switch 2 y en un juego de carreras: tiene que quedar listo en 10 minutos y responder rápido, porque la página lo promete.
- Le sugiero actualizar en el brief la frase vieja de la garantía («si falla en 90 días…»).
