# Revisión · Adaptador Auto-Stop · v3 · CAMBIOS REQUERIDOS

Revisado contra: `briefs/adaptador-auto-stop.md` (manda «Relanzamiento v2 (2026-11-20)»), `investigacion/adaptador-auto-stop/dossier.md` («Actualización 2026-11-20»), `SKILL.md`, `criterio.md`, `aprendizajes.md`, `prompts-seguros.md` y `avatares/banco.json`. Capturas a 390 px: `hero-v3-390x750.png` (primera pantalla, con la foto del producto como relleno de la imagen 1) y `hero-v3-oferta.png` (el hero completo con la oferta). La imagen 1 se juzga por la escena descrita en el copy.

**Objetivo del dueño contra el que juzgo:** tomar el ángulo que validó el competidor (peligro y seguridad del hogar), con la mamá como buyer y un hero más dopamínico que toque el peligro.

**Ronda:** el archivo es la v3, pero cambiaron el ángulo, el buyer y la oferta. Por eso la reviso como la primera ronda del relanzamiento. Aun así, solo bloqueo 3 cosas: dos son inventos o claims sin respaldo, y la tercera hace que el hero no cumpla lo que pidió el dueño.

## Rúbrica
| # | Criterio | Nota | Por qué |
|---|---|---|---|
| 0 | Hero dopamínico (×2) | 4 | El título cumple: es el dolor #1 en 10 palabras, con una escena concreta («junto a tu cama») y tensión real, y no va en pregunta. Pero la imagen 1A, que ocupa dos tercios de la pantalla, muestra a una mujer dormida y tranquila: no tiene tensión y no toca el peligro que pidió el dueño (bloqueante 3). En la captura, el título ocupa 4 líneas. |
| 1 | Claridad en 3 segundos | 4 | El peligro se entiende de una. Qué es el cubito y qué hace lo explican la imagen y el subtítulo, y el subtítulo queda casi todo debajo del pliegue porque el precio y las estrellas van antes. |
| 2 | Consciencia y sofisticación | 4 | Arranca en la escena del problema, como corresponde. Ante un miedo que el mercado ya oyó, se diferencia por el corte visible: es la decisión correcta. |
| 3 | Ángulo | 4 | Un solo ángulo de punta a punta. Pero «protege tu hogar», que es la promesa del brief, no aparece en ninguna parte, y la palabra «riesgo» tampoco: fuera del título, el peligro queda muy diluido en «duerme tranquila» (mejora 3). |
| 4 | Especificidad y voz | 4 | Muy concreto: madrugada, «hasta que suena la alarma», «a centímetros de tu almohada», «separadito». No hay voz de clientes porque el dossier no la tiene; las frases del referente están marcadas y no se copian textuales. |
| 5 | Objeciones | 4 | Todas las del dossier tienen respuesta. La FAQ 4 responde lo de la sobrecarga con un argumento del ángulo viejo y no con el del calor (mejora 4). |
| 6 | Credibilidad y claims | 2 | No hay fuego, cifras de bomberos, Lightning ni «nunca pasará nada». Pero «4.9/5 · 127 reseñas» no sale de ninguna fuente (bloqueante 1), y los tachados de los packs 2 y 3 quedaron puestos en los campos sin estar confirmados (bloqueante 2). |
| 7 | Oferta y separación hero/oferta | 3 | Hay razón de uso por pack (tu cuarto, el de los hijos, la sala) y 4 bonos reales, y las imágenes del hero no venden. Pero «$99.900, antes $219.800, ahorras $119.900» se ve inflado justo debajo del título: el ahorro es mayor que el precio. |
| 8 | Brevedad y ritmo | 4 | Títulos cortos y una idea por sección. El subtítulo y el bullet 1 repiten el mismo mecanismo (mejora 2). |
| 9 | Lenguaje local | 5 | Tuteo colombiano natural («cubito», «separadito», «pagas al recibir»), sin rastros de España. |
| 10 | Aprendizajes | 3 | Cumple con el título de ≤10 palabras, sin pregunta, imágenes del hero sin venta, ticker que abre con el gancho y bonos por WhatsApp. Incumple «No usar precios tachados inventados»: los tachados sin confirmar están en los campos que se van a publicar. |
| 11 | Imágenes del hero | 3 | Hay 2 comparativas sin «antes/después», son seguras (sin humo, llamas ni brillo rojo) y los menores no salen. Pero la 1A no tiene tensión (bloqueante 3), y el avatar está mal nombrado y no corresponde al perfil del buyer (mejora 5). |
| 12 | Políticas | 4 | Habla de calor como posibilidad y no de incendio, y no promete «nunca». Un anuncio con el rating inventado o con el ahorro inflado sí tendría problemas; se arreglan con los bloqueantes 1 y 2. |

## Bloqueantes (obligatorios)
1. **[pp-hero-cantidad · rating / pp-resenas · nota y cantidad] «4.9/5 · 127 reseñas» es una cifra inventada.** No aparece en el brief, en el dossier ni en ningún otro archivo. El brief §6 dice textualmente «Reseñas reales: no hay». La decisión del 19-11 («Estrellas: reales; se muestran») no da ningún número, y además contradice al §6. Hoy las 127 reseñas salen en la primera pantalla y encabezan una sección hecha solo de «Testimonio de ejemplo». Eso es prueba falsa.
   → `mostrar_rating: false` en el hero. En pp-resenas, `nota` y `cantidad` vacíos, o «Testimonios de ejemplo» en `cantidad`. Solo vuelven cuando el dueño entregue el número real y diga de dónde sale (Judge.me, la tienda, etc.).

2. **[pp-hero-cantidad · packs 2 y 3 · precio_antes, y tachado del botón] Los tachados $219.800 y $329.700 están marcados como [Hipótesis] en el brief, y aun así quedaron en los campos.** La regla del propio copy («todo pendiente tiene un texto seguro mientras tanto») no se cumplió aquí. En la primera pantalla sale «Ahorras $119.900» sobre $99.900: se lee inflado y le quita credibilidad a un hero que vive de dar miedo con honestidad. El precedente es VIVIDUS: el `precio_antes` quedó vacío hasta confirmarlo.
   → Texto seguro, verificable en la misma página: el tachado es el precio de comprar sueltas al precio de hoy.
   - Pack 1: `precio_antes: 109900` (real, según la decisión del dueño del 19-11).
   - Pack 2: `precio_antes: 149800` (2 × $74.900) → «Ahorras $49.900».
   - Pack 3: `precio_antes: 224700` (3 × $74.900) → «Ahorras $109.800».

   Si el dueño confirma por escrito que $219.800 y $329.700 son precios de referencia reales, puede volver a ponerlos. Aun así, recomiendo los de arriba: el ahorro se puede comprobar en la misma página y sigue siendo grande.

3. **[Imágenes del hero · imagen 1] La 1A ★ no tiene tensión: es la mitad tranquila de la historia.** Ocupa dos tercios de la primera pantalla y muestra una mesa de noche cálida, a la mujer dormida y el texto «Duerme tranquila». Se ve como un anuncio de colchones. El dueño pidió explícitamente un hero que toque el peligro, y la imagen 1 del referente que validó el mercado es justamente el peligro. El título ya pone el miedo; si la imagen solo muestra la calma, el contraste no se ve en 1 segundo.
   → **La principal pasa a ser la B, reescrita:** la misma mesa de noche, partida en dos (40 / 60).
   - **Izquierda:** un cargador común con el celular conectado, el rayo de carga en la pantalla y un despertador que marca 3:00. Etiqueta: «Sigue calentándose».
   - **Derecha:** el Auto-Stop, grande y nítido, con el celular ya separado unos milímetros y la pantalla al 100 % sin rayo. Etiqueta: «Cortó al 100 %».
   - **Titular:** «A las 3 a. m., ya cortó».
   - **Seguridad:** sin humo, sin brillo rojo y sin deformaciones; el calor lo cuenta solo la etiqueta.

   La A y la C quedan como variantes de prueba. Para que la imagen 2 no repita la escena partida, mientras la B sea la principal la imagen 2 pasa a ser la escena actual de la 1A, la de la transformación («Duerme tranquila: ya cortó solo»). Siguen siendo 2 comparativas: la 1 y la 4.

## Mejoras (recomendadas)
1. **[Hero · título] Cabe en 4 líneas, y el resaltado cubre 8 de las 10 palabras, así que no resalta nada.** → `Mientras duermes, tu cargador <em>sigue calentándose junto a tu cama</em>` con `tamano_titulo: 24`, y verificar en 390 px que quede en 3 líneas. Si sigue en 4, probar «Duermes y tu cargador <em>sigue calentándose junto a tu cama</em>» (9 palabras).
2. **[Hero · bullet 1] Repite el subtítulo** (los dos dicen «sus dos botones empujan el celular»). → `<strong>Corte que se ve:</strong> en la mañana lo encuentras separado del adaptador.`
3. **[Ticker 2, grid-dolores · cierre, comparativa · pie_der] Falta «protege tu hogar» y falta «riesgo»**, que son la promesa del brief y una palabra permitida. Fuera del título, el peligro se pierde.
   - Ticker 2: «Protege tu hogar mientras duermes» (además, quita el «duerme… duermes» repetido).
   - Cierre del grid: `No es exagerar: <em>es un riesgo que nadie vigila de noche.</em>`
   - Comparativa: `pie_der` «Protege tu hogar».
4. **[FAQ 4 · respuesta] Responde con el argumento del ángulo viejo** («el celular se queda conectado»). → `<p>Sí, el celular se protege. Lo que no descansa es <strong>el cargador: sigue conectado y trabajando junto a tu cama</strong> toda la noche. Auto-Stop separa el celular al llegar al 100 % y la carga se corta.</p>`
5. **[Imágenes 1A, 4, 5 y 6 · grid de dolores] El avatar se llama Paola, no Mónica**, y su perfil en el banco es «profesional de oficina, blazer». Para «la mamá o mujer de la casa», Laura (`hogar-01`, mujer en casa, de 35 a 45 años) encaja mejor. Hay que corregir el nombre en todas las escenas y dejar que el dueño confirme cuál de las dos usa.
6. **[Tráfico] El brief §3 sigue apuntando al anuncio «Si tu hijo deja cargando…».** Si el anuncio no cambia al calor y la noche junto a la cama, el hero rompe la continuidad. Es condición para salir a pauta, no para el copy.
7. **[pp-galeria-ideas · «El estudio»] El portátil no encaja con el ángulo del cuarto**, y no está confirmado que el empuje funcione con un portátil. → Cámbialo por «El cuarto de visitas» · «El celular de quien llegue» · «Corta solo, aunque no conozca el truco», o quita la tarjeta.

## Lo que está bien y no se toca
- La disciplina de claims: nada de incendio, fuego, cifras de bomberos ni «nunca»; «sobrecarga» solo aparece para negarla, y la nota de que el cargador sigue en el enchufe es honesta.
- El mecanismo como prueba («lo ves: queda separado») en el subtítulo, el carrusel, la comparativa y la FAQ 2. Es la brecha 2 del dossier y la mejor respuesta a la sofisticación alta.
- Las razones de uso de los packs (tu mesa de noche, el cuarto de los hijos, toda la casa), y «Recomendado» en vez de un «Más elegido» sin datos.
- Que se haya quitado «Black Days» del ticker: no se inventa urgencia.
- El grid de dolores: «A centímetros de tu almohada» y «Levantarte a desconectarlo cada noche no es vida».
- Las reseñas marcadas como «Testimonio de ejemplo», sin «evitó un accidente».
- Las imágenes sin menores con rostro y sin efectos de calor.

## Elección del hero
Firmo el **título 1**, con el ajuste del `<em>` de la mejora 1, el **subtítulo A** y la **imagen 1 B reescrita** (bloqueante 3).
- **El título 1 frente al 2 («Son las 3 a. m.…»):** el 1 la pone en la cama, que es donde está el miedo. La hora no se pierde: pasa a la imagen 1 («A las 3 a. m., ya cortó»). Título e imagen juntos cubren las dos cosas.
- **Frente al 4 y el 5 («riesgo», «peligro»):** nombrar el peligro en abstracto es menos creíble que mostrarlo («calentándose junto a tu cama»). Si el dueño quiere la palabra explícita, la que probaría en Clarity es la 4, no la 5 ni la 6.
- **El subtítulo A sobre el B:** en la captura, el selector de packs no queda apretado por el subtítulo, que va después del precio. El «lo ves» del A es la prueba, y el B la pierde.

## Resumen para el dueño
El nuevo ángulo está bien tomado: el título «Mientras duermes, tu cargador sigue calentándose junto a tu cama» toca el miedo con una escena concreta y sin decir nada prohibido. Faltan 3 arreglos antes de aprobar. Primero, quitar las «127 reseñas, 4.9» hasta que usted nos dé el número real, porque hoy no salen de ningún lado. Segundo, cambiar los precios tachados de los packs 2 y 3 por el precio de comprarlos sueltos ($149.800 y $224.700), que es verdad y se puede comprobar en la misma página. Tercero, que la primera foto muestre el contraste del peligro (cargador común calentándose contra el Auto-Stop que ya cortó) y no solo a la mujer dormida. Además, el anuncio debe hablar del calor de noche, no del hijo, para que la landing continúe lo que promete.

---
**Veredicto:** CAMBIOS REQUERIDOS · `copy/adaptador-auto-stop/revision-v3.md` · 3 bloqueantes.
