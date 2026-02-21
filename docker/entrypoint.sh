#!/bin/sh
set -e

echo "[entrypoint] Running migrations & seed (idempotent)..."
node_modules/.bin/tsx server/db/seed.ts

echo "[entrypoint] Starting Nuxt server..."
exec node .output/server/index.mjs
