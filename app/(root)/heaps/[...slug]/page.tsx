

/*
jonobase by @jonchius
/app/(root)/heaps/[...slug]/page.tsx
the heaps (stacked custom sections) page
*/

import OpusList from "@/components/opus/opus-list"
import { getBase, getHeap, getList } from "@/sanity/actions"
import { HeapProps } from "@/sanity/myprops"
import { Sect, Span } from "@/components/base/html/main"
import { PortableText } from "@portabletext/react"
import ScrollToTop from "@/components/base/util/ttop"

export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({params}: any) {

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
    const promises = myHeap.lists.map(async (list: any) => {        
      const listObject = await getList(list.slug)          
      return listObject
    })

    const collections = await Promise.all(promises)    
    return collections

  }

  const heapLists = await getHeapLists()

  const HeapApex = () => {
    return (
      <h2 className={`heap-apex uppercase text-lg md:text-2xl`}>        
        <Span>{myHeap.title}</Span>
      </h2>
    )
  }
  
  return (
    
    <main id="main" tabIndex={-1}>

      <ScrollToTop />

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
              <h3 className={`heap-list-title uppercase text-center md:text-left text-3xl md:text-4xl font-bold`}>{heapList.title}</h3>
              <p className={`heap-list-sub text-lg md:text-xl text-center md:text-left font-sans`}>{heapList.subtitle}</p>
              <div className={`mb-5`}><PortableText value={heapList.precontent} /></div>
              <OpusList opera={heapList.posts} />
              <div className={`mt-5`}><PortableText value={heapList.postcontent} /></div>
            </Sect>
          )
        })}        

      </>          
    
    </main>

  )

}