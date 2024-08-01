
/*
jonanity by @joncoded
/app/(root)/(home)/page.tsx
the root homepage
*/

import { getBase, getList, getPosts } from "@/sanity/actions"
import { PortableText } from '@portabletext/react'
import { FindProps } from "@/lib/types"
import { Sect } from "@/components/main"
import PostList from '@/components/post-list'
import Link from "next/link"
import { text } from "@/lib/app.config"
import ScrollToTop from "@/components/ttop"

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
  const { filters } = base || []

  /* get featured posts */
  const { featured : featuredList } = base || ''
  
  let featuredData = []
  if (featuredList !== null) {
    featuredData = await getList(featuredList)    
  }  
  const featuredPosts = featuredData.posts || undefined

  /* get latest posts */
  const posts = await getPosts({
    query: searchParams?.query || '', 
    kind: searchParams?.kind || '', 
    page: searchParams?.page || '1', 
    perPage: searchParams?.perPage 
  })  

  /* get specialized posts */
  let homeContent: any[] = []

  const contentPromises = filters?.map(async (filter: any) => {
    const sectionContent = await getPosts({
      query: filter,
      kind: '',
      page: '1',
      perPage: base.perPage
    })
    return sectionContent
  })
    
  homeContent = await Promise.all(contentPromises || [])
  
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

      <ScrollToTop />

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

      { posts && <Sect className={`home-post pt-5 pb-10`}>
          <h2 className={`mb-10 font-sans font-bold uppercase text-4xl md:text-5xl text-center`}>
            {text['latest posts']}
          </h2>
          <PostList posts={posts} />
          <div className={`mt-10 text-center`}>
            <Link href={`/finds`} className="button">{text['see more posts']}</Link>
          </div>
        </Sect> 
      }

      { filters && filters.map((section: any, index: number) => {

        return (
          <Sect key={`home-${section}`} className={`home-sect home-sect-${section} ${index % 2 == 0 && `bg-gray-300 dark:bg-gray-700`} pt-5 pb-10`}>
            <h2 id={`home-sect-${index}`} className={`mb-10 font-sans font-bold uppercase text-4xl md:text-5xl text-center`}>
              {section}
            </h2>
            <PostList posts={homeContent[index]} />
            <div className={`mt-10 text-center`}>
              <Link href={`/finds?query=${section}&page=2`} className="button">{text['see more posts']}</Link>
            </div>        
          </Sect>)    
        })

      }
    
    </main>

  )

}