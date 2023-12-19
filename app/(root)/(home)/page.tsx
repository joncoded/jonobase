import Find from "@/components/find"
import { PortableText } from '@portabletext/react'
import { getBase, getPosts } from "@/sanity/actions"
import { FindProps } from "@/lib/types"
import { Sect } from "@/components/main"

export const revalidate = 10

export async function generateMetadata() {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)   

  console.log(base)
  
  return {
    title: base.title,
    description: base.tagline,
    keywords: base.metakeywords  
  }
}

export default async function Home({ searchParams }: FindProps) {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const { filters } = base || [] 
  const { intro } = base || ''

  const posts = await getPosts({
    query: searchParams?.query || '', 
    category: searchParams?.category || '', 
    page: '1'
  })  

  const HomeHead = () => {
    return (
      <div className={`w-full flex flex-col gap-5 text-center`}>
        <div className={`
          max-w-screen-lg mx-auto font-sans 
          prose prose-h2:text-5xl prose-h2:mb-5 prose-p:text-3xl`
        }>
          <PortableText value={intro} />
        </div>
      </div>
    )
  }

  return (
    
    <main>

      <Sect className="bg-gradient-to-b from-sky-50 to-sky-200 py-5 sm:py-10 xl:py-20 drop-shadow-md">
        <HomeHead />
      </Sect>
      
      <Sect className="bg-white text-black">
        <Find filters={filters} posts={posts} urlParams={searchParams} />
      </Sect>          
    
    </main>

  )

}