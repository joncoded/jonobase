
/*
jonobase by @jonchius
/app/components/list/list-post.tsx
the link to each post (used for lists)
*/

import Image from "next/image"
import Link from "next/link"
import { UtilDOMChildrenProps, PostListProps } from "@/sanity/myprops"
import { text } from "@/app/config"
import { timezone, colors, styling } from "@/app/config"

function countEmojis(str: string) {  
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });  
  return [...segmenter.segment(str)].length;
}

const linkColors = `${colors.link} dark:${colors.darkLink} hover:${colors.linkHover} dark:hover:${colors.darkLinkHover} hover:underline`

const ListPost = ({post : { join, kind, slug, image, emoji, title, subtitle, link, date, showDate}, showJoin = false, showKind = false}: PostListProps) => {

  const ListPostContainer = ({children} : UtilDOMChildrenProps) => {
    return (
      <article className={`w-full`}>
        <div className={`flex gap-5`}>
          {children}
        </div>
      </article>
    )
  }

  const ListPostSide = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`flex flex-col`}>
        {children}
      </div>
    )
  }

  const ListPostImage = () => { 

    let emojiSize
    console.log(title, countEmojis(emoji))
    switch (countEmojis(emoji)) {
      case 2:
        emojiSize = 'text-4xl'
        break
      case 3:
        emojiSize = 'text-2xl'
        break
      default:
        emojiSize = 'text-7xl mb-5'
    }

    return (
      <div className={`
        ${emojiSize} max-w-[80px] min-h-[80px] w-[80px] h-[80px] max-h-[80px] min-h-[80px] rounded-full text-center 
      `}>
        {image &&
          <Image
            src={`${image}`}
            alt={``}
            height={0}
            width={0}
            sizes={`(max-width: 768px) 25vw, 10vw`}
            quality={`100`}
            className={`w-full h-full min-h-[80px] min-w-[80px] object-cover border-0 rounded-full shadow-xl my-2!`}
          />
        }
        {!image &&
          <p
            aria-hidden="true"
            className={`w-full h-full min-h-[80px] min-w-[80px]`}
          >
            {(countEmojis(emoji) == 0 || countEmojis(emoji) > 3) ? "📓" : emoji}
          </p>
        }        
      </div>
    )
  }

  const ListPostMeta = () => {

    let newDate = new Date(Date.parse(date))
    let formattedDate = new Intl.DateTimeFormat("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: timezone }).format(newDate)

    return (
      <div className={`text-center text-sm`}>
        {showDate === true && <p className={`my-0!`}>{formattedDate}</p>}
        {showJoin === true && <p className={`my-0!`} aria-hidden="true"><Link tabIndex={-1} className={linkColors} href={`/${join}`}>{join}</Link></p>}
        {showKind === true && <p className={`my-0!`} aria-hidden="true">[<Link tabIndex={-1} className={linkColors} href={`/${join}/${kind}`}>{kind}</Link>]</p>}
      </div>
    )
  }

  const ListPostBody = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`flex flex-col`}>
        {children}
      </div>
    )
  }

  const ListPostTitle = () => {
    return (
      <div className={``}>
        <h3 className={`mt-2! ${linkColors} hover:underline text-lg md:text-2xl font-semibold`}>
          {title}
        </h3>
      </div>
    )
  }

  const ListPostSubtitle = () => {
    return (
      <div className={``}>
        <p className={`mt-2! text-sm md:text-lg`}>
          {subtitle}
        </p>
      </div>
    )
  }

  const ListPostExternalLink = () => {
    return (
      <div className={`my-5 ${!link && `hidden`}`}>
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

    <ListPostContainer className={`w-full`}>
      <ListPostSide>
        <ListPostImage />
        <ListPostMeta />
      </ListPostSide>
      <ListPostBody>
        <Link href={`/${join}/${kind}/${slug}`}>
          <ListPostTitle />
        </Link>
        <ListPostSubtitle />
        <ListPostExternalLink />
      </ListPostBody>
    </ListPostContainer>

  )
}

export default ListPost
