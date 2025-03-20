
/*
jonobase by @jonchius
/app/(root)/(posts)/[join]/[kind]/[slug]/page.tsx
the post (single article) template
*/

import BlockContent from "@sanity/block-content-to-react"

import { getBase, getPost, getPostAdjacent } from "@/sanity/actions"
import { serializers } from "@/components/base/util/rich"
import { Sect } from "@/components/base/html/main"

import { colors, text  } from "@/app/config"

import ScrollToTop from "@/components/base/util/ttop"
import None from "@/components/base/util/none"

import Apex from "@/components/base/html/main-apex"
import PostHead from "@/components/post/post-head"
import PostLink from "@/components/post/post-link"
import PostNook from "@/components/post/post-nook"
import PostTurn from "@/components/post/post-turn"

export const revalidate = 60
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({params}: any) {

  const { join, kind, slug } = await params  
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}
  const post = await getPost({slug})       

  if (post) {
    return {
      title: `${post.title} - ${kind} -  ${join} @ ${myBase?.title}`,
      description: `${post.subtitle}`,
      keywords: `${post.nooks}`,
    }
  } 

}

export default async function Main({ params } : any) {

  const { join, kind, slug } = await params    
  const post = await getPost({slug})  

  if (!post) return <None />  

  const { image, link: myLink, content, extra, nooks, date: myDate } = post 

  const newerInKind = await getPostAdjacent(myDate, 'newer', join, kind)
  const olderInKind = await getPostAdjacent(myDate, 'older', join, kind)  
  const newerInJoin = await getPostAdjacent(myDate, 'newer', join, kind)  
  const olderInJoin = await getPostAdjacent(myDate, 'older', join, kind) 
  const newerInOmni = await getPostAdjacent(myDate, 'newer', "", "") 
  const olderInOmni = await getPostAdjacent(myDate, 'older', "", "")  
  
  return (

    <main id="main" tabIndex={-1}>     

      <ScrollToTop /> 

      <Sect id="post-apex">
        <Apex first={join} second={kind} post={true} />
      </Sect>

      <Sect id="post-head" className={`${image ? `py-0` : `!bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 dark:text-white py-5`}`} bgImage={image}> 
        <PostHead post={post} />
        { myLink && <PostLink link={myLink} />}        
      </Sect>

      <Sect id="post-main" className={`border-t font-serif dark:border-t-gray-600 prose-a:${colors.link} dark:prose-a:${colors.darkLink} hover:prose-a:${colors.linkHover} dark:hover:prose-a:${colors.darkLinkHover} hover:prose-a:underline 
        prose-headings:font-sans prose-headings:font-bold prose-headings:mt-5 prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-xl prose-code:text-white prose-code:bg-[#23241f]`
      }>
        <BlockContent 
          blocks={content} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        /> 
      </Sect>

      { extra && <Sect id="post-xtra" className={`border-t font-serif prose-a:${colors.link} dark:prose-a:${colors.darkLink} hover:prose-a:${colors.linkHover} dark:hover:prose-a:${colors.darkLinkHover} hover:prose-a:underline 
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
      <Sect id="post-nook" className={`!bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-gray-800 dark:to-gray-900 p-5 text-md lg:text-lg`}>
        <PostNook nooks={nooks} />
      </Sect>
      }

      {(olderInKind || newerInKind) && <Sect id="post-turn-kind" className={`post-turn p-5 text-lg md:text-xl`}>
        <PostTurn newer={newerInKind ?? null} turnTitle={`in ${kind}`} older={olderInKind ?? null} />
      </Sect>}

      {(olderInJoin || newerInJoin) && <Sect id="post-turn-type" className={`post-turn p-5 bg-gray-100 dark:bg-gray-900 text-md md:text-lg`}>
        <PostTurn newer={newerInJoin ?? null} turnTitle={`in ${join}`} older={olderInJoin ?? null} />
      </Sect>}

      {(olderInOmni || newerInOmni) && <Sect id="post-turn-omni" className={`post-turn p-5 text-md md:text-lg`}>
        <PostTurn newer={newerInOmni ?? null} turnTitle={`${text['posts']}`} older={olderInOmni ?? null} />
      </Sect>}

    </main>

  )
  
}
