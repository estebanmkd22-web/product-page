# Revisión · VIVIDUS 86 V2 · landing-v1 · CAMBIOS REQUERIDOS

Alcance: landing completa (15 secciones, plantilla `vividus-v3`). La primera pantalla (`final.md`) solo cambió de 90 a 60 días de garantía. Título, bullets e imagen 1 no se reabren. El riesgo de «no duran ni 3 meses» con 60 días se analiza aparte en «Elección del hero» y queda como decisión del dueño, no como bloqueante del copywriter.

## Rúbrica
| # | Criterio | Nota | Por qué |
|---|---|---|---|
| 0 | Hero dopamínico (x2) | 5 | La primera pantalla es la aprobada: dolor #1 con el número del cliente, 9 palabras, tensión y continuidad con la sorpresa del anuncio (imagen 1). El 60 frente a «3 meses» es un problema de credibilidad (punto 6), no de retención. |
| 1 | Claridad en 3 segundos | 5 | En el hero se entiende el dolor, la protección y el respaldo sin leer nada más. |
| 2 | Consciencia y sofisticación | 5 | Para un mercado en etapa 4-5 abre con la identificación («ya me pasó») y con un mecanismo (el estuche que aguanta), no con «sonido increíble». |
| 3 | Ángulo | 4 | Se sostiene en la oferta, el grid, las filas, la comparativa y la garantía. Se diluye en los íconos (repiten los bullets) y en el bloque 3 del grid (un dolor que la landing no resuelve). |
| 4 | Especificidad y voz del cliente | 4 | Usa bien «la tapita se quiebra», «uno suena más bajo» y las reseñas reales. Unas pocas frases quedan genéricas («Contigo todo el día»). |
| 5 | Objeciones | 4 | Están las 5 del dossier. «¿Suenan bien o es pura carcasa?» solo la responde el título de reseñas: no tiene FAQ propia. |
| 6 | Credibilidad y claims | 2 | Dice que las fotos son del producto real cuando serán imágenes de IA. Hay un «Estuche VIVIDUS» en la imagen 2 cuando el estuche real dice «Sound by KFG», un video de unboxing que no está verificado, un «Casi nunca» contra la competencia que el dossier no respalda y una garantía que en dos lugares parece cubrir cualquier falla. |
| 7 | Oferta y separación hero/oferta | 3 | Apila bonos reales del brief y la fecha Black es real. El tachado del pack 2 ($219.800, «ahorras $89.900») no está confirmado, y los valores de los bonos y la forma de entregar el 15 % siguen pendientes. |
| 8 | Brevedad y ritmo | 4 | Títulos cortos y una idea por sección. El texto de la garantía y el de pp-esperar repiten «pagas al recibir» y «sin pagar por adelantado». |
| 9 | Lenguaje local | 5 | Tuteo colombiano natural: «la U», «morral», «melísimos». |
| 10 | Aprendizajes | 4 | Ningún título en pregunta (fuera de la FAQ), no promete duración y el hero no vende. Falta cerrar el tachado del pack 2 contra la regla de «no usar precios tachados inventados». |
| 11 | Imágenes del hero | 4 | No cambian y siguen siendo seguras. El pendiente de la imagen 2 («Estuche VIVIDUS») deja de ser opcional en esta landing (bloqueante 1). |
| 12 | Políticas | 4 | Sin claims de salud ni de dinero. La comparativa con «Casi nunca» es una afirmación contra terceros sin prueba. |

## Bloqueantes (obligatorios)
1. **[§10 pp-esperar · título] · [§13 FAQ 1 · respuesta] · [§5 pp-videos] · [imagen 2 del hero · lado derecho]** La landing promete «Lo que ves aquí es lo que te llega» y «Las fotos y los videos de esta página son del producto real». Pero las imágenes del grid, la galería, las filas y los pasos se van a generar en ChatGPT, y la imagen 2 dice «Estuche VIVIDUS» cuando el estuche que llega dice «Sound by KFG». En una landing cuyo diferencial es justamente «llegan como en la foto», eso es una promesa falsa y además el primer motivo de reclamo al recibir. Cambios:
   - §10 título: `Así llegan <em>hasta tus manos</em>` (sin prometer igualdad con las fotos).
   - FAQ 1, respuesta: `<p>Sí. Los <strong>videos de esta página son del producto real</strong>: el estuche de cámara en café o verde, con la pantalla de batería. Además <strong>pagas al recibir</strong>, y si llegan dañados, con la caja rota o destapados, <strong>te los cambiamos por otros</strong>.</p>` (quitar «las fotos»).
   - Imagen 2, lado derecho: `Estuche de cámara` (cerrar el pendiente). Y en la ficha del kit: el estuche se genera idéntico al real, con lo que lleva impreso.
   - §5: el brief solo dice que hay «3 videos reales» y no qué muestra cada uno. Si ninguno es un unboxing, el título pasa a `Míralos <em>en video real</em>` y la etiqueta «Así llegan» se cambia por lo que de verdad muestra el video. Hasta que se confirme, marcarlo **[POR CONFIRMAR]**.
   - Las secciones con fotos generadas (grid, galería, filas y pasos) llevan la nota `Imágenes ilustrativas` (regla de la casa).
2. **[§14 pp-garantia · título] · [§13 FAQ 3 y FAQ 5]** Hoy la garantía parece cubrir cualquier falla. El título «Si un lado falla, te los cambiamos» no dice «de fábrica». La FAQ 3 responde «¿qué pasa si se me caen?» y en la misma frase pone la garantía, así que se lee como que una caída está cubierta. Y la FAQ 5 dice «si un lado deja de sonar o algo falla de fábrica», con lo que el «deja de sonar» queda suelto. En contraentrega eso termina en discusiones y devoluciones. Cambios:
   - §14 título: `Si falla de fábrica, <em>te los cambiamos</em>` (7 palabras).
   - FAQ 3: `<p>Si se te caen guardados, el estuche de cámara <strong>aguanta el golpe por ellos</strong>. Por eso vale la pena guardarlos en el estuche cada vez que te los quitas.</p>` (sin mencionar la garantía en esta respuesta).
   - FAQ 5: `… si un lado deja de sonar <strong>por un defecto de fábrica</strong>, te los cambiamos o te devolvemos tu dinero …`
3. **[§4 oferta · Pack 2 · precio_antes]** El $219.800 no es un precio que exista: es 2 × $109.900, y con `mostrar_ahorro` activo la tarjeta va a decir «Ahorras $89.900». El brief solo confirma el precio regular de 1 unidad. Cambio: marcarlo **[POR CONFIRMAR]**. Si desde el 1 de diciembre el pack 2 se sigue vendiendo a un precio propio, ese precio es el tachado. Solo si no habrá precio de pack se deja $219.800 (el precio real de 2 unidades sueltas). El tachado de $109.900 del pack 1 está bien.
4. **[§11 comparativa · fila «Respaldo» · valor_b]** «Casi nunca» afirma que la competencia casi no responde por fallas de fábrica. El dossier solo dice que la competencia «casi no **menciona**» la garantía: es un respaldo forzado. Cambio: valor_b `Sin garantía a la vista`.

## Mejoras (recomendadas)
1. **[§3 pp-iconos]** Los 3 íconos repiten 3 de los 4 bullets que están justo arriba. Úsalos para la sorpresa del anuncio y para lo que todavía no se dijo: `Parece una cámara` (reseña real de Andrés P. y Pedro Rojas) · `Batería a la vista` · `Bluetooth 5.4`.
2. **[§13 FAQ · nueva, después de la 1]** Falta la objeción 3 del dossier, la más peligrosa en un producto «de diseño»: `Andrés de Cali pregunta: ¿suenan bien o es pura carcasa?` → `<p>Se conectan por <strong>Bluetooth 5.4</strong> y el micrófono tiene ENC, así que te escuchan claro aunque haya ruido. Lo dice Juliana, de Medellín: «Pensé que por el precio iban a sonar mal y no: se escuchan bien y las llamadas son claras».</p>` Así quedan 9 FAQ.
3. **[§6 grid · bloque 3]** «Solo conecta uno» abre un dolor que ninguna sección resuelve. Cámbialo por uno que la landing sí quita: título `Se apagan a mitad de ruta` · texto `No sabes cuánta batería les queda hasta que se quedan mudos.` (dossier: dolores secundarios, batería). Se resuelve en las filas y en la FAQ 4.
4. **[§6 grid · bloque 4 · texto]** La puntuación queda torpe. Cambiar a: `Lo barato sale caro: vuelves a pagar por unos iguales.`
5. **[§4 bono 15 %]** No le pongas valor tachado: el porcentaje ya es el valor, y $16.485 solo sería cierto si la segunda compra es a precio regular. Antes de publicar hay que definir cómo se entrega el 15 % (es un bono que no se puede cumplir si nadie sabe cómo se da). En la nota: `Te escribimos por WhatsApp para confirmar tu pedido y te enviamos tu bono del 15 %`, si así se hace.
6. **[§1 franja · mensaje 5]** `Envío express gratis a toda Colombia`, para que coincida con el bono y con el subtexto del botón fijo.
7. **[§4 · colores]** Confirmar que la variante en Shopify y en EasySell se llama «Café» y no «Marrón». Si el formulario dice otro nombre, aparece justo la desconfianza de «no es lo que vi».
8. **[§8 filas · título]** «Pensados para lo que daña a los baratos» no encaja con el bloque «Llamadas claras». Puedes pasar ese bloque a «Si hay ruido» (lo que arruina las llamadas) o dejarlo así: el desajuste es menor.
9. **[§10 pp-esperar · texto]** Repite el bloque 1. Déjalo en `Así es el camino hasta tus manos.`
10. **[§6 grid · imágenes]** En los prompts, a las «cajitas blancas genéricas» agrega: «forma genérica, sin logos, que no se parezca a ninguna marca conocida». Si no, ChatGPT tiende a dibujar AirPods (marca de terceros).
11. **[§4 · entrega]** El campo `entrega` es la fila de confianza. Revisa en 390 px que el texto del precio Black no se corte. Si se corta: `Precio Black hasta el 30 de nov.`

## Lo que está bien y no se toca
- El hilo de ATIDCOA: el dolor (grid), el mecanismo (filas), la facilidad (pasos), el qué pasa después (esperar), la comparación, la prueba y la garantía, en el orden de la maqueta, con los videos justo debajo de la oferta.
- El título de la oferta, `Que no te pase <em>otra vez</em>`, lleva el ángulo al momento de comprar.
- Las 9 reseñas están textuales y completas (verificadas una por una contra el brief, incluido el «TK» de Alejo R) y sin títulos inventados. El título de la sección es una cita exacta de Juliana R.
- El pack 2 tiene una razón de uso real («uno para regalar»), sostenida en reseñas.
- La urgencia es real (Black hasta el 30 de noviembre, con el precio de vuelta de la landing en vivo), y los textos que cambian el 1 de diciembre están marcados.
- No hay claims prohibidos: nada de «no se dañan», IPX8, cancelación de ruido, «nadie más lo tiene» ni «sonido premium». El ENC se presenta como micrófono, que es correcto.
- Los pendientes se marcan como **[POR CONFIRMAR]** en vez de inventarlos (tiempo de entrega, cable, nombre en el Bluetooth).
- Las imágenes del grid no muestran VIVIDUS, y fuera del hero todas van sin texto ni rostro.

## Elección del hero
Firmo el hero aprobado tal como está en `final.md`, con la imagen 1 A publicada y la B como control. No hay otra opción mejor en la mesa.

**El riesgo de «no duran ni 3 meses» con 60 días de garantía es real, pero moderado.** No es un claim falso: el título nombra el dolor y no promete duración. Pero el subtítulo pone la garantía como respuesta a ese dolor y cubre menos que el plazo que el mismo título nombra. Un comprador en etapa 4-5, que ya se quemó, puede hacer la cuenta («si fallan en el mes 3, ya no me cubren»). Hay un problema adicional: el dolor del dossier es «se me cayeron y ahora uno suena más bajo», y una caída no es un daño de fábrica, así que la garantía nunca lo cubriría. Por eso el bloqueante 2 separa caída y garantía.

Salidas, en orden de preferencia:
1. **Volver a 90 días** (decisión de operación). Es lo más limpio: coincide con el plazo del título, con la hipótesis del brief y del dossier, y con lo que ya estaba en vivo. No cambia nada más del copy, solo el número en la franja, el subtítulo, el bono, el sello, pp-esperar, la FAQ y la garantía.
2. **Si los 60 días son fijos: cambiar solo el título** a `Cansado de audífonos que <em>no aguantan ni una caída</em>.` Son 9 palabras y salen de la voz del cliente («se me cayó 1 vez y el estuche dejó de funcionar», «se me cayeron al suelo»). Quita la cuenta de los meses y amarra el título al mecanismo que sí es nuestro (el estuche aguanta caídas) y a la imagen 1 («Se te cayeron. / Tranqui, siguen enteros.»). Pierde el «3 meses», que es la cifra más repetida, por eso es la segunda opción. Ojo: protege cuando los audífonos están guardados, y el bullet 1 ya lo aclara.
3. **Dejarlo como está.** Es aceptable pero no lo recomiendo. Si se elige, que se mida en Clarity igual que la imagen 1.

No lo pongo como bloqueante porque el dueño ya aprobó el título y el cambio depende de una decisión de operación. Queda escrito para que él decida.

## Resumen para el dueño
- La landing está bien armada: sigue el dolor de «los baratos se dañan» de principio a fin, las reseñas son las reales y textuales, y la oferta Black usa precios reales.
- Hay que corregir 4 cosas antes de montarla: no prometer «lo que ves es lo que te llega» ni «las fotos son reales», porque las fotos serán de IA y el estuche real dice «Sound by KFG»; dejar claro que la garantía es solo por fábrica (no por caídas); confirmar el precio tachado del pack de 2; y quitar el «Casi nunca» de la comparativa.
- Una decisión suya: el título dice «no duran ni 3 meses» y la garantía ahora es de 60 días. Lo mejor es volver a 90 días. Si no se puede, le propongo el título «Cansado de audífonos que no aguantan ni una caída».
- Antes de publicar debe darnos: el tiempo de entrega, cómo se entrega el 15 %, el valor del envío express, qué muestra cada video y si la variante se llama «Café».

**Veredicto: CAMBIOS REQUERIDOS** · `copy/vividus/revision-landing-v1.md` · 4 bloqueantes.
