#!/bin/sh

if [[ -z "$XENIA_URL" ]]; then
    export XENIA_URL="http://${XENIA_PORT_4000_TCP_ADDR}:${XENIA_PORT_4000_TCP_PORT}"
fi

if [[ -z "$ASK_URL" ]]; then
    export ASK_URL="http://${ASK_PORT_8080_TCP_ADDR}:${ASK_PORT_8080_TCP_PORT}"
fi

if [[ -z "$TRUST_URL" ]]; then
    export TRUST_URL="http://${TRUST_PORT_8080_TCP_ADDR}:${TRUST_PORT_8080_TCP_PORT}"
fi

if [[ -z "$ELKHORN_URL" ]]; then
    export ELKHORN_URL="http://${ELKHORN_PORT_4444_TCP_ADDR}:${ELKHORN_PORT_4444_TCP_PORT}"
fi

if [[ -z "$AUTH_TOKEN" ]]; then
    export DO_AUTH=false
else
    export DO_AUTH=true
fi

if [[ -z "$TRUST" ]]; then
    export TRUST=false

if [[ -z "$AUTH_CLIENT_ID" ]]; then
    export AUTH_CLIENT_ID=""
fi

if [[ -z "$AUTH_AUTHORITY" ]]; then
    export AUTH_AUTHORITY=""
fi

envsubst < /assets/config.json > /usr/share/nginx/html/config.json
nginx -g "daemon off;"
