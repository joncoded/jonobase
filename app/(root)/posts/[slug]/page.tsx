import { getPost } from "@/sanity/actions"
import { DOMChildrenProps } from "@/lib/types"

export const revalidate = 900

export default async function Main({ params } : any) {

  const { slug } = params
  const post = await getPost(slug)

  const PostAide = ({children, className = ''}: DOMChildrenProps) => {
    return (
      <main className={`w-full flex flex-col justify-center mx-auto`}>
        <section className={`w-full bg-gradient-to-b from-sky-50 to-sky-200 ${className} p-5`}>
          <div className="max-w-screen-2xl mx-auto mt-32">
            {children}
          </div>
        </section>
      </main>        
    )
  }

  if (!post) {
    return (
      <PostAide>
        <h1 className="text-7xl">404</h1>
      </PostAide>
    )
  }

  const { title } = post 
  


  return (
    <PostAide>      
      <h1 className="text-7xl text-black">{title}</h1>      
    </PostAide>
  )
  
}