import { DOMChildrenProps, PostProps } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { text } from '@/lib/app.config'

const PostCard = ({post : { slug, image, title, category, subtitle, link, date}}: PostProps) => {

  const Card = ({children} : DOMChildrenProps) => {
    return (
      <article className="w-full border-2 border-gray-200 !bg-transparent">
        <div className="flex flex-col justify-center">
          {children}
        </div>
      </article>
    )
  }

  const CardHeader = () => {
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

  const CardTitle = () => {
    return (
      <div className="card-title">
        <h3 className="font-sans text-xl md:text-3xl">{title}</h3>
      </div>      
    )
  }

  const CardMeta = ({children}: DOMChildrenProps) => {
    return (
      <div className="flex flex-col p-5 gap-2">
        {children}
      </div>
    )
  }

  const CardSubtitle = () => {
    return (
      <div className="card-subtitle">
        <p className="font-serif text-lg">{category} : {subtitle}</p>
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

  const CardDate = () => {
    return (
      <div className={`card-date text-sm`}>
        {date.substring(0, 10)} {date.substring(11, 16)}
      </div>
    )
  }

  return (    
    <Card className="w-full border !bg-transparent">
      <CardMeta>
        <CardTitle />
        <CardDate />
      </CardMeta>      
      <Link href={`/posts/${slug.current}`}>
        <CardHeader />        
      </Link>      
      <CardMeta>        
        <CardSubtitle />
        <CardExternalLink />        
      </CardMeta>
    </Card>    
  )
}

export default PostCard
