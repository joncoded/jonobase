
/*
jonobase by @jonchius
/app/components/util/rich.tsx
serializers for rich text editor generated content
*/

import { PostLinkProps } from "@/sanity/myprops"
import SyntaxHighlighter from "react-syntax-highlighter"
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs"

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
    },
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
    pens: ({ node }: any) => {
      const { url } = node      
      const embedUrl = url.replace('/pen/', '/embed/') + '?default-tab=js,html,css,result&editable=true&theme-id=dark'

      return (
        <div className={`codepen-container`}>
          <iframe height="300" width="100%" src={embedUrl} loading="lazy" allowTransparency={true} allowFullScreen={true}>
            See the Pen @ <a href={url}>{url}</a>
          </iframe>
        </div>
      )
    }
  }
}
