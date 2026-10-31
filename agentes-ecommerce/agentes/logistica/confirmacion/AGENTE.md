# Agente: Confirmación de pedidos

**Área:** Logística
**Países:** Colombia (en diseño, avanzado) · Guatemala (pendiente)
**Estado:** En diseño

## Qué hace
Confirma cada pedido contraentrega antes de enviarlo a Dropi: valida la dirección, revisa el historial del cliente, elige la transportadora y deja listo el pedido, o lo marca para que una persona lo revise.

Existe una skill relacionada en la cuenta de Claude: **confirmar-pedidos**. Este archivo es la fuente de reglas; la skill debe seguirlas.

## Cuándo se activa
- Pedido nuevo en iComfly (estado Pendiente).
- Respuesta del cliente al flujo de confirmación por WhatsApp.

## Qué lee del cerebro
- `cerebro/principios.md`
- `cerebro/limites-y-escalamiento.md`
- Colombia: `cerebro/colombia/direcciones.md`, `huella-digital.md`, `transportadoras-y-flete.md`
- Guatemala: `cerebro/guatemala/` (por documentar)

## Conectores que usa
| Conector | Para qué |
| --- | --- |
| iComfly (`icomfly_col` / `icomfly`) | Ver pedidos, conversación, dejar notas, cambiar estado, elegir transportadora |
| Dropi (`dropi_mcp`) | Huella digital del cliente, cotizar flete |

## Paso a paso (Colombia)
1. **Dirección:** evaluarla según `direcciones.md` → clara / incompleta o ambigua / dudosa.
   - Incompleta o ambigua → preguntarle al cliente solo lo que falta.
   - Dudosa o sin respuesta → nota en el pedido en iComfly; no confirmar.
2. **Huella digital:** consultar por celular. Si el riesgo o la región chocan con la regla, marcar para revisión en el panel de Dropi (nivel 2).
3. **Transportadora:** historial del cliente > tope de flete del 22% > regla por región.
4. **Confirmar** en iComfly y enviar a Dropi con la transportadora elegida.

## Cómo funciona hoy (flujo de iComfly, igual en CO y GT)
El flujo "orden de venta flujo completo" revisa antes de cada mensaje si el pedido sigue Pendiente:

1. Minuto 1 · `orden_1_minuto_v3`: datos del pedido, valor contraentrega, dirección y 3 botones (Confirmo mi pedido / Modificar mi dirección / Modificar mi pedido).
2. +30 min · `orden_30_minutos`
3. +1 h · `orden_1_hora_`: reenvía datos con botones
4. +4 h · `orden_4_horas`
5. +14 h · `orden_20_horas`
6. +2 h · `orden_30_minutos`

El botón "Confirmo mi pedido" (o escribir "CONFIRMAR PEDIDO") pasa el pedido a **Confirmada** y envía la foto del producto.

### Brechas del flujo actual
- Se presenta como "Jose de Joselevende" en las dos tiendas.
- Si el cliente responde "sí", "ok" o "dale" sin tocar el botón, no se confirma.
- `orden_4_horas` está en categoría MARKETING (más cara, Meta la puede frenar).
- No hay cancelación ni llamada cuando el cliente nunca responde.
- El flujo no valida la dirección: confirma con el botón aunque la dirección sea mala.

## Qué hace solo / cuándo escala
Ver `cerebro/limites-y-escalamiento.md`.

## Cómo se mide
- % de pedidos confirmados vs. cancelados (hoy CO ~20% cancelados, GT ~18%).
- % de devolución de los pedidos confirmados (hoy CO 10%, GT 16%).
- Pedidos devueltos por dirección mala (meta: 0).

## Preguntas abiertas
- [ ] ¿Etiqueta además de nota para los pedidos dudosos? ¿Quién revisa y cada cuánto?
- [ ] ¿Quién confirma hoy y en qué horario? ¿Qué pasa de noche y fines de semana?
- [ ] ¿Qué más se revisa antes de confirmar? (duplicados, clientes que ya devolvieron, dinero listo)
- [ ] ¿Qué se hace con quien no responde después del último recordatorio? ¿Cuándo se cancela?
- [ ] Punto de corte de la huella digital y cliente sin huella.
- [ ] Flete por encima del 22%.
