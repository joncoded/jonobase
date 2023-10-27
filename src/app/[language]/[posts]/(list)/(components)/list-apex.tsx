
/*
jonopoco
/app/(basis)/list/list-apex.tsx
apex (breadcrumbs) for lists
*/

import Link from "next/link"
import { Span } from "@/app/(basis)/util/tidy-html"

export default async function ListApex({lang, type, topic, current}: any) {
  
  return (
    <aside className={`font-sans text-lg md:text-2xl uppercase mb-5`}>      
     
      { (topic === '' || topic === undefined) && 
        <Span>{decodeURIComponent(type)}</Span>
      }

      { (topic !== '' && topic !== undefined) && 
        <Link href={`/${type}/`}>{decodeURIComponent(type)}</Link>
      }
      
      { (topic !== '' && topic !== undefined) && 
        <>
          <Span ariaHidden="true"> / </Span>
          <Span>{lang.tagged}</Span>
          <Span ariaHidden="true"> / </Span>
          <Span>{topic}</Span>
        </>
      }
      { current > 1 && 
        <>
          <Span ariaHidden="true"> / </Span>
          <Span>{lang.page}</Span>
          <Span ariaHidden="true"> / </Span>
          <Span>{current}</Span>
        </>
      }    
    </aside>
  )
  
}