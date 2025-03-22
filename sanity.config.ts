/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { structureTool } from "sanity/structure"
import {visionTool} from "@sanity/vision"
import {defineConfig} from "sanity"
import {codeInput} from "@sanity/code-input"
import {table} from "@sanity/table"
import {apiVersion, dataset, projectId} from "./sanity/env"
import { schemas } from "./sanity/schemas"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemas },
  plugins: [
    codeInput(),    
    table(),
    structureTool(), 
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
