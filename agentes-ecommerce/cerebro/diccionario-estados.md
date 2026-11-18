# Diccionario de estados

Cada estado que llega de Dropi, de la transportadora o de iComfly se traduce a uno de 8 estados internos, para que todos los agentes hablen el mismo idioma en los dos países.

| Estado interno | Agente responsable | CO: estados vistos | GT: estados vistos |
| --- | --- | --- | --- |
| Por confirmar | Confirmación | Pendiente (en iComfly, antes de Dropi) | Pendiente |
| Confirmado | Confirmación | Confirmada (iComfly) · EN PROCESAMIENTO (Dropi) | Confirmada |
| Cancelado | Confirmación | Cancelado · CANCELADO | Cancelado |
| En tránsito | Seguimiento | DESPACHADA, EN TERMINAL ORIGEN, EN TRANSPORTE, EN BODEGA TRANSPORTADORA, EN TERMINAL DESTINO, EN REPARTO | Por mapear (FORZA, GINTRACOM) |
| En novedad | Novedades | NOVEDAD, INTENTO DE ENTREGA | Por mapear |
| En oficina | Seguimiento / Novedades | RECLAME EN OFICINA | Por mapear |
| Entregado | Cierre | ENTREGADO | Por mapear |
| Devolución | Novedades / cierre | DEVOLUCION | Devolucion, Devuelto |

*NOVEDAD SOLUCIONADA* (CO) vuelve a **En tránsito**.
