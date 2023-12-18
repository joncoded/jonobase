import Find from "@/components/find"
import { PortableText } from '@portabletext/react'
import { getBase, getPosts } from "@/sanity/actions"
import { HomeProps } from "@/lib/types"
import { Sect } from "@/components/main"

export const revalidate = 30

export default async function Home({ searchParams }: HomeProps) {

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

      <Sect className="bg-gradient-to-b from-sky-50 to-sky-200 p-20 drop-shadow-md">
        <HomeHead />
      </Sect>
      
      <Sect className="bg-white text-black">
        <Find filters={filters} posts={posts} urlParams={searchParams} />
      </Sect>          
    
    </main>

  )

}