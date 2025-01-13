
/*
jonobase by @jonchius
/app/components/post-line.tsx
the card for each (blog) post (in lists)
*/

import Image from 'next/image'
import Link from 'next/link'
import { UtilDOMChildrenProps, PostProps } from '@/lib/types'
import { text } from '@/lib/app.config'

const PostLine = ({post : { slug, image, title, subtitle, link, date, showDate}}: PostProps) => {  

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
              src={`${image}?w=256`} 
              alt={title} 
              width={0}
              height={0}
              sizes={`auto`}
              className={`rounded-full w-[80px] h-[80px]`}
            />
          </div> 
        } 
      </div>
    )
  }

  const CardMeta = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`card-meta flex flex-col px-5`}>
        {children}
      </div>
    )
  }
  
  const CardTitle = () => {
    return (
      <div className={`card-title`}>
        <h3 className={`font-sans font-semibold text-2xl text-sky-600 hover:text-black dark:hover:text-white hover:underline`}>
          {title}
        </h3>
      </div>      
    )
  }


  const CardDate = () => {
    if (!showDate) return <></>
    return (
      <div className={`card-date`}>
        <p className={`font-serif text-sm`}>
          {date.substring(0, 10)}
        </p> 
      </div>
    )
  }


  const CardSubtitle = () => {
    return (
      <div className={`card-subtitle`}>
        <p className={`font-serif text-sm`}>
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
            className={`border border-black dark:border-white p-2 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black`} 
            href={link}
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
        <Link href={`/posts/${slug}`}>
          <CardTitle />
        </Link>
        <CardDate />
        <CardSubtitle />
        <CardExternalLink />        
      </CardMeta>
    </Card>    
  
  )
}

export default PostLine
