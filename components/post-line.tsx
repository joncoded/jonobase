
/*
jonobase by @jonchius
/app/components/post-line.tsx
the card for each (blog) post (in lists)
*/

import Image from 'next/image'
import Link from 'next/link'
import { UtilDOMChildrenProps, PostProps } from '@/lib/types'
import { text } from '@/lib/app.config'

const PostLine = ({post : { slug, image, emoji, title, subtitle, link, date, showDate}}: PostProps) => {  

  const Card = ({children} : UtilDOMChildrenProps) => {
    return (
      <article className={`card-unit w-full`}>
        <div className={`flex`}>
          {children}
        </div>
      </article>
    )
  }

  const CardImage = () => {
    return (      
      <div>
        {image && 
          <div className={`card-image w-[80px] h-[80px] shadow-xl rounded-full`}>
            <Image               
              src={`${image}`} 
              alt={``} 
              width={0}
              height={0}
              sizes={`10vw`}
              quality={`100`}
              className={`rounded-full w-full h-full object-cover`}
            />
          </div> 
        } 
        {!image && 
          <div className={`card-image text-7xl`}>
            {emoji}
          </div>
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
    return (
      <div className={`card-date`}>
        <p className={`text-md !my-0`}>
          {date.substring(0, 10)}
        </p> 
      </div>
    )
  }
  
  const CardTitle = () => {
    return (
      <div className={`card-title`}>
        <h3 className={`font-semibold text-2xl text-sky-600 hover:text-black dark:hover:text-white hover:underline !mt-2`}>
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
    
    <Card className={`card w-full`}>      
      <CardImage />        
      <CardMeta>
        <CardDate />
        <Link href={`/posts/${slug}`}>
          <CardTitle />
        </Link>        
        <CardSubtitle />
        <CardExternalLink />        
      </CardMeta>
    </Card>    
  
  )
}

export default PostLine
