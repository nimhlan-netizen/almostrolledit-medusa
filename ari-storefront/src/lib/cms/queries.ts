import groq from "groq"

export const HOMEPAGE_QUERY = groq`*[_type == "homepage"][0]{
  hero{
    eyebrow,
    title,
    description,
    "backgroundImageUrl": backgroundImage.asset->url,
    primaryCta{
      label,
      href
    },
    secondaryCta{
      label,
      href
    }
  },
  socialLinks[]{
    name,
    href
  },
  featuredCards[]{
    title,
    type,
    date,
    href,
    "imageUrl": image.asset->url
  },
  partnerDiscounts[]{
    brand,
    code,
    detail
  },
  storefront{
    eyebrow,
    title,
    browseAllLabel,
    browseAllHref,
    emptyStateTitle,
    emptyStateDescription
  },
  seo{
    title,
    description,
    "imageUrl": image.asset->url
  }
}`

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  brandName,
  footerDescription,
  footerTagline,
  navLinks[]{
    label,
    href
  },
  socialLinks[]{
    name,
    href
  },
  seo{
    siteTitle,
    siteDescription,
    "imageUrl": image.asset->url
  }
}`

export const INSTAGRAM_REELS_QUERY = groq`*[_type == "instagramReel" && visible == true] | order(featured desc, publishedAt desc)[0...$limit]{
  _id,
  "title": coalesce(overrideTitle, title),
  "date": publishedAt,
  "type": "Reel",
  "href": permalink,
  "imageUrl": coalesce(overrideThumbnailUrl, thumbnailUrl, mediaUrl)
}`
