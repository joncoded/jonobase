import { getHeap, getList } from "@/sanity/actions"
import { PortableText } from "@portabletext/react"
import PostList from "@/components/post-list"
import { HeapProps } from "@/lib/types"
import { Sect } from "@/components/main"
import { text } from "@/lib/app.config"

export const revalidate = 30

export default async function Main({ params }: HeapProps) {

  const heap = await getHeap(params.slug)

  const getHeapLists = async () => {
    const promises = heap.lists.map(async (list: any) => {        
      const listObject = await getList(list.slug)          
      return listObject
    })

    const collections = await Promise.all(promises)    
    return collections

  }

  const heapLists = await getHeapLists()
  
  return (
    
    <main id="main" tabIndex={-1}>

      <Sect className="bg-white text-black">
        <h2 className="font-sans text-sm md:text-2xl">{text['heaps']} / {params.slug}</h2>        
        {heapLists && heapLists.map(heapList => 
          <div key={heapList._id}>
            <h3>{heapList.title}</h3>
            <p>{heapList.subtitle}</p>
            <PortableText value={heapList.precontent} />
            <PostList posts={heapList.posts} />
            <PortableText value={heapList.postcontent} />
          </div>
        )}
      </Sect>          
    
    </main>

  )

}