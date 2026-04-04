import "server-only"

import { createClient } from "@sanity/client"

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19"

export const isSanityConfigured = Boolean(sanityProjectId && sanityDataset)

export const sanityReadClient = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: process.env.NODE_ENV === "production",
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: "published",
    })
  : null

export const getSanityWriteClient = () => {
  if (!isSanityConfigured || !process.env.SANITY_API_WRITE_TOKEN) {
    return null
  }

  return createClient({
    projectId: sanityProjectId!,
    dataset: sanityDataset!,
    apiVersion: sanityApiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
    perspective: "published",
  })
}
