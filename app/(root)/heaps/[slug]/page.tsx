
/*
jonobase by @jonchius
/app/(root)/heaps/[slug]/page.tsx
the heaps (stacked custom sections) page
*/

import { HeapProps, ListProps } from "@/sanity/myprops"
import { getBase, getHeap, getList } from "@/sanity/actions"
import { Sect } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import Apex from "@/components/base/html/main-apex"
import List from "@/components/list/list"
import None from "@/components/base/util/none"

export const revalidate = 10

export async function generateMetadata({ params }: HeapProps) {

  const { slug } = await params  
  const [myBase, myHeap] = await Promise.all([
    getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!),
    getHeap(slug)
  ]) 
  
  if (myHeap) {
    return {
      title: `${decodeURIComponent(myHeap?.title)} @ ${myBase?.title}`
    }
  }

}

export default async function Heap({ params }: HeapProps) {

  const { slug } = await params
  const myHeap = await getHeap(slug)

  if (!myHeap) return <None />

  const getHeapLists = async () => {
  
    try {
      const collections = await Promise.all(
        myHeap.lists.map((list: ListProps) => getList(list.slug))
      )      
      return collections
    } catch (error) {
      console.error("Failed to fetch heap lists:", error)
      return []
    }
  }  

  const heapLists = await getHeapLists()  

  if (!heapLists) return <None />

  return (
    
    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      {myHeap.showapex === true && 
        <Sect id="heap-apex">        
          <Apex first={myHeap.title} />
        </Sect>
      }
            
      {heapLists && heapLists.map(heapList =>            
        <List key={heapList._id} heapList={heapList} />
      )}        

    </main>

  )

}