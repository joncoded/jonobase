/*
jonobase by @joncoded (aka @jonchius)
/app/components/post/post-nook.tsx
displays all "nooks" (tags) of a "post"
*/

'use client'

import Link from "next/link"
import { getStyling } from "@/app/config"

export default function PostNook({nooks, colorScheme = 'green'}: any) {

  const styling = getStyling(colorScheme)

  return (
    <div className="flex flex-wrap items-center gap-5">
      {nooks.map((nook: any) => {
        return (
          <Link
            className={`${styling['button']} ${styling['post-nook-item']}`}
            href={`/nooks/${encodeURI(nook)}`}
            key={nook}
          >
            {nook}
          </Link>
        )
      })}
    </div>
  )

}