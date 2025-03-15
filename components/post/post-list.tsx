
/*
jonobase by @jonchius
/app/components/post/post-list.tsx
the list of posts
*/

'use client'

import { PostProps } from '@/sanity/myprops'
import PostLine from './post-line'
import { text } from '@/lib/app.config'

export default function PostList({posts, showJoin = false, showKind = false} : { posts: PostProps[], showJoin?: boolean, showKind?: boolean} ) {

  return (
    <div className="post-list-base w-full sm:justify-start">

      {posts?.length === 0 &&
        <div className="post-list-meat py-0 md:py-5">
          <p className="text-center">{text['results found none']}</p>
        </div>
      }

      {posts?.length > 0 &&
        <>
          <div className="post-list-meat grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-0 md:py-5 gap-10">

            {posts.map((post: any) => (

              <PostLine key={post._id} post={post} showJoin={showJoin} showKind={showKind} />

            ))}

          </div>
        </>
      }

    </div>
  )

}