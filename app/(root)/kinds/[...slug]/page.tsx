
/*
jonanity by @joncoded
/app/(root)/kinds/page.tsx
the kinds (lists of "posts from category X") page
*/

import PostList from "@/components/post-list"
import { getPostsByKind } from "@/sanity/actions"
import { KindProps } from "@/lib/types"
import { Sect, Span } from "@/components/main"
import { text } from "@/lib/app.config"

export const revalidate = 30

export default async function Main({ params }: KindProps) {

  const posts = await getPostsByKind ({
    slug: params.slug,
    page: '1'
  })  

  return (
    
    <main id="main" tabIndex={-1}>

      <Sect>
        <h2 className={`uppercase font-sans text-lg md:text-2xl`}>
          <Span>{text['kinds']}</Span>
          <Span ariaHidden={true}> / </Span>
          <Span className={`text-sm md:text-lg`}>
            {params.slug ?? ''}
          </Span> 
        </h2>
      </Sect>

      <Sect className={`bg-zinc-100 dark:bg-zinc-800 py-10`}>
        <PostList posts={posts} />
      </Sect>          
    
    </main>

  )

}