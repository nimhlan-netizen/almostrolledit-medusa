import test from "node:test"
import assert from "node:assert/strict"

import { normalizeHomepageDocument } from "./homepage"

test("normalizeHomepageDocument returns branded defaults when Sanity content is missing", () => {
  const content = normalizeHomepageDocument(undefined)

  assert.equal(content.hero.title, "Almost Rolled It")
  assert.equal(content.hero.primaryCta.label, "Shop Current Gear")
  assert.equal(content.socialLinks.length, 3)
  assert.equal(content.partnerDiscounts.length, 3)
  assert.equal(content.storefront.emptyStateTitle, "Merch is paused while the new stack comes online")
})

test("normalizeHomepageDocument merges Sanity values over defaults", () => {
  const content = normalizeHomepageDocument({
    hero: {
      eyebrow: "Custom eyebrow",
      title: "Custom title",
      description: "Custom description",
      backgroundImageUrl: "https://cdn.example.com/hero.jpg",
      primaryCta: {
        label: "Primary",
        href: "/store",
      },
      secondaryCta: {
        label: "Secondary",
        href: "#drops",
      },
    },
    socialLinks: [
      {
        name: "Instagram",
        href: "https://instagram.com/almostrolledit",
      },
    ],
    featuredCards: [
      {
        title: "Synced card",
        type: "Video",
        date: "April 2026",
        imageUrl: "https://cdn.example.com/card.jpg",
        href: "https://instagram.com/reel/abc",
      },
    ],
  })

  assert.equal(content.hero.eyebrow, "Custom eyebrow")
  assert.equal(content.hero.title, "Custom title")
  assert.equal(content.hero.backgroundImageUrl, "https://cdn.example.com/hero.jpg")
  assert.equal(content.socialLinks.length, 1)
  assert.equal(content.socialLinks[0].href, "https://instagram.com/almostrolledit")
  assert.equal(content.featuredCards[0].title, "Synced card")
  assert.equal(content.featuredCards[0].href, "https://instagram.com/reel/abc")
  assert.equal(content.partnerDiscounts.length, 3)
})
