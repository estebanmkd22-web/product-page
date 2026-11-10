# Librería de secciones para product pages (Shopify · Dawn)

Secciones propias, livianas y editables desde **Personalizar tema**, para armar product pages sin GemPages.
Todas empiezan con `pp-` y comparten colores desde una sola sección.

## Secciones disponibles

| Archivo | Nombre en el personalizador | Para qué sirve |
|---|---|---|
| `sections/pp-estilos.liquid` | PP · Estilos globales | (Opcional) Cambiar los colores de toda la página. Se agrega 1 vez, arriba |
| `sections/pp-ticker.liquid` | PP · Barra animada | Franja con mensajes que se mueven |
| `sections/pp-hero-oferta.liquid` | PP · Hero + Oferta | Galería, reseñas, titular, beneficios, precio, qué incluye y botón |
| `sections/pp-videos.liquid` | PP · Videos | Carrusel de videos verticales (UGC) con flechas, barra y avance automático |
| `sections/pp-videos-rama.liquid` | PP · Videos Rama | El mismo carrusel con el estilo de la Rama de Luz (fondo crema y flechas ámbar) |
| `sections/pp-problema.liquid` | PP · Problema | Etiqueta, titular y hasta 3 fotos en fila |
| `sections/pp-grid-dolores.liquid` | PP · Grid de dolores | Tarjetas con foto, título y texto + frase de cierre |
| `sections/pp-testimonio.liquid` | PP · Testimonio | Pregunta de agitación, cita de cliente y botón |
| `sections/pp-como-funciona.liquid` | PP · Cómo funciona | Slider de tarjetas (imagen, título y texto) o lista |
| `sections/pp-pasos.liquid` | PP · Pasos | Modo de uso en pasos numerados |
| `sections/pp-faq.liquid` | PP · Preguntas | Preguntas frecuentes en acordeón |
| `sections/pp-antes-despues.liquid` | PP · Antes y después | Columnas Antes/Después, imagen comparativa y frase de cierre |
| `sections/pp-iconos.liquid` | PP · Íconos | Franja de 2 a 4 íconos con texto |
| `sections/pp-zonas.liquid` | PP · Zonas | Imagen con etiquetas posicionadas + fotos de detalle |
| `sections/pp-beneficios.liquid` | PP · Beneficios | Imagen central rodeada de beneficios con ícono |
| `sections/pp-secuencia.liquid` | PP · Secuencia | Imagen + fotos en secuencia con flechas |
| `sections/pp-ofertas.liquid` | PP · Ofertas | Selector de packs con descuento, precio por porción y regalos |
| `sections/pp-oferta-tabs.liquid` | PP · Oferta con pestañas | Pestañas por pack, regalos incluidos con contador (algunos solo desde 2 unidades) y botón con precio |
| `sections/pp-circulos.liquid` | PP · Círculos destacados | Titular con laureles, foto con bordes difuminados y círculos con foto, ícono, título y texto |
| `sections/pp-problemas-filas.liquid` | PP · Problemas en filas | Filas alternadas foto + tarjeta (ícono, título, divisor dorado, puntos con check) |
| `sections/pp-split.liquid` | PP · Imagen + texto | Foto a un lado y panel de color con etiqueta, título, texto, puntos en 2 columnas y botón |
| `sections/pp-garantia.liquid` | PP · Garantía | Tarjeta de color con sello circular, título, texto y píldoras con ícono |
| `sections/pp-separador.liquid` | PP · Separador navideño | Franja decorativa: guirnalda de bombillos, copos de nieve o acebo |
| `sections/pp-logo.liquid` | PP · Logo | Logo centrado arriba del hero con ancho controlado |
| `sections/pp-resultados-zona.liquid` | PP · Resultados por zona | Pestañas por zona con foto antes/después y testimonio |
| `sections/pp-libre.liquid` | PP · Sellos libre de | Fila de íconos de línea tipo "sin esteroides, sin parabenos, sin talco" |
| `sections/pp-esperar.liquid` | PP · Qué esperar | Línea de tiempo vertical alternada que se llena al hacer scroll |
| `sections/pp-carrusel-imagenes.liquid` | PP · Carrusel imágenes | Carrusel de imágenes con flechas, barra y etiqueta opcional; no toca PP · Videos |
| `sections/pp-comparativa.liquid` | PP · Comparativa | Tabla tu producto vs. la competencia |
| `sections/pp-datos.liquid` | PP · Datos | Tarjetas con un dato grande |
| `sections/pp-tabs.liquid` | PP · Pestañas | "¿Te identificas?" con pestañas |
| `sections/pp-timeline.liquid` | PP · Línea de tiempo | Etapas deslizables con barra de avance |
| `sections/pp-destacado.liquid` | PP · Destacado | Lista con símbolos o tarjeta de color con firma |
| `sections/pp-resenas.liquid` | PP · Reseñas | Calificación general + tarjetas de reseñas |
| `sections/pp-galeria-ideas.liquid` | PP · Galería ideas | Tarjetas grandes con foto y texto encima (ideas de uso por espacio) |
| `sections/pp-arco.liquid` | PP · Imagen en arco | Franja de color con foto en arco, titular, texto y botón |
| `sections/pp-boton-fijo.liquid` | PP · Botón fijo | Botón de compra pegado abajo en celular |

## Cómo instalar (una sola vez por tienda)

> Recomendado: primero haz **Acciones → Duplicar** sobre tu tema y trabaja en la copia.

Cada sección es **un solo archivo**, no depende de nada más.

1. Shopify → **Tienda online → Temas → ⋯ → Editar código**.
2. Clic derecho sobre la carpeta **sections** → **New File…** → nombre `pp-hero-oferta.liquid`.
3. Pega el código completo de la sección y guarda con **Ctrl + S**.
4. Repite con las demás secciones que quieras usar.

Antes de entregar una sección nueva: `node tools/validar-schema.mjs` (límites de Shopify).

## Cómo armar la página de un producto

1. **Tienda online → Temas → Personalizar**.
2. Arriba, en el selector de páginas: **Productos → Crear plantilla** → nómbrala (ej. `enjuague`) basada en *Producto predeterminado*.
3. En esa plantilla puedes ocultar la sección *Información del producto* de Dawn y agregar, en este orden:
   `PP · Estilos globales` → `PP · Barra animada` → `PP · Hero + Oferta` → …
4. Edita textos, imágenes y colores en el panel izquierdo. **Guardar**.
5. En el admin del producto → **Plantilla del tema** (columna derecha) → elige `enjuague`.

### Botón de compra
En *PP · Hero + Oferta → Botón de compra* eliges qué hace:
- **EasySell (contraentrega):** abre el formulario de EasySell. Usa las ofertas por cantidad que ya tengas configuradas en la app.
- **Carrito de Shopify:** agrega el producto y (opcional) va directo al pago.
- **Enlace:** lleva a cualquier URL (WhatsApp, otra página, etc.).

## Reglas para imágenes (lo que hace la página liviana)

- **Sin texto dentro de la imagen.** El texto va en la sección, así carga rápido y se edita en segundos.
- Formato **WebP**, máximo **1200 px** de ancho, idealmente < 150 KB.
- Hero: cuadrada **1:1** o vertical **4:5**, la misma proporción en todas.
- Nada de capturas de pantalla en PNG: exporta la foto original.

## Skill `landing-producto`

El proceso completo (hero → landing → kit de imágenes) está en `.claude/skills/landing-producto/SKILL.md`. Se carga sola en cada sesión de Claude Code de este repositorio; también se llama con `/landing-producto`.

## Montaje automático en Shopify

`node tools/montar-landing.mjs <landing> --tienda tuespaciomarket` revisa el tema en vivo con la Shopify CLI: qué secciones de la plantilla faltan, cuáles están iguales, cuáles son compatibles y cuáles desactualizadas. Con `--subir` sube solo lo que falta y la plantilla nueva (`--nodelete`), con respaldo previo en `respaldos/`. Nunca sobrescribe secciones ni plantillas existentes, salvo con `--actualizar` o `--sobrescribir-plantilla`. Necesita la contraseña de Theme Access como secreto de red para `theme-kit-access.shopifyapps.com` (header `X-Shopify-Access-Token`).

## Kit de imágenes con IA

1. `node tools/espacios-imagenes.mjs preview/paginas/X.json imagenes-ia/X-espacios.json` lista cada espacio de imagen de la página (sección, bloque, formato y píxeles).
2. En `imagenes-ia/X-prompts.json` va la ficha visual de la landing y un prompt por espacio.
3. `node tools/build-kit-imagenes.mjs imagenes-ia/X-espacios.json imagenes-ia/X-prompts.json kit.html` arma el prompt final de cada espacio (`imagenes-ia/X-final.json`) y la página de revisión, y avisa si algún espacio quedó sin prompt. Con `"version": 2` los prompts van en español para ChatGPT, divididos en partes (escena, persona y formato por imagen; ficha, producto y reglas para toda la landing) y con historial de cambios por imagen.
4. Las personas salen del banco de avatares (`avatares/banco.json`): cada avatar tiene 4 fotos de referencia (frente, tres cuartos, medio cuerpo y cuerpo entero) que se adjuntan en cada imagen donde aparece. La landing elige su avatar con `"avatar"` en su archivo de prompts; sin fotos aprobadas, esas imágenes no se generan. Las fotos están en `avatares/fotos/` y `node tools/build-banco-avatares.mjs banco.html` arma la página del banco.
5. `NODE_USE_ENV_PROXY=1 node --no-warnings tools/kie.mjs imagenes-ia/X-prompts.json --n 1,7 --modelos sunburst,flare --res 1K` genera esos espacios con GPT Image 2.5 (image-to-image) en Kie, con la foto del producto y la del avatar como referencia, y los guarda en `imagenes-ia/X/prueba/`. La clave de Kie es un secreto de red del entorno, permitido para `api.kie.ai` y `kieai.redpandaai.co`.

## Para desarrollo

Los estilos compartidos viven en `src/pp-base.css` y los íconos en `src/pp-iconos.liquid`.
Después de cambiarlos, ejecuta `node tools/inline-base.mjs` para copiarlos dentro de cada sección.
Todo lo de la base va dentro de `:where()`: se repite en cada sección y nunca debe ganarle
a los estilos propios de una sección.

Fotos recortadas de las imágenes de Luvien (sin texto): `imagenes/luvien/` y `imagenes/fotos-luvien.zip`.

### Página para copiar el código

El visor de archivos de la app corta los archivos largos. Para copiar cada sección completa:

```bash
node tools/build-copy-page.mjs salida.html
```

Genera una página con un botón "Copiar código completo" por sección.

### Vista previa local

```bash
npm install
npm run preview -- preview/paginas/naturixa-id-whitening.json
# abre preview/out/naturixa-id-whitening.html
```
