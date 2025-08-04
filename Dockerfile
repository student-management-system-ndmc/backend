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

RUN pnpm install --prod --frozen-lockfile

# ===production===
FROM oven/bun:alpine AS production
WORKDIR /app

COPY --from=build-prod /app/dist ./dist

CMD ["bun", "dist/main.js"]



