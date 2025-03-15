
/*
jonobase by @jonchius
/app/(root)/heaps/[...slug]/page.tsx
the heaps (stacked custom sections) page
*/

import { HeapProps, ListProps } from "@/sanity/myprops"
import { getBase, getHeap, getList } from "@/sanity/actions"
import { Sect } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import Apex from "@/components/base/html/main-apex"
import HeapSect from "@/components/heap/heap-sect"


export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({ params }: HeapProps) {

  const { slug } = params  
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}  
  const myHeap = await getHeap(slug) || {}  
  
  if (myHeap) {
    return {
      title: `${decodeURIComponent(myHeap?.title)} @ ${myBase?.title}`
    }
  }

}

export default async function Heap({ params }: HeapProps) {

  const myHeap = await getHeap(params.slug)

  const getHeapLists = async () => {
    const promises = myHeap.lists.map(async (list: ListProps) => {        
      const listObject = await getList(list.slug)          
      return listObject
    })

    const collections = await Promise.all(promises)    
    return collections

  }

  const heapLists = await getHeapLists()
  
  return (
    
    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      {myHeap.showapex && <Sect id="heap-apex">
        
        <Apex first={myHeap.title} />

      </Sect>}
            
      {heapLists && heapLists.map(heapList => {           
        return <HeapSect key={heapList._id} heapList={heapList} />
      })}        

    </main>

  )

}