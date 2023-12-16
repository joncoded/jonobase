import Link from "next/link"
import { getPost } from "@/sanity/actions"
import { DOMChildrenProps } from "@/lib/types"
import BlockContent from "@sanity/block-content-to-react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs"

export const revalidate = 30

export default async function Main({ params } : any) {

  const { slug } = params  
  const post = await getPost(slug)  


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

  const PostArch = ({children, className = '', bgImage = ''}: DOMChildrenProps) => {
    return (
      <section 
        style={{  
          backgroundImage: `url('${(bgImage === null || bgImage === '') ? '' : bgImage}')`, 
          backgroundSize: 'cover', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center center', 
          backgroundAttachment: 'fixed'            
        }}
        className={`${className} w-full`}
      >        
        <div className={`max-w-screen-xl mx-auto py-10 px-10 text-2xl`}>          
          {children}          
        </div>      
      </section>        
    )
  }

  const PostHead = () => {
    return (
      <div className={`post-head ${image ? 'py-10 bg-zinc-900/60 text-white' : 'text-black dark:text-white'} text-center`}>
        <div className="post-head-emoji text-7xl pb-5" aria-hidden="true">{emoji}</div>
        <h1 className="post-head-title text-7xl font-bold">{title}</h1> 
        { subtitle && <p className="post-head-subtitle text-3xl mt-2">{subtitle}</p>}
        <p className="post-head-data font-serif text-xl mt-6">
          <span className="post-head-cats">{category}</span>
          <span className="post-head-bull mx-2" aria-hidden="true">&bull;</span>
          <span className="post-head-date">{date.substring(0,10)} {date.substring(11,16)}</span> 
        </p>          
      </div>
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
        className={`post-arch-head ${!image && `!bg-gradient-to-b from-sky-100 to-sky-200`} font-sans`}        
        bgImage={image}
      > 
        <PostHead />
      </PostArch>

      <PostArch 
        className={`post-arch-link !bg-zinc-50 text-center`}
      >
        {link && <Link href={link} className="post-url px-5 py-2 bg-black text-white">visit URL</Link>}
      </PostArch>
      
      <PostArch className={`border-t`}>        
        <BlockContent blocks={content} serializers={serializers} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} dataset="production" /> 
      </PostArch>

      { moods && 
        <PostArch 
          className={`!bg-gradient-to-r from-gray-100 to-gray-300`}          
        >
          <span className="mr-5">moods:</span> 
          {moods.map((mood: any) => {
            return (
              <Link key={mood} href="#" className="mr-5 p-2 px-5 bg-black text-white">{mood}</Link>
            )
          })}
        </PostArch>
      }
    
    </main>

  )
  
}