
/*
jonobase by @joncoded (aka @jonchius)
/app/components/list/list-line.tsx
the list of posts
*/

"use client"

import { PostProps } from "@/sanity/myprops"
import { text } from "@/app/config"
import ListPost from "./list-post"

export default function ListLine({posts, showJoin = false, showKind = false} : { posts: PostProps[], showJoin?: boolean, showKind?: boolean} ) {

  return (
    <div className="w-full sm:justify-start">

      {posts?.length === 0 &&
        <div className="py-0 md:py-5">
          <p className="text-center">{text['results found none']}</p>
        </div>
      }

      {posts?.length > 0 &&         
        <div className={`
          py-0 md:py-5 
          grid gap-10 grid-cols-1 
          ${posts?.length == 2 ? `md:grid-cols-2` : ``}            
          ${posts?.length == 3 ? `md:grid-cols-1 lg:grid-cols-3` : ``}
          ${posts?.length == 4 ? `md:grid-cols-2` : ``}
          ${posts?.length >= 5 ? `md:grid-cols-2 lg:grid-cols-3` : ``}      
        `}>

          {posts.map((post: any) => (

            <ListPost key={post._id} post={post} showJoin={showJoin} showKind={showKind} />

          ))}

        </div>        
      }

    </div>
  )

}