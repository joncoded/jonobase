
/*
jonobase by @jonchius
/app/components/post/post-head.tsx
the head of each post page
shows the emoji (or background image) + title + subtitle + date
*/

import Link from "next/link"
import { PostProps } from "@/sanity/myprops"
import { timezone, styling, text } from "@/app/config"
import getFormattedDate from "../base/util/date-form"

export default function PostHead( { post } : { post : PostProps } ) {
  const { _id, _updatedAt, title, emoji, subtitle, image = "", date, showDate } = post

  const formattedDate = getFormattedDate({date, timezone, time: true})
  const formattedUpdated = getFormattedDate({date: _updatedAt, timezone, time: true})

  return (
    <div className={`flex gap-5
      ${image
        ? 'bg-zinc-900/70 text-white p-5 md:p-10 my-5'
        : 'text-black dark:text-white'
      }
    `}>

      <div className={`flex flex-col gap-2 md:gap-5`} aria-hidden={true}>
        {emoji && <div className={`${styling['post-head-title']}`}>{emoji}</div>} 
        <div className={`${styling['post-head-date']} text-sky-700 text-center hover:text-black`}>
          <Link href={`/studio/structure/post;${_id}`}>edit</Link>
        </div> 
      </div>
      
      <div className={`flex flex-col gap-2 md:gap-5`}>
        <h1 className={`${styling['post-head-title']}`}>
          {title}
        </h1>
        { subtitle &&
        <div className={`${styling['post-head-subtitle']}`}>
          {subtitle}
        </div>
        }
        <div className={`${styling['post-head-date']}`}>       
          {showDate && <span>{formattedDate}</span>}
          {_updatedAt && (date !== _updatedAt) &&
            <>
              <br className="md:hidden" />
              <span className="text-sm md:text-lg"> // {text['updated']} {formattedUpdated}</span>
            </>
          }
        </div>
      </div>

    </div>
  )

}