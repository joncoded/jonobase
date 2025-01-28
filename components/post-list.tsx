
/*
jonobase by @jonchius
/app/components/post-list.tsx
the list of post "cards"
*/

'use client'

import PostLine from "./post-line"
import { text } from '@/lib/app.config'

export default function PostList({posts} : any) {
  
  return (
    <div className="post-list w-full sm:justify-start">      
      {posts?.length === 0 && 
        <>
          <p className="text-center">{text['results found none']}</p>
        </>
      }
      {posts?.length > 0 && 
        <>  
          <div className="post-list grid gap-y-5 py-2 md:py-5">
            
            {posts.map((post: any) => (
              
                <PostLine key={post._id} post={post} />                  
              
            ))}
            
          </div> 
        </>    
      }
    </div>
  )

}