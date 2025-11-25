/*
jonobase by @jonchius
/app/components/list/list.tsx
a list, a horizontal section of a heap (i.e. "back-end" driven page of a list of posts)
*/

import { headers } from "next/headers"
import Link from "next/link"
import BlockContent from "@sanity/block-content-to-react"
import { getPosts, getPostsRandomly } from "@/sanity/actions"
import { styling } from "@/app/config"
import { serializers } from "../base/util/rich"
import { Sect } from "../base/html/main"
import ListLine from "./list-line"

export default async function List({ heapList, preLoadedPosts }: any) {

  const hostname = await headers().get("x-forwarded-host") || headers().get("host") || ""
  
  // Use preloaded posts if available, otherwise fetch them
  let posts = preLoadedPosts || []

  if (!preLoadedPosts && heapList?.querybuilder) {
    // Fallback: fetch posts if not preloaded
    const {
      query = '*',
      join,
      kind,
      nook,
      count,
      order,
      ascDesc
    } = heapList.querybuilder || {}

    posts = order === 'random'
      ? await getPostsRandomly({domain: hostname, query, join, kind, nook }, count ?? 1) || []
      : await getPosts({
          domain: hostname,
          query: query ?? '*',
          join,
          kind,
          nook,
          perPage: count?.toString() ?? '1',
          order: order as 'date' | 'title',
          ascDesc: ascDesc as 'asc' | 'desc' | undefined
        }) || [];
  }

  // get list data from the list object
  const {
    _id,
    slug,
    title,
    bgColor,
    showtitle,
    subtitle,
    showsubtitle,
    precontent,
    showposts,
    postcontent,
    showjoin,
    showkind,
    showlink,
    cta
  } = heapList

  // display the list
  return (
    <Sect
      key={_id}
      className={`list-sect-${slug}
        py-5 bg-${bgColor === 'white'
          ? 'white dark:bg-black'
          : `${bgColor}-300 dark:bg-${bgColor}-800`
        }`}
    >

      <div id={`list-head-${slug}`} className={`text-center`}>

        {showtitle &&
          <h2 id={`list-name-${slug}`} className={`text-center mb-5 text-3xl md:text-4xl font-bold uppercase`}>{title}</h2>
        }

        {showsubtitle &&
          <p id={`list-subt-${slug}`} className={`text-center my-5 text-lg md:text-xl`}>{subtitle}</p>
        }

      </div>

      {precontent && <div id={`list-prec-${slug}`} className={`text-center my-5 ${styling['list-text']}`}>
        <BlockContent
          blocks={precontent}
          serializers={serializers}
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        />
      </div>}

      {showposts &&

        <ListLine posts={posts} showJoin={showjoin} showKind={showkind} />

      }

      {postcontent && <div id={`list-posc-${slug}`} className={`text-center my-5 ${styling['list-text']}`}>
        <BlockContent
          blocks={postcontent}
          serializers={serializers}
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        />
      </div>}

      {showlink && cta.url &&
        <div id={`list-link-${slug}`} className={`${styling['list-text-ctas-wrap']}`}>
          <p>
            <Link
              className={`${styling.button} text-center`}
              href={cta.url}
              target={cta.url.startsWith('http') ? '_blank' : '_self'}
            >
              {cta.title}
            </Link>
          </p>
        </div>
      }

    </Sect>

  )

}