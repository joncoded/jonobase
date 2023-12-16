import Find from "@/components/find"
import { getBase, getPosts } from "@/sanity/actions"
import { HomeProps } from "@/lib/types"
export const revalidate = 30

interface Props {
  searchParams: { [key: string] : string | undefined }
}

export default async function Home({ searchParams }: HomeProps) {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const { filters } = base || [] 
  const posts = await getPosts({
    query: searchParams?.query || '', 
    category: searchParams?.category || '', 
    page: '1'
  })  

  return (
    <main className="w-full flex flex-col justify-center mx-auto">
      <section className="w-full bg-gradient-to-b from-sky-50 to-sky-200 p-5">
        <div className="max-w-screen-xl mx-auto">
          <Find filters={filters} posts={posts} urlParams={searchParams} />
        </div>
      </section>      
    </main>
  )

}