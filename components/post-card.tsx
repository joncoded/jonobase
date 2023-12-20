import { UtilDOMChildrenProps, PostProps } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { text } from '@/lib/app.config'

const PostCard = ({post : { slug, image, title, kind, subtitle, link, date}}: PostProps) => {

  const Card = ({children} : UtilDOMChildrenProps) => {
    return (
      <article className="w-full border-2 border-gray-200 !bg-transparent">
        <div className="flex flex-col justify-center">
          {children}
        </div>
      </article>
    )
  }

  const CardHeader = ({children} : UtilDOMChildrenProps) => {
    return (
      <div className="flex flex-col gap-5 p-5">
        {children}
      </div>
    )
  }

  const CardTitle = () => {
    return (
      <div className="card-title">
        <h3 className="font-sans text-2xl md:text-4xl font-semibold">
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
          <div className="w-full">
            <Image               
              src={image} 
              alt={title} 
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div> 
        } 
      </>     
    )
  }
  
  const CardMeta = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className="flex flex-col p-5 gap-2">
        {children}
      </div>
    )
  }

  const CardSubtitle = () => {
    return (
      <div className="card-subtitle">
        <p className="font-serif text-lg">{kind} : {subtitle}</p>
      </div>
    )
  }

  const CardExternalLink = () => {
    return (
      <div className={`card-link my-5 ${!link && `hidden`}`}>
        {link && 
          <Link 
            className={`border border-black p-2 hover:bg-black hover:text-white`} 
            href={link}
          >
            {text['visit url']}
          </Link>
        }
      </div>
    )
  }

  return (    
    <Card className="w-full border !bg-transparent">
      <Link href={`/posts/${slug.current}`}>
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
