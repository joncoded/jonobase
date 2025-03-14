
/*
jonobase by @jonchius
/app/(root)/(home)/page.tsx
the root homepage
*/

import { PortableText } from '@portabletext/react'
import Link from "next/link"
import { getBase, getOpera } from "@/sanity/actions"
import { FindProps } from "@/sanity/myprops"
import { text } from "@/lib/app.config"
import { Sect } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import OpusList from '@/components/opus/opus-list'

export const revalidate = 60
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata() {

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)   
    
  return {
    title: myBase.title,
    description: myBase.tagline,
    keywords: myBase.metakeywords  
  }
}

export default async function Home({ searchParams }: FindProps) {

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)
  const { intro } = myBase || ''  
  const { filters } = myBase || []

  /* get featured posts */
  // const { featured : featuredList } = myBase || ''
  
  // let featuredData = []
  // if (featuredList !== null) {
  //   featuredData = await getList(featuredList)    
  // }  
  // const featuredPosts = featuredData.posts || undefined

  /* get latest posts */
  const posts = await getOpera({ type: 'post'})  
  
  const HomeHead = () => {
    return (
      <div className={`w-full flex flex-col gap-5 text-center`}>
        <div className={`
          w-3/4 md:w-full max-w-screen-lg mx-auto 
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

      <Sect className={`home-head bg-gradient-to-b from-green-200 dark:from-green-900 to-green-300 dark:to-green-800 py-5 sm:py-10 drop-shadow-md`}>
        <HomeHead />
      </Sect>
      
      {/* the featured posts as defined by the "featured posts" field in the "base" content model */}
      {/* { featuredPosts && 
        <Sect className={`home-featured bg-amber-300 dark:bg-black py-5`}>
          <h2 className={`mb-10 font-bold uppercase text-4xl md:text-5xl text-center`}>
          {myBase.featuredPostsTitle}
          </h2>
          <OpusList opera={featuredPosts} /> 
        </Sect> 
      } */}

      {/* the latest content from the "post" content model */}
      { posts && 
        <Sect className={`home-post py-10`}>
          {myBase.latestPostsTitle && 
            <h2 className={`mb-10 font-bold uppercase text-4xl md:text-5xl text-center`}>
              {myBase.latestPostsTitle} 
            </h2>
          }          
          <OpusList opera={posts} showKind={true} />
          <div className={`mt-10 text-center`}>
            <Link href={`/finds`} className="button">{text['see more posts']}</Link>
          </div>
        </Sect> 
      }

      {/* horizontal sections of "posts" that have "nooks" as defined by the "filters" field in the "base" content model */}
      { filters && filters.map((section: any, index: number) => {

        return (
          <Sect key={`home-${section}`} className={`home-sect home-sect-${section} ${index % 2 == 0 && `bg-gray-300 dark:bg-gray-700`} pt-5 pb-10`}>
            <h2 id={`home-sect-${index}`} className={`mb-10 font-bold uppercase text-4xl md:text-5xl text-center`}>
              <span aria-hidden="true">[</span> {section} <span aria-hidden="true">]</span>
            </h2>
            <OpusList opera={homeContent[index]} />            
          </Sect>)    
        })

      }
    
    </main>

  )

}