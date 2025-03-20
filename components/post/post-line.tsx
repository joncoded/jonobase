
/*
jonobase by @jonchius
/app/components/post/post-line.tsx
the link to each post (used for lists)
*/

import Image from 'next/image'
import Link from 'next/link'
import { UtilDOMChildrenProps, PostListProps } from '@/sanity/myprops'
import { text } from '@/app/config'
import { timezone, colors, styling } from '@/app/config'

const linkColors = `${colors.link} dark:${colors.darkLink} hover:${colors.linkHover} dark:hover:${colors.darkLinkHover} hover:underline`

const PostLine = ({post : { join, kind, slug, image, emoji, title, subtitle, link, date, showDate}, showJoin = false, showKind = false}: PostListProps) => {

  const PostLine = ({children} : UtilDOMChildrenProps) => {
    return (
      <article className={`card-unit w-full`}>
        <div className={`flex gap-5`}>
          {children}
        </div>
      </article>
    )
  }

  const PostLineSide = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`card-side flex flex-col gap-5`}>
        {children}
      </div>
    )
  }

  const PostLineImage = () => {

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
          <p
            aria-hidden="true"
            className={`w-full h-full min-h-[80px] min-w-[80px]`}
          >
            {emoji}
          </p>
        }
      </div>
    )
  }

  const PostLineMeta = () => {

    let newDate = new Date(Date.parse(date))
    let formattedDate = new Intl.DateTimeFormat("sv-SE", { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: timezone }).format(newDate)

    return (
      <div className={`card-meta text-center text-sm`}>
        {showDate === true && <p className={`!my-0`}>{formattedDate}</p>}
        {showJoin === true && <p className={`!my-0`} aria-hidden="true"><Link tabIndex={-1} className={linkColors} href={`/${join}`}>{join}</Link></p>}
        {showKind === true && <p className={`!my-0`} aria-hidden="true">[<Link tabIndex={-1} className={linkColors} href={`/${join}/${kind}`}>{kind}</Link>]</p>}
      </div>
    )
  }

  const PostLineBody = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`card-body flex flex-col`}>
        {children}
      </div>
    )
  }

  const PostLineTitle = () => {
    return (
      <div className={`card-title`}>
        <h3 className={`font-semibold text-2xl ${colors.link} dark:${colors.darkLink} hover:${colors.linkHover} dark:hover:${colors.darkLinkHover} hover:underline !mt-2`}>
          {title}
        </h3>
      </div>
    )
  }

  const PostLineSubtitle = () => {
    return (
      <div className={`card-subtitle`}>
        <p className={`text-sm md:text-lg !mt-2 font-serif`}>
          {subtitle}
        </p>
      </div>
    )
  }

  const PostLineExternalLink = () => {
    return (
      <div className={`card-link my-5 ${!link && `hidden`}`}>
        {link &&
          <Link
            className={`${styling['button']}`}
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

    <PostLine className={`card w-full`}>
      <PostLineSide>
        <PostLineImage />
        <PostLineMeta />
      </PostLineSide>
      <PostLineBody>
        <Link href={`/${join}/${kind}/${slug}`}>
          <PostLineTitle />
        </Link>
        <PostLineSubtitle />
        <PostLineExternalLink />
      </PostLineBody>
    </PostLine>

  )
}

export default PostLine
