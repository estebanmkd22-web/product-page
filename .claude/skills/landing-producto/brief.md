# Brief del producto (Fase 0)

Sin brief completo no hay hero. Se guarda en `briefs/<producto>.md` con esta plantilla y se le muestra al usuario para que lo confirme.

Cada dato lleva su **fuente**:
- **[Usuario]**: lo dijo el usuario.
- **[Verificado]**: lo viste en la ficha del proveedor, en fotos o en reseñas reales.
- **[Hipótesis]**: lo propones tú y hay que validarlo.

Nunca presentes una hipótesis como hecho.

## Plantilla

```markdown
# Brief · <Producto>
Tienda: Tu espacio Market (CO) | Naturixa (GT) · Fecha: <aaaa-mm-dd> · Estado: borrador | confirmado

## 1. Producto
- Qué es, en una frase que entendería la abuela del cliente:
- Qué hace y para qué sirve (el resultado, no la característica):
- Specs reales (medidas, material, potencia, contenido, compatibilidad):
- Qué trae la caja:
- Foto del producto con fondo limpio: <ruta o "falta">
- Lo que NO hace o no debe prometerse (limitaciones, claims prohibidos, registro sanitario):

## 2. Buyer
- Quién es (edad, género, rol, nivel socioeconómico, dónde vive):
- Situación en la que compra (el momento exacto en que lo necesita):
- Dolores, en sus palabras (frases textuales si existen):
- Deseos y la transformación que busca:
- Objeciones (precio, confianza, "¿me sirve a mí?", pago, envío, calidad):
- Qué usa hoy en lugar del producto y por qué no le funciona:
- Nivel de consciencia (Schwartz): inconsciente / del problema / de la solución / del producto / muy consciente
- Fuente de esta información: <reseñas, comentarios de anuncios, chats de WhatsApp, investigación>

## 3. Ángulos e hipótesis
- Ángulos candidatos (3 a 5), cada uno con el dolor o deseo que ataca:
- Hipótesis a probar: "Creemos que <público> compra más con <ángulo/oferta> porque <razón>. Lo sabremos si <métrica>."
- Ángulo principal elegido para la landing (lo decide el usuario):

## 4. Oferta
- Precio de venta:
- Precio de comparación real (si existe; si no, no se usa precio tachado):
- Oferta por cantidad (1, 2, 3 unidades y precios):
- Costo aproximado y margen (opcional, para saber cuánto se puede regalar):
- Bonos o regalos posibles (que el usuario pueda cumplir de verdad):
- Garantía (tipo, días, qué cubre):
- Envío y pago (gratis, contraentrega, tiempos):
- Ideas para una oferta única (ver criterio.md → "Construir la oferta"):

## 5. Prueba y confianza
- Reseñas o testimonios reales disponibles:
- Videos o fotos de clientes reales:
- Datos, certificaciones o registros:

## 6. Competencia
- Quién más lo vende, a qué precio y con qué promesa:
- Qué hacemos distinto:

## 7. Material
- Fotos y videos disponibles:
- Avatar del banco que encaja (propuesta):
- Logo, colores o fuentes de marca:
```

## Cómo pedir el brief
- Pídelo en **una sola tanda**, en lista corta, y separa lo **obligatorio** de lo **deseable**.
- **Obligatorio:** qué es y qué hace, foto, precio, oferta por cantidad, garantía, buyer (quién y su dolor principal) y ángulo o hipótesis.
- Lo que el usuario no sepa lo propones tú como **[Hipótesis]**, con tu razonamiento, y él confirma o corrige.
- Si el usuario ya dio información en mensajes anteriores, **no la vuelvas a pedir**: llénala tú y muéstrala para que la confirme.
- Cuando el brief esté confirmado, cambia `Estado: confirmado` y haz commit. Todo lo demás (hero, landing, kit, anuncios) sale de ese brief.
