
/*
jonanity by @jonchius
/app/(root)/kinds/page.tsx
the kinds (lists of "posts from category X") page
*/

import PostList from "@/components/post-list"
import { getBase, getPostsByKind } from "@/sanity/actions"
import { ListProps } from "@/lib/types"
import { Sect, Span } from "@/components/main"
import { text } from "@/lib/app.config"
import PageTurn from "@/components/page-turn"
import ScrollToTop from "@/components/ttop"

export const revalidate = 30

export default async function Main({ params, searchParams }: ListProps) {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const posts = await getPostsByKind({params, searchParams})

  const unpagedPosts = await getPostsByKind({ params, searchParams: {  
    ...searchParams, page: '1', perPage: '1000000'
  }})

  return (
    
    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect>
        <h2 className={`kind-apex uppercase font-sans text-lg md:text-2xl`}>
          <Span>{text['kinds']}</Span>
          <Span ariaHidden={true}> / </Span>
          <Span className={`text-sm md:text-lg`}>
            {params.slug ?? ''}
          </Span> 
        </h2>
      </Sect>

      <Sect className={`kind-list bg-zinc-100 dark:bg-zinc-800 py-10`}>
        <PostList posts={posts} />
      </Sect>          

      <PageTurn base={base} posts={unpagedPosts} searchParams={searchParams} />
    
    </main>

  )

}