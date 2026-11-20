---
name: guion-ugc
description: Guionista de anuncios UGC en video (persona del banco de avatares hablando a cámara) conectado al proceso de la tienda. Lee el brief, el dossier, el ángulo y el hero aprobados del producto, escribe el guion por escenas con prompts de frames y video encadenados y B-roll 1 a 1, lo pasa por el director creativo y lo entrega como kit para copiar. Úsala cuando el usuario pida un guion UGC, un video ad, un testimonio o review a cámara, "persona hablando a cámara" o un anuncio en video de un producto que ya tiene brief. Basada en la skill de la cuenta `anuncios-ugc`, con las reglas de esta tienda.
---

# Guion UGC conectado (A-Roll)

Versión de la skill `anuncios-ugc` de la cuenta, conectada al proceso: no vuelve a preguntar lo que ya está definido, usa los personajes del banco de avatares, sigue el ángulo y el hero de la landing, respeta el cerebro de Esteban y pasa por el director creativo antes de llegar al dueño. La original sigue disponible para proyectos fuera de este repositorio.

**Idioma:** español, siempre. El diálogo suena del país de la tienda (ver «Voz local»).

## Antes de escribir, lee
- `agentes-ecommerce/cerebro/anuncios.md`: **textos prohibidos en todo anuncio**. Valen también para lo que dice el personaje.
- `briefs/<producto>.md`: producto, qué trae la caja, lo que **no se debe prometer**, buyer, mapa de dolor, anuncio que ya vendió, ángulo elegido, oferta y reseñas reales.
- `investigacion/<producto>/dossier.md`: frases textuales del cliente, objeciones, consciencia y sofisticación.
- `copy/<producto>/final.md`: el hero aprobado (título, imagen 1, subtítulo). El gancho del video lo continúa.
- `copy/<producto>/anuncios-meta-embudo.md` (si existe): el copy de Meta de la misma etapa. Video y copy van juntos en el mismo anuncio y deben decir lo mismo.
- `avatares/banco.json`: los personajes.
- `.claude/skills/landing-producto/criterio.md` (§5 anuncios), `aprendizajes.md` y `prompts-seguros.md`.

Si falta el brief o el ángulo no está confirmado, **detente**: primero se hace la Fase 0 y 1 de `landing-producto`.

## Reglas obligatorias
1. **Dos pausas:** (1) resumen precargado + 3 preguntas; (2) el dueño confirma. No escribas ni una línea del guion antes.
2. **A-Roll continuo:** el personaje habla a cámara durante TODA escena principal. B-roll, POV, unboxing o voz en off van aparte (Sección D y notas de edición).
3. **El personaje sale del banco de avatares** (`avatares/banco.json`), nunca de una descripción inventada ni de la foto de una persona real. El banco solo tiene personas generadas con IA. Se usa su `descripcion` **palabra por palabra** en cada frame y se adjunta su foto de referencia (`referencias.frente`). Si ningún avatar del banco encaja con el buyer, dilo y propón crear uno nuevo para el banco antes de seguir.
4. **Continuidad de frames encadenada:** desde la Escena 2, el frame inicial es SIEMPRE el frame final de la escena anterior.
5. **Continuidad física, sin magia:** nada aparece, desaparece o cambia de mano sin una microacción explicada en el video prompt.
6. **Producto idéntico al real:** en cada frame donde aparece, se adjunta la foto del producto y se describe tal como es (color, forma, lo que tiene impreso). Nada de variantes que no existen.
7. **B-roll 1 a 1** con las escenas principales, cada uno con prompt de imagen y de video completos. Sin diálogo.
8. **Nunca texto en pantalla dentro de los prompts.** Los subtítulos y textos se ponen en edición, y también cumplen el cerebro.
9. **Duración mínima 30 s, sin techo.** La cantidad de escenas la decide la estrategia.
10. **Formato 9:16** para el video. (Los estáticos siguen en 1:1.)

## Textos y promesas prohibidos (diálogo, B-roll, notas de edición y copy)
- **Del cerebro, en todo anuncio:** "pago al recibir" (contraentrega, "pagas en casa"), "envío gratis" (o "envío express gratis") y "escríbenos por WhatsApp" (o "pide por WhatsApp"), con cualquier variante.
- **Del brief del producto:** todo lo que está en «No se debe prometer» (por ejemplo, en VIVIDUS: IPX8, "nadie más los tiene", "no se dañan", cancelación de ruido).
- **De Meta:** nada de "¿Sufres de…?" ni preguntas que señalen una condición personal; nada de promesas médicas o de dinero; nada de antes/después corporales.
- **De los aprendizajes:** el contraste se muestra, no se dice "antes y después"; no se promete duración sin respaldo; cifras, precios y reseñas solo reales.
- **Reseñas:** el personaje es un avatar, así que no se presenta como un cliente real con nombre de una reseña. Puede decir "lo que más me escriben es…" o leer una reseña real en pantalla con el nombre del cliente que la escribió.

## Voz local
- **Colombia (Tu espacio Market):** tuteo cercano. Muletillas naturales: "o sea", "la verdad", "mejor dicho", "uff", "qué pereza", "me tocaba". Nada de "literal", "tipo" ni "parce" salvo que el buyer sea muy joven.
- **Guatemala (Naturixa):** voseo cercano ("mirá", "fijate", "vos sabés"), "pues" al final, "fíjate que". Sin modismos mexicanos.
- El personaje habla como su perfil del banco (edad, oficio).

---

## Paso 1 · Resumen precargado y 3 preguntas
No hagas las 5 preguntas de la skill original: arma el resumen con los archivos y pregunta solo lo que falta.

```markdown
**Producto:** [qué es y qué trae, del brief]
**Buyer y dolor principal:** [del mapa de dolor, con una frase textual del dossier]
**Ángulo aprobado:** [del brief §4]
**Gancho que debe continuar:** [hero aprobado + anuncio que ya vendió]
**Prueba social real:** [calificación y 2-3 reseñas reales del brief]
**Oferta vigente:** [precio, fecha límite, pack] — solo para BOFU
**No se puede decir:** [cerebro + «No se debe prometer» del brief]
```

Luego pregunta:
1. **¿Para qué etapa?** TOFU (problema), MOFU (producto y objeciones) o BOFU (oferta). Propón una con su razón.
2. **¿Qué estilo?** Review de cliente, rutina narrada, demostración con el producto, historia personal, reacción hablada o recomendación directa. Propón el que mejor muestre el ángulo (por ejemplo, demostración de la caída en VIVIDUS).
3. **¿Qué avatar del banco?** Lista los que encajan con el buyer (nombre, perfil y mercado) y recomienda uno.

Espera la respuesta.

## Paso 2 · Confirmación
Actualiza el resumen con las respuestas y pregunta: **"¿Estás de acuerdo con este resumen o deseas modificar algo antes de pasar a la estrategia?"** No avances hasta el "sí".

## Paso 3 · Guion (Secciones A a E)

### Sección A · Estrategia
2 a 4 líneas: la estructura psicológica según la etapa y el ángulo.
- **TOFU:** el dolor con las palabras del cliente → identificación → el producto como salida → CTA suave.
- **MOFU:** la sorpresa o el mecanismo → cómo funciona → objeciones del dossier respondidas → prueba social → CTA.
- **BOFU:** el producto en una línea → la oferta real → la fecha límite → la garantía → CTA directo.

Los **primeros 3 segundos** (Escena 1) son el hook: deben continuar el hero aprobado y el copy de la misma etapa, y aguantar la prueba del pulgar.

### Sección B · Guion por escenas
- Lenguaje hablado natural, nunca "lenguaje de anuncio".
- Cada escena: máximo 8 s, con 5 a 6 s de diálogo más pausas.
- **Presupuesto de palabras:** `segundos de diálogo × 2,4`. Para 5-6 s, de 12 a 14 palabras. Cuéntalas; si se pasa, corta.
- Cada escena varía de la anterior en varios elementos: emoción, pose, gesto, encuadre, ángulo, interacción con el producto, energía, intención.
- Rango acumulado: Escena 1 = 0–8 s, Escena 2 = 8–16 s…

Formato por escena:
```markdown
[Escena N – Tipo | Rango: X–Ys | Función estratégica]
1. Descripción visual: qué se ve, qué hace el personaje, dónde, cómo aparece el producto, qué emoción, plano, qué la hace distinta a la anterior.
2. [Nombre del avatar] dice: '[línea exacta]'
```

### Sección C · Prompts con continuidad de frames
Declara el personaje una vez, con la `descripcion` del banco palabra por palabra, más el ambiente base y "estética UGC realista, luz natural, sin retoque de estudio". Repítela igual en cada frame.

- **Escena 1:** frame inicial propio (plano, personaje mirando a cámara, entorno, emoción, postura, producto, luz), frame final y video prompt.
- **Escena 2 en adelante:** «**Frame inicial:** Usar el Frame final de la Escena anterior como punto de partida visual.» Solo frame final nuevo y video prompt.
- **Frame final:** evolución dentro de la misma escena (gesto, pose, mirada, producto más cerca), nunca un ambiente o personaje nuevo.

**Video prompt, en este orden:**
0. `Duración: [N]s.` (la real de esa escena).
1. Inicio según el frame inicial.
2. Transición física paso a paso.
3. Final según el frame final, preparado para la siguiente escena.

Incluye siempre `[Nombre] mira a cámara y dice: '[línea exacta]'`. Los dos puntos y las comillas activan la sincronización de labios.

**Apoyo para generación** después de cada frame, fuera del bloque:
- Siempre: "Adjunta la foto de [Nombre] (`avatares/fotos/…`)".
- Si aparece el producto: "y la foto de tu producto". Si hace falta una vista específica (abierto, por dentro), dilo.

**Estilo, siempre:** grabado con celular, handheld, luz natural, estilo UGC, leve tembleque de cámara, casual, auténtico, 9:16. Audio de sala según el ambiente (cocina: espacio abierto; baño: leve eco; carro: acústica cercana; exterior: viento leve; sala: tono cálido).

**Nunca:** cinematográfico, marcas de cámara profesional, anamórfico, grano de película, iluminación dramática, speed ramp, destello de lente, whip pan, grúa, dolly, steadicam, gimbal, ángulo holandés, color grade, LUT, bokeh, épico, impresionante, cámara lenta (salvo "cámara lenta de iPhone"), "profundidad de campo" sola (di "profundidad de campo de cámara de celular").

Sé muy descriptivo: qué hace cada mano, qué hay y qué no en la superficie, de dónde viene la luz.

### Sección D · B-roll (1 por escena)
Para cada escena: después de qué escena va, con qué línea sincroniza, prompt de imagen, apoyo para generación, prompt de video (`Duración: 2-4s.`), cómo usarlo en CapCut y qué refuerza. Sin personas hablando ni diálogo; solo sonido de acción o ambiente. Ejemplos: el detalle del producto, la demostración (la caída del estuche), la pantalla de batería, una reseña real en pantalla.

### Sección E · Variaciones y edición
- 3 o 4 ideas de 1 a 2 líneas: versión corta (20-30 s), versión contraste (sin decir "antes/después"), voz en off + imágenes, POV o reacción.
- **Notas de edición:** subtítulos (las mismas líneas del diálogo), textos sobre el video y música. También cumplen los textos prohibidos.
- **Copy de Meta que acompaña al video:** el de la misma etapa en `anuncios-meta-embudo.md`, o uno nuevo con hook de 3 líneas si no existe.

## Paso 4 · Chequeo automático y revisión del director
1. Escribe el guion como JSON en `copy/<producto>/ugc/<etapa>-<n>.json` (formato en «Archivo del guion»).
2. Corre `node tools/build-kit-ugc.mjs copy/<producto>/ugc/<etapa>-<n>.json <scratchpad>/ugc-<producto>-<etapa>-<n>.html`. El script **falla** si encuentra textos prohibidos y **avisa** si una línea de diálogo pasa el presupuesto de palabras, si falta la duración en un video prompt, si hay menos B-roll que escenas o si el avatar no está en el banco. Corrige hasta que pase.
3. **Revisión del director creativo** (`director-creativo`, modo guion UGC). Escribe `copy/<producto>/ugc/revision-<etapa>-<n>-vN.md`. Si pide cambios, corrige y vuelve a pasar. Máximo 3 rondas; después, lo que siga en desacuerdo se le presenta al dueño para que decida.
4. **Revisa tú mismo, con criterio:** ¿algo genérico?, ¿suena robótico?, ¿suena a una persona real grabando con su celular?, ¿los 3 primeros segundos detienen el scroll?

## Paso 5 · Entrega
- Publica el kit HTML como artefacto (con las fotos del avatar y del producto en `files`, para ver las miniaturas) y dale el enlace al dueño.
- En el chat: la estrategia en 2 líneas, el hook, la duración, el avatar, el veredicto del director y las herramientas compatibles (Kling, Seedance, Veo o Runway para el video; ChatGPT, Nano Banana o Seedream con referencia de personaje para los frames).
- Commit y push.

## Archivo del guion (`copy/<producto>/ugc/<etapa>-<n>.json`)
```json
{
  "producto": "VIVIDUS 86 V2",
  "slug": "vividus",
  "tienda": "Tu espacio Market",
  "etapa": "TOFU",
  "estilo": "Demostración con el producto",
  "avatar": "co-oficina-02",
  "producto_foto": "imagenes/producto/vividus-marron.webp",
  "estrategia": "…",
  "hook_continua": "Hero aprobado: «Se te cayeron. / Tranqui, siguen enteros.»",
  "personaje": "[descripcion del banco, palabra por palabra] + ambiente base + estética UGC",
  "escenas": [
    {
      "n": 1, "tipo": "Hook", "rango": "0–7s", "funcion": "…",
      "visual": "…",
      "dialogo": "…", "segundos_dialogo": 5.5,
      "frame_inicial": "…", "apoyo_inicial": "…",
      "frame_final": "…", "apoyo_final": "…",
      "video": "Duración: 7s. …"
    }
  ],
  "broll": [
    { "despues_de": 1, "sincroniza": "…", "imagen": "…", "apoyo": "…", "video": "Duración: 3s. …", "capcut": "…", "objetivo": "…" }
  ],
  "variaciones": ["…"],
  "edicion": ["…"],
  "copy_meta": { "texto": "…", "titulo": "…", "descripcion": "…" },
  "revision": { "veredicto": "APROBADO", "archivo": "copy/vividus/ugc/revision-tofu-1-v2.md" },
  "historial": []
}
```
Desde la Escena 2, `frame_inicial` va vacío: el kit escribe la línea de continuidad.

## Cambios puntuales
Como en el kit de imágenes: el dueño dice **escena o B-roll + parte** ("escena 3, diálogo: más corto"). Cambia solo eso, agrega en `historial` `{ "fecha", "parte", "cambio" }` y reconstruye el kit. Si el cambio toca el frame final de una escena, avisa que el frame inicial de la siguiente cambia con él.

## Reglas que nunca se rompen
- Nunca escribas el guion antes de la confirmación del Paso 2.
- Nunca rompas el A-Roll continuo.
- Nunca un personaje fuera del banco ni la foto de una persona real.
- Nunca regeneres el frame inicial desde la Escena 2.
- Nunca un cambio de objeto o posición sin microacción física.
- Nunca menos B-roll que escenas, ni B-roll con diálogo.
- Nunca un video prompt sin `Duración: [N]s.`.
- Nunca texto en pantalla dentro de los prompts.
- Nunca los textos prohibidos del cerebro, ni lo que el brief dice que no se promete.
- Nunca un prompt fuera de su bloque copiable.
