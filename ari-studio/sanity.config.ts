import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"

import { schemaTypes } from "./schemaTypes"
import { deskStructure, singletonDocumentActions } from "./structure"

export default defineConfig({
  name: "default",
  title: "Almost Rolled It Studio",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "demo1234",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  basePath: "/",
  plugins: [deskTool({ structure: deskStructure }), visionTool()],
  document: {
    actions: singletonDocumentActions,
  },
  schema: {
    types: schemaTypes,
  },
})
