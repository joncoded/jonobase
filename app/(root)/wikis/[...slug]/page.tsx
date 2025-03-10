
/*
jonobase by @jonchius
/app/(root)/wikis/page.tsx
the wiki template
*/

import BlockContent from "@sanity/block-content-to-react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { getBase, getWiki } from "@/sanity/actions"
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import { Sect, Span } from "@/components/main"
import { text } from "@/lib/app.config"
import ScrollToTop from "@/components/ttop"
import { LinkProps } from "@/lib/types"

export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({params}: any) {

  const { slug } = params  
  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}
  const wiki = await getWiki(slug)       

  if (wiki) {
    return {
      title: `${wiki.title} - wiki @ ${base?.title}`,
      description: `${wiki.subtitle}`      
    }
  } 

}

export default async function Main({ params } : any) {

  const { slug } = params  
  const wiki = await getWiki(slug)  

  /* wysiwyg formatting for rich content */
  const serializers = {
    marks: {
      link: ({ children, mark }: LinkProps) => (
        <a href={mark.href} target={mark.href.startsWith('http') ? '_blank' : ''} rel="noopener noreferer">
          {children}
        </a>
      ),
    },
    types: {
      // code snippets
      code: ({node}: any) => {
        const { code, language } = node
        if (!code){
            return null
        }
        return <SyntaxHighlighter style={monokaiSublime} language={language ||'text'} wrapLines={true}>
          {code}
        </SyntaxHighlighter>
      },
      // tables with rows and columns
      table: ({node}: any) => { 
        const thead = node.rows[0]          
        const tbody = node.rows.slice(1)
        return (
          <table className={`table-auto w-full border border-spacing-2 my-5`}>
            <caption className={`sr-only`}>table</caption>
            <thead>              
              <tr key={thead._key} className={`bg-slate-200`}>
                {thead.cells.map((cell: any) => {
                  return (
                    <th className={`border border-slate-300 px-5 py-3 text-left`} key={cell._key}>{cell}</th>
                  )
                })}                
              </tr>
            </thead>    
            <tbody>
              {tbody.map((row: { cells: any[], _key: any }, index: number) => {
                return (
                  <tr key={row._key}>
                    {row.cells.map((cell: any) => {
                    return (
                      <td className={`border border-slate-300 px-5 py-3`} key={cell._key}>{cell}</td>
                    )})}
                  </tr>
                )
              })}
            </tbody>      
          </table>
        )
      }
    }
  }
  /* end syntax highlighting stuff */

  /* def if no wiki data returns */
  if (!wiki) {
    return (
      <Sect>
        <h1 className="text-5xl md:text-7xl text-black">404</h1>
      </Sect>
    )
  }
  /* end if no wiki data returns */

  const { title, emoji, subtitle, content, seealso, image, date, showDate } = wiki 

  const WikiApex = () => {
    return (
      <aside className={`uppercase font-sans text-lg md:text-2xl`}>
        <>
          <Span>{text['wikis']}</Span>                 
        </>
      </aside>
    )
  }

  const WikiHead = () => {
    return (
      <div className={`wiki-head-wrap flex gap-5 ${image ? 'bg-zinc-900/70 text-white p-5 md:p-10 my-5' : 'text-black'}`}>        

        {emoji && <div className="wiki-head-wrap-emoj text-5xl" aria-hidden={true}>{emoji}</div>}
        <div className="wiki-head-wrap-text">
          <h1 className="wiki-head-title text-5xl font-bold">          
            {title}
          </h1> 
          { subtitle && <p className="wiki-head-subtitle text-xl md:text-2xl mt-2">{subtitle}</p>}
          { showDate && 
            <p className="wiki-head-data text-sm md:text-lg mt-6">
              <span className="wiki-head-date">{formattedDate}</span> 
            </p>
          }
        </div>
      </div>
    )
  }

  return (

    <main id="main" tabIndex={-1}>     

      <ScrollToTop /> 

      <Sect className={`wiki-apex`}>
        <WikiApex />
      </Sect>

      <Sect className={`wiki-meta font-sans ${image ? `py-0` : `!bg-gradient-to-b from-zinc-100 to-zinc-200 py-5`}`} bgImage={image}> 
        <WikiHead />        
      </Sect>

      <Sect className={`wiki-main border-t prose-a:text-sky-500 hover:prose-a:text-black dark:hover:prose-a:text-white hover:prose-a:underline 
        prose-headings:font-sans prose-headings:font-bold prose-headings:mt-5 prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-xl`
      }>
        <BlockContent 
          blocks={content} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        /> 
      </Sect>

      <Sect className={`wiki-also border-t prose-a:text-sky-500 hover:prose-a:text-black dark:hover:prose-a:text-white hover:prose-a:underline 
        prose-headings:font-sans prose-headings:font-bold prose-headings:mt-5 prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-xl`
      }>
        <BlockContent 
          blocks={seealso} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        /> 
      </Sect>

     
    </main>

  )
  
}