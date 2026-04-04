import { defineField, defineType } from "sanity"

export const instagramReelType = defineType({
  name: "instagramReel",
  title: "Instagram Reel",
  type: "document",
  fields: [
    defineField({
      name: "externalId",
      title: "External ID",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Imported Title",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "overrideTitle",
      title: "Override Title",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 6,
      readOnly: true,
    }),
    defineField({
      name: "permalink",
      title: "Permalink",
      type: "url",
      readOnly: true,
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "mediaProductType",
      title: "Media Product Type",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "mediaUrl",
      title: "Media URL",
      type: "url",
      readOnly: true,
    }),
    defineField({
      name: "thumbnailUrl",
      title: "Thumbnail URL",
      type: "url",
      readOnly: true,
    }),
    defineField({
      name: "overrideThumbnailUrl",
      title: "Override Thumbnail URL",
      type: "url",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "visible",
      title: "Visible",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "overrideTitle",
      subtitle: "publishedAt",
      fallbackTitle: "title",
    },
    prepare(selection) {
      return {
        title: selection.title || selection.fallbackTitle || "Instagram Reel",
        subtitle: selection.subtitle,
      }
    },
  },
})
