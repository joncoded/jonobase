

/*
jonanity by @joncoded
/app/(root)/heaps/page.tsx
the heaps (stacked custom sections) page
*/

import PostList from "@/components/post-list"
import { getHeap, getList } from "@/sanity/actions"
import { HeapProps } from "@/lib/types"
import { Sect, Span } from "@/components/main"
import { PortableText } from "@portabletext/react"
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

  const HeapApex = () => {
    return (
      <h2 className={`heap-apex uppercase font-sans text-lg md:text-2xl`}>
        <Span>{text['heaps']}</Span>
        <Span ariaHidden={true}> / </Span>
        <Span>{heap.title}</Span>
      </h2>
    )
  }
  
  return (
    
    <main id="main" tabIndex={-1}>

      <Sect className={`heap-wrap bg-white text-black`}>
        
        <HeapApex />

      </Sect>
        
      <>

        {heapLists && heapLists.map(heapList => {           
          return (
            <Sect 
              key={heapList._id} 
              className={`heap-list-${heapList.slug} 
                py-5 bg-${heapList.bgColor === 'white' 
                  ? 'white dark:bg-black' 
                  : `${heapList.bgColor}-300 dark:bg-${heapList.bgColor}-800`
                }`}
            >
              <h3 className={`heap-list-title text-xl md:text-4xl font-sans font-bold`}>{heapList.title}</h3>
              <p className={`heap-list-sub text-lg md:text-xl font-sans`}>{heapList.subtitle}</p>
              <PortableText value={heapList.precontent} />
              <PostList posts={heapList.posts} />
              <PortableText value={heapList.postcontent} />
            </Sect>
          )
        })}        

      </>          
    
    </main>

  )

}