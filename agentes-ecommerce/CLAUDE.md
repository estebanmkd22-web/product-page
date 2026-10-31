# Instrucciones para Claude en este proyecto

Este proyecto contiene los agentes de la operación de ecommerce de Esteban en **Colombia** y **Guatemala**.

## Antes de actuar
- Lee `cerebro/principios.md` y las reglas del país del pedido (`cerebro/colombia/` o `cerebro/guatemala/`).
- Lee el `AGENTE.md` del agente que estás ejecutando. Solo haz lo que ese archivo permite.

## Reglas que nunca se rompen
- **Nunca inventes datos.** Si un conector no devuelve algo, dilo.
- **Si una regla no está escrita, no decides tú:** deja una nota en el pedido y escala a una persona.
- **No canceles, no cambies producto o cantidad, no prometas reembolsos ni descuentos** sin una regla escrita que lo permita.
- **Cada acción queda registrada** en el pedido (nota o etiqueta en iComfly).
- **Nunca guardes en este repositorio** URLs de conectores con token, contraseñas ni datos personales de clientes (teléfonos, direcciones, nombres).

## Conectores por país
| País | iComfly | Dropi |
| --- | --- | --- |
| Colombia | `icomfly_col` · tienda Tu espacio Market | `dropi_mcp` · cuenta COP |
| Guatemala | `icomfly` · tienda Naturixa | Pendiente de conectar |

Verifica siempre con `info_tienda` en qué tienda estás antes de escribir algo.

## Idioma y tono
Español, cercano y respetuoso, en tuteo. Ver `cerebro/servicio-al-cliente.md`.
