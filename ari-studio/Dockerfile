FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-bookworm-slim AS build
WORKDIR /app
ARG SANITY_STUDIO_PROJECT_ID
ARG SANITY_STUDIO_DATASET
ENV SANITY_STUDIO_PROJECT_ID=$SANITY_STUDIO_PROJECT_ID
ENV SANITY_STUDIO_DATASET=$SANITY_STUDIO_DATASET
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3333
ARG SANITY_STUDIO_PROJECT_ID
ARG SANITY_STUDIO_DATASET
ENV SANITY_STUDIO_PROJECT_ID=$SANITY_STUDIO_PROJECT_ID
ENV SANITY_STUDIO_DATASET=$SANITY_STUDIO_DATASET
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3333
CMD ["./node_modules/.bin/serve", "-s", "dist", "-l", "3333"]
