
/*
jonanity by @joncoded
/app/(root)/posts/page.tsx
the post template
*/

import Link from "next/link"
import BlockContent from "@sanity/block-content-to-react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { getBase, getPost, getPostAdjacent } from "@/sanity/actions"
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { Sect, Span } from "@/components/main"
import { text } from "@/lib/app.config"

export const revalidate = 30

export async function generateMetadata({params}: any) {

  const { slug } = params  
  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}
  const post = await getPost(slug)       

  if (post) {
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

  /* def if no post data returns */
  if (!post) {
    return (
      <Sect>
        <h1 className="text-5xl md:text-7xl text-black">404</h1>
      </Sect>
    )
  }
  /* end if no post data returns */

  const { title, emoji, subtitle, kind, content, link, moods, image, date } = post 

  const PostApex = () => {
    return (
      <aside className={`uppercase font-sans text-lg md:text-2xl`}>
        <Span>{text['posts']}</Span>
        <Span ariaHidden={true}> / </Span>
        <Span className="text-sm md:text-lg mr-2">{emoji}</Span>
        <Span className="text-sm md:text-lg">{title}</Span>
      </aside>
    )
  }

  const PostHead = () => {
    return (
      <div className={`post-head-wrap ${image ? 'bg-zinc-900/70 text-white p-5 md:p-10' : 'text-black'}`}>        
        <h1 className="post-head-title text-5xl md:text-7xl font-bold">{title}</h1> 
        { subtitle && <p className="post-head-subtitle text-xl md:text-3xl mt-2">{subtitle}</p>}
        <p className="post-head-data text-sm md:text-xl mt-6">
          <span className="post-head-cats">{kind}</span>
          <span className="post-head-bull mx-2" aria-hidden="true"> / </span>
          <span className="post-head-date">{date.substring(0,10)} {date.substring(11,16)}</span> 
        </p>
      </div>
    )
  }

  const PostLink = () => {
    return (
      <div className={`post-link-wrap`}>
        <Link 
          className={`post-link-link 
            px-5 py-2 bg-black text-white text-lg 
            hover:border hover:border-black hover:bg-white hover:text-black
          `}
          href={link} 
          target="_blank"
        >
          {text['visit url']}
        </Link>
      </div>
    )
  }

  const PostMood = () => {
    return (
      <div className="flex flex-wrap items-center gap-5">
        {text['moods']} : 
        {moods.map((mood: any) => {
          return (
            <Link 
              className={`post-mood-item border border-black dark:border-white p-2 px-5 
              bg-white hover:bg-black text-black hover:text-white 
              dark:focus:ring-4 focus:ring-offset-2`}
              href={`/moods/${mood}`}
              key={mood} 
            >
              {mood}
            </Link>
          )
        })}
      </div>
    )
  }

  const newerPost = await getPostAdjacent(date, "newer")  
  const olderPost = await getPostAdjacent(date, "older")

  return (

    <main id="main" tabIndex={-1}>

      <Sect className={`post-apex`}>
        <PostApex />
      </Sect>

      <Sect className={`post-meta font-sans ${image ? `py-0` : `!bg-gradient-to-b from-sky-100 to-sky-200 py-5`}`} bgImage={image}> 
        <PostHead />
        { link && <PostLink />}
      </Sect>

      <Sect className={`post-main border-t prose-a:text-sky-500 hover:prose-a:text-black dark:hover:prose-a:text-white hover:prose-a:underline 
        prose-headings:font-sans prose-headings:font-bold prose-headings:mt-5 prose-h2:text-5xl prose-h3:text-3xl prose-h4:text-xl`
      }>
        <BlockContent 
          blocks={content} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        /> 
      </Sect>

      { moods && 
      <Sect className={`post-mood !bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-gray-800 dark:to-gray-900 p-5 text-md lg:text-lg`}>
        <PostMood />
      </Sect>
      }

      <Sect className={`post-turn !bg-gradient-to-r from-white dark:from-black to-zinc-50 dark:to-gray-900 p-5 text-lg md:text-xl`}>
        <div className={`flex flex-col md:flex-row ${newerPost ? `justify-between` : `justify-end`} gap-5`}>
        { newerPost && 
          <div className={`text-center md:text-left`}>
            {text['post newer']} <br /> 
            <Link className="text-sky-500 hover:text-black dark:hover:text-white hover:underline" href={newerPost.slug}>{newerPost.title}</Link>
          </div>
        }
        { olderPost && 
          <div className={`text-center md:text-right`}>
            {text['post older']} <br /> 
            <Link className="text-sky-500 hover:text-black dark:hover:text-white hover:underline" href={olderPost.slug}>{olderPost.title}</Link>
          </div>
        }
        </div>
      </Sect>

    </main>

  )
  
}