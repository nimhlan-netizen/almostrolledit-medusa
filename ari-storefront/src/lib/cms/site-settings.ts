export type SiteSettingsDocument = {
  brandName?: string
  footerDescription?: string
  footerTagline?: string
  navLinks?: Array<{
    label: string
    href: string
  }>
  socialLinks?: Array<{
    name: string
    href: string
  }>
  seo?: {
    siteTitle?: string
    siteDescription?: string
    imageUrl?: string
  }
}

export type SiteSettings = {
  brandName: string
  footerDescription: string
  footerTagline: string
  navLinks: Array<{
    label: string
    href: string
  }>
  socialLinks: Array<{
    name: string
    href: string
  }>
  seo: {
    siteTitle: string
    siteDescription: string
    imageUrl?: string
  }
}

const defaultSiteSettings: SiteSettings = {
  brandName: "Almost Rolled It",
  footerDescription:
    "Built on Medusa so products, discounts, and checkout can grow back in without carrying the overhead of the old stack.",
  footerTagline: "Built lean. Ready to scale.",
  navLinks: [
    { label: "Store", href: "/store" },
    { label: "Account", href: "/account" },
    { label: "Cart", href: "/cart" },
  ],
  socialLinks: [
    { name: "YouTube", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "TikTok", href: "#" },
  ],
  seo: {
    siteTitle: "Almost Rolled It",
    siteDescription:
      "A lean Medusa storefront for Almost Rolled It with trail content, partner codes, and merch ready to scale back up.",
  },
}

export const normalizeSiteSettings = (
  doc?: SiteSettingsDocument
): SiteSettings => {
  return {
    brandName: doc?.brandName || defaultSiteSettings.brandName,
    footerDescription:
      doc?.footerDescription || defaultSiteSettings.footerDescription,
    footerTagline: doc?.footerTagline || defaultSiteSettings.footerTagline,
    navLinks:
      doc?.navLinks && doc.navLinks.length > 0
        ? doc.navLinks
        : defaultSiteSettings.navLinks,
    socialLinks:
      doc?.socialLinks && doc.socialLinks.length > 0
        ? doc.socialLinks
        : defaultSiteSettings.socialLinks,
    seo: {
      ...defaultSiteSettings.seo,
      ...doc?.seo,
    },
  }
}

export const defaultSiteSettingsContent = defaultSiteSettings
