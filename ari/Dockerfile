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
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY tsconfig.json ./tsconfig.json
RUN npm ci --omit=dev --no-audit --no-fund
COPY --from=build /app/.medusa ./.medusa
COPY --from=build /app/medusa-config.ts ./medusa-config.ts
COPY --from=build /app/instrumentation.ts ./instrumentation.ts
COPY --from=build /app/src ./src
EXPOSE 9000
CMD ["sh", "-c", "npx medusa db:migrate && npm run start"]
