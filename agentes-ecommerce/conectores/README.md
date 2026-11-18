# Conectores

Las URLs de conexión llevan el acceso a cada tienda: **nunca se guardan en este repositorio.** Se agregan en <https://claude.ai/customize/connectors>.

| Conector | Cuenta | País | Estado |
| --- | --- | --- | --- |
| `icomfly_col` | Tu espacio Market (id 473) | Colombia | Conectado |
| `icomfly` | Naturixa (id 474) | Guatemala | Conectado |
| `dropi_mcp` | Cuenta COP | Colombia | Conectado |
| Dropi Guatemala | — | Guatemala | Pendiente |

## Pendientes con Dropi
1. **Conectar Guatemala.** Claude no permite dos conectores con la misma URL y Dropi usa una sola URL para todos los países. Hay que pedirle a Dropi una URL o token por cuenta.
2. **Desglose por transportadora en la huella digital.** `get_customer_fingerprint_profile` solo devuelve tipo de comprador, riesgo y % de entrega y devolución; el panel muestra además entregas y devoluciones por transportadora.

## Conocido de cada conector
- **iComfly:** pedidos, estados, flujos de WhatsApp, plantillas, notas, etiquetas, novedades, clientes.
- **Dropi:** pedidos, estados de guía, huella digital, cotización de flete, transportadoras, ciudades.
