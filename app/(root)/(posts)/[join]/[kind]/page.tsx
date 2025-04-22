
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
import ListLine from "@/components/list/list-line"
import Paginate from "@/components/base/util/pagi"

export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({params}: any) {

  const { join, kind } = await params
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}

  if (kind) {
    return {
      title: `${kind} - ${join} @ ${myBase?.title}`
    }
  }

}

export default async function Main({ searchParams, params } : any) {

  const { join, kind } = await params
  const { page, perPage } = searchParams
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)
  const myPosts = await getPosts({join, kind, page, perPage: perPage || myBase.perPage, ascDesc: kind.includes('book') ? 'asc' : 'desc'})
  const myPostsCount = await getPostsCount({join, kind})

  if (!myPosts || myPosts.length === 0) return <None />

  return (

    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect id="kind-apex" className={styling['main-apex']}>
        <Apex first={join} second={kind} post={false} />
      </Sect>

      <Sect id="kind-main">
        <ListLine posts={myPosts} showJoin={false} showKind={false} />
      </Sect>

      <Paginate myBase={myBase} totalPostsCount={myPostsCount} searchParams={searchParams} />

    </main>

  )

}