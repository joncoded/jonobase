/*
jonobase by @jonchius
/app/components/heap/heap-sect.tsx
a horizontal section of a heap (i.e. automated page of post lists)
*/

import Link from "next/link"
import BlockContent from "@sanity/block-content-to-react"
import { getPosts, getPostsRandomly } from "@/sanity/actions"
import { styling } from "@/lib/app.config"
import { serializers } from "../base/util/rich"
import { Sect } from "../base/html/main"
import PostList from "../post/post-list"

export default async function HeapSect({heapList} : any) {

  const { query, join, kind, nook, count, order, ascDesc } = heapList.querybuilder

  let posts
  (order === 'random') 
  ? 
    posts = await getPostsRandomly({
      query, join, kind, nook
    }, count)    
  :
    posts = await getPosts({
      query, join, kind, nook, perPage: count, order, ascDesc 
    })

  return (
    <Sect 
      key={heapList._id} 
      className={`heap-list-${heapList.slug} 
        py-5 bg-${heapList.bgColor === 'white' 
          ? 'white dark:bg-black' 
          : `${heapList.bgColor}-300 dark:bg-${heapList.bgColor}-800`
        }`}
    >
      
      {heapList.showtitle && 
        <h2 id="heap-name" className={`uppercase text-center md:text-left text-3xl md:text-4xl font-bold`}>{heapList.title}</h2>
      }
      
      {heapList.showsubtitle && 
        <p id="heap-subt" className={`text-lg md:text-xl text-center md:text-left`}>{heapList.subtitle}</p>
      }
      
      <div id="heap-prec" className={`mb-5`}>
        <BlockContent 
          blocks={heapList.precontent}
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        />          
      </div>      
      
      {heapList.showposts && <PostList posts={posts} showJoin={heapList.showjoin} showKind={heapList.showkind} />}
      
      <div id="heap-posc" className={`mt-5`}>
      <BlockContent 
          blocks={heapList.postcontent}
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        /> 
      </div>
      
      {heapList.cta.url && 
        <div className="text-center"><Link className={`${styling.button} text-center`} href={heapList.cta.url}>{heapList.cta.title}</Link></div>
      }
    
    </Sect>

  )

}

