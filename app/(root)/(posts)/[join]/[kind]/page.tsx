
/*
jonobase by @jonchius
/app/(root)/(posts)/[join]/[kind]/page.tsx
the kind (the second level sub-category list of posts)
*/

import { getBase, getPosts, getPostsCount } from "@/sanity/actions"
import { styling } from "@/app/config"

import { Sect } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import None from "@/components/base/util/none"
import Apex from "@/components/base/html/main-apex"
import ListPost from "@/components/list/list-post"
import Paginate from "@/components/base/util/pagi"

export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({params}: any) {

  const { join, kind } = await params
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}

  if (kind) {
    return {
      title: `${kind} in ${join} @ ${myBase?.title}`
    }
  }

}

export default async function Main({ searchParams, params } : any) {

  const { join, kind } = await params
  const { page, perPage } = searchParams
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)    
  const myPosts = await getPosts({join, kind, page, perPage})
  const myPostsCount = await getPostsCount({join, kind, page, perPage})

  if (!myPosts || myPosts.length === 0) return <None />

  return (

    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect id="kind-apex" className={styling['main-apex']}>
        <Apex first={join} second={kind} post={false} />
      </Sect>

      <Sect id="kind-main">
        {myPosts && (
          <>
            <div
              className={`kind-list 
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center mt-0`}
            >
              {myPosts.map((post: any) => (
                <ListPost key={post._id} post={post} showJoin={false} showKind={false} />
              ))}              
            </div>
          </>
        )}        
      </Sect>

      <Paginate myBase={myBase} totalPostsCount={myPostsCount} searchParams={searchParams} />
      
    </main>

  )

}