
/*
jonobase by @jonchius
/app/components/opus/opus-line.tsx
the "line" ui for each item (post/side/wiki) in lists, e.g. in home, finds, kinds, nooks, etc.
*/

import Image from 'next/image'
import Link from 'next/link'
import { UtilDOMChildrenProps, OpusListProps } from '@/sanity/myprops'
import { text } from '@/lib/app.config'
import { timezone, colors, styling } from '@/lib/app.config'

const linkColors = `${colors.link} dark:${colors.darkLink} hover:${colors.linkHover} dark:hover:${colors.darkLinkHover} hover:underline`

const OpusLine = ({opus : { _type, kind, slug, image, emoji, title, subtitle, link, date, showDate}, showType = false, showKind = false}: OpusListProps) => {

  const Card = ({children} : UtilDOMChildrenProps) => {
    return (
      <article className={`card-unit w-full`}>
        <div className={`flex gap-5`}>
          {children}
        </div>
      </article>
    )
  }

  const CardSide = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`card-side flex flex-col gap-5`}>
        {children}
      </div>
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

  const CardMeta = () => {

    let newDate = new Date(Date.parse(date))
    let formattedDate = new Intl.DateTimeFormat("sv-SE", { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: timezone }).format(newDate)

    return (
      <div className={`card-meta text-center text-sm`}>
        {showDate === true && <p className={`!my-0`}>{formattedDate}</p>}
        {showType === true && <p className={`!my-0`} aria-hidden="true"><Link tabIndex={-1} className={linkColors} href={`/${_type}s`}>{_type}</Link></p>}
        {showKind === true && <p className={`!my-0`} aria-hidden="true">[<Link tabIndex={-1} className={linkColors} href={`/${_type}s/${kind}`}>{kind}</Link>]</p>}
      </div>
    )
  }

  const CardBody = ({children}: UtilDOMChildrenProps) => {
    return (
      <div className={`card-body flex flex-col`}>
        {children}
      </div>
    )
  }

  const CardTitle = () => {
    return (
      <div className={`card-title`}>
        <h3 className={`font-semibold text-2xl ${colors.link} dark:${colors.darkLink} hover:${colors.linkHover} dark:hover:${colors.darkLinkHover} hover:underline !mt-2`}>
          {title}
        </h3>
      </div>
    )
  }

  const CardSubtitle = () => {
    return (
      <div className={`card-subtitle`}>
        <p className={`text-sm md:text-lg !mt-2 font-serif`}>
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

    <Card className={`card w-full`}>
      <CardSide>
        <CardImage />
        <CardMeta />
      </CardSide>
      <CardBody>
        <Link href={`/${_type}s/${kind}/${slug}`}>
          <CardTitle />
        </Link>
        <CardSubtitle />
        <CardExternalLink />
      </CardBody>
    </Card>

  )
}

export default OpusLine
