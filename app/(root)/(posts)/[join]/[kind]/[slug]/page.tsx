
/*
jonobase by @joncoded (aka @jonchius)
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
import PostToc from "@/components/post/post-toc"

export const revalidate = 60

export async function generateMetadata({params}: any) {

  const headersList = await headers()
  const hostname = headersList.get("x-forwarded-host") || headersList.get("host") || ""
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

  const headersList = await headers()
  const hostname = headersList.get("x-forwarded-host") || headersList.get("host") || ""
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
  const [newerInKind, olderInKind, newerInOmni, olderInOmni] = await Promise.all([    
    getPostAdjacent(hostname, myDate, 'newer', "", kind),
    getPostAdjacent(hostname, myDate, 'older', "", kind),
    getPostAdjacent(hostname, myDate, 'newer', "", ""),
    getPostAdjacent(hostname, myDate, 'older', "", ""),
  ])
  
  return (

    <main id="main" tabIndex={-1}>

      <ScrollToTop />
      <PostToc title={post.title} />

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

      {(olderInKind || newerInKind) && <Sect id="post-turn-kind" className={`p-5 text-lg md:text-xl bg-gray-100 dark:bg-gray-800`}>
        <PostTurn newer={newerInKind ?? null} turnTitle={`in ${kind}`} older={olderInKind ?? null} />
      </Sect>}

      {(olderInOmni || newerInOmni) && <Sect id="post-turn-omni" className={`p-5 text-md md:text-lg`}>
        <PostTurn newer={newerInOmni ?? null} turnTitle={`${text['posts']}`} older={olderInOmni ?? null} />
      </Sect>}

    </main>

  )

}
