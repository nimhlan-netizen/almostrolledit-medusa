import { defineField, defineType } from "sanity"

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "ctaLink",
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "ctaLink",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Homepage Social Links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "featuredCards",
      title: "Manual Featured Cards",
      description: "Used when synced Instagram Reels are unavailable or when you want editorial fallbacks.",
      type: "array",
      of: [{ type: "featuredCard" }],
    }),
    defineField({
      name: "partnerDiscounts",
      title: "Partner Discounts",
      type: "array",
      of: [{ type: "partnerDiscount" }],
    }),
    defineField({
      name: "storefront",
      title: "Storefront Callout",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "browseAllLabel",
          title: "Browse Label",
          type: "string",
        }),
        defineField({
          name: "browseAllHref",
          title: "Browse Href",
          type: "string",
        }),
        defineField({
          name: "emptyStateTitle",
          title: "Empty State Title",
          type: "string",
        }),
        defineField({
          name: "emptyStateDescription",
          title: "Empty State Description",
          type: "text",
          rows: 4,
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Homepage SEO",
      type: "seo",
    }),
  ],
})
