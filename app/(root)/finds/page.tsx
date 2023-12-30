
/*
jonanity by @joncoded
/app/(root)/finds/page.tsx
the finds (search) page
*/

import { getBase, getPosts } from "@/sanity/actions"
import { FindProps } from "@/lib/types"
import { Sect } from "@/components/main"
import Find from "@/components/find"
import PageTurn from "@/components/page-turn"

export const revalidate = 60

export default async function Main({ searchParams }: FindProps) {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const { filters } = base || []  
  const { showFilters } = base || false

  const posts = await getPosts({
    query: searchParams?.query || '', 
    kind: searchParams?.kind || '', 
    page: searchParams?.page || '1',
    perPage: searchParams?.perPage || base.perPage || '6'
  })  

  /* get all posts */
  const unpagedPosts = await getPosts({
    query: searchParams?.query || '', 
    kind: searchParams?.kind || '', 
    page: '1',
    perPage: '100000'
  })

  return (
    
    <main id="main" tabIndex={-1}>

      <Sect className={`dark:bg-gray-900`}>
        <Find 
          filters={filters} 
          showFilters={showFilters} 
          posts={posts} 
          unpagedPosts={unpagedPosts} 
          urlParams={searchParams} 
        />
        <PageTurn 
          base={base} 
          posts={unpagedPosts} 
          searchParams={searchParams} 
        />
      </Sect>          
    
    </main>

  )

}