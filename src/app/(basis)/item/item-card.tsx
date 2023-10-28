
/*
jonopoco
/app/(basis)/item/item-card.tsx
a post "card" for lists but not limited to lists
*/

import Link from "next/link"
import { Span, Line } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"

export default function ItemCard({type = '', item, lang} : any) {

  let itemDate = getFormattedDate(item.created)      

  const ListCardWrapper = ({children}: any) => {
    return (
      <summary className={`
        block h-full
        border border-2 border-black dark:border-gray-600
        ${item.featured && 
          `bg-gradient-to-b from-yellow-200 to-yellow-300`
        }         
      `}>
        {children}
      </summary>
    )
  }

  const ListCardType = () => {    

    return (
      <Line className={`
        font-sans text-white dark:text-white uppercase 
        mt-0 bg-gradient-to-b 
        from-black to-gray-700         
        ${type ? '' : 'hidden'}
      `}>
        {item.post_type}
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
        font-sans text-black dark:text-gray-500
        ${item.featured && `text-black dark:text-black`}
        ${item.collectionName === 'pages' && `hidden`}
        ${itemDate === '' && `hidden`}        
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
    <li className={`h-full text-center`}>  

      <Link 
        href={`/en/${item.post_type}/post/${item.slug}`} 
        className={`
          hover:no-underline 
          ${item.featured && `hover:!text-black dark:hover:!text-black`}
        `}
      >

        <ListCardWrapper featured={item.featured}>
          
          <ListCardType />
          
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