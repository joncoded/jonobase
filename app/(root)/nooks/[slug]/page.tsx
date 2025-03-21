
/*
jonobase by @jonchius
/app/(root)/nooks/[slug]/page.tsx
the nooks (lists of "posts from nook (tag) X") page
(replacement for nooks)
*/

import { getBase, getPosts, getPostsCount } from "@/sanity/actions"
import { NookProps } from "@/sanity/myprops"
import { text, styling } from "@/app/config"
import { Sect } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import Apex from "@/components/base/html/main-apex"
import ListLine from "@/components/list/list-line"
import Paginate from "@/components/base/util/pagi"

export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({params}: any) {

  const { slug } = await params  
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}  
  
  return {
    title: `#${decodeURIComponent(slug)} @ ${myBase?.title}`,
    description: `${decodeURIComponent(slug)} on ${myBase?.title}`    
  }
  
}

export default async function Main({ params, searchParams }: NookProps) {

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}

  const { slug } = await params
  const { page, perPage } = searchParams

  const posts = await getPosts({        
    nook: slug,
    page,
    perPage   
  })  

  const totalPostsCount = await getPostsCount({     
    nook: slug,
    page    
  })  

  return (
    
    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect id="nook-apex" className={`${styling['main-apex']}`}>
        <Apex first={text['nooks']} second={decodeURIComponent(slug!)} />        
      </Sect>

      <Sect id="nook-list" className={`nook-list`}>
        <ListLine posts={posts} showJoin={true} showKind={true} />
      </Sect>    

      <Paginate myBase={myBase} totalPostsCount={totalPostsCount} searchParams={searchParams} />     
    
    </main>

  )

}