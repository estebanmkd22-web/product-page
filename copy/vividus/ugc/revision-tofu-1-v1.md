# Revisión · VIVIDUS 86 V2 · UGC TOFU 1 · v1 · CAMBIOS REQUERIDOS
Guion: `copy/vividus/ugc/tofu-1.json` · Avatar: Camila (co-enfermera-01) · Estilo: demostración · Ronda 1 · 2026-11-20

## Rúbrica
| # | Criterio | Nota | Por qué |
|---|---|---|---|
| 0 | Hook de 3 segundos (x2) | 3 | La idea es la correcta: la caída, con las palabras del cliente («se me cayeron», dossier dolor #1) y el «tranqui» del hero. Pero la ejecución mata los 3 segundos. El video prompt pone el diálogo *después* de soltar el estuche, mirar al piso un segundo y soltar el aire, así que los primeros 2 a 3 s son una cara cansada en silencio. Además, ella abre los dedos a propósito mientras dice «se me cayeron», y eso se ve montado. |
| 1 | Etapa y estructura | 4 | El arco TOFU es correcto (caída → cajita de antes → plata botada → el estuche como salida → garantía → CTA suave) y sostiene un solo ángulo, el aprobado. Sin precio, así que sirve después del 30 de noviembre. |
| 2 | Suena a persona real | 3 | Las escenas 2, 3 y 5 suenan a Camila hablando («plata botada, la verdad», «tranqui»). La escena 4 suena leída: «parece una cámara, aguanta el golpe y me muestra la batería» es una lista de tres características, o sea lenguaje de anuncio. |
| 3 | Presupuesto de palabras | 5 | 11, 13, 12, 13 y 12 palabras contra un tope de 12 a 13,2. Ninguna escena pasa de 8 s y el total da 37 s. |
| 4 | Objeciones y prueba | 4 | Responde «los baratos se dañan» con el estuche y los 90 días por daños de fábrica, que es lo que toca en TOFU. La reseña de Juliana R. es real (brief) y va en pantalla con su nombre. Camila no se presenta como clienta de una reseña. |
| 5 | Claims y textos prohibidos | 3 | No hay pago al recibir, envío gratis ni WhatsApp, ni precio, ni IPX8, ni «café». La garantía de 90 días es correcta (brief, 2026-11-17). **Falla:** «estos sí aguantan» (escena 1) habla de los audífonos, no del estuche. Pegado a «a los tres meses un lado ya ni sonaba» (escena 3), se lee como «estos no se dañan»: es una promesa de duración que el brief prohíbe. |
| 6 | Continuidad | 4 | La cadena de frames está bien, cada cambio de posición tiene su microacción (recoger del piso, recostarse, abrir con el pulgar), la descripción de Camila va palabra por palabra y el producto coincide con f4. Riesgos menores, ver Mejoras 1 y 4. |
| 7 | Variedad visual | 5 | Cambian el encuadre (de pie, en cuclillas, contra la pared, primer plano, más abierto), la emoción (alivio, fastidio, resignación, entusiasmo, complicidad) y la interacción (soltar, recoger, sostener, abrir, ponerse un audífono). |
| 8 | B-roll | 4 | Hay 5 B-roll para 5 escenas, sin diálogo, y cada uno refuerza su línea: la caída real, la cajita rota, el cajón de audífonos viejos, la pantalla y el bolsillo. Pero el B-roll 1 contradice la escena 1 en tiempo y sonido (bloqueante 3), y los prompts de las cajitas genéricas arrastran una coletilla que confunde (Mejora 2). |
| 9 | CTA y coherencia | 4 | El copy TOFU 2 se pega tal cual y dice lo mismo que el video (caída, cajita que deja de cargar, estuche de cámara, batería). El CTA no tiene pago, envío ni WhatsApp, pero «Míralos aquí» es vago (Mejora 3). |
| 10 | Políticas de Meta | 5 | No hay pregunta que señale una condición, ni promesas médicas o de dinero, ni antes/después. El contraste se ve, no se dice. |

## Bloqueantes (obligatorios)
1. **[Escena 1 · video, visual y frame_inicial] El hook arranca en silencio y la caída se ve montada.** Camila tiene que estar hablando desde el primer medio segundo, y el estuche tiene que caerse sin querer, como en el copy TOFU 2 («Se te resbalaron del bolsillo») y como en el B-roll 5, donde va al bolsillo del uniforme.
   - **Frame inicial:** cambia «En la mano derecha, a la altura del pecho y bien visible, sostiene entre el pulgar y dos dedos el estuche…» por: «Con la mano derecha está metiendo el estuche de audífonos cerrado en el bolsillo del pecho del uniforme; el estuche se ve completo, apoyado solo en el borde del bolsillo, con la pantalla del lente encendida.»
   - **Video prompt:** reemplaza el bloque desde «Transición:» hasta antes de «Final:» por: «Transición: desde el primer instante, Camila mira a cámara y dice: 'Uff, se me cayeron otra vez… tranqui, siguen enteros.' Mientras dice «uff», el estuche se le escapa del borde del bolsillo, sin que ella abra la mano a propósito, y cae por el borde inferior del cuadro. En «otra vez» mira un instante hacia abajo, sin agacharse. En «tranqui» vuelve a mirar a cámara, baja la mano derecha vacía a la cintura y hace media sonrisa.» Quita «suelta el aire por la nariz».
   - **Visual:** ajústalo a lo mismo («se le resbala al meterlo en el bolsillo»).
2. **[Escena 1 · diálogo] «tranqui, que estos sí aguantan» promete duración de los audífonos.** El respaldo del brief es solo este: «el estuche aguanta caídas, también con los audífonos adentro». Por eso el hero dice «siguen enteros» y nunca «siguen sonando». Cámbialo por la frase del hero, que además es el hook que este video tiene que continuar:
   - **Línea:** «Uff, se me cayeron otra vez… tranqui, siguen enteros.» (9 palabras, cabe de sobra en 5 s).
   - Actualízala en `dialogo`, en `video` y en `sincroniza` del B-roll 1.
3. **[Escena 1 + B-roll 1 · capcut, sincroniza y audio] El tiempo y el sonido de la caída se contradicen.** El B-roll 1 dice que sincroniza con «se me cayeron otra vez…», pero la escena 1 pone esa línea después de la caída. Además, el golpe suena dos veces: en la escena 1, fuera de cuadro, y en el B-roll.
   - **Escena 1, «Audio»:** «pasillo con baldosa, leve eco; sin sonido de golpe (el golpe lo pone el B-roll).»
   - **B-roll 1, «capcut»:** «Entra en el instante en que el estuche sale de cuadro (hacia el segundo 1), dura 1,5 a 2 s con el golpe seco y vuelve a Camila justo en «tranqui». La voz de Camila sigue sonando encima del B-roll.»
   - **B-roll 1, «sincroniza»:** «se me cayeron otra vez…».

   Así, en los primeros 3 segundos el espectador oye el dolor, ve la imagen 1 del hero (el estuche a punto de chocar) y oye el golpe.
4. **[Escena 4 · diálogo y video] La línea suena a ficha técnica y entierra la sorpresa que vendió.** El anuncio ganador vendió con «¿Una cámara? No… son tus audífonos», y el brief pide continuar esa sorpresa. La escena 4 la reduce a un ítem de una lista y repite «aguanta el golpe», que ya se vio en la escena 1.
   - **Línea:** «Mira, parece una cámara… pero son los audífonos. Y te marca la batería.» (13 palabras).
   - **Video prompt:** que la tapa se abra justo en «pero son los audífonos» y que incline la pantalla hacia el lente en «te marca la batería».
   - El sticker «No es una cámara» de la edición queda perfecto con esta línea.

## Mejoras (recomendadas)
1. **[Escenas 1 a 5 · apoyo]** La única foto de referencia (f4) muestra el estuche abierto, y en casi todos los frames va cerrado. Agrega al apoyo y al prompt: «el estuche está CERRADO, con la tapa crema abajo, aunque la foto de referencia lo muestre abierto». Si no, el generador tiende a copiar la tapa abierta. Precisa también que la pantalla muestra solo números (en f4 se lee «100», sin el signo %), para que no invente textos.
2. **[B-roll 2 y 3 · imagen]** Los prompts de las cajitas genéricas terminan con «Detalle real del producto…». Esa coletilla puede meter el estuche VIVIDUS donde no va, y en el B-roll 3 choca con la escena («un cajón visto desde arriba» contra «en un pasillo con piso de baldosa»). Cámbiala por «Objetos genéricos, sin marca, en el pasillo del apartamento con luz natural de tarde» y, en el 3, por «un cajón del mueble de entrada del pasillo».
3. **[Escena 5 · diálogo]** «tienen 90 días» y «Míralos aquí» quedan ambiguos. Propuesta: «Si un lado falla de fábrica, tienes 90 días de garantía. Dale y míralos.» (13 palabras). Usa «tienes» como el subtítulo del hero, y el «dale» empuja al botón «Comprar» del cierre.
4. **[Escena 5 · video]** En 8 s, Camila saca un audífono, se lo pone, cierra la tapa y sube el estuche, todo con una sola mano y hablando al tiempo. Es mucha manipulación fina para Kling o Veo, y las manos se deforman. Simplifica: que el audífono ya esté en su oído desde el final de la escena 4 (con una microacción en esa escena) o que en la 5 solo cierre la tapa y suba el estuche.
5. **[B-roll 1 · producción]** Si el dueño puede grabar con su celular una caída real del estuche (a la altura del bolsillo, sobre baldosa), úsala en lugar del B-roll generado. Es la única escena donde una demostración real vale más que cualquier IA, y el brief confirma que el estuche aguanta.
6. **[Edición · escena 1]** No pongas a la vez los subtítulos y el texto «Se te cayeron. Tranqui, siguen enteros.» En la escena 1, el texto del hero reemplaza al subtítulo; con el bloqueante 2, la voz y el texto ya dicen lo mismo.

## Lo que está bien y no se toca
- Las líneas de las escenas 2 y 3: «una caída y el estuche dejaba de cargar» y «a los tres meses, un lado ya ni sonaba. Plata botada, la verdad». Son el dossier casi literal y suenan colombianas.
- La progresión emocional y el cambio de encuadre de escena en escena.
- La garantía dicha como respaldo, no como promesa: «si un lado falla de fábrica, 90 días».
- Cero precio, cero textos del cerebro y «marrón» en lugar de «café».
- Los B-roll 2, 3 y 4 como idea: la cajita rota sin marca, el cajón de audífonos viejos y la pantalla de batería.
- El copy de Meta TOFU 2 tal cual: es coherente con el video.
- La descripción de Camila palabra por palabra y la descripción del producto, fiel a f4.

## El hook que firmarías
**Escena 1, con los bloqueantes 1 a 3:** el estuche se le escapa al meterlo en el bolsillo, ella ya va diciendo «Uff, se me cayeron otra vez…», corte al B-roll del estuche a punto de chocar contra la baldosa (la imagen 1 del hero) con el golpe seco, y vuelta a Camila en «…tranqui, siguen enteros.».

Lo firmo porque en 3 segundos junta tres cosas: el momento que todos han vivido, dicho con las palabras del cliente; la imagen y la frase exactas del hero, así que quien toca «Comprar» llega a una landing que sigue la misma historia; y el alivio que genera la tensión. La alternativa «No es una cámara» funciona mejor en MOFU 1: en TOFU, el dolor detiene más que la curiosidad.

## Resumen para el dueño
El guion va por buen camino: Camila suena real, cuenta el dolor con las palabras de los clientes y no menciona precio, así que sirve después del Black Friday. Hay que corregir cuatro cosas antes de producirlo:
1. Que hable desde el primer segundo y que el estuche se le caiga sin querer, no soltado a propósito.
2. Cambiar «estos sí aguantan» por «siguen enteros», porque lo primero promete que los audífonos no se dañan.
3. Ordenar el golpe de la caída en la edición.
4. Cambiar la frase de la escena 4, que suena a ficha técnica, por la sorpresa del anuncio que ya vendió: «parece una cámara… pero son los audífonos».

---
**Veredicto:** CAMBIOS REQUERIDOS · **Archivo:** `/home/user/product-page/copy/vividus/ugc/revision-tofu-1-v1.md` · **Bloqueantes:** 4
