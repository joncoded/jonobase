import Find from "@/components/find"
import { getBase, getPosts } from "@/sanity/actions"
import { HomeProps } from "@/lib/types"
import { Sect } from "@/components/main"
export const revalidate = 30

export default async function Home({ searchParams }: HomeProps) {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const { filters } = base || [] 
  const { intro } = base || ''
  const { tagline } = base || ''

  const posts = await getPosts({
    query: searchParams?.query || '', 
    category: searchParams?.category || '', 
    page: '1'
  })  

  const HomeHead = () => {
    return (
      <div className="w-full flex flex-col gap-5 text-center">
        <h1 className="font-sans font-bold text-5xl sm:text-6xl lg:text-7xl">{intro}</h1>
        <p className="font-serif text-xl sm:text-3xl">{tagline}</p>
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