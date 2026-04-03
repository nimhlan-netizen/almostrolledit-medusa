FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app/.medusa/server
ENV NODE_ENV=production
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/.medusa/server/package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY --from=build /app/.medusa/server ./
EXPOSE 9000
CMD ["sh", "-c", "npx medusa db:migrate && npm run seed && npm run start"]
