# Revisión · Adaptador Auto-Stop · v1 · CAMBIOS REQUERIDOS

Revisado contra: `briefs/adaptador-auto-stop.md`, `investigacion/adaptador-auto-stop/dossier.md`, `criterio.md`, `aprendizajes.md`, `prompts-seguros.md` y `SKILL.md`. No hay captura de la primera pantalla (`primera-pantalla-v1.png` no existe), así que el criterio 0 se juzga solo por el texto y la descripción de la imagen 1.

Contexto aceptado: el dueño decidió no hacer investigación profunda, así que el dossier no tiene frases de clientes reales. No se penaliza la falta de voz de cliente. Sí se exige que todo lo demás tenga respaldo.

## Rúbrica
| # | Criterio | Nota | Por qué |
|---|---|---|---|
| 0 | Hero dopamínico (×2) | 3 | Dolor #1 correcto, «tu hijo» como brecha y continuidad total con el anuncio v1, pero el título tiene **14 palabras** (regla ≤10, bloqueante). En el pulgar se lee «El celular de tu hijo llega al 100 %…» y se corta antes de la tensión. |
| 1 | Claridad en 3 segundos | 4 | La escena se entiende sola; la tensión («sigue conectado») está en la segunda mitad, que es justo la que se pierde por el largo. |
| 2 | Consciencia y sofisticación | 5 | Arranca en el problema (consciente del problema) y niega la sobrecarga en vez de repetirla: correcto para sofisticación media-alta. |
| 3 | Ángulo | 5 | Un solo ángulo («horas al 100 % que no necesita» + batería que le compraste), sostenido del ticker a la FAQ. |
| 4 | Especificidad y voz | 4 | Muy concreto (mesa de noche, «suena la alarma», ícono de carga). Sin voz de cliente por decisión del dueño, y está declarado con honestidad. |
| 5 | Objeciones | 5 | Las 6 objeciones del dossier y las de operación tienen respuesta, con tabla de dónde. |
| 6 | Credibilidad y claims | 3 | Nada de fuego, cifras ni precios inventados, pero hay afirmaciones que dependen de pendientes y se publican como hechos, y una («sale con la batería llena») que el producto no puede cumplir. |
| 7 | Oferta y separación hero/oferta | 4 | El hero no vende; x2 con razón de uso; sin tachados inventados. El argumento interno del envío no diferencia (ver mejora 1). |
| 8 | Brevedad y ritmo | 4 | Títulos de sección cortos y una idea por sección. Fallan el título del hero y el subtítulo (unas 33 palabras, 4 a 5 líneas en el celular). |
| 9 | Lenguaje local | 4 | Tuteo colombiano correcto; «no es plan» suena a España (ver mejora 4). |
| 10 | Aprendizajes | 3 | Incumple «títulos cortos» en el hero. Cumple: nada en pregunta, hero sin venta, imágenes sin venta, garantía y bonos por WhatsApp, sin tachados inventados. |
| 11 | Imágenes del hero | 2 | Buen gancho y 2 comparativas sin «antes/después», pero la 4 (adulto entrando a oscuras al cuarto del hijo) y los menores dormidos o en pijama en la 1A, 1B y 5 van contra `prompts-seguros.md`. |
| 12 | Políticas | 3 | El copy pasaría. Las imágenes con menores en la cama, de noche, arriesgan rechazo en ChatGPT y revisión en Meta si se reutilizan. |

## Bloqueantes (obligatorios)
1. **[Hero · título] 14 palabras; la regla es ≤10.** Es el aprobado del dueño y la decisión final es suya, pero mi postura es clara: **sí debe acortarse**. Con 14 palabras ocupa 3 o 4 líneas en 390 px y la tensión queda al final. La versión corta del brief («Su celular llega al 100 %…», 11 palabras) tampoco cumple y pierde «tu hijo», que es la brecha frente a la competencia. La opción 2 del copywriter («El celular de tu hijo, al 100 % toda la noche») tiene **10** palabras, no 9, y además «al 100 % toda la noche» se puede leer como algo bueno («tiene batería toda la noche»): pierde la tensión.
   → Recorte que respeta las palabras del dueño (9 palabras):
   **«El celular de tu hijo <em>sigue conectado toda la noche</em>»**
   «Sigue» da la tensión (algo que ya debió parar), conserva «tu hijo» y «toda la noche» del anuncio v1, y el «100 %» entra en la línea de abajo («Cada hora al 100 %…»). Si el dueño mantiene el de 14 palabras, que quede escrito como decisión suya y que se mida en Clarity contra este.
2. **[Hero · subtítulo] «corta la carga sola» → «corta la carga solo».** El sujeto es «el adaptador». Es un error de concordancia en la primera pantalla, y un papá lo nota. Es una sola letra y no cambia lo que aprobó el dueño. Aplica igual al brief.
3. **[Imágenes del hero · 4] Un adulto en pijama entrando a oscuras al cuarto de un menor** es justo la escena que el filtro de ChatGPT rechaza, y en un anuncio de Meta se lee mal. Además, `prompts-seguros.md` dice: menores solo en escenas familiares neutras.
   → Escena nueva. **Izquierda:** primer plano de una mano adulta desconectando el cable del celular en la mesa de noche, con luz de pasillo y sin persona en la cama. **Derecha:** la misma mesa de noche con el adaptador puesto y la pantalla sin ícono de carga.
   Textos: titular «Nadie tiene que desconectarlo» · izquierda «Desconectarlo a mano» · derecha «Lo hace el adaptador».
4. **[Imágenes del hero · 1A, 1B y 5] Menor dormido en la cama o en pijama.** Hay que bajar el riesgo sin perder la escena.
   → 1A: el hijo al fondo **muy desenfocado y cubierto** (solo una silueta bajo la cobija, sin rostro), con el foco en la mesa de noche y el adaptador. En el prompt, «adolescente con camiseta y sudadera» y nunca «niño». 1B: cambia «hijo en pijama» por «hijo con camiseta y sudadera, desenfocado». 5: con camiseta y sudadera, y el papá o la mamá en la puerta con la luz del cuarto prendida. Para las 3, un avatar del banco que se vea adolescente mayor (16 o 17 años), nunca uno de 8 a 12 años.
5. **[pp-esperar · texto · carrusel · FAQ 5] Afirmaciones que dependen del pendiente 2 y salen como hechos.** «Él no tiene que hacer nada distinto. Tú tampoco.», «Él lo conecta como siempre» y «se queda puesto en el celular… sin hacer nada distinto» suponen que el adaptador queda puesto y que se rearma solo en cada carga. No está confirmado: muchos de estos adaptadores piden oprimir el botón o reconectar para volver a cargar. Si no es así, la promesa central de «automático» genera devoluciones en contraentrega.
   → Hasta confirmar, pp-esperar · texto: «Lo conecta antes de dormir. El resto lo hace el adaptador.» · carrusel · texto: «Va entre el cable y su celular.» · FAQ 5: «Es un cubito pequeño que va en el puerto del celular; él conecta su cable al adaptador.» Cuando el dueño confirme, se vuelve a la versión «como siempre».
6. **[pp-esperar · etapas «El resto de la noche» y «En la mañana»] «El celular sigue lleno» y «sale con la batería llena».** Si el corte es físico, el celular pasa 6 a 8 horas en reposo sin cargar y amanece en 95 o 97 %. El papá lo verá y pensará que no funcionó.
   → «El resto de la noche»: «Ya no está cargando: descansa la batería.» · «En la mañana»: «Lo desconecta y sale con la batería cargada.»
7. **[FAQ 2] «incluido el iPhone 15 en adelante» se afirma como hecho**, y en el brief es [Hipótesis].
   → Hasta confirmar: «Sirve para celulares, tabletas y portátiles con puerto USB-C compatibles. No sirve para iPhone con puerto Lightning, porque el adaptador va en el puerto del celular. Si tienes dudas con tu modelo, te confirmamos por WhatsApp al llamarte.» Cuando el dueño lo pruebe, se agrega el iPhone 15.

## Mejoras (recomendadas)
1. **[Por qué pagar $89.900 · punto 1] Engaña al dueño, no al cliente:** el competidor de $69.990 también tiene envío gratis (video v4). Los $21.000 del express no explican la diferencia. Los argumentos que sí sirven son el x2 a $74.950, la garantía por WhatsApp y la prueba visible del corte. Prioriza confirmar el precio de un cambio de batería en Colombia para usar el ancla «Cuesta menos que cambiarle la batería a su celular»: es la palanca de oferta más fuerte que hay.
2. **[pp-comparativa · fila «Quién lo desconecta»] «Nadie» en la columna buena y «Tú o nadie» en la mala confunde,** porque «nadie» sale en las dos. → ok_a «El adaptador» · no_b «Tú, o nadie».
3. **[pp-grid-dolores · item «Tú no puedes entrar»] Suena a que tiene prohibido entrar al cuarto.** → «No puedes estar pendiente» · «Desconectárselo cada noche no se puede.» (es la emoción del dossier: «no puedo estar desconectándolo yo»).
4. **[pp-grid-dolores] «no es plan» es de España.** → «no se puede» u «olvídate».
5. **[Hero · subtítulo] Unas 33 palabras = 4 o 5 líneas** debajo de la imagen 1: es probable que el CTA de bajar quede fuera de la primera pantalla. Lo aprobó el dueño, así que no lo bloqueo; si la captura de 390 × 750 lo confirma, propónle quitar «El Adaptador Auto-Stop» y dejar «Va entre el cable y el celular y corta la carga solo, aunque él esté dormido.»
6. **[Imagen 1A · titular] Si se adopta el título recortado,** «Se acabó cargar toda la noche» casi repite el título. → «Al 100 %, corta solo» (4 palabras: muestra el mecanismo y no repite).
7. **[Imagen 2] Los dos lados muestran el celular al 100 %:** el contraste depende de un ícono pequeño que no se lee en 1 segundo. → Izquierda con el rayo de carga grande y visible en la pantalla; derecha sin rayo, con la luz del adaptador cuando se confirme qué hace.
8. **[pp-oferta-tabs · regalo `chat`] «Si tienes dudas para instalarlo»:** es un cubito que se enchufa, así que el bono se ve inflado. Si el dueño no lo confirma, quítalo y no lo reemplaces con nada.
9. **[pp-oferta-tabs · etiquetas] «Cada hijo» suena raro en la lista.** → «El celular de tu hijo, Tu celular, La tableta, El portátil».
10. **[Proceso] Falta la captura de la primera pantalla** (390 × 750) para la v2: sin ella no puedo dar el 5 del criterio 0.

## Lo que está bien y no se toca
- El ángulo: negar la sobrecarga («No es sobrecarga: son horas al 100 % que no necesita») y anclarlo en «la batería del celular que le compraste». Es diferencial frente a toda la competencia del dossier.
- «Tu hijo» como eje: es la brecha 1 del dossier y la continuidad con el anuncio v1.
- El ticker abre con «Se desconecta solo al llegar al 100 %», no vendiendo.
- Los bullets del hero: formato correcto y cada uno quita un dolor o una objeción.
- La disciplina de claims: nada de fuego, Lightning, «expulsa», ahorro de luz ni % de vida de batería; las horas solo como «Por ejemplo»; «sobrecarga» solo para negarla.
- La oferta sin precio tachado inventado, con x2 y razón de uso real; reseñas marcadas como «Testimonio de ejemplo» y sin rating.
- La FAQ 1 (sobrecarga) y la FAQ opcional de carga optimizada: inclúyela, porque responde la objeción más inteligente del comprador sofisticado.

## Elección del hero
No firmo ninguna de las 4 tal como están. Firmo el **título del dueño recortado a 9 palabras**: **«El celular de tu hijo <em>sigue conectado toda la noche</em>»**, con el subtítulo A corregido («solo»).
- Frente a la 1 (14 palabras): dice lo mismo con 5 palabras menos y la tensión llega antes.
- Frente a la 2 (10 palabras, no 9): «al 100 % toda la noche» se puede leer como una ventaja; «sigue conectado» no.
- La 3 depende de una hora inventada y la 4 abre en la consecuencia, no en la escena que trae el anuncio.

Imagen 1: la **A**, con los cambios del bloqueante 4.

## Resumen para el dueño
El ángulo es bueno y distinto a la competencia: hablarle al papá del celular del hijo, sin decir «sobrecarga». Recomiendo acortar su título a «El celular de tu hijo sigue conectado toda la noche» (9 palabras, mismas ideas). La decisión es suya. En el subtítulo hay que cambiar «sola» por «solo». Hay que rehacer la imagen 4: un adulto entrando de noche al cuarto de un menor no pasa los filtros. Antes de publicar, necesito que me confirme 2 cosas: si el adaptador queda puesto y vuelve a cargar sin oprimir nada, y si sirve en iPhone 15. Mientras tanto, la página no lo promete.
