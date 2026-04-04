export type InstagramMedia = {
  id: string
  caption?: string
  media_product_type?: string
  media_type?: string
  media_url?: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

export type SanityInstagramReel = {
  _id: string
  _type: "instagramReel"
  externalId: string
  title: string
  caption: string
  permalink: string
  mediaType: string
  mediaProductType: string
  mediaUrl: string
  thumbnailUrl: string
  publishedAt: string
  visible: boolean
  featured: boolean
}

const getTitleFromCaption = (caption?: string) => {
  const title = caption?.split("\n")[0]?.trim()
  return title || "Instagram Reel"
}

export const transformInstagramMediaToSanityReel = (
  media: InstagramMedia
): SanityInstagramReel => {
  return {
    _id: `instagramReel.${media.id}`,
    _type: "instagramReel",
    externalId: media.id,
    title: getTitleFromCaption(media.caption),
    caption: media.caption?.trim() || "",
    permalink: media.permalink,
    mediaType: media.media_type || "VIDEO",
    mediaProductType: media.media_product_type || "REELS",
    mediaUrl: media.media_url || "",
    thumbnailUrl: media.thumbnail_url || media.media_url || "",
    publishedAt: media.timestamp,
    visible: true,
    featured: false,
  }
}
