
/*
jonobase by @jonchius
/app/betas/(home)/page.tsx
a prototype for a future homepage
*/

import { getBase } from "@/sanity/actions"
import Heap from "../heaps/[...slug]/page"

export const revalidate = 60
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata() {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)   
    
  return {
    title: base.title,
    description: base.tagline,
    keywords: base.metakeywords  
  }

}

export default async function Home() {

  return (
    
    <Heap params={{slug: 'home'}} />

  )

}