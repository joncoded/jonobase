/*
jonobase by @jonchius
/app/components/list/list.tsx
a list, a horizontal section of a heap (i.e. "back-end" driven page of a list of posts)
*/

import Link from "next/link"
import BlockContent from "@sanity/block-content-to-react"
import { getPosts, getPostsRandomly } from "@/sanity/actions"
import { styling } from "@/lib/app.config"
import { serializers } from "../base/util/rich"
import { Sect } from "../base/html/main"
import PostList from "../post/post-list"

export const revalidate = 10

export default async function List({ heapList }: any) {

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
  
  const {
    query = '*',
    join,
    kind,
    nook,
    count,
    order,
    ascDesc
  } = querybuilder || {}

  
  let posts: any[] = []
  
  if (querybuilder) {
    posts = order === 'random'
      ? await getPostsRandomly({ query: query ?? '*', join, kind, nook }, count ?? 1) || []
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

  return (
    <Sect 
      key={_id} 
      className={`list-${slug} 
        py-5 bg-${bgColor === 'white' 
          ? 'white dark:bg-black' 
          : `${bgColor}-300 dark:bg-${bgColor}-800`
        }`}
    >

      <div id={`list-${slug}-head`} className={`text-center my-5`}>
      
        {showtitle && 
          <h2 id="list-name" className={`uppercase text-center text-3xl md:text-4xl font-bold`}>{title}</h2>
        }
        
        {showsubtitle && 
          <p id="list-subt" className={`text-lg md:text-xl text-center`}>{subtitle}</p>
        }
      
      </div>
      
      <div id={`list-${slug}-prec`} className={`my-5 text-center ${styling['home-head-main']}`}>
        <BlockContent 
          blocks={precontent}
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        />          
      </div>      
      
      {showposts && 
      
        <PostList posts={posts} showJoin={showjoin} showKind={showkind} />
      
      }
      
      <div id={`list-${slug}-posc`} className={`my-5 text-center ${styling['home-head-main']}`}>
        <BlockContent 
          blocks={postcontent}
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        /> 
      </div>
      
      {showlink && cta.url && 
        <div id={`list-${slug}-cta`} className="text-center">
          <Link 
            className={`${styling.button} text-center`} 
            href={cta.url}
          >
            {cta.title}
          </Link>
        </div>
      }
    
    </Sect>

  )

}