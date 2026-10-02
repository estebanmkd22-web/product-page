# Librería de secciones para product pages (Shopify · Dawn)

Secciones propias, livianas y editables desde **Personalizar tema**, para armar product pages sin GemPages.
Todas empiezan con `pp-` y comparten colores desde una sola sección.

## Secciones disponibles

| Archivo | Nombre en el personalizador | Para qué sirve |
|---|---|---|
| `assets/pp-base.css` | — | Estilos compartidos (obligatorio) |
| `sections/pp-estilos.liquid` | PP · Estilos globales | Colores de toda la página. Se agrega 1 vez, arriba |
| `sections/pp-ticker.liquid` | PP · Barra animada | Franja con mensajes que se mueven |
| `sections/pp-hero-oferta.liquid` | PP · Hero + Oferta | Galería, reseñas, titular, beneficios, precio, qué incluye y botón |

## Cómo instalar (una sola vez por tienda)

> Recomendado: primero haz **Acciones → Duplicar** sobre tu tema y trabaja en la copia.

1. Shopify → **Tienda online → Temas → ⋯ → Editar código**.
2. Carpeta **assets** → *Agregar un nuevo recurso* → *Crear un archivo en blanco* → nombre `pp-base` y tipo `.css` → pega el contenido de `assets/pp-base.css` → **Guardar**.
3. Carpeta **sections** → *Agregar una nueva sección* → tipo `liquid`, nombre `pp-estilos` → borra lo que trae, pega el contenido de `sections/pp-estilos.liquid` → **Guardar**.
4. Repite el paso 3 con `pp-ticker` y `pp-hero-oferta` (y las que vayamos sumando).

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

## Vista previa local (para desarrollo)

```bash
npm install
npm run preview -- preview/paginas/naturixa-id-whitening.json
# abre preview/out/naturixa-id-whitening.html
```
