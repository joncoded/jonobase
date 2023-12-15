import { getPost } from "@/sanity/actions"
import { DOMChildrenProps } from "@/lib/types"
import { PortableText } from "@portabletext/react"
import Link from "next/link"

export const revalidate = 30

export default async function Main({ params } : any) {

  const { slug } = params  
  const post = await getPost(slug)  

  const PostArch = ({children, className = '', marginTop = '10'}: DOMChildrenProps) => {
    return (
      <main className={`post-arch w-full flex flex-col justify-center mx-auto`}>
        <section className={`w-full p-5 ${className}`}>
          <div className={`max-w-screen-2xl mx-auto mt-${marginTop} text-2xl`}>
            {children}
          </div>
        </section>
      </main>        
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

  console.log(post)

  return (
    <>

      <PostArch 
        className={`bg-gradient-to-b from-sky-50 to-sky-200 text-center  font-sans`}  
        marginTop={`10`}
      >      
        <h1 className="text-7xl font-bold">{emoji} {title}</h1> 
        <p className="text-3xl">{subtitle}</p> 
        <p className="text-xl">
          {category} 
          <span aria-hidden="true" className="mx-2">&bull;</span>
          {date.substring(0,10)} 
        </p>
      </PostArch>
      
      <PostArch marginTop={`0`}>
        <PortableText value={content} />
      </PostArch>

      { moods && 
        <PostArch 
          className={`bg-gradient-to-r from-gray-100 to-gray-300`}
          marginTop={'0 py-5'}
        >
          {moods.map((mood: any) => {
            return (
              <Link href="" className="bg-black text-white mr-5 p-2 px-5">{mood}</Link>
            )
          })}
        </PostArch>
      }
    
    </>

  )
  
}