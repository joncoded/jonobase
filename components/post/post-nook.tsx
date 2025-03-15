/*
jonobase by @jonchius
/app/components/post/post-nook.tsx
displays all "nooks" (tags) of a "post" 
*/

'use client'

import Link from "next/link"

export default function PostNook({nooks}: any) {

  return (
    <div className="flex flex-wrap items-center gap-5">
      {nooks.map((nook: any) => {
        return (
          <Link
            className={`
              post-nook-item border border-black dark:border-white p-2 px-5
              bg-white hover:bg-black text-black hover:text-white
              dark:focus:ring-4 focus:ring-offset-2
            `}
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