
/*
jonobase by @jonchius
/app/(root)/(posts)/[join]/[kind]/[slug]/page.tsx
the post (single article) template
*/

import { headers } from "next/headers"
import BlockContent from "@sanity/block-content-to-react"
import { text, styling } from "@/app/config"
import { getBase, getPost, getPostAdjacent } from "@/sanity/actions"
import { serializers } from "@/components/base/util/rich"
import { Sect } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import None from "@/components/base/util/none"
import Apex from "@/components/base/html/main-apex"
import PostHead from "@/components/post/post-head"
import PostLink from "@/components/post/post-link"
import PostNook from "@/components/post/post-nook"
import PostTurn from "@/components/post/post-turn"

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({params}: any) {

  const hostname = await headers().get("x-forwarded-host") || headers().get("host") || ""
  const { join, kind, slug } = await params
  const myBase = await getBase(hostname) || {}
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
  
  // get post data
  const post = await getPost({ slug })

  if (!post) return (
    <main id="main">
      <None />
    </main>
  )

  // get specific post data
  const { content, extra, nooks, date: myDate } = post  

  // get page turner data
  const [newerInKind, olderInKind, newerInJoin, olderInJoin, newerInOmni, olderInOmni] = await Promise.all([    
    getPostAdjacent(myDate, 'newer', "", kind),
    getPostAdjacent(myDate, 'older', "", kind),
    getPostAdjacent(myDate, 'newer', join, ""),
    getPostAdjacent(myDate, 'older', join, ""),
    getPostAdjacent(myDate, 'newer', "", ""),
    getPostAdjacent(myDate, 'older', "", ""),
  ])
  
  return (

    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect id="post-apex">
        <Apex first={join} second={kind} post={true} />
      </Sect>

      <Sect id="post-head" className={`${post.image ? `py-0` : `${styling['post-head-sect']}`}`} {...(post.image ? { bgImage: post.image } : {})}>
        <PostHead post={post} />
        { post.link && <PostLink link={post.link} />}
      </Sect>

      <Sect id="post-main" className={`${styling['post-main-sect']}`}>
        <BlockContent
          blocks={content}
          serializers={serializers}
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        />
      </Sect>

      { extra &&
      <Sect id="post-xtra" className={`${styling['post-xtra-sect']}`}>
        <BlockContent
          blocks={extra}
          serializers={serializers}
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        />
      </Sect>
      }

      { nooks &&
      <Sect id="post-nook" className={`${styling['post-nook-sect']}`}>
        <PostNook nooks={nooks} />
      </Sect>
      }

      {(olderInKind || newerInKind) && <Sect id="post-turn-kind" className={`p-5 text-lg md:text-xl`}>
        <PostTurn newer={newerInKind ?? null} turnTitle={`in ${kind}`} older={olderInKind ?? null} />
      </Sect>}

      {(olderInJoin || newerInJoin) && <Sect id="post-turn-join" className={`p-5 bg-gray-100 dark:bg-gray-900 text-md md:text-lg`}>
        <PostTurn newer={newerInJoin ?? null} turnTitle={`in ${join}`} older={olderInJoin ?? null} />
      </Sect>}

      {(olderInOmni || newerInOmni) && <Sect id="post-turn-omni" className={`p-5 text-md md:text-lg`}>
        <PostTurn newer={newerInOmni ?? null} turnTitle={`${text['posts']}`} older={olderInOmni ?? null} />
      </Sect>}

    </main>

  )

}
