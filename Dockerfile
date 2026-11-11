# syntax=docker/dockerfile:1

# ---------- Stage 1: pre-render the static site ----------
FROM node:24-alpine AS build
WORKDIR /app

# Dependencies first, so this layer stays cached until the lockfile changes.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG NUXT_PUBLIC_SITE_URL=https://adrienitts.com
ENV NUXT_PUBLIC_SITE_URL=$NUXT_PUBLIC_SITE_URL
RUN npm run generate

# ---------- Stage 2: serve the files with Caddy (~20 MB image) ----------
FROM caddy:2-alpine
COPY --from=build /app/.output/public /srv
COPY docker/Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
