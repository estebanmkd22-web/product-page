#!/bin/bash
# Verifica las conexiones del proyecto. Lo corre la skill landing-producto al empezar.
# Las claves NO viven en archivos: son secretos de red del entorno "Default" y el proxy las agrega solo
# en las llamadas a cada dominio. Por eso no hay que pedírselas al usuario en cada sesión ni buscarlas en
# ~/.claude/settings.json. Este script comprueba que respondan y deja lista la marca de configuración de
# la skill deep-research-ia-commerce, para que no vuelva a pedir el token de Apify en cada contenedor nuevo.
ok() { printf '%s ✅ %s\n' "$1" "$2"; }
falla() { printf '%s ❌ %s\n' "$1" "$2"; }

a=$(curl -sS -m 10 https://api.apify.com/v2/users/me 2>/dev/null | python3 -c "import json,sys;print(json.load(sys.stdin)['data']['username'])" 2>/dev/null)
[ -n "$a" ] && ok "Apify" "cuenta $a (secreto de red de api.apify.com)" || falla "Apify" "sin respuesta: revisar el secreto de red de api.apify.com"

t=$(curl -sS -m 10 -X POST https://theme-kit-access.shopifyapps.com/cli/admin/api/2025-07/graphql.json \
  -H 'Content-Type: application/json' -H 'X-Shopify-Shop: sdv0ep-if.myshopify.com' -H 'X-Shopify-Access-Token: proxy-injected' \
  --data '{"query":"{ shop { name } }"}' 2>/dev/null | python3 -c "import json,sys;print(json.load(sys.stdin)['data']['shop']['name'])" 2>/dev/null)
[ -n "$t" ] && ok "Theme Access" "tienda $t (montaje con tools/montar-landing.mjs)" || falla "Theme Access" "sin respuesta: revisar el secreto de red de theme-kit-access.shopifyapps.com"

k=$(curl -sS -m 10 https://api.kie.ai/api/v1/chat/credit 2>/dev/null | python3 -c "import json,sys;print(json.load(sys.stdin)['data'])" 2>/dev/null)
[ -n "$k" ] && ok "Kie" "$k créditos (en pausa por decisión del usuario)" || falla "Kie" "sin respuesta"

# Marca de configuración de deep-research-ia-commerce: el token de Apify lo pone el proxy, no settings.json.
if [ -n "$a" ]; then
  mkdir -p ~/.claude/deep-research-ia-commerce
  echo '{"apify":"ok","token":"secreto de red del entorno (proxy en api.apify.com); no pedirlo ni buscarlo en settings.json"}' > ~/.claude/deep-research-ia-commerce/setup.json
fi
echo "Las claves son secretos de red del entorno: nunca las pidas por el chat. Si algo sale ❌, usa request_credential con ese dominio."
exit 0
