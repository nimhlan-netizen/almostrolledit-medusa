import "server-only"

import { HOMEPAGE_QUERY, INSTAGRAM_REELS_QUERY, SITE_SETTINGS_QUERY } from "./queries"
import {
  defaultHomepageContent,
  normalizeHomepageDocument,
  type FeaturedCard,
  type HomepageContent,
  type HomepageDocument,
} from "./homepage"
import {
  defaultSiteSettingsContent,
  normalizeSiteSettings,
  type SiteSettings,
  type SiteSettingsDocument,
} from "./site-settings"
import { isSanityConfigured, sanityReadClient } from "./client"

const HOMEPAGE_TAG = "sanity:homepage"
const SITE_SETTINGS_TAG = "sanity:site-settings"
const INSTAGRAM_REELS_TAG = "sanity:instagram-reels"

const formatContentDate = (value?: string) => {
  if (!value) {
    return ""
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export const getHomepageContent = async (): Promise<HomepageContent> => {
  if (!isSanityConfigured || !sanityReadClient) {
    return defaultHomepageContent
  }

  const [homepage, reels] = await Promise.all([
    sanityReadClient.fetch<HomepageDocument | null>(HOMEPAGE_QUERY, {}, { next: { tags: [HOMEPAGE_TAG] } }),
    sanityReadClient.fetch<Array<{ title: string; type: string; date?: string; href?: string; imageUrl?: string }>>(
      INSTAGRAM_REELS_QUERY,
      { limit: 3 },
      { next: { tags: [INSTAGRAM_REELS_TAG] } }
    ),
  ])

  const normalized = normalizeHomepageDocument(homepage || undefined)

  const syncedCards: FeaturedCard[] = (reels || [])
    .filter((item) => item.imageUrl)
    .map((item) => ({
      title: item.title,
      type: item.type,
      date: formatContentDate(item.date),
      href: item.href,
      imageUrl: item.imageUrl!,
    }))

  return {
    ...normalized,
    featuredCards:
      syncedCards.length > 0 ? syncedCards : normalized.featuredCards,
  }
}

export const getSiteSettings = async (): Promise<SiteSettings> => {
  if (!isSanityConfigured || !sanityReadClient) {
    return defaultSiteSettingsContent
  }

  const settings = await sanityReadClient.fetch<SiteSettingsDocument | null>(
    SITE_SETTINGS_QUERY,
    {},
    { next: { tags: [SITE_SETTINGS_TAG] } }
  )

  return normalizeSiteSettings(settings || undefined)
}

export const getHomepageSeo = async () => {
  const [siteSettings, homepage] = await Promise.all([
    getSiteSettings(),
    isSanityConfigured && sanityReadClient
      ? sanityReadClient.fetch<
          | {
              seo?: {
                title?: string
                description?: string
                imageUrl?: string
              }
            }
          | null
        >(HOMEPAGE_QUERY, {}, { next: { tags: [HOMEPAGE_TAG] } })
      : Promise.resolve(null),
  ])

  return {
    title: homepage?.seo?.title || siteSettings.seo.siteTitle,
    description: homepage?.seo?.description || siteSettings.seo.siteDescription,
    imageUrl: homepage?.seo?.imageUrl || siteSettings.seo.imageUrl,
  }
}

export const cmsRevalidateTags = [
  HOMEPAGE_TAG,
  SITE_SETTINGS_TAG,
  INSTAGRAM_REELS_TAG,
]
