
/*
jonobase
/app/(basis)/item/item-flat.tsx
"flat" style of list item
- emoji as a non-link
- date as a non-link
- kind as an optional non-link
- title as a link
- summary as a non-link
*/

import Link from "next/link"
import { Span, Paragraph } from "@/app/(basis)/util/tidy-html"
import { getFormattedDate } from "@/app/(basis)/util/func"

export default function ItemFlat({item, view} : any) {

  let itemDate = getFormattedDate(item.created)

  const ItemFlatEmoji = () => {
    return (
      <Span
        className={`text-2xl mr-1`} 
        ariaHidden={true}
      >
        {item.emoji ? item.emoji : `🤷🏻‍♂️`}
      </Span>
    )
  }

  const ItemFlatDate = () => {
    return (
      <Span className={`
        text-md md:text-xl text-black dark:text-white mt-2
        ${item.featured ? `text-black dark:text-yellow-500` : ``}
      `}>
        {item.featured && 
          <Span 
            ariaLabel={lang.featured}
            className={`mr-2`}
          >📌</Span>
        }
        <Span>{itemDate}</Span>
      </Span> 
    )
  }

  const ItemFlatKind = () => {
    return (
      <Span className={`ml-1 dark:text-gray-500`}>
        ( {item.expand.kind.slug} )
      </Span>
    )
  }

  const ItemFlatTitle = () => {
    return (
      <Paragraph className={`
        hover:underline text-2xl !mb-0
      `}> 
        {item.title}
      </Paragraph>
    )
  }

  const ItemFlatSummary = () => {
    return (
      <Paragraph className={`font-serif text-black dark:text-slate-500 mt-0`}> 
        {item.summary}
      </Paragraph>
    )
  }

  return (
    <li className={`h-full text-center md:text-left hover:prose-a:!no-underline`}>  
      
      <ItemFlatEmoji />
      {item.show_date && <ItemFlatDate />}
      {kind && <ItemFlatKind />}
            
      <Link 
        href={`/posts/${item.slug}`} 
        className={`${item.featured && `hover:!text-black dark:hover:!text-white`}`}
      >
        <ItemFlatTitle />
      </Link>

      <ItemFlatSummary />

    </li>
  )
}