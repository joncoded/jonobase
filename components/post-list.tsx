
/*
jonanity by @joncoded
/app/components/post-list.tsx
the list of post "cards"
*/

import PostCard from "./post-card";

export default function PostList({posts} : any) {

  const postsDes = posts
  const postsTab = posts.slice(0, posts.length % 2 == 1 ? posts.length - 1 : posts.length)
  const postsMob = posts.slice(0, 2)
  
  return (
    <div className="post-list w-full sm:justify-start">
      {posts?.length > 0 && 
        <>
          <div className="post-list-item-des hidden lg:grid lg:grid-cols-3 gap-10 justify-center mt-0">
            {postsDes.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <div className="post-list-item-tab hidden sm:grid lg:hidden sm:grid-cols-2 gap-5 justify-center mt-0">
            {postsTab.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <div className="post-list-item-mob grid grid-cols-1 sm:hidden gap-5 justify-center mt-0">            
            {postsMob.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </>        
      }
    </div>
  )

}