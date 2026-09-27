#!/bin/sh
# Genera public/og.jpg (vista previa al compartir) a partir de scripts/og.html usando Chrome.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
TMP="$(mktemp -d)"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=6000 \
  --screenshot="$TMP/og.png" "file://$PWD/scripts/og.html" 2>/dev/null
sips -s format jpeg -s formatOptions 82 "$TMP/og.png" --out public/og.jpg >/dev/null
rm -rf "$TMP"
echo "public/og.jpg generado"
