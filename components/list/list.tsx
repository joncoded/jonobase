/*
jonobase by @jonchius
/app/components/list/list.tsx
a list, a horizontal section of a heap (i.e. "back-end" driven page of a list of posts)
*/

import Link from "next/link"
import BlockContent from "@sanity/block-content-to-react"
import { getPosts, getPostsRandomly } from "@/sanity/actions"
import { styling } from "@/app/config"
import { serializers } from "../base/util/rich"
import { Sect } from "../base/html/main"
import ListLine from "./list-line"

export const revalidate = 10

export default async function List({ heapList }: any) {

  // get query object from the list
  const {
    querybuilder = {}
  }: {
    querybuilder?: {
      query?: string,
      join?: any,
      kind?: any,
      nook?: any,
      count?: number,
      order?: string,
      ascDesc?: string
    }
  } = heapList || {};

  // get query data from the query object
  const {
    query = '*',
    join,
    kind,
    nook,
    count,
    order,
    ascDesc
  } = heapList.querybuilder || {}

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

  let posts: any[] = []

  // get the actual post data for this list
  if (querybuilder) {
    posts = order === 'random'
      ? await getPostsRandomly({ query, join, kind, nook }, count ?? 1) || []
      : await getPosts({
          query: query ?? '*',
          join,
          kind,
          nook,
          perPage: count?.toString() ?? '1',
          order: order as 'date' | 'title',
          ascDesc: ascDesc as 'asc' | 'desc' | undefined
        }) || [];
  }

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

      <div id={`list-head-${slug}`} className={`text-center my-5`}>

        {showtitle &&
          <h2 id={`list-name-${slug}`} className={`uppercase text-center text-3xl md:text-4xl font-bold`}>{title}</h2>
        }

        {showsubtitle &&
          <p id={`list-subt-${slug}`} className={`text-lg md:text-xl text-center`}>{subtitle}</p>
        }

      </div>

      {precontent && <div id={`list-prec-${slug}`} className={`text-center my-5 ${styling['home-head-main']}`}>
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

      {postcontent && <div id={`list-posc-${slug}`} className={`my-5 text-center ${styling['home-head-main']}`}>
        <BlockContent
          blocks={postcontent}
          serializers={serializers}
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        />
      </div>}

      {showlink && cta.url &&
        <div id={`list-link-${slug}`} className="my-5 text-center">
          <Link
            className={`${styling.button} text-center`}
            href={cta.url}
            target={cta.url.startsWith('http') ? '_blank' : '_self'}
          >
            {cta.title}
          </Link>
        </div>
      }

    </Sect>

  )

}