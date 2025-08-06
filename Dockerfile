FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && \
    pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ===buid prod===
FROM node:22-alpine AS build-prod
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN corepack enable && \
    pnpm install --prod --frozen-lockfile && \
    pnpm store prune

# ===production===
FROM node:22-alpine AS production
WORKDIR /app

COPY --from=build-prod /app/dist ./dist
COPY --from=build-prod /app/node_modules ./node_modules
COPY --from=build-prod /app/package.json ./package.json


CMD ["sh", "-c", "npm run migration:run-prod && node dist/src/main.js"]


