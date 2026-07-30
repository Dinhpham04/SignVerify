FROM node:26-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:26-alpine AS build
WORKDIR /app

ARG API_PROXY_TARGET=http://api:8080
ENV API_PROXY_TARGET=$API_PROXY_TARGET
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
RUN npm run build

FROM node:26-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache curl

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

EXPOSE 3000
USER node
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl --fail --silent --show-error http://127.0.0.1:3000/healthz > /dev/null || exit 1
CMD ["node", "server.js"]
