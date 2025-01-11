
/*
jonanity by @jonchius
/app/(root)/finds/page.tsx
the finds (search) page
*/

import { getBase, getPosts } from "@/sanity/actions"
import { FindProps } from "@/lib/types"
import { Sect } from "@/components/main"
import Find from "@/components/find"
import PageTurn from "@/components/page-turn"
import { text } from "@/lib/app.config"
import ScrollToTop from "@/components/ttop"

export const revalidate = 60

export async function generateMetadata({searchParams}: any) {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  return {
    title: `${text['finds']} : ${searchParams.query ?? text['posts']} @ ${base?.title}`    
  }

}

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
    perPage: '1000000'
  })

  return (
    
    <main id="main" tabIndex={-1}>

      <ScrollToTop />

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