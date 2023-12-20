import { getPostsByMood } from "@/sanity/actions"
import { MoodProps } from "@/lib/types"
import { Sect } from "@/components/main"
import PostList from "@/components/post-list"
import { text } from "@/lib/app.config"

export const revalidate = 30

export default async function Main({ params }: MoodProps) {

  const posts = await getPostsByMood ({
    slug: params?.slug || '',
    page: '1'
  })  

  console.log(posts)

  return (
    
    <main id="main" tabIndex={-1}>

      <Sect className="bg-white text-black">
        <h2 className="font-sans text-sm md:text-2xl">{text['moods']} / {params.slug}</h2>
        <PostList posts={posts} />
      </Sect>          
    
    </main>

  )

}