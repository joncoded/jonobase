
/*
jonanity by @joncoded
/app/(root)/moods/page.tsx
the moods (lists of "posts from mood (tag) X") page
*/

import PostList from "@/components/post-list"
import { getPostsByMood } from "@/sanity/actions"
import { MoodProps } from "@/lib/types"
import { Sect, Span } from "@/components/main"
import { text } from "@/lib/app.config"

export const revalidate = 30

export default async function Main({ params }: MoodProps) {

  const posts = await getPostsByMood ({
    slug: params.slug || '',
    page: '1'
  })  

  return (
    
    <main id="main" tabIndex={-1}>

      <Sect>
        <h2 className={`uppercase font-sans text-lg md:text-2xl`}>
          <Span>{text['moods']}</Span>
          <Span ariaHidden={true}> / </Span>
          <Span className={`text-sm md:text-lg`}>
            {params.slug ?? ''}
          </Span> 
        </h2>
      </Sect>

      <Sect className={`bg-zinc-100 dark:bg-zinc-800`}>
        <PostList posts={posts} />
      </Sect>         
    
    </main>

  )

}