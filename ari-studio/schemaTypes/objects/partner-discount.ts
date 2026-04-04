import { defineField, defineType } from "sanity"

export const partnerDiscountType = defineType({
  name: "partnerDiscount",
  title: "Partner Discount",
  type: "object",
  fields: [
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
})
