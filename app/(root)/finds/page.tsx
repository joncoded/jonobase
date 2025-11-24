
/*
jonobase by @jonchius
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

  const hostname = await headers().get("x-forwarded-host") || headers().get("host") || ""
  const myBase = await getBase(hostname)

  return {
    title: `${text['finds']} : ${searchParams.query ?? text['posts']} @ ${myBase?.title}`    
  }

}

export default async function Main({ searchParams }: FindProps) {

  const hostname = await headers().get("x-forwarded-host") || headers().get("host") || ""
  const myBase = await getBase(hostname)

  const posts = await getPosts({       
    query: searchParams?.query || '',
    type: searchParams?.type || '',      
    kind: searchParams?.kind || '',     
    nook: searchParams?.nook || '', 
    page: searchParams?.page || '1',
    perPage: searchParams?.perPage || myBase.perPage || '6'
  })  
  
  const totalPostsCount = await getPostsCount({    
    type: searchParams?.type || '', 
    query: searchParams?.query || '', 
    kind: searchParams?.kind || '', 
    nook: searchParams?.nook || ''
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