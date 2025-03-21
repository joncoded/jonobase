
/*
jonobase by @jonchius
/app/(root)/(posts)/[join]/page.tsx
the join (the first level category list of posts)
*/

import { getBase, getPosts, getPostsCount } from "@/sanity/actions"
import { styling } from "@/app/config"
import { Sect } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import None from "@/components/base/util/none"
import Apex from "@/components/base/html/main-apex"
import Paginate from "@/components/base/util/pagi"
import ListLine from "@/components/list/list-line"

export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({params}: any) {

  const { join } = await params
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}

  if (join) {
    return {
      title: `${join} @ ${myBase?.title}`
    }
  }

}

export default async function Main({ params, searchParams } : any) {
  
  const { join } = await params
  const { page, perPage } = searchParams
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)  
  const myPosts = await getPosts({join, page: page, perPage: perPage || myBase.perPage})
  const myPostsCount = await getPostsCount({ join })
  
  if (!myPosts || myPosts.length === 0) return <None />

  return (

    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect id="join-apex" className={`${styling['main-apex']}`}>
        <Apex first={join} />
      </Sect>

      <Sect id="join-main">
        <ListLine posts={myPosts} showJoin={false} showKind={true} />    
      </Sect>

      <Paginate myBase={myBase} totalPostsCount={myPostsCount} searchParams={searchParams} />
      
    </main>

  )

}