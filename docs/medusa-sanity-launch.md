# Almost Rolled It Launch Notes

## Public Surfaces
- `https://almostrolledit.com` -> storefront app (`/ari-storefront`)
- `https://api.almostrolledit.com` -> Medusa backend (`/ari`)
- `https://admin.almostrolledit.com` -> Medusa admin (backend/admin surface)
- `https://studio.almostrolledit.com` -> Sanity Studio (`/ari-studio`)

## Storefront Env
- `MEDUSA_BACKEND_URL=https://api.almostrolledit.com`
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<medusa publishable key>`
- `NEXT_PUBLIC_BASE_URL=https://almostrolledit.com`
- `NEXT_PUBLIC_SANITY_PROJECT_ID=<sanity project id>`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19`
- `SANITY_API_READ_TOKEN=<optional if dataset is private>`
- `SANITY_API_WRITE_TOKEN=<required for sync route>`
- `SANITY_REVALIDATE_SECRET=<shared secret for Sanity webhook>`
- `INSTAGRAM_GRAPH_API_VERSION=v22.0`
- `INSTAGRAM_USER_ID=<instagram business user id>`
- `INSTAGRAM_ACCESS_TOKEN=<long-lived meta graph token>`
- `INSTAGRAM_SYNC_SECRET=<shared secret for scheduled sync job>`

## Studio Env
- `SANITY_STUDIO_PROJECT_ID=<sanity project id>`
- `SANITY_STUDIO_DATASET=production`
- `SANITY_STUDIO_API_VERSION=2025-02-19`
- `SANITY_API_WRITE_TOKEN=<token used by seed script>`

## Backend Env
- `STORE_CORS=https://almostrolledit.com`
- `ADMIN_CORS=https://admin.almostrolledit.com`
- `AUTH_CORS=https://admin.almostrolledit.com,https://almostrolledit.com`

## One-Time Content Setup
1. Deploy the Studio.
2. Run `npm run seed:defaults` in [`ari-studio`](/C:/Apps/ARI%20Website/ari-studio) with the Sanity project envs set.
3. Replace default social links, copy, and upload homepage media in Sanity.

## Webhook And Sync
- Sanity publish webhook target:
  - `POST https://almostrolledit.com/api/revalidate`
  - `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
- Reel sync endpoint:
  - `POST https://almostrolledit.com/api/jobs/sync-instagram-reels`
  - `Authorization: Bearer <INSTAGRAM_SYNC_SECRET>`
- Schedule the Reel sync in Coolify or another cron runner.

## DNS Cutover
- Point `almostrolledit.com`, `api.almostrolledit.com`, `admin.almostrolledit.com`, and `studio.almostrolledit.com` at the VPS.
- Remove Shopify DNS ownership before final cutover so the apex can terminate on Coolify.
