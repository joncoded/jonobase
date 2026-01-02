
/*
jonobase by @jonchius
/app/components/util/rich.tsx
serializers for rich text editor generated content
*/

import { PostLinkProps } from "@/sanity/myprops"
import CodePenEmbed from './pens'
import CodeBlockWithCopy from './rich-code'

export const serializers = {
  marks: {
    link: ({ children, mark }: PostLinkProps) => (
      <a href={mark.href} target={mark.href.startsWith('http') ? '_blank' : ''} rel="noopener noreferer">
        {children}
      </a>
    )
  },  
  types: {
    // code snippets
    code: ({node}: any) => {
      const { code, language } = node
      if (!code){
          return null
      }
      return <CodeBlockWithCopy code={code} language={language} />
    },
    // any embeddable HTML
    mbed: ({ node }: any) => {      
      const { html } = node
      if (!html) return null
      return (            
        <div className="custom-embed my-5" dangerouslySetInnerHTML={{ __html: html }} />
      )
    },
    // tables with rows and columns
    table: ({node}: any) => { 
      const thead = node.rows[0]          
      const tbody = node.rows.slice(1)
      return (
        <table className={`table-auto w-full border border-spacing-2 text-xl my-5`}>
          <caption className={`sr-only`}>table</caption>
          <thead>              
            <tr key={thead._key} className={`bg-slate-200 dark:bg-slate-800`}>
              {thead.cells.map((cell: any) => {
                return (
                  <th className={`border border-slate-300 px-5 py-3 text-left`} key={cell._key + Date.now()}>{cell}</th>
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
                    <td className={`border border-slate-300 px-5 py-3`} key={cell._key + Date.now()}>{cell}</td>
                  )})}
                </tr>
              )
            })}
          </tbody>      
        </table>
      )
    },
    // youtube videos
    tube: ({ node }: any) => {      
      const { url } = node      
      const youtubeId = url
        .replace('https://www.youtube.com/watch?v=', '')
        .replace('https://youtu.be/', '')

      return (
        <div className={`youtube-container`}>
          <iframe 
            className={`youtube-video w-full h-[56.25vw] md:h-[31.25vw]`}
            src={`https://www.youtube.com/embed/${youtubeId}`}            
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )
    },
    // codepen embeds
    pens: ({ node }: any) => {
      const { url, tabs } = node      
      return <CodePenEmbed url={url} tabs={tabs} />
    },
  }
}