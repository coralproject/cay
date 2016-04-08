#!/usr/bin/env sh
cat > /usr/share/nginx/html/config.json <<EOL
{
  "xeniaHost":"${CAY_XENIAHOST:-}",
  "pillarHost":"${CAY_PILLARHOST:-}",
  "environment":"${CAY_ENVIRONMENT:-development}",
  "brand":"${CAY_BRAND:-Tyrell Corporation}",
  "googleAnalyticsId":"${CAY_GOOGLEANALYTICSID:-UA-XXXXXXXXXX}",
  "requireLogin":${CAY_REQUIRELOGIN:-true},
  "basicAuthorization":"${CAY_AUTH:-Basic 109340923j02i3jroi23jroi23ljf23f}"
}
EOL

nginx -g "daemon off;"
