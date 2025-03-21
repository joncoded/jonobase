/*
jonobase by @jonchius
/app/components/post/post-nook.tsx
displays all "nooks" (tags) of a "post"
*/

'use client'

import Link from "next/link"
import { styling } from "@/app/config"

export default function PostNook({nooks}: any) {

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