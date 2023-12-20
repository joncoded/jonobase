import { text } from "@/lib/app.config";
import PostCard from "./post-card";

export default function PostList({posts} : any) {

  return (
    <div className="post-list w-full mt-5 sm:justify-start">
      {posts?.length > 0 ? (
        
        <div className="post-list-item grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center mt-0">
          {posts.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        
      ) : (
        <p className="post-list-nopo text-3xl text-gray-400 text-center">0 {text['results_found']}</p>
      )}
    </div>
  )

}