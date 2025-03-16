
/*
jonobase by @jonchius
/app/(root)/(home)/page.tsx
the root homepage (adjustable in sanity back-end via the "base" entry in the "home heap" field) 
*/

import { getBase } from "@/sanity/actions"
import ScrollToTop from "@/components/base/util/ttop"
import Heap from "../heaps/[slug]/page"

export const revalidate = 10

export async function generateMetadata() {

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  return {
    title: myBase.title,
    description: myBase.tagline,
    keywords: myBase.metakeywords
  }
}

export default async function Home() {

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const { homeheap } = myBase
  
  return (

    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Heap params={{ slug: homeheap }} />

    </main>

  )

}