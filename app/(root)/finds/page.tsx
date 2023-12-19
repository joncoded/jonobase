import Find from "@/components/find"
import { getBase, getPosts } from "@/sanity/actions"
import { FindProps } from "@/lib/types"
import { Sect } from "@/components/main"

export const revalidate = 30

export default async function Main({ searchParams }: FindProps) {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const { filters } = base || []   

  const posts = await getPosts({
    query: searchParams?.query || '', 
    category: searchParams?.category || '', 
    page: '1'
  })  

  return (
    
    <main>

      <Sect className="bg-white text-black">
        <Find filters={filters} posts={posts} urlParams={searchParams} />
      </Sect>          
    
    </main>

  )

}