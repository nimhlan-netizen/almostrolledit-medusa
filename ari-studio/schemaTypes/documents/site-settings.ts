import { defineField, defineType } from "sanity"

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [{ type: "navLink" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "seo",
      title: "Global SEO",
      type: "seo",
    }),
  ],
})
