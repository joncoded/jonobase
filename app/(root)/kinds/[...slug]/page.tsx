import { getPostsByKind } from "@/sanity/actions"
import { Sect } from "@/components/main"
import PostList from "@/components/post-list"
import { text } from "@/lib/app.config"

export const revalidate = 30

export default async function Main({ params }: FindProps) {

  const posts = await getPostsByKind ({
    slug: params?.slug || '',
    page: '1'
  })  

  return (
    
    <main id="main" tabIndex={-1}>

      <Sect className="bg-white text-black">
        <h2 className="font-sans text-sm md:text-2xl">{text['kinds']} / {params.slug}</h2>
        <PostList posts={posts} />
      </Sect>          
    
    </main>

  )

}