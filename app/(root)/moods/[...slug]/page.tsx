
/*
jonanity by @joncoded
/app/(root)/moods/page.tsx
the moods (lists of "posts from mood (tag) X") page
*/

import PostList from "@/components/post-list"
import { getBase, getPostsByMood } from "@/sanity/actions"
import { ListProps } from "@/lib/types"
import { Sect, Span } from "@/components/main"
import { text } from "@/lib/app.config"
import PageTurn from "@/components/page-turn"

export const revalidate = 30

export default async function Main({ params, searchParams }: ListProps) {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const posts = await getPostsByMood ({params, searchParams})  

  const unpagedPosts = await getPostsByMood({ params, searchParams: {
    ...searchParams, page: '1', perPage: '1000000'
  }})

  return (
    
    <main id="main" tabIndex={-1}>

      <Sect>
        <h2 className={`mood-apex uppercase font-sans text-lg md:text-2xl`}>
          <Span>{text['moods']}</Span>
          <Span ariaHidden={true}> / </Span>
          <Span className={`text-sm md:text-lg`}>
            {params.slug ?? ''}
          </Span> 
        </h2>
      </Sect>

      <Sect className={`mood-list bg-zinc-100 dark:bg-zinc-800 py-10`}>
        <PostList posts={posts} />
      </Sect>    

      <PageTurn base={base} posts={unpagedPosts} searchParams={searchParams} />     
    
    </main>

  )

}