

/*
jonobase
/app/(basis)/loop/loop-show.tsx
loop wrapper for finds/kinds/lists etc
*/

import ItemCard from "../item/item-card"
import ItemDrop from "../item/item-drop"
import ItemFlat from "../item/item-flat"
import ItemLite from "../item/item-lite"
import ItemMini from "../item/item-mini"
import ItemNull from "../item/item-null"

export const LoopShow = ({kind = false, lang, items, type = 'card'}: any) => {

  let trio = false
  let gap = 'gap-10'

  switch (type) {
    case "lite":
    case "mini":
    case "null": 
      gap = 'gap-0 md:gap-5'      
      break
    default:
      trio = true      
  }

  return (

    <>

      {(items && items.length > 0) &&       
      
        <ul className={`loop-list
          w-max max-w-full md:w-auto mx-auto 
          items-start py-10
          grid ${gap} grid-cols-1 
          ${items.length >= 2 && `md:grid-cols-2`} 
          ${(items.length >= 3 && trio) && `lg:grid-cols-3`}
        `}>
    
          {items.map((item: any) => {
            switch (type) {
              case "card":
                return (
                  <ItemCard key={item.id} lang={lang} kind={kind} item={item} />
                )
              case "drop":
                return (
                  <ItemDrop key={item.id} lang={lang} kind={kind} item={item} />
                )
              case "flat":
                return (
                  <ItemFlat key={item.id} lang={lang} kind={kind} item={item} />
                )
              case "lite":
                return (                  
                  <ItemLite key={item.id} lang={lang} kind={kind} item={item} />
                )
              case "mini":
                return (
                  <ItemMini key={item.id} lang={lang} kind={kind} item={item} />
                )
              case "null": 
                return (
                  <ItemNull key={item.id} lang={lang} kind={kind} item={item} />
                  )
              default:
                return (
                  <ItemCard key={item.id} lang={lang} kind={kind} item={item} />
                )
            }
          })}        

        </ul>
        
      }

    </>

  )

}