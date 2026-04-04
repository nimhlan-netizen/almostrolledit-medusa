import "server-only"

import { getSanityWriteClient } from "./client"
import {
  transformInstagramMediaToSanityReel,
  type InstagramMedia,
} from "./instagram-reels"

type InstagramMediaResponse = {
  data: InstagramMedia[]
  paging?: {
    next?: string
  }
}

const apiVersion = process.env.INSTAGRAM_GRAPH_API_VERSION || "v22.0"

const getInstagramCredentials = () => {
  const userId = process.env.INSTAGRAM_USER_ID
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!userId || !accessToken) {
    return null
  }

  return {
    userId,
    accessToken,
  }
}

export const fetchInstagramReels = async (limit = 25) => {
  const credentials = getInstagramCredentials()

  if (!credentials) {
    throw new Error("Instagram credentials are not configured.")
  }

  const results: InstagramMedia[] = []
  let nextUrl =
    `https://graph.facebook.com/${apiVersion}/${credentials.userId}/media` +
    `?fields=id,caption,media_product_type,media_type,media_url,thumbnail_url,permalink,timestamp` +
    `&limit=${limit}&access_token=${credentials.accessToken}`

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      method: "GET",
      cache: "no-store",
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`Instagram sync failed: ${response.status} ${body}`)
    }

    const payload = (await response.json()) as InstagramMediaResponse
    results.push(...(payload.data || []))
    nextUrl = payload.paging?.next || ""
  }

  return results.filter(
    (item) =>
      item.media_product_type === "REELS" || item.media_type === "VIDEO"
  )
}

export const syncInstagramReelsToSanity = async () => {
  const client = getSanityWriteClient()

  if (!client) {
    throw new Error("Sanity write client is not configured.")
  }

  const media = await fetchInstagramReels()
  const docs = media.map(transformInstagramMediaToSanityReel)

  let transaction = client.transaction()

  for (const doc of docs) {
    transaction = transaction.createOrReplace(doc)
  }

  if (docs.length > 0) {
    await transaction.commit()
  }

  return {
    synced: docs.length,
    ids: docs.map((doc) => doc.externalId),
  }
}
