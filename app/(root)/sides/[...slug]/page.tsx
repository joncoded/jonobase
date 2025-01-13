
/*
jonobase by @jonchius
/app/(root)/sides/page.tsx
the side (static page) template
*/

import BlockContent from "@sanity/block-content-to-react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { getBase, getSide } from "@/sanity/actions"
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { Sect, Span } from "@/components/main"
import { text } from "@/lib/app.config"
import ScrollToTop from "@/components/ttop"
import None from "@/components/none"

export const revalidate = 30

export async function generateMetadata({params}: any) {

  const { slug } = params  
  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}
  const side = await getSide(slug)       

  if (side) {
    return {
      title: `${side.title} @ ${base?.title}`,
      description: `${side.subtitle}`,
      keywords: `${side.moods}`,
    }
  } 

}

export default async function Main({ params } : any) {

  const { slug } = params  
  const side = await getSide(slug)  

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

  /* def if no side data returns */
  if (!side) {
    return (
      <None />
    )
  }
  /* end if no side data returns */

  const { title, emoji, subtitle, content, image, date, showDate } = side 

  const SideApex = () => {
    return (
      <aside className={`uppercase font-sans text-lg md:text-2xl`}>
        <Span>{text['sides']}</Span>
        <Span ariaHidden={true}> / </Span>
        <Span className="text-sm md:text-lg mr-2">{emoji}</Span>
        <Span className="text-sm md:text-lg">{title}</Span>
      </aside>
    )
  }

  const SideHead = () => {
    return (
      <div className={`side-head-wrap ${image ? 'bg-zinc-900/70 text-white p-5 md:p-10 my-5' : 'text-black'}`}>        
        <h1 className="side-head-title text-5xl md:text-7xl font-bold">{title}</h1> 
        { subtitle && <p className="side-head-subtitle text-xl md:text-3xl mt-2">{subtitle}</p>}
        <p className="side-head-data text-sm md:text-xl mt-6">
          { showDate && 
            <span className="side-head-date">{date.substring(0,10)} {date.substring(11,16)}</span> 
          } 
        </p>
      </div>
    )
  }

  return (

    <main id="main" tabIndex={-1}>     

      <ScrollToTop /> 

      <Sect className={`side-apex`}>
        <SideApex />
      </Sect>

      <Sect className={`side-meta font-sans ${image ? `py-0` : `!bg-gradient-to-b from-sky-100 to-sky-200 py-5`}`} bgImage={image}> 
        <SideHead />        
      </Sect>

      <Sect className={`side-main border-t prose-a:text-sky-500 hover:prose-a:text-black dark:hover:prose-a:text-white hover:prose-a:underline 
        prose-headings:font-sans prose-headings:font-bold prose-headings:mt-5 prose-h2:text-5xl prose-h3:text-3xl prose-h4:text-xl`
      }>
        <BlockContent 
          blocks={content} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        /> 
      </Sect>

    </main>

  )
  
}