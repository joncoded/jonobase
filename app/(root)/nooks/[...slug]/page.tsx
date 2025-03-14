
/*
jonobase by @jonchius
/app/(root)/nooks/page.tsx
the nooks (lists of "posts from nook (tag) X") page
(replacement for nooks)
*/

import OpusList from "@/components/opus/opus-list"
import { getBase, getOpera, getOperaCount } from "@/sanity/actions"
import { ListProps } from "@/sanity/myprops"
import { Sect, Span } from "@/components/base/html/main"
import { text } from "@/lib/app.config"
import ListTurn from "@/components/list/list-turn"
import ScrollToTop from "@/components/base/util/ttop"

export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'


export async function generateMetadata({params}: any) {

  const { slug } = params  
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}  
  
  return {
    title: `${decodeURIComponent(slug)} @ ${myBase?.title}`,
    description: `${decodeURIComponent(slug)} on ${myBase?.title}`    
  }
  
}

export default async function Main({ params, searchParams }: ListProps) {

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}

  const { slug } = params
  const { page, perPage } = searchParams

  const opera = await getOpera({
    type: '',
    nook: slug,
    page,
    perPage   
  })  

  /* to get total post count */
  const totalOperaCount = await getOperaCount({ 
    type: '',
    nook: slug,
    page,
    perPage   
  })

  return (
    
    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect>
        <h2 className={`nook-apex uppercase font-sans text-lg md:text-2xl`}>
          <Span>{text['nooks']}</Span>
          <Span ariaHidden={true}> / </Span>
          <Span className={`text-sm md:text-lg`}>
            {params.slug ? decodeURI(params.slug) : ''}
          </Span> 
        </h2>
      </Sect>

      <Sect className={`nook-list bg-zinc-100 dark:bg-zinc-800`}>
        <OpusList opera={opera} showType={true} showKind={true} />
      </Sect>    

      <ListTurn myBase={myBase} totalOperaCount={totalOperaCount} searchParams={searchParams} />     
    
    </main>

  )

}