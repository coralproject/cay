#!/bin/sh

if [[ -z "$XENIA_URL" ]]; then
    export XENIA_URL="http://${XENIA_PORT_4000_TCP_ADDR}:${XENIA_PORT_4000_TCP_PORT}"
fi

if [[ -z "$PILLAR_URL" ]]; then
    export PILLAR_URL="http://${PILLAR_PORT_8080_TCP_ADDR}:${PILLAR_PORT_8080_TCP_PORT}"
fi

if [[ -z "$AUTH_TOKEN" ]]; then
    export DO_AUTH=false
else
    export DO_AUTH=true
fi

envsubst < /assets/config.json > /usr/share/nginx/html/config.json
nginx -g "daemon off;"
