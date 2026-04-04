export type CmsLink = {
  label: string
  href: string
}

export type SocialLink = {
  name: string
  href: string
}

export type FeaturedCard = {
  title: string
  type: string
  date: string
  imageUrl: string
  href?: string
}

export type PartnerDiscount = {
  brand: string
  code: string
  detail: string
}

export type HomepageDocument = {
  hero?: {
    eyebrow?: string
    title?: string
    description?: string
    backgroundImageUrl?: string
    primaryCta?: CmsLink
    secondaryCta?: CmsLink
  }
  socialLinks?: SocialLink[]
  featuredCards?: FeaturedCard[]
  partnerDiscounts?: PartnerDiscount[]
  storefront?: {
    eyebrow?: string
    title?: string
    browseAllLabel?: string
    browseAllHref?: string
    emptyStateTitle?: string
    emptyStateDescription?: string
  }
}

export type HomepageContent = Required<
  Pick<HomepageDocument, "socialLinks" | "featuredCards" | "partnerDiscounts">
> & {
  hero: Required<NonNullable<HomepageDocument["hero"]>>
  storefront: Required<NonNullable<HomepageDocument["storefront"]>>
}

const defaultContent: HomepageContent = {
  hero: {
    eyebrow: "Off-road films, trail gear, and the next build chapter",
    title: "Almost Rolled It",
    description:
      "The storefront is rebuilding on a leaner stack while Shopify gets phased out. The stories stay here, the gear gets managed in Medusa, and the next version is built to scale back up when the traction is there.",
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1800",
    primaryCta: {
      label: "Shop Current Gear",
      href: "/store",
    },
    secondaryCta: {
      label: "See Latest Drops",
      href: "#latest",
    },
  },
  socialLinks: [
    { name: "YouTube", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "TikTok", href: "#" },
  ],
  featuredCards: [
    {
      title: "Moab Hell's Revenge Full Run",
      type: "Video",
      date: "New episode",
      imageUrl:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "New Suspension Setup Test",
      type: "Build",
      date: "Shop notes",
      imageUrl:
        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Recovery Gear That Actually Earned Its Keep",
      type: "Guide",
      date: "Field tested",
      imageUrl:
        "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1200",
    },
  ],
  partnerDiscounts: [
    {
      brand: "Rugged Radios",
      code: "CRAWL15",
      detail: "Trail comms and chase support gear",
    },
    {
      brand: "Baja Designs",
      code: "TRAIL10",
      detail: "Lighting for night runs and camp setup",
    },
    {
      brand: "Factor 55",
      code: "RECOVER10",
      detail: "Recovery hardware worth trusting on real terrain",
    },
  ],
  storefront: {
    eyebrow: "Merch and product catalog",
    title: "Storefront",
    browseAllLabel: "Browse all products",
    browseAllHref: "/store",
    emptyStateTitle: "Merch is paused while the new stack comes online",
    emptyStateDescription:
      "Once products are added in the Medusa admin, they will show up here automatically. For now, this keeps the storefront live without forcing you to keep Shopify running.",
  },
}

export const normalizeHomepageDocument = (
  doc?: HomepageDocument
): HomepageContent => {
  const validFeaturedCards =
    doc?.featuredCards?.filter((card) => card.title && card.type && card.date && card.imageUrl) ||
    []

  return {
    hero: {
      ...defaultContent.hero,
      ...doc?.hero,
      primaryCta: {
        ...defaultContent.hero.primaryCta,
        ...doc?.hero?.primaryCta,
      },
      secondaryCta: {
        ...defaultContent.hero.secondaryCta,
        ...doc?.hero?.secondaryCta,
      },
    },
    socialLinks:
      doc?.socialLinks && doc.socialLinks.length > 0
        ? doc.socialLinks
        : defaultContent.socialLinks,
    featuredCards:
      validFeaturedCards.length > 0
        ? validFeaturedCards
        : defaultContent.featuredCards,
    partnerDiscounts:
      doc?.partnerDiscounts && doc.partnerDiscounts.length > 0
        ? doc.partnerDiscounts
        : defaultContent.partnerDiscounts,
    storefront: {
      ...defaultContent.storefront,
      ...doc?.storefront,
    },
  }
}

export const defaultHomepageContent = defaultContent
