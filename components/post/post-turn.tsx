/*
jonobase by @joncoded (aka @jonchius)
/app/components/post/post-turn.tsx
the "prev/next" (page turner) links for posts
just takes in the newer (post) and older (post) as parameters
*/

import Link from "next/link"
import { getColors, text } from "@/app/config"

import { PostAdjacentProps } from "@/sanity/myprops"

export default function PostTurn( { newer, turnTitle, older, colorScheme = 'green' } : { newer?: PostAdjacentProps, turnTitle: string, older?: PostAdjacentProps, colorScheme?: string } ) {

  const colors = getColors(colorScheme)
  const linkColors = `${colors.link} dark:${colors.darkLink} hover:${colors.linkHover} dark:hover:${colors.darkLinkHover} hover:underline`

  return (
    <div className={`flex flex-col md:flex-row ${older ? `justify-between` : `justify-end`} gap-5`}>
      { older &&
        <div className={`flex-1 text-center md:text-left`}>
          <strong>⬅️ {text['older']}</strong> ({turnTitle}) <br />
          <span className={`hover:no-underline`}>{older.emoji} </span>
          <Link className={linkColors} href={`/${older.join}/${older.kind}/${older.slug}`}>
            {older.title}
          </Link>
        </div>
      }
      { newer &&
        <div className={`flex-1 text-center md:text-right`}>
          <strong>{text['newer']}</strong> ({turnTitle}) ➡️<br />
          <Link className={linkColors} href={`/${newer.join}/${newer.kind}/${newer.slug}`}>
            {newer.title}
          </Link>
          <span className={`hover:no-underline`}> {newer.emoji}</span>
        </div>
      }
    </div>
  )

}