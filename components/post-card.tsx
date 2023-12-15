import { PostProps } from '@/lib/types'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

const PostCard = ({post : { slug, image, title, category}}: PostProps) => {
  return (
    <Link href={`/posts/${slug.current}`}>
      <Card className="w-full border-2 !bg-transparent">
        <CardHeader className="flex flex-col justify-center gap-5">
          <div className="w-full h-full relative">
            <Image               
              src={image} 
              alt={title} 
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
          <CardTitle className="text-white paragraph-semibold line-clamp-1 w-full text-left">{title}</CardTitle>          
        </CardHeader>
        <CardContent className="flex justify-between">
          {category}
        </CardContent>
      </Card>
    </Link>
  )
}

export default PostCard
