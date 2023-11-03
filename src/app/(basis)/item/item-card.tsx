
/*
jonobase
/app/(basis)/item/item-card.tsx
"card" style of item card, showing:
- "kind" optionally indicated
- date
- emoji (optional)
- title
- summary
*/

import Link from "next/link"
import { Span, Line } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"

export default function ItemCard({lang, kind = true, item} : any) {

  let itemDate = getFormattedDate(item.created)     

  const ListCardWrapper = ({children}: any) => {
    return (
      <summary className={`
        block h-full shadow-sm hover:shadow-xl bg-zinc-100 dark:bg-black
        border border-2 border-black dark:border-gray-600      
      `}>
        {children}
      </summary>
    )
  }

  const ListPostKind = () => {    

    
    return (
      <Line className={`
        text-white dark:text-white uppercase 
        mt-0 bg-gradient-to-b 
        from-black to-gray-700         
        ${kind ? '' : 'hidden'}
      `}>
        {item.expand.kind.slug}
      </Line>
    )
  }

  const ListCardInner = ({children}: any) => {

    return (
      <div className={`px-5`}>
        {children}
      </div>
    )

  }

  const ListCardDate = () => {

    return (
      <Line className={`
         text-black dark:text-gray-500 mt-2
        ${item.featured ? `text-black dark:text-yellow-500` : ``}
        ${item.collectionName === 'pages' ? `hidden` : ``}
        ${itemDate === '' ? `hidden` : ``}        
      `}>
        {item.featured && 
          <Span 
            ariaLabel={lang.featured}                 
            className={`mr-2`}
          >📌</Span>
        }
        <Span>{itemDate}</Span>
      </Line> 
    )
  }

  const ListCardEmoji = () => {
    return (
      <Line
        className={`text-6xl`} 
        ariaHidden={true}
      >
        {item.emoji}
      </Line>
    )
  }

  const ListCardTitle = () => {
    return (
      <h3 className={`
        hover:underline 
        ${item.emoji ? `text-3xl` : `text-4xl`}
      `}> 
        {item.title}
      </h3>
    )
  }

  const ListCardSummary = () => {
    return (
      <Line className={`text-black dark:text-slate-500 text-sm`}> 
        {item.summary}
      </Line>
    )
  }

  return (
    <li className={`h-full text-center hover:prose-a:!no-underline`}>  

      <Link 
        href={`/posts/${item.slug}`} 
        className={`
          
          ${item.featured && `hover:!text-black dark:hover:!text-white`}
        `}
      >

        <ListCardWrapper featured={item.featured}>
          
          <ListPostKind />
          
          <ListCardInner>
            <ListCardDate />
            <ListCardEmoji />
            <ListCardTitle />
            <ListCardSummary />
          </ListCardInner>

        </ListCardWrapper> 

      </Link>

    </li>
  )
}