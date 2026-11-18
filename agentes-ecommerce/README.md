# Agentes de la operación — Colombia y Guatemala

Proyecto general donde viven **todos los agentes** de la operación de ecommerce de Esteban: logística, servicio al cliente, marketing, finanzas, producto y los que vengan.

Todos los agentes leen del mismo **cerebro**: las reglas, los principios y la forma de operar de Esteban en cada país. Si algo no está escrito en el cerebro, el agente no lo decide solo: lo escala a una persona.

## Estructura

```
agentes-ecommerce/
├── CLAUDE.md                  Instrucciones que Claude lee al trabajar en este proyecto
├── cerebro/                   Cómo opera Esteban (fuente de verdad)
│   ├── principios.md
│   ├── operacion-por-pais.md
│   ├── diccionario-estados.md
│   ├── limites-y-escalamiento.md
│   ├── servicio-al-cliente.md
│   ├── colombia/              Reglas propias de Colombia
│   └── guatemala/             Reglas propias de Guatemala
├── agentes/                   Un folder por agente, agrupados por área
│   ├── _plantilla/            Copiar para crear un agente nuevo
│   ├── logistica/             confirmacion · seguimiento · novedades
│   ├── servicio-al-cliente/
│   ├── marketing/
│   ├── finanzas/
│   └── producto/
├── conectores/                Qué ve cada conector y qué le falta
├── preguntas-abiertas.md      Lo que falta que Esteban defina
└── bitacora.md                Registro de cambios
```

## Estado de los agentes

| Área | Agente | Estado |
| --- | --- | --- |
| Logística | [Confirmación de pedidos](agentes/logistica/confirmacion/AGENTE.md) | En diseño — Colombia avanzado, Guatemala pendiente |
| Logística | [Seguimiento de guías](agentes/logistica/seguimiento/AGENTE.md) | Por diseñar |
| Logística | [Novedades](agentes/logistica/novedades/AGENTE.md) | Por diseñar |
| Servicio al cliente | [Ver área](agentes/servicio-al-cliente/README.md) | Ideas |
| Marketing | [Ver área](agentes/marketing/README.md) | Ideas |
| Finanzas | [Ver área](agentes/finanzas/README.md) | Ideas |
| Producto | [Ver área](agentes/producto/README.md) | Ideas |

## Cómo crear un agente nuevo

1. Copia `agentes/_plantilla/` dentro del área que corresponda.
2. Llena `AGENTE.md`: qué hace, cuándo se activa, qué lee del cerebro, qué puede hacer solo y cuándo escala.
3. Si el agente necesita reglas nuevas, se escriben primero en `cerebro/` y el agente las referencia.
4. Agrega una línea en la tabla de arriba y en `bitacora.md`.

## Documento vivo

La versión editable y comentable del cerebro está en Claude Docs: <https://claude.ai/artifact/9mLbJPB1uxCgnLpj8ik85u>. Este repositorio es la versión que leen los agentes; cuando una regla cambia en uno, se actualiza en el otro.
