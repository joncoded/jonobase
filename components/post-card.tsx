
/*
jonanity by @jonchius
/app/components/post-card.tsx
the card for each (blog) post (in lists), e.g. in home, finds, kinds, moods, etc.
*/

import Image from 'next/image'
import Link from 'next/link'
import { UtilDOMChildrenProps, PostProps } from '@/lib/types'
import { text } from '@/lib/app.config'

const PostCard = ({post : { slug, image, title, subtitle, link, date, showDate}}: PostProps) => {  

  const Card = ({children} : UtilDOMChildrenProps) => {
    return (
      <article className={`card-unit w-full border border-gray-300 dark:border-gray-800 !bg-zinc-100 text-black dark:!bg-black dark:text-white shadow-lg`}>
        <div className={`flex flex-col h-full justify-between`}>
          {children}
        </div>
      </article>
    )
  }

  const CardHeader = ({children} : UtilDOMChildrenProps) => {
    return (
      <div className={`card-header flex flex-col gap-5 p-5`}>
        {children}
      </div>
    )
  }

  const CardTitle = () => {
    return (
      <div className={`card-title`}>
        <h3 className={`font-sans font-semibold text-2xl md:text-4xl text-sky-600 hover:text-black dark:hover:text-white hover:underline`}>
          {title}
        </h3>
      </div>      
    )
  }


  const CardDate = () => {
    if (!showDate) return <></>
    return (
      <div className={`card-date text-sm`}>
        {date.substring(0, 10)} 
      </div>
    )
  }

  const CardImage = () => {
    return (      
      <>
        {image && 
          <div className={`card-image w-full shadow-xl`}>
            <Image               
              src={`${image}?w=640`}
              alt={title} 
              width={0}
              height={0}
              sizes={`100vw`}              
              className={`w-full h-auto`}
            />
          </div> 
        } 
      </>     
    )
  }
  
  const CardMeta = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`card-meta flex flex-col px-5 gap-2`}>
        {children}
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
      <div className={`card-link mb-10 ${!link && `hidden`}`}>
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
    <Card className={`card w-full border`}>
      <Link href={`/posts/${slug}`}>
        <CardHeader>
          <CardTitle />
          <CardDate />
        </CardHeader>                        
      </Link>      
      <CardMeta>        
        <CardSubtitle />
        <CardExternalLink />        
      </CardMeta>      
    </Card>    
  )
}

export default PostCard
