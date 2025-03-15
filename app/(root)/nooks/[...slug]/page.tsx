
/*
jonobase by @jonchius
/app/(root)/nooks/[...slug]/page.tsx
the nooks (lists of "posts from nook (tag) X") page
(replacement for nooks)
*/

import { getBase, getOpera, getOperaCount } from "@/sanity/actions"
import { NookProps } from "@/sanity/myprops"
import { text, styling } from "@/lib/app.config"
import { Sect, Span } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import OpusList from "@/components/opus/opus-list"
import Paginate from "@/components/base/util/pagi"

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

export default async function Main({ params, searchParams }: NookProps) {

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}

  const { slug } = params
  const { page, perPage } = searchParams

  const opera = await getOpera({
    type: '',
    nook: slug,
    page,
    perPage   
  })  

  const totalOperaCount = await getOperaCount({ 
    type: '',
    nook: slug,
    page,
    perPage   
  })

  return (
    
    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect className={`nook-apex ${styling['main-apex']}`}>
        <h2 className={`nook-apex-head uppercase text-lg md:text-2xl`}>
          <Span>{text['nooks']}</Span>
          <Span ariaHidden={true}> / </Span>
          <Span className={`text-sm md:text-lg`}>
            {params.slug ? decodeURI(params.slug) : ''}
          </Span> 
        </h2>
        <p className={`nook-apex-tail text-sm md:text-lg mt-0`}>{text['nooks explained']}</p>
      </Sect>

      <Sect className={`nook-list`}>
        <OpusList opera={opera} showType={true} showKind={true} />
      </Sect>    

      <Paginate myBase={myBase} totalOperaCount={totalOperaCount} searchParams={searchParams} />     
    
    </main>

  )

}