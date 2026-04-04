import { defineField, defineType } from "sanity"

export const ctaLinkType = defineType({
  name: "ctaLink",
  title: "CTA Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      description: "Use internal paths like /store or anchors like #latest.",
      validation: (rule) => rule.required(),
    }),
  ],
})
