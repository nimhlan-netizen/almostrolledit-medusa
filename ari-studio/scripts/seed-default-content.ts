import { createClient } from "@sanity/client"

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || "production"
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = process.env.SANITY_STUDIO_API_VERSION || "2025-02-19"

if (!projectId || !token) {
  throw new Error(
    "Set SANITY_STUDIO_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding Sanity content."
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

async function main() {
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: "Almost Rolled It",
    footerDescription:
      "Built on Medusa so products, discounts, and checkout can grow back in without carrying the overhead of the old stack.",
    footerTagline: "Built lean. Ready to scale.",
    navLinks: [
      { _key: "store", _type: "navLink", label: "Store", href: "/store" },
      {
        _key: "account",
        _type: "navLink",
        label: "Account",
        href: "/account",
      },
      { _key: "cart", _type: "navLink", label: "Cart", href: "/cart" },
    ],
    socialLinks: [
      {
        _key: "youtube",
        _type: "socialLink",
        name: "YouTube",
        href: "https://youtube.com",
      },
      {
        _key: "instagram",
        _type: "socialLink",
        name: "Instagram",
        href: "https://instagram.com",
      },
      {
        _key: "tiktok",
        _type: "socialLink",
        name: "TikTok",
        href: "https://tiktok.com",
      },
    ],
    seo: {
      _type: "seo",
      siteTitle: "Almost Rolled It",
      siteDescription:
        "A lean Medusa storefront for Almost Rolled It with trail content, partner codes, and merch ready to scale back up.",
    },
  })

  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    hero: {
      _type: "object",
      eyebrow: "Off-road films, trail gear, and the next build chapter",
      title: "Almost Rolled It",
      description:
        "The storefront is rebuilding on a leaner stack while Shopify gets phased out. The stories stay here, the gear gets managed in Medusa, and the next version is built to scale back up when the traction is there.",
      primaryCta: {
        _type: "ctaLink",
        label: "Shop Current Gear",
        href: "/store",
      },
      secondaryCta: {
        _type: "ctaLink",
        label: "See Latest Drops",
        href: "#latest",
      },
    },
    socialLinks: [
      {
        _key: "youtube",
        _type: "socialLink",
        name: "YouTube",
        href: "https://youtube.com",
      },
      {
        _key: "instagram",
        _type: "socialLink",
        name: "Instagram",
        href: "https://instagram.com",
      },
      {
        _key: "tiktok",
        _type: "socialLink",
        name: "TikTok",
        href: "https://tiktok.com",
      },
    ],
    featuredCards: [
      {
        _key: "manual-1",
        _type: "featuredCard",
        title: "Moab Hell's Revenge Full Run",
        type: "Video",
        date: "New episode",
      },
      {
        _key: "manual-2",
        _type: "featuredCard",
        title: "New Suspension Setup Test",
        type: "Build",
        date: "Shop notes",
      },
      {
        _key: "manual-3",
        _type: "featuredCard",
        title: "Recovery Gear That Actually Earned Its Keep",
        type: "Guide",
        date: "Field tested",
      },
    ],
    partnerDiscounts: [
      {
        _key: "rugged",
        _type: "partnerDiscount",
        brand: "Rugged Radios",
        code: "CRAWL15",
        detail: "Trail comms and chase support gear",
      },
      {
        _key: "baja",
        _type: "partnerDiscount",
        brand: "Baja Designs",
        code: "TRAIL10",
        detail: "Lighting for night runs and camp setup",
      },
      {
        _key: "factor",
        _type: "partnerDiscount",
        brand: "Factor 55",
        code: "RECOVER10",
        detail: "Recovery hardware worth trusting on real terrain",
      },
    ],
    storefront: {
      _type: "object",
      eyebrow: "Merch and product catalog",
      title: "Storefront",
      browseAllLabel: "Browse all products",
      browseAllHref: "/store",
      emptyStateTitle: "Merch is paused while the new stack comes online",
      emptyStateDescription:
        "Once products are added in the Medusa admin, they will show up here automatically. For now, this keeps the storefront live without forcing you to keep Shopify running.",
    },
    seo: {
      _type: "seo",
      title: "Almost Rolled It",
      description:
        "A lean Medusa storefront for Almost Rolled It with trail content, partner codes, and merch ready to scale back up.",
    },
  })

  console.log("Seeded siteSettings and homepage documents.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
