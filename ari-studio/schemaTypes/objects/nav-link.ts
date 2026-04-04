import { defineField, defineType } from "sanity"

export const navLinkType = defineType({
  name: "navLink",
  title: "Navigation Link",
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
      description: "Use internal paths like /store, /account, or /cart.",
      validation: (rule) => rule.required(),
    }),
  ],
})
