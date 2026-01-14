/*
jonobase by @joncoded (aka @jonchius)
/app/(root)/(home)/page.tsx
the root homepage (adjustable in sanity back-end via the "base" entry in the "home heap" field) 
*/

import { headers } from "next/headers"
import { getBase } from "@/sanity/actions"
import Heap from "../heaps/[slug]/page"

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata() {

  const headersList = await headers()
  const hostname = headersList.get("x-forwarded-host") || headersList.get("host") || ""
  const myBase = await getBase(hostname)

  return {
    title: myBase.title + " - " + myBase.tagline,
    description: myBase.tagline,
    keywords: myBase.metakeywords
  }
}

export default async function Home() {

  const headersList = await headers()
  const hostname = headersList.get("x-forwarded-host") || headersList.get("host") || ""
  const myBase = await getBase(hostname)

  const { homeheap } = myBase
  
  return (

    <Heap params={{ slug: homeheap }} />

  )

}