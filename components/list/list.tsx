/*
jonobase by @joncoded (aka @jonchius)
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

const bgColorMap: Record<string, string> = {
  'white': 'bg-white dark:bg-black',
  'slate': 'bg-slate-300 dark:bg-slate-800',
  'gray': 'bg-gray-300 dark:bg-gray-800',
  'zinc': 'bg-zinc-300 dark:bg-zinc-800',
  'stone': 'bg-stone-300 dark:bg-stone-800',
  'red': 'bg-red-300 dark:bg-red-800',
  'orange': 'bg-orange-300 dark:bg-orange-800',
  'amber': 'bg-amber-300 dark:bg-amber-800',
  'yellow': 'bg-yellow-300 dark:bg-red-800',
  'lime': 'bg-lime-300 dark:bg-lime-800',
  'green': 'bg-green-300 dark:bg-green-800',
  'emerald': 'bg-emerald-300 dark:bg-emerald-800',
  'teal': 'bg-teal-300 dark:bg-teal-800',
  'cyan': 'bg-cyan-300 dark:bg-cyan-800',
  'sky': 'bg-sky-300 dark:bg-sky-800',
  'blue': 'bg-blue-300 dark:bg-blue-800',
  'indigo': 'bg-indigo-300 dark:bg-indigo-800',
  'violet': 'bg-violet-300 dark:bg-violet-800',
  'purple': 'bg-purple-300 dark:bg-purple-800',
  'fuchsia': 'bg-fuchsia-300 dark:bg-fuchsia-800',
  'pink': 'bg-pink-300 dark:bg-pink-800',
  'rose': 'bg-rose-300 dark:bg-rose-800',
}

export default async function List({ heapList, preLoadedPosts }: any) {

  const headersList = await headers()
  const hostname = headersList.get("x-forwarded-host") || headersList.get("host") || ""
  
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
      id={`list-sect-${slug}`}
      className={`py-5 ${bgColorMap[bgColor] || bgColorMap['white']}`}
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