
/*
jonobase by @joncoded (aka @jonchius)
/app/(root)/finds/page.tsx
the finds (search) page
*/

import { headers } from "next/headers"
import { getBase, getPosts, getPostsCount } from "@/sanity/actions"
import { FindProps } from "@/sanity/myprops"
import { text } from "@/app/config"
import { Sect } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import Find from "@/components/find/find"
import Paginate from "@/components/base/util/pagi"

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({searchParams}: any) {

  const rSearchParams = await searchParams
  const headersList = await headers()
  const hostname = headersList.get("x-forwarded-host") || headersList.get("host") || ""
  const myBase = await getBase(hostname)

  return {
    title: `${text['finds']} : ${rSearchParams.query ?? text['posts']} @ ${myBase?.title}`    
  }

}

export default async function Main({ searchParams }: FindProps) {

  const headersList = await headers()
  const hostname = headersList.get("x-forwarded-host") || headersList.get("host") || ""
  const myBase = await getBase(hostname)
  const rSearchParams = await searchParams

  const posts = await getPosts({       
    domain: hostname,
    query: rSearchParams?.query || '',
    type: rSearchParams?.type || '',      
    kind: rSearchParams?.kind || '',     
    nook: rSearchParams?.nook || '', 
    page: rSearchParams?.page || '1',
    perPage: rSearchParams?.perPage || myBase.perPage || '6'
  })  
  
  const totalPostsCount = await getPostsCount({    
    domain: hostname, 
    type: rSearchParams?.type || '', 
    query: rSearchParams?.query || '', 
    kind: rSearchParams?.kind || '', 
    nook: rSearchParams?.nook || ''
  })

  return (
    
    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect>
        <Find                     
          posts={posts} 
          totalPostsCount={totalPostsCount} 
          urlParams={searchParams} 
        />
        <Paginate 
          myBase={myBase} 
          totalPostsCount={totalPostsCount} 
          searchParams={searchParams} 
        />
      </Sect>          
    
    </main>

  )

}