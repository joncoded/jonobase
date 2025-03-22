
/*
jonobase by @jonchius
/sanity/schema.ts
custom schema types
*/


import { type SchemaTypeDefinition } from "sanity"
import tube from "./schemas/tube.schema"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tube],
}