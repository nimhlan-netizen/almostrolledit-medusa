import { HomepageContent } from "@lib/cms/homepage"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function AlmostRolledItHome({
  region,
  products,
  content,
}: {
  region: HttpTypes.StoreRegion
  products: HttpTypes.StoreProduct[]
  content: HomepageContent
}) {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src={content.hero.backgroundImageUrl}
            alt="Off-road rig on a rocky trail"
            className="h-full w-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,102,0,0.3),transparent_35%),linear-gradient(180deg,rgba(10,10,10,0.35),rgba(10,10,10,0.92))]" />
        </div>

        <div className="content-container relative flex min-h-[82vh] flex-col justify-center gap-10 py-24">
          <div className="max-w-4xl">
            <Text className="mb-5 text-xs uppercase tracking-[0.35em] text-[#ff6b1a]">
              {content.hero.eyebrow}
            </Text>
            <Heading
              level="h1"
              className="max-w-4xl font-[Impact] text-6xl uppercase leading-[0.88] tracking-[0.03em] text-white md:text-8xl"
            >
              {content.hero.title}
            </Heading>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              {content.hero.description}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <LocalizedClientLink
              href={content.hero.primaryCta.href}
              className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#ff5a1f] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#ff7a45]"
            >
              {content.hero.primaryCta.label}
            </LocalizedClientLink>
            <a
              href={content.hero.secondaryCta.href}
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/40 hover:bg-white/10"
            >
              {content.hero.secondaryCta.label}
            </a>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {content.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-[#ff6b1a] hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="latest" className="content-container py-20">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Text className="text-xs uppercase tracking-[0.35em] text-[#ff6b1a]">
              Content and builds
            </Text>
            <Heading
              level="h2"
              className="mt-3 font-[Impact] text-5xl uppercase tracking-[0.03em] text-white"
            >
              Latest Drops
            </Heading>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/65">
            This section is now sourced from Sanity. Latest cards can come from
            synced Instagram Reels or manual editorial entries.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {content.featuredCards.map((item) => (
            <a
              key={item.title}
              href={item.href || "#"}
              target={item.href ? "_blank" : undefined}
              rel={item.href ? "noreferrer" : undefined}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5"
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-[#ff5a1f] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                  {item.type}
                </div>
              </div>
              <div className="space-y-3 p-6">
                <Text className="text-xs uppercase tracking-[0.2em] text-white/45">
                  {item.date}
                </Text>
                <h3 className="text-2xl uppercase leading-tight text-white">
                  {item.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="content-container grid gap-8 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <Text className="text-xs uppercase tracking-[0.35em] text-[#ff6b1a]">
              Partner discounts
            </Text>
            <Heading
              level="h2"
              className="font-[Impact] text-5xl uppercase tracking-[0.03em] text-white"
            >
              Keep the lights on without the Shopify overhead
            </Heading>
            <p className="max-w-lg text-sm leading-7 text-white/65">
              These codes can stay visible even while merch sales are scaled
              back. They keep the site useful, support partner relationships,
              and give you a lightweight revenue path during the rebuild.
            </p>
          </div>
          <div className="grid gap-4">
            {content.partnerDiscounts.map((item) => (
              <div
                key={item.brand}
                className="rounded-[24px] border border-white/10 bg-[#111111] p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-2xl uppercase text-white">
                      {item.brand}
                    </h3>
                    <p className="mt-2 text-sm text-white/60">{item.detail}</p>
                  </div>
                  <div className="rounded-full border border-[#ff6b1a]/50 bg-[#ff6b1a]/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#ff8b4d]">
                    {item.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-container py-20">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Text className="text-xs uppercase tracking-[0.35em] text-[#ff6b1a]">
              {content.storefront.eyebrow}
            </Text>
            <Heading
              level="h2"
              className="mt-3 font-[Impact] text-5xl uppercase tracking-[0.03em] text-white"
            >
              {content.storefront.title}
            </Heading>
          </div>
          <LocalizedClientLink
            href={content.storefront.browseAllHref}
            className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff8b4d] transition hover:text-white"
          >
            {content.storefront.browseAllLabel}
          </LocalizedClientLink>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5"
              >
                <ProductPreview product={product} region={region} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-white/20 bg-white/[0.02] p-10">
            <h3 className="text-2xl uppercase text-white">
              {content.storefront.emptyStateTitle}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
              {content.storefront.emptyStateDescription}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
