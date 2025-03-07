
/*
jonobase by @jonchius
/app/components/post-line.tsx
the card for each (blog) post (in lists)
*/

import Image from 'next/image'
import Link from 'next/link'
import { UtilDOMChildrenProps, PostProps } from '@/lib/types'
import { text } from '@/lib/app.config'
import { timezone } from '@/lib/app.config'

const PostLine = ({post : { slug, image, emoji, title, subtitle, link, date, showDate}}: PostProps) => {  

  const Card = ({children} : UtilDOMChildrenProps) => {
    return (
      <article className={`card-unit w-full `}>
        <div className={`flex`}>
          {children}
        </div>
      </article>
    )
  }

  const CardImage = () => {

    return (      
      <div className={`card-image 
        text-7xl max-w-[80px] min-h-[80px] w-[80px] h-[80px] max-h-[80px] min-h-[80px] rounded-full
      `}>
        {image &&           
          <Image               
            src={`${image}`} 
            alt={``} 
            height={0}
            width={0}
            sizes={`(max-width: 768px) 25vw, 10vw`}
            quality={`100`}
            className={`w-full h-full min-h-[80px] min-w-[80px] object-cover border-0 rounded-full shadow-xl !my-2`}
          />          
        } 
        {!image && 
          <p aria-hidden="true">
            {emoji}
          </p>
        } 
      </div>
    )
  }

  const CardMeta = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`card-meta font-sans flex flex-col px-5`}>
        {children}
      </div>
    )
  }

  const CardDate = () => {
    if (!showDate) return <></>
    let newDate = new Date(Date.parse(date))
    let formattedDate = new Intl.DateTimeFormat("sv-SE", { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: timezone }).format(newDate)
    
    return (
      <div className={`card-date`}>
        <p className={`text-md !my-0`}>
          {formattedDate} 
        </p> 
      </div>
    )
  }
  
  const CardTitle = () => {
    return (
      <div className={`card-title`}>
        <h3 className={`font-semibold text-2xl text-sky-600 dark:text-lime-300 hover:text-black dark:hover:text-white hover:underline !mt-2`}>
          {title}
        </h3>
      </div>      
    )
  }

  const CardSubtitle = () => {
    return (
      <div className={`card-subtitle`}>
        <p className={`text-sm md:text-md !mt-2`}>
          {subtitle}
        </p>
      </div>
    )
  }

  const CardExternalLink = () => {
    return (
      <div className={`card-link my-5 ${!link && `hidden`}`}>
        {link && 
          <Link 
            className={`card-link-link px-5 py-2 bg-black text-white text-lg 
            hover:border hover:border-black hover:bg-white hover:text-black`} 
            href={link} 
            target="_blank"
          >
            {text['visit url']}
          </Link>
        }
      </div>
    )
  }

  return (    
    
    <Card className={`card w-full min-w-[80px] min-h-[80px]`}>      
      <CardImage />        
      <CardMeta>        
        <CardDate />         
        <Link href={`/posts/${slug}`}>
          <CardTitle />
        </Link>        
        <CardSubtitle />        
      </CardMeta>
    </Card>    
  
  )
}

export default PostLine
