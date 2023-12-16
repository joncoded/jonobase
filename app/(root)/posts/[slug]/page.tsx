import Link from "next/link"
import { getPost } from "@/sanity/actions"
import { DOMChildrenProps } from "@/lib/types"
import { PortableText } from "@portabletext/react"

export const revalidate = 30

export default async function Main({ params } : any) {

  const { slug } = params  
  const post = await getPost(slug)  

  const PostArch = ({children, className = ''}: DOMChildrenProps) => {
    return (
      <section className={`w-full ${className}`}>
        <div className={`max-w-screen-xl mx-auto py-10 px-5 text-2xl`}>          
          {children}          
        </div>
      </section>        
    )
  }

  if (!post) {
    return (
      <PostArch>
        <h1 className="text-7xl text-black">404</h1>
      </PostArch>
    )
  }

  const { title, emoji, subtitle, category, content, link, moods, image, date } = post 
  
  return (
    <main>

      <PostArch 
        className={`bg-gradient-to-b from-sky-100 dark:from-sky-800 to-sky-200 dark:to-sky-900 font-sans`}          
      > 
        <div className="post-meta text-center bg-white/50 py-5">
          <div className="post-meta-emoji text-7xl pb-5" aria-hidden="true">{emoji}</div>
          <h1 className="post-meta-title text-7xl font-bold">{title}</h1> 
          { subtitle && <p className="post-meta-subtitle text-3xl mt-2">{subtitle}</p>}
          <p className="post-meta-data text-xl mt-6">
            <span className="post-meta-cats">{category}</span>
            <span className="post-meta-bull mx-2" aria-hidden="true">&bull;</span>
            <span className="post-meta-date">{date.substring(0,10)} {date.substring(11,16)}</span> 
          </p>
        </div>
      </PostArch>
      
      <PostArch className={`max-w-screen-lg mx-auto`}>
        <PortableText value={content} />
      </PostArch>

      { moods && 
        <PostArch 
          className={`bg-gradient-to-r from-gray-100 to-gray-300`}          
        >
          {moods.map((mood: any) => {
            return (
              <Link href="" className="mr-5 p-2 px-5 bg-black text-white">{mood}</Link>
            )
          })}
        </PostArch>
      }
    
    </main>

  )
  
}