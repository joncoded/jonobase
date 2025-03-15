
/*
jonobase by @jonchius
/app/(root)/finds/page.tsx
the finds (search) page
*/

import { getBase, getOpera, getOperaCount } from "@/sanity/actions"
import { FindProps } from "@/sanity/myprops"
import { text } from "@/lib/app.config"
import { Sect } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import Find from "@/components/find/find"
import Paginate from "@/components/base/util/pagi"

export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({searchParams}: any) {

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  return {
    title: `${text['finds']} : ${searchParams.query ?? text['posts']} @ ${myBase?.title}`    
  }

}

export default async function Main({ searchParams }: FindProps) {

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const opera = await getOpera({       
    query: searchParams?.query || '',
    type: searchParams?.type || '',      
    kind: searchParams?.kind || '',     
    nook: searchParams?.nook || '', 
    page: searchParams?.page || '1',
    perPage: searchParams?.perPage || myBase.perPage || '6'
  })  
  
  const totalOperaCount = await getOperaCount({    
    type: searchParams?.type || '', 
    query: searchParams?.query || '', 
    kind: searchParams?.kind || '', 
    nook: searchParams?.nook || ''
  })

  return (
    
    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect>
        <Find                     
          opera={opera} 
          totalOperaCount={totalOperaCount} 
          urlParams={searchParams} 
        />
        <Paginate 
          myBase={myBase} 
          totalOperaCount={totalOperaCount} 
          searchParams={searchParams} 
        />
      </Sect>          
    
    </main>

  )

}