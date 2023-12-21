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
    kind: searchParams?.kind || '', 
    page: '1',
    perPage: searchParams?.perPage || '6'
  })  

  return (
    
    <main id="main" tabIndex={-1}>

      <Sect className="bg-white text-black">
        <Find filters={filters} posts={posts} urlParams={searchParams} />
      </Sect>          
    
    </main>

  )

}