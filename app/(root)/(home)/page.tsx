
/*
jonanity by @joncoded
/app/(root)/(home)/page.tsx
the homepage
*/

import { getBase, getList, getPosts } from "@/sanity/actions"
import { PortableText } from '@portabletext/react'
import { FindProps } from "@/lib/types"
import { Sect } from "@/components/main"
import PostList from '@/components/post-list'

export const revalidate = 60

export async function generateMetadata() {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)   
    
  return {
    title: base.title,
    description: base.tagline,
    keywords: base.metakeywords  
  }
}

export default async function Home({ searchParams }: FindProps) {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)
  
  /* get featured posts */
  const { featured : featuredList } = base || ''
  
  let featuredData = []
  if (featuredList !== null) {
    featuredData = await getList(featuredList)    
  }  
  const featuredPosts = featuredData.posts || undefined

  /* get regular posts */
  const { intro } = base || ''  
  const { perPage } = base || '6'  

  const posts = await getPosts({
    query: searchParams?.query || '', 
    kind: searchParams?.kind || '', 
    page: searchParams?.page || '1',
    perPage: searchParams?.perPage || perPage    
  }) 

  const HomeHead = () => {
    return (
      <div className={`w-full flex flex-col gap-5 text-center`}>
        <div className={`
          w-3/4 md:w-full max-w-screen-lg mx-auto prose-h2:font-sans prose-p:font-serif
          prose prose-h2:text-4xl md:prose-h2:text-5xl prose-h2:mb-5 prose-p:text-2xl md:prose-p:text-3xl dark:prose-headings:!text-white dark:prose-p:!text-white dark:prose-strong:!text-white`
        }>
          <PortableText value={intro} />
        </div>
      </div>
    )
  }

  return (
    
    <main id="main" tabIndex={-1}>

      <Sect className="bg-gradient-to-b from-sky-50 dark:from-sky-800 to-sky-200 dark:to-sky-900 py-5 sm:py-10 drop-shadow-md">
        <HomeHead />
      </Sect>
      
      <Sect className="bg-white dark:bg-gray-900 text-black dark:text-white">
        {featuredPosts && <PostList posts={featuredPosts} />}
        <PostList posts={posts} />        
      </Sect>
    
    </main>

  )

}