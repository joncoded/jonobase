import Link from "next/link"
import { getBase, getPost } from "@/sanity/actions"
import BlockContent from "@sanity/block-content-to-react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { Sect } from "@/components/main"
import { text } from "@/lib/app.config"

export const revalidate = 600

export async function generateMetadata({params}: any) {

  const { slug } = params  
  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}
  const post = await getPost(slug)       

  if (Object.keys(post).indexOf('title') > -1) {
    return {
      title: `${post.title} @ ${base?.title}`,
      description: `${post.subtitle}`,
      keywords: `${post.moods}`,
    }
  } 

}

export default async function Main({ params } : any) {

  const { slug } = params  
  const post = await getPost(slug)  

  /* def syntax highlighting stuff */
  const serializers = {
    types: {
        code: ({node}: any) => {
            const { code, language } = node
            if (!code){
                return null
            }
            return <SyntaxHighlighter style={monokaiSublime} language={language ||'text'} showLineNumbers={true} wrapLines={true}>
            {code}
          </SyntaxHighlighter>
        }
    }
  }
  /* end syntax highlighting stuff */

  if (!post) {
    return (
      <Sect>
        <h1 className="text-5xl md:text-7xl text-black">404</h1>
      </Sect>
    )
  }

  const { title, emoji, subtitle, category, content, link, moods, image, date } = post 

  const PostHead = () => {
    return (
      <div className={`post-head ${image ? 'py-10 bg-zinc-900/60 text-white' : 'text-black dark:text-white'} text-center`}>
        <div className="post-head-emoji hidden md:block text-7xl pb-5" aria-hidden="true">{emoji}</div>
        <h1 className="post-head-title text-5xl md:text-7xl font-bold">{title}</h1> 
        { subtitle && <p className="post-head-subtitle text-xl md:text-3xl mt-2">{subtitle}</p>}
        <p className="post-head-data font-serif text-sm md:text-xl mt-6">
          <span className="post-head-cats">{category}</span>
          <span className="post-head-bull mx-2" aria-hidden="true">&bull;</span>
          <span className="post-head-date">{date.substring(0,10)} {date.substring(11,16)}</span> 
        </p>          
      </div>
    )
  }

  const PostLink = () => {
    return (
      link && <Link href={link} className="post-url px-5 py-2 bg-black text-white text-2xl">{text['visit url']}</Link>
    )
  }

  const PostMood = () => {
    return (
      <>
        <span className="mr-5">{text['moods']}</span> 
        {moods.map((mood: any) => {
          return (
            <Link key={mood} href="#" className="mr-5 p-2 px-5 bg-black text-white">{mood}</Link>
          )
        })}
      </>
    )
  }

  return (

    <main>

      <Sect className={`post-head ${!image && `!bg-gradient-to-b from-sky-100 to-sky-200`} p-10 font-sans`} bgImage={image}> 
        <PostHead />
      </Sect>

      <Sect className={`post-link !bg-zinc-50 text-center p-10`}>
        <PostLink />
      </Sect>
      
      <Sect className={`post-main border-t p-10`}>        
        <BlockContent 
          blocks={content} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        /> 
      </Sect>

      { moods && 
      <Sect className={`post-mood !bg-gradient-to-r from-gray-100 to-gray-300 p-10 text-2xl`}>
        <PostMood />
      </Sect>
      }
    
    </main>

  )
  
}