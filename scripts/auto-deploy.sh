#!/bin/sh
# Hook "Stop" de Claude Code: si hay cambios, compila, hace commit y push a main
# para que GitHub Pages y Vercel se actualicen solos.
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/..}" || exit 0

msg() { printf '{"systemMessage": "%s"}\n' "$1"; }

[ -z "$(git status --porcelain)" ] && exit 0

if ! npm run build >/tmp/xv-auto-deploy.log 2>&1; then
  msg "⚠️ No se publicó: la página no compila (ver /tmp/xv-auto-deploy.log)."
  exit 0
fi

git add -A
git commit -q -m "Actualización automática $(date '+%Y-%m-%d %H:%M')" || exit 0

if GIT_TERMINAL_PROMPT=0 git push -q origin main >>/tmp/xv-auto-deploy.log 2>&1; then
  msg "🚀 Cambios publicados. GitHub Pages y Vercel se actualizan en 1–2 min."
else
  msg "⚠️ Commit hecho pero el push falló (¿token vencido?). Ver /tmp/xv-auto-deploy.log."
fi
