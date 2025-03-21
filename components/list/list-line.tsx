
/*
jonobase by @jonchius
/app/components/list/list-line.tsx
the list of posts
*/

"use client"

import { PostProps } from "@/sanity/myprops"
import { text } from "@/app/config"
import PostLine from "../post/post-line"

export default function ListLine({posts, showJoin = false, showKind = false} : { posts: PostProps[], showJoin?: boolean, showKind?: boolean} ) {

  return (
    <div className="list-line-bloc w-full sm:justify-start">

      {posts?.length === 0 &&
        <div className="list-line-meat py-0 md:py-5">
          <p className="text-center">{text['results found none']}</p>
        </div>
      }

      {posts?.length > 0 &&
        <>
          <div className={`
            list-line-meat py-0 md:py-5 
            grid gap-10 grid-cols-1 ${posts?.length > 1 && `md:grid-cols-2`} ${posts?.length > 2 && `lg:grid-cols-3`}`}>

            {posts.map((post: any) => (

              <PostLine key={post._id} post={post} showJoin={showJoin} showKind={showKind} />

            ))}

          </div>
        </>
      }

    </div>
  )

}