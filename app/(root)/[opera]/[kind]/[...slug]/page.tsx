
/*
jonobase by @jonchius
/app/(root)/[opera]/[kind]/[...slug]/page.tsx
the opera (single article) template
*/

import BlockContent from "@sanity/block-content-to-react"

import { getBase, getOpus, getOpusAdjacent } from "@/sanity/actions"
import { serializers } from "@/components/base/util/rich"
import { Sect } from "@/components/base/html/main"

import { colors } from "@/lib/app.config"

import ScrollToTop from "@/components/base/util/ttop"
import None from "@/components/base/util/none"

import Apex from "@/components/base/html/main-apex"
import OpusHead from "@/components/opus/opus-head"
import OpusLink from "@/components/opus/opus-link"
import OpusNook from "@/components/opus/opus-nook"
import OpusTurn from "@/components/opus/opus-turn"

export const revalidate = 60
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({params}: any) {

  const { opera, kind, slug } = params  
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}
  const opus = await getOpus({type: opera.slice(0, -1), kind, slug})       

  if (opus) {
    return {
      title: `${opus.title} @ ${myBase?.title}`,
      description: `${opus.subtitle}`,
      keywords: `${opus.nooks}`,
    }
  } 

}

export default async function Main({ params } : any) {

  const { opera, kind, slug } = params    
  const myJoin = opera.slice(0, -1)
  const opus = await getOpus({type: myJoin, kind, slug})  

  if (!opus) return <None />  

  const { _type, image, link: myLink, content, extra, nooks, date: myDate } = opus 
  
  const newerInType = await getOpusAdjacent(myJoin, myDate, "newer")  
  const olderInType = await getOpusAdjacent(myJoin, myDate, "older")
  const newerInKind = await getOpusAdjacent(myJoin, myDate, "newer", kind)
  const olderInKind = await getOpusAdjacent(myJoin, myDate, "older", kind)  

  return (

    <main id="main" tabIndex={-1}>     

      <ScrollToTop /> 

      <Sect id="opus-apex">
        <Apex first={opera} second={kind} opus={true} />
      </Sect>

      <Sect id="opus-head" className={`${image ? `py-0` : `!bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 dark:text-white py-5`}`} bgImage={image}> 
        <OpusHead opus={opus} />
        { myLink && <OpusLink link={myLink} />}        
      </Sect>

      <Sect id="opus-main" className={`border-t font-serif dark:border-t-gray-600 prose-a:${colors.link} dark:prose-a:${colors.darkLink} hover:prose-a:${colors.linkHover} dark:hover:prose-a:${colors.darkLinkHover} hover:prose-a:underline 
        prose-headings:font-sans prose-headings:font-bold prose-headings:mt-5 prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-xl prose-code:text-white prose-code:bg-[#23241f]`
      }>
        <BlockContent 
          blocks={content} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        /> 
      </Sect>

      { extra && <Sect id="opus-xtra" className={`border-t font-serif prose-a:${colors.link} dark:prose-a:${colors.darkLink} hover:prose-a:${colors.linkHover} dark:hover:prose-a:${colors.darkLinkHover} hover:prose-a:underline 
        prose-headings:font-sans prose-headings:font-bold prose-headings:mt-5 prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-xl prose-code:text-white prose-code:bg-[#23241f]`
      }>
        
        <BlockContent 
          blocks={extra} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        /> 
      </Sect>}

      { nooks && 
      <Sect id="opus-nook" className={`opus-nook !bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-gray-800 dark:to-gray-900 p-5 text-md lg:text-lg`}>
        <OpusNook nooks={nooks} />
      </Sect>
      }

      {(olderInKind || newerInKind) && <Sect id="opus-turn-kind" className={`opus-turn p-5 text-lg md:text-xl font-sans`}>
        <OpusTurn newer={newerInKind ?? null} turnTitle={`in ${kind}`} older={olderInKind ?? null} />
      </Sect>}

      {(olderInType || newerInType) && <Sect id="opus-turn-type" className={`opus-turn border-1 p-5 bg-gray-100 dark:bg-gray-900 text-md md:text-lg font-sans`}>
        <OpusTurn newer={newerInType ?? null} turnTitle={`in ${_type}s`} older={olderInType ?? null} />
      </Sect>}

    </main>

  )
  
}
