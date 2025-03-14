/*
jonobase by @jonchius
/app/components/opus/opus-turn.tsx
the "prev/next" (page turner) links to each opus (post/side/wiki/zine/etc.) page
just takes in the newer (opus) and older (opus) as parameters
*/

import Link from "next/link"
import { colors, text } from "@/lib/app.config"

import { OpusAdjacentProps } from "@/sanity/myprops"

export default function OpusTurn( { newer, turnTitle, older } : { newer?: OpusAdjacentProps, turnTitle: string, older?: OpusAdjacentProps } ) {

  const linkColors = `${colors.link} dark:${colors.darkLink} hover:${colors.linkHover} dark:hover:${colors.darkLinkHover} hover:underline`  

  return (
    <div className={`flex flex-col md:flex-row ${newer ? `justify-between` : `justify-end`} gap-5`}>
      { newer &&
        <div className={`flex-1 text-center md:text-left`}>
          {text['newer']} ({turnTitle}) <br />
          <Link className={linkColors} href={`/${newer._type}s/${newer.kind}/${newer.slug}`}>{newer.title}</Link>
        </div>
      }
      { older &&
        <div className={`flex-1 text-center md:text-right`}>
          {text['older']} ({turnTitle}) <br />
          <Link className={linkColors} href={`/${older._type}s/${older.kind}/${older.slug}`}>{older.title}</Link>
        </div>
      }
    </div>
  )

}