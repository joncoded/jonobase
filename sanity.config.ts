/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { structureTool } from "sanity/structure"
import {visionTool} from "@sanity/vision"
import {defineConfig} from "sanity"
import {codeInput} from "@sanity/code-input"
import {table} from "@sanity/table"
import { schemas } from "./sanity/schemas"

const STATIC_API_VERSION = "2023-12-14"
const STATIC_DATASET = "production" // Replace with your dataset name
const STATIC_PROJECT_ID = "your-project-id" // Replace with your project ID

export default defineConfig({
  basePath: "/studio",
  projectId: STATIC_PROJECT_ID,
  dataset: STATIC_DATASET,
  schema: { types: schemas },
  plugins: [
    codeInput(),    
    table(),
    structureTool(), 
    visionTool({ defaultApiVersion: STATIC_API_VERSION }),
  ],
})
