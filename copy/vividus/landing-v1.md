# Copy · VIVIDUS 86 V2 · landing-v1 (landing nueva desde cero, plantilla `vividus-v3`)
Base: `briefs/vividus.md` (sección "Landing nueva desde cero, 2026-11-13"), `copy/vividus/final.md` (primera pantalla aprobada), `investigacion/vividus/dossier.md`.
Marcas usadas: **[POR CONFIRMAR]** = dato que el dueño debe dar antes de montar. **[CAMBIA EL 1 DIC]** = texto que se cambia cuando termina el precio Black.

## Estrategia (máx. 8 líneas)
- **Buyer:** 18 a 35 años en Colombia, usa audífonos todo el día (bus, gym, clase, oficina) y ya se le dañaron uno o varios pares baratos · **Consciencia:** de la solución y del producto · **Sofisticación:** muy alta (etapa 4-5) [dossier: nivel de consciencia].
- **Ángulo:** sorpresa de la cámara (continúa el anuncio) + "que no te pase otra vez": los baratos se dañan; estos traen un estuche que aguanta caídas y 60 días de garantía [brief §4, ángulo elegido por el usuario].
- **Por qué:** el dolor #1 es el que más se repite en español ("no me duran más de par de meses"), y el hueco libre frente a la competencia es durabilidad + respaldo + "llegan como en la foto" [dossier: competencia, desocupado].
- **Hilo de toda la landing:** dolor (se dañan) → mecanismo (estuche que aguanta, sudor, batería a la vista) → respaldo (60 días, pagas al recibir, se ven como en las fotos) → oferta Black con fecha real.
- **Hipótesis:** con una landing que repite el dolor de los baratos y responde "¿llegan como en la foto?" antes de las reseñas, sube el % que llega a la oferta (hoy 16 %) y el % que pasa del 30 % (hoy ~5 %). Se mide en Clarity con al menos 200 visitantes.

## Mapa de dolor usado
| # | Dolor | Momento | Emoción | Frase textual (fuente) |
|---|---|---|---|---|
| 1 | Los baratos se dañan en pocos meses: un lado deja de sonar o suena más bajo | Mes 1 a 3, o después de una caída | Rabia, "me tumbaron" | "Con todos he tenido problemas o no me duran más de par de meses" (r/Colombia) · "se me cayeron al suelo y ahora uno suena más bajo que el otro" (YouTube) |
| 2 | Comprar y volver a comprar: lo barato sale caro | Cada reposición | Frustración, culpa | "The problem is I kept replacing them… one side stopped working" (r/Frugal) |
| 3 | Llegan distintos a la foto / el estuche es lo primero que falla | Al recibir, o cuando se cae la cajita | Desconfianza, decepción | "Se ven bien en las imágenes del vendedor, pero la verdad no pintan bien" · "se me cayó 1 vez y el estuche dejó de funcionar" · "lo primero en dañarse fue la bisagra de la tapita" (YouTube) |

---

## 1 · pp-ticker (franja) · Marco
Igual a `final.md`, con la única corrección de la garantía (90 → 60).
1. «Estuche de cámara incluido»
2. «Funcionan con Android y iPhone»
3. «60 días de garantía por daños de fábrica»   → [brief: landing nueva, garantía 60 días]
4. «Pagas al recibir»
5. «Envío gratis a toda Colombia»

## 2 · pp-hero-oferta · Atención (aprobado, no se reescribe)
| # | Título | Ángulo | Claridad | Especificidad | Relevancia | Brevedad | Credibilidad | Total |
|---|---|---|---|---|---|---|---|---|
| ★ | `Cansado de audífonos que <em>no duran ni 3 meses</em>.` | Dolor #1 | 5 | 5 | 5 | 5 | 5 | 25 |

★ Aprobado por el dueño el 2026-11-12. Nombra el dolor #1 con el número del cliente ("3 meses") y no promete duración [aprendizajes: no prometer duración sin respaldo].

- **titulo:** `Cansado de audífonos que <em>no duran ni 3 meses</em>.`
- **texto (subtítulo):** `El estuche de cámara <strong>aguanta caídas</strong> y, si un lado falla de fábrica, tienes <strong>60 días de garantía</strong>.`   → [brief §1: estuche aguanta caídas] · [brief: garantía 60 días]
- **Bullets (beneficio), sin cambios:**
  1. `<strong>Protegidos si se te caen:</strong> el estuche recibe el golpe con los audífonos adentro.`   → [brief §1]
  2. `<strong>Resisten el sudor:</strong> gym, clase u oficina, sin estar pendiente de cuidarlos.`   → [brief: specs]
  3. `<strong>Batería a la vista:</strong> la pantalla del estuche te muestra el %; 20 h en total con el estuche.`   → [brief: specs]
  4. `<strong>Android y iPhone:</strong> se conectan por Bluetooth 5.4 con cualquiera de los dos.`   → [brief §1]
- **rating:** `4.8` (reseñas reales) · **rating_texto:** `(Clientes en toda Colombia)` (el de la landing actual)
- **Chips:** no (no suman: los usos van en la galería y en la oferta).

---

## Secciones

### 3 · pp-iconos · Atención (refuerza el hero sin repetir la garantía)
- **titulo:** `` (vacío, como ARVEN)
- **estilo:** `circulos`
- bloques:
  - icono `escudo` · texto: `Estuche que aguanta caídas`   → [brief §1]
  - icono `gota` · texto: `Resisten el sudor`   → [brief: specs]
  - icono `check` · texto: `Android y iPhone`   → [brief §1] · [dossier: objeción 5]

### 4 · pp-oferta-tabs · Deseo + Acción (estilo_regalos: tarjetas)
- **titulo:** `Que no te pase <em>otra vez</em>`   → [brief §4: ángulo "que no te pase otra vez"]
- **boton_texto:** `Pídelos ahora — Paga al recibir`
- **valor_texto:** ``
- **nota:** `Te escribimos por WhatsApp para confirmar tu pedido y tu color`   → [convención de las landings de la tienda; confirmar que se hace con este producto]
- **entrega:** `Precio Black hasta el 30 de noviembre · Desde el 1 de diciembre vuelven a $109.900`   → [brief: oferta Black] **[CAMBIA EL 1 DIC]**
- **colores_texto:** `Elige tu color: café o verde`
- **color_1_nombre:** `Café` (la landing actual dice "Marrón"; el brief y el anuncio dicen café) · **color_2_nombre:** `Verde`
- **etiquetas_titulo:** `Ideal para` · **etiquetas:** `Bus, Gym, Clase, Oficina` · **etiquetas_estilo:** `chips`
- **estilo_regalos:** `tarjetas`

**Pack 1**
- pestana: `1 unidad`
- etiqueta: `Para ti`
- titulo: `VIVIDUS 86 V2 + estuche de cámara`
- linea_regalo: `🎁 Con los 3 beneficios incluidos`
- detalle: `Café o verde`
- precio: `79900` · precio_antes: `109900`   → [brief: $109.900 es el precio real desde el 1 de dic; no es inventado]
- cantidad: `1`

**Pack 2** (preseleccionado)
- pestana: `2 unidades`
- destacar: `Uno para regalar`
- etiqueta: `Uno para ti y otro para regalar`   → [reseña real, Sara M.: "El verde para mí y el café para mi novio"] · [reseña real, Claudio Gomez: "Se los regalé a mi hijo"]
- titulo: `2 VIVIDUS 86 V2 + estuches de cámara`
- linea_regalo: `🎁 Con los 3 beneficios incluidos`
- detalle: `Combina colores · $64.950 c/u`   → [129.900 / 2]
- precio: `129900` · precio_antes: `219800`   → [2 × $109.900, el precio real desde el 1 de dic]
- cantidad: `2` · preseleccionado: `true`

**Bonos (tarjetas)**
| insignia | icono | titulo | texto | valor_tachado | sello |
|---|---|---|---|---|---|
| `Gratis` | `camion` | `Envío express gratis` | `A toda Colombia` | **[VALOR POR CONFIRMAR]** (lo que cuesta el envío express; si no hay un valor real, se deja vacío) | `Express` |
| `Incluida` | `escudo` | `Garantía 60 días` | `Por daños de fábrica` | (sin valor tachado: no tiene precio real) | `Cambio o devolución` |
| `Gratis` | `regalo` | `15 % en tu segunda compra` | `Para el otro color o para regalar` | **[VALOR POR CONFIRMAR]** (sugerencia real si aplica al precio regular: 15 % de $109.900 = $16.485) | `Segunda compra` |

→ [brief: bonos de la landing nueva]. **[POR CONFIRMAR]:** cómo recibe el cliente el 15 % (cupón por WhatsApp, código en la caja…) para decirlo en la nota.

### 5 · pp-videos · justo debajo de la oferta (prueba de "llegan como en la foto")
- **titulo:** `Míralos <em>fuera de la caja</em>`
- **texto:** `Videos reales del producto: así se ven en la mano.`   → [brief §6: 3 videos reales]
- bloques (los 3 videos de la landing actual, en el mismo orden):
  - etiqueta: `Así llegan` (el video de unboxing)
  - etiqueta: `En el día a día`
  - etiqueta: `Café y verde`

### 6 · pp-grid-dolores · Interés (dolor). Sin mostrar VIVIDUS
- **etiqueta:** `Lo que ya te pasó`
- **titulo:** `Así terminan <em>los baratos de siempre</em>`
- **texto:** `Si ya compraste dos o tres pares, conoces la historia.`   → [dossier: dolor #2]
- **columnas_movil:** `2` · **columnas_pc:** `4` · **proporcion:** `1 / 1`
- **cierre:** `No necesitas otros iguales: <em>necesitas un estuche que aguante.</em>`   → [dossier: dolor #3, el estuche es lo primero que falla] · [brief §1]
- **cierre_estilo:** `texto`
- bloques:
  1. titulo: `Un lado deja de sonar` · texto: `A los pocos meses, o después de una caída, uno suena más bajo o ya no suena.`   → [dossier: dolor #1, "uno suena más bajo que el otro"]
     - Imagen: mano con un audífono blanco genérico cerca del oído, gesto de frustración, celular con música en la otra mano; sin rostro, sin texto.
  2. titulo: `La tapita se quiebra` · texto: `Se cae la cajita y deja de cargar. Sin estuche, no sirven.`   → [dossier: dolor #3, "la bisagra de la tapita… se quebró", "sin el estuche pues F"]
     - Imagen: cajita blanca genérica en el piso de una calle o de un bus, con la tapa desprendida a un lado; sin texto.
  3. titulo: `Solo conecta uno` · texto: `Un día el otro ya no aparece y te toca usarlo a medias.`   → [dossier: secundario, "Only one ear bud will connect"; Google CO "se me desconecta un auricular"]
     - Imagen: mano sosteniendo un solo audífono blanco genérico; el otro, suelto sobre la mesa junto al celular; sin texto.
  4. titulo: `Otra vez a comprar` · texto: `Lo barato sale caro: y vuelves a pagar por unos iguales.`   → [dossier: dolor #2]
     - Imagen: sobre una mesa, tres cajitas blancas genéricas de audífonos viejos, una abierta y rayada, junto a una billetera; sin texto.

### 7 · pp-galeria-ideas · Transformación (usos)
- **etiqueta:** `Dónde se usan`
- **titulo:** `Contigo <em>todo el día</em>`
- **texto:** `Del bus a la oficina, sin estar pendiente de cuidarlos.`   → [hero, bullet 2]
- **proporcion:** `4 / 3` · **columnas_pc:** `4`
- bloques:
  1. etiqueta: `Bus` · titulo: `En el trayecto` · texto: `Los guardas al bajarte y en la pantalla ves cuánta carga queda.`   → [reseña real, Martha V: "Cuando bajan, los guardo en el estuche y en la pantalla veo cuánta carga le queda"]
     - Imagen: mano sosteniendo el estuche café cerrado con la pantalla encendida, ventana de bus urbano desenfocada al fondo; sin rostro, sin texto.
  2. etiqueta: `Gym` · titulo: `Entrenando` · texto: `Resisten el sudor; tú sigue con la rutina.`   → [brief: specs] · [reseña real, Alejo R: "aguantan bien el sudor"]
     - Imagen: estuche verde abierto sobre una toalla en una banca de gimnasio, junto a una botella de agua y unas mancuernas; sin texto.
  3. etiqueta: `Clase` · titulo: `En la U` · texto: `Del morral a la mesa, con el estuche protegiéndolos.`   → [brief §1: aguanta caídas]
     - Imagen: estuche café sobre un cuaderno abierto en un pupitre universitario, con un morral al lado; sin texto.
  4. etiqueta: `Oficina` · titulo: `En el escritorio` · texto: `Llamadas claras y un estuche que parece una cámara.`   → [reseña real, Juliana R: "las llamadas son claras"] · [reseña real, Andrés P.: "Parece una cámara de verdad"]
     - Imagen: estuche verde junto a un portátil sin logos y una taza de café en un escritorio con luz de ventana; sin texto.

### 8 · pp-problemas-filas · Interés (cómo funciona: "pensados para")
- **titulo:** `Pensados para` · **titulo_dorado:** `lo que daña a los baratos` · **titulo_fin:** ``
- **cierre:** `Y si un lado falla de fábrica, tienes 60 días de garantía.`   → [brief: garantía 60 días]
- bloques:
  1. icono `escudo` · titulo: `Si se te caen` · puntos: `El estuche de cámara aguanta caídas, también con los audífonos adentro.`   → [brief §1, usuario 2026-11-12]
     - Imagen: el estuche café cerrado sobre una baldosa clara, quieto y entero, con la pantalla encendida; sin manos, sin texto.
  2. icono `rayo` · titulo: `Batería a la vista` · puntos: `La pantalla del estuche te muestra el %: 20 h en total y de 3 a 4 h seguidas por carga.`   → [brief: specs]
     - Imagen: primer plano de la pantalla LED del estuche verde con un porcentaje encendido (ilustrativo); sin texto agregado.
  3. icono `gota` · titulo: `Sudor del gym` · puntos: `Resisten el sudor, con control táctil para no sacar el celular.`   → [brief: specs]
     - Imagen: mano tocando un audífono puesto en la oreja, con la camiseta deportiva húmeda en el borde del cuadro; sin rostro, sin texto.
  4. icono `chat` · titulo: `Llamadas claras` · puntos: `Bluetooth 5.4 y micrófono con ENC: te escuchan claro aunque haya ruido.`   → [brief: landing actual, ENC del micrófono] (sin decir "cancelación de ruido")
     - Imagen: mano sosteniendo el celular en llamada (pantalla sin nombres ni logos) en una calle con movimiento desenfocado, con el estuche café en la otra mano; sin rostro, sin texto.

### 9 · pp-pasos · Deseo (facilidad)
- **estilo:** `fotos` · **titulo:** `Listos en <em>3 pasos</em>` · **texto:** ``
- bloques:
  1. titulo: `Abre el estuche` · texto: `Saca los audífonos.`
     - Imagen: manos abriendo la tapa del estuche café, con los dos audífonos a la vista; sin texto.
  2. titulo: `Conéctalos` · texto: `Búscalos en el Bluetooth de tu celular, Android o iPhone.`   → [brief §1] **[POR CONFIRMAR]:** el nombre con el que aparecen en el Bluetooth, para agregarlo.
     - Imagen: mano con un celular genérico en la pantalla de Bluetooth (sin nombres ni logos legibles) y el estuche verde abierto al lado; sin texto.
  3. titulo: `Guárdalos al terminar` · texto: `Se cargan en el estuche y la pantalla te muestra el %.`   → [brief: specs]
     - Imagen: mano metiendo un audífono en el estuche café con la pantalla encendida; sin texto.

### 10 · pp-esperar · Deseo + objeción "¿llegan como en la foto?"
- **etiqueta:** `Después de pedirlos`
- **titulo:** `Lo que ves aquí <em>es lo que te llega</em>`   → [dossier: oportunidad "lo que ves es lo que te llega"] · [videos reales, sección 5] · [reseñas reales: "Parece una cámara de verdad"]
- **texto:** `Sin pagar nada por adelantado. Así es el camino hasta tus manos.`
- bloques:
  1. icono `check` · periodo: `Hoy` · texto: `Llenas el formulario y eliges tu color. No pagas nada por adelantado.`
  2. icono `chat` · periodo: `Después de pedir` · texto: `Te escribimos por WhatsApp para confirmar tu pedido, tu color y tu dirección.`   → [POR CONFIRMAR que la confirmación es por WhatsApp]
  3. icono `camion` · periodo: `En camino` · texto: `Envío express gratis a toda Colombia. Llegan en [POR CONFIRMAR: días hábiles].`   → [brief: bono envío express] (el tiempo no está en el brief: no se inventa)
  4. icono `pago` · periodo: `Al recibir` · texto: `Pagas cuando los tienes en la mano.`   → [brief: pagas al recibir] · [reseña real, Sara M.: "Llegaron rápido y pagué al recibir"]
  5. icono `escudo` · periodo: `Al abrir la caja` · texto: `Revísalos. Si llegan dañados, con la caja rota o destapados, te los cambiamos por otros.`   → [brief: "si llega dañado, con la caja rota o destapado, te lo cambiamos por otro"]
  6. icono `calendario` · periodo: `60 días` · texto: `Si un lado falla de fábrica, tienes cambio o devolución.`   → [brief: garantía 60 días]

### 11 · pp-comparativa · Comparación
- **etiqueta:** `La diferencia`
- **titulo:** `VIVIDUS vs. <em>los baratos de siempre</em>`
- **texto:** `Frente a los audífonos blancos de siempre + una funda aparte.`   → [brief §3: "olvídate de pagar una funda aparte"]
- **nombre_a:** `VIVIDUS 86 V2` · **sub_a:** `Estuche de cámara incluido`
- **nombre_b:** `Los de siempre` · **sub_b:** `+ funda aparte`
- **pie_izq:** `VIVIDUS` · **pie_der:** `Protegidos, con respaldo y sin funda aparte`
- filas:
| titulo | subtitulo | valor_a (ok) | valor_b (no) | respaldo |
|---|---|---|---|---|
| `Si se te caen` | `El estuche` | `Aguanta caídas` | `La tapita se quiebra` | [brief §1] · [dossier: dolor #3] |
| `Protección` | `Sin comprar extras` | `Incluida` | `Funda aparte` | [brief §3] · [reseña real, Lina Hidalgo] |
| `Batería` | `Cuánta queda` | `Pantalla con %` | `Adivinas` | [brief: specs] |
| `Sudor` | `Gym y calor` | `Resisten` | `Depende` | [brief: specs] |
| `Llamadas` | `Micrófono` | `ENC: te escuchan claro` | `Solo para música` | [brief: ENC] · [dossier: "solo para música, porque no va bien el micrófono"] |
| `Respaldo` | `Si fallan de fábrica` | `60 días` | `Casi nunca` | [brief: garantía 60 días] · [dossier: "la competencia casi no menciona" garantía] |

### 12 · pp-resenas · Objeciones (9 reseñas reales, textuales)
- **etiqueta:** `Lo que dicen`
- **titulo:** `“Pensé que por el precio iban a sonar mal <em>y no.</em>”`   → [reseña real, Juliana R., palabras textuales]
- **nota:** `4,8` · **cantidad:** `` **[POR CONFIRMAR]:** número de reseñas, solo si es real.
- **visibles:** `3`
- **titulo por reseña:** vacío, para no ponerles palabras que no escribieron. **estrellas** y **verificado:** copiar los de la landing actual **[POR CONFIRMAR]** (el promedio 4,8 indica que no todas son de 5).

Orden (las 3 primeras atacan "suenan mal", "¿llegan?" y "sudor"):
1. nombre: `Juliana R.` · ciudad: `Medellín` · texto: `Pensé que por el precio iban a sonar mal y no: se escuchan bien y las llamadas son claras.`
2. nombre: `Sara M.` · ciudad: `Cali` · texto: `El verde para mí y el café para mi novio. Llegaron rápido y pagué al recibir.`
3. nombre: `Alejo R` · ciudad: `Bogotá` · texto: `Están melísimos para entrenar y aguantan bien el sudor. No se me caen al hacer ejercicio, ya una amiga los quiere, creo que ya les compro también unos. TK`
4. nombre: `Martha V` · ciudad: `Huila` · texto: `Los uso en el trayecto al trabajo. Cuando bajan, los guardo en el estuche y en la pantalla veo cuánta carga le queda.`
5. nombre: `Andrés P.` · ciudad: `Bogotá` · texto: `En la oficina todos me preguntan por el estuche. Parece una cámara de verdad.`
6. nombre: `Lina Hidalgo` · ciudad: `Medellín` · texto: `Iba a comprar una funda bonita para mis audífonos y con estos ya viene todo. Me salió más barato.`
7. nombre: `Pedro Rojas` · ciudad: `Bucaramanga` · texto: `Parece una cámara de verdad. Y me gusta ver en la pantallita cuánta batería le queda.`
8. nombre: `Andrea Ramirez` · ciudad: `Cúcuta` · texto: `Los saco en el café o en el escritorio y siempre terminan en mis historias. Me preguntan si es una cámara.`
9. nombre: `Claudio Gomez` · ciudad: `` (el brief no la trae) · texto: `Se los regalé a mi hijo de 15 años y ahora un amigo suyo quiere unos iguales.`

### 13 · pp-faq · Objeciones
- **estilo:** `tarjetas` · **etiqueta:** `Preguntas frecuentes` · **titulo:** `Resolvemos tus dudas` · **texto:** `` · **abrir_primera:** `true`
- Los nombres de quien pregunta son ilustrativos (formato de la casa), no son clientes reales.

1. **pregunta:** `Daniela de Barranquilla pregunta: ¿llegan como en la foto?`
   **respuesta:** `<p>Sí. Las fotos y los videos de esta página son del producto real: el estuche de cámara en café o verde, con la pantalla de batería. Además <strong>pagas al recibir</strong>, y si llegan dañados, con la caja rota o destapados, <strong>te los cambiamos por otros</strong>.</p>`   → [brief §6, §8] · [brief: cambio si llega dañado] · [dossier: objeción 2]
2. **pregunta:** `Marta de Bogotá pregunta: ¿sirven con iPhone?`
   **respuesta:** `<p>Sí. Se conectan por <strong>Bluetooth 5.4</strong> con iPhone y con Android. Los buscas en el Bluetooth de tu celular y listo.</p>`   → [brief §1] · [dossier: objeción 5]
3. **pregunta:** `Camilo de Pereira pregunta: ¿qué pasa si se me caen?`
   **respuesta:** `<p>El estuche de cámara <strong>aguanta caídas, también con los audífonos adentro</strong>: recibe el golpe por ellos. Y si un lado falla de fábrica, tienes <strong>60 días de garantía</strong>.</p>`   → [brief §1] (no se promete "no se dañan")
4. **pregunta:** `Valentina de Medellín pregunta: ¿cuánto dura la batería?`
   **respuesta:** `<p>De <strong>3 a 4 horas seguidas</strong> por carga, y hasta <strong>20 horas en total</strong> con las recargas del estuche. La pantalla te muestra el % que le queda, así no te quedas sin música a mitad de camino.</p>`   → [brief: specs] · [dossier: objeción 4]
5. **pregunta:** `Jorge de Cali pregunta: ¿cómo funciona la garantía?`
   **respuesta:** `<p>Tienes <strong>60 días por daños de fábrica</strong>: si un lado deja de sonar o algo falla de fábrica, te los cambiamos o te devolvemos tu dinero. Escríbenos por [POR CONFIRMAR: canal, p. ej. WhatsApp] y te decimos cómo.</p>`   → [brief: garantía 60 días, cambio o devolución]
6. **pregunta:** `Laura de Bucaramanga pregunta: ¿cómo los cargo la primera vez?`
   **respuesta:** `<p>Guarda los audífonos en el estuche y conecta el estuche a cargar hasta que la pantalla marque 100 %. [POR CONFIRMAR: si trae cable y de qué tipo; si llegan con carga.]</p>`   → [brief §1: "¿cable de carga? [Hipótesis: confirmar]"]
7. **pregunta:** `Natalia de Cartagena pregunta: ¿qué colores hay?`
   **respuesta:** `<p><strong>Café</strong> y <strong>verde</strong>. Eliges el color en el formulario; si pides 2, puedes combinarlos.</p>`   → [brief: specs] · [reseña real, Sara M.]
8. **pregunta:** `Sandra de Ibagué pregunta: ¿cómo pago?`
   **respuesta:** `<p><strong>Pagas al recibir</strong>, cuando los tienes en la mano. El envío express es <strong>gratis a toda Colombia</strong>.</p>`   → [brief: oferta] [POR CONFIRMAR: si se paga solo en efectivo]

### 14 · pp-garantia · Objeciones (riesgo cero)
- **sello_arriba:** `Garantía` · **sello_numero:** `60` · **sello_abajo:** `Días`
- **etiqueta:** `Compra sin riesgo`
- **titulo:** `Si un lado falla, <em>te los cambiamos</em>`   → [dossier: dolor #1, "un lado deja de sonar"] · [brief: garantía] (nota técnica: la sección de ARVEN no usa `<em>` en este título; si no se ve bien, va sin él)
- **texto:** `Tienes 60 días de garantía por daños de fábrica: cambio o devolución. Si llegan dañados, con la caja rota o destapados, te los cambiamos por otros. Y pagas al recibir.`   → [brief: garantía 60 días; cambio si llega dañado]
- bloques (punto):
  - icono `escudo` · texto: `60 días por daños de fábrica`
  - icono `cambio` · texto: `Cambio o devolución`
  - icono `pago` · texto: `Pagas al recibir`

### 15 · pp-boton-fijo · Acción (aparecer: despues_oferta)
- **boton_texto:** `Los quiero`
- **subtexto:** `Pagas al recibir · Envío express gratis`
- **precio_manual:** `129900` (el pack 2, preseleccionado) **[CAMBIA EL 1 DIC]**

---

## Imágenes del hero (6)
**No cambian:** son las de `copy/vividus/final.md` (imagen 1 variantes A y B, comparativas 2 y 4, característica 3, uso real 5, versatilidad 6). Ninguna menciona la garantía, así que el cambio de 90 a 60 días no las toca. Queda abierta la mejora pendiente de la imagen 2 («Estuche VIVIDUS» → «Estuche de cámara», porque el estuche real lleva impreso "Sound by KFG").

Imágenes fuera del hero: todas sin texto y sin rostro (descritas en cada sección: 4 del grid, 4 de la galería, 4 de las filas, 3 de los pasos). Las del grid no muestran VIVIDUS.

## Objeciones cubiertas
| Objeción (del dossier) | Dónde se responde |
|---|---|
| "Los baratos se dañan" | Hero (subtítulo y bullet 1), íconos, filas "Si se te caen", comparativa, garantía, FAQ 3 y 5 |
| "¿Llegan como en la foto?" | Videos ("Así llegan"), pp-esperar (título y pasos 4-5), reseñas de Andrés P. y Pedro Rojas, FAQ 1 |
| "¿Suenan bien o es pura carcasa?" | Titular de reseñas (Juliana R.), filas "Llamadas claras", comparativa "Llamadas" |
| "¿La batería dura?" | Hero bullet 3, filas "Batería a la vista", reseña de Martha V, FAQ 4 |
| "¿Sirven con iPhone?" | Franja, hero bullet 4, íconos, pasos 2, FAQ 2 |
| Pagar por adelantado / desconfianza de compra en línea | Franja, oferta (botón), pp-esperar, garantía, FAQ 8 |

## Cambios frente a la versión anterior (final.md)
| Pedido | Qué cambié |
|---|---|
| Garantía de 60 días, no 90 | Subtítulo: «**60** días de garantía». Franja, mensaje 3: «**60** días de garantía por daños de fábrica». Todo el copy nuevo usa 60. Nada más de la primera pantalla cambió. |
| ¿Sigue siendo coherente «no duran ni 3 meses» con 60 días? | **Sí, se mantiene, con un riesgo anotado.** El título nombra el dolor con el número del cliente ("3 meses", r/Colombia, YouTube, r/audiofiliabrasil) y no promete duración [aprendizajes 2026-11-12]. La promesa de que no se dañen la carga el estuche que aguanta caídas, no la garantía. **Riesgo:** un lector atento puede notar que 60 días es menos que 3 meses (la garantía no cubre todo el plazo del dolor que nombra el título). No lo cambiaría a «ni 2 meses»: pierde la frase textual y suena peor. **Si el dueño quiere cerrar esa brecha,** la salida limpia es extender la garantía a 90 días otra vez (decisión de operación, no de copy). |
| Franja «Envío gratis a toda Colombia» | No la toqué (alcance: solo la garantía). Opcional para el dueño: «Envío express gratis», para que coincida con el bono. |

## Pendientes antes de montar
1. Valor tachado del envío express y del bono del 15 % (o dejarlos vacíos).
2. Cómo se entrega el 15 % de la segunda compra.
3. Tiempo de entrega del envío express.
4. Confirmar que la confirmación es por WhatsApp y el canal para reclamar la garantía.
5. ¿Trae cable de carga? ¿Llegan con carga? (FAQ 6). Nombre con el que aparecen en el Bluetooth (pasos 2).
6. Estrellas y "verificado" de cada reseña, y el número total de reseñas.
7. ¿Pago al recibir solo en efectivo?
8. **El 1 de diciembre** cambian: `entrega` de la oferta, `precio` y `precio_antes` de los dos packs (sin precio tachado si ya no hay descuento) y `precio_manual` del botón fijo.
