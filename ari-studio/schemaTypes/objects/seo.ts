import { defineField, defineType } from "sanity"

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Open Graph Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
})
