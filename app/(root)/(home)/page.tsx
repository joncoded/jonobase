import Find from "@/components/find"
import { getPosts, getList } from "@/sanity/actions"
import ItemCard from "@/components/item-card"

export const revalidate = 30

interface Props {
  searchParams: { [key: string] : string | undefined }
}

export default async function Home({ searchParams }: Props) {

  const posts = await getPosts({
    query: searchParams?.query || '', 
    category: searchParams?.category || '', 
    page: '1'
  })

  const list = await getList()  

  return (
    <main className="w-full flex flex-col justify-center mx-auto">
      <section className="w-full bg-gradient-to-b from-sky-50 to-sky-200 p-5">
        <div className="max-w-screen-2xl mx-auto">
          <Find posts={posts} urlParams={searchParams} />
        </div>
      </section> 
      
      {list.map((item: any) => (
        <section key={item._id} className="w-full bg-emerald-200 p-5 flex flex-col justify-center items-center">
          <div className="max-w-screen-2xl mx-auto my-10">
            <h2 className="text-5xl text-center">{item.title}</h2>
            <div className="mt-5 w-full grid grid-cols-1 md:grid-cols-2 justify-center gap-5 sm:justify-start">
            {item.posts.map((post: any) => (
              <ItemCard key={post._id} post={post} />
            ))}
            </div>
          </div>
        </section>
      ))}    
      
    </main>
  )

}