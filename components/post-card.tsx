import { UtilDOMChildrenProps, PostProps } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { text } from '@/lib/app.config'
import { Span } from './main'

const PostCard = ({post : { slug, image, title, kind, subtitle, link, date}}: PostProps) => {  

  const Card = ({children} : UtilDOMChildrenProps) => {
    return (
      <article className={`card-unit w-full border-2 border-gray-200 !bg-transparent`}>
        <div className={`flex flex-col justify-center`}>
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
        <h3 className={`font-sans text-sky-500 hover:text-black dark:hover:text-white hover:underline text-2xl md:text-4xl font-semibold`}>
          {title}
        </h3>
      </div>      
    )
  }


  const CardDate = () => {
    return (
      <div className={`card-date text-sm`}>
        {date.substring(0, 10)} {date.substring(11, 16)}
      </div>
    )
  }

  const CardImage = () => {
    return (      
      <>
        {image && 
          <div className={`card-image w-full`}>
            <Image               
              src={image} 
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
          {kind && <Span className={`font-bold`}>{kind}</Span>} : {subtitle}
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
    <Card className={`card w-full border !bg-transparent`}>
      <Link href={`/posts/${slug}`}>
        <CardHeader>
          <CardTitle />
          <CardDate />
        </CardHeader>        
        <CardImage />        
      </Link>      
      <CardMeta>        
        <CardSubtitle />
        <CardExternalLink />        
      </CardMeta>
    </Card>    
  )
}

export default PostCard
