/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { structureTool } from "sanity/structure"
import {visionTool} from "@sanity/vision"
import {defineConfig} from "sanity"
import {codeInput} from "@sanity/code-input"
import {table} from "@sanity/table"

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from "./sanity/env"
import { schemas } from "./sanity/schemas"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: { types: schemas },
  plugins: [
    codeInput(),    
    table(),
    structureTool(), 
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
