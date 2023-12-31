
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
import PageTurn from "@/components/page-turn"
import { text } from "@/lib/app.config"

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
  const { intro } = base || ''  

  /* get featured posts */
  const { featured : featuredList } = base || ''
  
  let featuredData = []
  if (featuredList !== null) {
    featuredData = await getList(featuredList)    
  }  
  const featuredPosts = featuredData.posts || undefined

  /* get posts by page and perPage */
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

      <Sect className={`home-head bg-gradient-to-b from-green-200 dark:from-green-800 to-green-300 dark:to-green-900 py-5 sm:py-10 drop-shadow-md`}>
        <HomeHead />
      </Sect>
      
      { featuredPosts && 
      <Sect className={`home-featured bg-amber-300 dark:bg-yellow-700 py-5`}>
        <h2 className={`mb-10 font-sans font-bold uppercase text-4xl md:text-5xl text-center`}>
          {text['featured posts']}
        </h2>
        <PostList posts={featuredPosts} /> 
      </Sect> 
      }

      <Sect className={`home-post py-5`}>
        <h2 className={`mb-10 font-sans font-bold uppercase text-4xl md:text-5xl text-center`}>
          {text['latest posts']}
        </h2>
        <PostList posts={posts} />
      </Sect>

      <PageTurn base={base} posts={unpagedPosts} searchParams={searchParams} />
    
    </main>

  )

}