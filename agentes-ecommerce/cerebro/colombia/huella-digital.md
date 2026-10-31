# Colombia — Huella digital de Dropi

La huella digital es el historial del cliente en Dropi, buscado por número de celular. Es la pieza central para decidir si el cliente es bueno, regular o malo, y con qué transportadora enviar.

## Lo que ve el agente (conector de Dropi, sin el computador prendido)
`get_customer_fingerprint_profile` devuelve:
- Tipo de comprador (ej. Frecuente, Ocasional)
- Etiqueta de riesgo (ej. Segura, Probable)
- % de entrega y % de devolución (no suman 100: el resto son pedidos en curso)

Si no hay huella para el número, se reporta como "no se encontró", nunca como cliente malo.

Prueba del 26 oct 2026 con pedidos reales: el cliente con 40% de devolución (Probable) devolvió; el de 25% (Segura) recibió.

## Lo que solo se ve en el panel de Dropi
El panel "Detalles del comprador" muestra además **entregas, devoluciones y en tránsito por transportadora** y por tipo de envío. El conector **no trae ese desglose** y usa una ventana de tiempo más corta, así que los porcentajes pueden no coincidir con el panel.

Ejemplo real (cliente de Villavicencio): el panel mostraba Interrapidísimo 6 entregas / 0 devoluciones, Coordinadora 1 / 0, **Envía 5 / 6**. La decisión es "no Envía", y eso solo se ve en el panel.

## Cómo se usa (dos niveles)

| Nivel | Qué usa | ¿Necesita el PC prendido? | Qué decide |
| --- | --- | --- | --- |
| 1. Siempre | Conector de Dropi + reglas por región + tope de flete | No | La mayoría de pedidos |
| 2. Por lotes | Panel de Dropi en Chrome con la sesión de Esteban abierta | Sí | Solo los marcados: riesgo Probable, devolución alta o región que choca con el historial |

**Pendiente con Dropi:** pedir que el conector devuelva el desglose por transportadora. Si lo agregan, el nivel 2 sobra.

## Por definir
- Desde qué % de devolución o qué etiqueta de riesgo no se despacha, se llama antes o se pide pago anticipado.
- Qué se hace con un cliente sin huella.
