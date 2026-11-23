# Aprendizajes

Decisiones y correcciones del usuario que valen para todos los productos. Léelas antes de proponer. Agrega nuevas solo con aprobación del usuario: fecha, qué pasó y la regla que queda.

## Hero y títulos
- **(2026-11-21) Los bullets del hero son texto corrido, una sola frase**, como en los referentes del dueño («Elimina la caspa sin resecar el cabello»). Nunca «Etiqueta: explicación» ni dos puntos.
- **(2026-11-21) Así va el precio, como en la landing del Adaptador Auto-Stop** (de ahí se toma solo el precio): sección `pp-hero-cantidad`, fila de precio con tachado y «Ahorras $X» justo debajo del título, **estrellas debajo del precio**, tarjetas de pack con su línea de uso y una etiqueta destacada, botón con precio y tachado, nota de pago y confirmación, y caja «Tu pedido incluye». El tachado de cada pack es el precio de comprarlas sueltas.
- **(2026-11-21) El hero confirma la intención de compra, no cuenta una historia.** Los heros con escena («Se te cayeron…», «Cansado de…») no convertían. Título = producto con nombre de mecanismo + lo que soluciona, corto (referentes del dueño: «Sistema Bio-Caspa y Caída», «Elbor: Activador de folículos para barba», «Suero botánico Anti-descamación 120 ml»). El subtítulo y los bullets justifican.La historia queda para el anuncio y la imagen 1. Reemplaza las reglas de "hero dopamínico" de abajo en lo que se contradigan.
- **(2026-11-12) La garantía puede ir en el subtítulo del hero** cuando es el respaldo que quita el dolor (VIVIDUS: «si un lado falla de fábrica, tienes 90 días de garantía»). Las imágenes del hero siguen sin garantía ni nada de venta (el precio va en el texto del hero, ver la regla del Auto-Stop).
- **(2026-11-12) No prometer duración sin respaldo.** «Se acabó cambiar audífonos cada 3 meses» se cambió por «Cansado de audífonos que no duran ni 3 meses»: el dolor se nombra, pero no se promete lo que no se puede probar.
- **(2026-11-12) Datos de Clarity en VIVIDUS:** el 68 % se va sin bajar del 10 % de la página, aunque pasa unos 52 segundos en la primera pantalla. El hero tenía texto en la imagen y un título de estatus («Todos tienen audífonos blancos. Tú no.»), pero no tocaba un dolor real. Regla: el hero sale del mapa de dolor (top 3) con las palabras del cliente y hace ATI en 3 segundos. Se mide en Clarity con al menos 200 visitantes por versión.
- **Los títulos encima de la galería no aplican:** los textos van en las imágenes y debajo de ellas.
- **Títulos cortos.** Rechazó varias veces títulos largos. Ejemplo: banda de rodilla, "ese título está muy grande… como es extenso, no conecta".
- **Nunca en pregunta**: "despierta más dudas".
- **Nada genérico ni rebuscado.** En las luces de fuegos artificiales rechazó varios heroes: quería lo real, por qué la gente compra (verse bien y que los demás lo vean, algo de tendencia que nadie más tiene).
- **La aversión a la pérdida funciona** cuando él la pide. Ejemplo: "No te pierdas de jugar, entrenar o caminar por un dolor de tu tendón rotuliano".
- **Primero se define el hero, después se arma la landing.** No armes nada para "mostrar cómo queda" sin que te lo pida.

## Oferta
- **(2026-11-17) Datos fijos de operación de Tu espacio Market:** están en SKILL.md, en «Datos fijos de operación»: envío express de $21.000, guías y códigos por WhatsApp, entrega de 3 a 5 días hábiles y garantías por WhatsApp. No se vuelven a preguntar.
- **Producto de precio único** (estufa): no se ofrece x2. La oferta se hace difícil de rechazar apilando bonos reales (recetarios, guía, garantía, acompañamiento) y anclando contra la alternativa cara (una estufa de piso).
- **El ancla contra la alternativa real** convierte mejor que el descuento: "una cocina de 3 puestos por menos de lo que cuesta una estufa de piso".
- **No usar precios tachados inventados.**

## Copy
- **(2026-11-22) SÉBORA: el buyer es hombre en las dos landings.** La landing A se había planteado mixta (avatar Paola, reseña de esposa, FAQ con nombres de mujer) y el dueño lo corrigió: todo para hombres. Regla: confirmar el género del buyer antes del copy y no asumir público mixto.
- **ATIDCOA** en todo el copy.
- **Respetar el alcance:** si pide cambiar un título, cambia solo ese título ("no pedí que me modificaras el resto de la landing").
- **Claims reales:** en ARVEN Fold se quitó "sin perfume" porque tiene fragancia leve. Sin promesas médicas ni INVIMA si no existe.
- **Lenguaje local:** en Guatemala, el más cercano (voseo); en Colombia, tuteo cercano.

## Producto y comparación
- **En los audífonos VIVIDUS** el ángulo era "todo incluido" (audífonos + estuche, sin comprar extras). No se centra en especificaciones técnicas como IPX8.
- **En la rama de 1,5 m:** mencionar el tamaño sin que parezca pequeña ("genera rechazo").

## Imágenes
- **(2026-11-23) Los textos dentro de las imágenes van siempre en Roboto** (titular en Bold o Black, etiquetas en Regular o Light), en todas las landings y anuncios. Nada de serif, cursiva ni manuscrita. `tools/build-kit-imagenes.mjs` lo pone solo en cada prompt (campo opcional `tipografia` del kit para otra fuente, solo si el dueño lo pide). De un referente nunca se copia la tipografía.
- **(2026-11-18) Textos prohibidos en anuncios, para cualquier producto:** "pago al recibir" (o contraentrega), "envío gratis" (o "envío express gratis") y "escríbenos por WhatsApp". En los anuncios Black Friday de VIVIDUS se colaron y el dueño lo corrigió. Regla en `agentes-ecommerce/cerebro/anuncios.md`.
- **(2026-11-18) Los anuncios estáticos van siempre en 1:1** (1080 × 1080).
- **(2026-11-10) Las imágenes del hero no venden.** No llevan pagos, precio, envío, garantía ni nada de venta; el precio y los bonos ya están en el texto del hero (`pp-hero-cantidad`). Solo producto, beneficio y transformación.
- **(2026-11-10) La imagen 1 del hero es la más importante:** muestra el producto y es la que retiene al cliente apenas entra a la landing. Se hace primero, con más cuidado y con variantes.
- **(2026-11-10) Las imágenes del hero llevan texto y comparativa.** El contraste se entiende solo por la escena y el texto, sin escribir "antes" ni "después". Su trabajo es quitar el dolor y despertar interés por el producto.
- **Todas en .webp**, pedido de forma muy clara en cada prompt.
- **Las personas salen del banco de avatares**, nunca solo de una descripción, porque la persona cambia en cada imagen.
- **Los prompts se cambian de forma puntual**: número de imagen + parte.

## Trabajo
- **(2026-11-20) Los guiones UGC salen de la skill `guion-ugc`**, conectada al brief, al dossier, al ángulo y al hero. El personaje sale siempre del banco de avatares y cada guion pasa por el director creativo antes de llegar al dueño. Se basa en la skill `anuncios-ugc` de la cuenta.
- **Primero definir, después proponer, confirmar y recién ahí hacer.** Una mención no es una orden.
- **(2026-11-10) El usuario ya no hace el paso a paso.** La landing aprobada se monta automáticamente en el tema en vivo con `tools/montar-landing.mjs`. Solo se agregan archivos, siempre con revisión, plan y una confirmación. Shopify no se toca antes de esa fase.
- **Siempre el paso a paso exacto.** Nunca volver a pegar una plantilla que ya tiene fotos.
