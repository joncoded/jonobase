/*
jonobase by @jonchius
/app/(root)/(home)/page.tsx
the root homepage (adjustable in sanity back-end via the "base" entry in the "home heap" field) 
*/

import { headers } from "next/headers"
import { getBase } from "@/sanity/actions"
import Heap from "../heaps/[slug]/page"

export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata() {

  const hostname = await headers().get("x-forwarded-host") || headers().get("host") || ""
  const myBase = await getBase(hostname)

  return {
    title: myBase.title,
    description: myBase.tagline,
    keywords: myBase.metakeywords
  }
}

export default async function Home() {

  const hostname = await headers().get("x-forwarded-host") || headers().get("host") || ""  
  const myBase = await getBase(hostname)

  const { homeheap } = myBase
  
  return (

    <Heap params={{ slug: homeheap }} />

  )

}