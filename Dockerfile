# ---- Build Stage ----
FROM node:22-alpine AS builder

# Install build tools for native modules (better-sqlite3)
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Generate DB migrations & build Nuxt
RUN npm run db:generate
RUN npm run build

# ---- Production Stage ----
FROM node:22-alpine AS runner

# Required to rebuild/run better-sqlite3 native bindings
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Compiled Nuxt output
COPY --from=builder /app/.output ./.output

# DB migrations (applied at runtime from volume-mounted /app/db)
COPY --from=builder /app/db/migrations ./db/migrations

# node_modules (includes tsx for running seed at startup)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Seed script + schema (tsx executes these at container startup)
COPY --from=builder /app/server ./server

# Entrypoint script
COPY docker/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# SQLite DB directory (override via docker-compose volume)
RUN mkdir -p /app/db

ENV NODE_ENV=production
ENV DATABASE_URL=/app/db/eatom.db
ENV NUXT_PUBLIC_APP_URL=http://localhost:3000
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
