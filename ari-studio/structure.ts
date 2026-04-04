import type { StructureResolver } from "sanity/structure"

const singletonActions = new Set(["publish", "discardChanges", "restore"])

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .views([S.view.form()])
        ),
      S.listItem()
        .title("Homepage")
        .id("homepage")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
            .views([S.view.form()])
        ),
      S.divider(),
      S.documentTypeListItem("instagramReel").title("Instagram Reels"),
    ])

export const singletonDocumentActions = (prev: any[], context: any) => {
  if (context.schemaType === "siteSettings" || context.schemaType === "homepage") {
    return prev.filter(({ action }) => action && singletonActions.has(action))
  }

  return prev
}
