
/*
jonobase by @jonchius
/app/components/post/post-head.tsx
the head of each post page
shows the emoji (or background image) + title + subtitle + date
*/

import { PostProps } from "@/sanity/myprops"
import { timezone, styling, text } from "@/app/config"
import getFormattedDate from "../base/util/date-form"

export default function PostHead( { post } : { post : PostProps } ) {

  const { _updatedAt, title, emoji, subtitle, image, date, showDate } = post
  const formattedDate = getFormattedDate({date, timezone, time: true})
  const formattedUpdated = getFormattedDate({date: _updatedAt, timezone, time: true})

  return (
    <div className={`flex gap-5
      ${image
        ? 'bg-zinc-900/70 text-white p-5 md:p-10 my-5'
        : 'text-black dark:text-white'
      }
    `}>

      {emoji && 
      <div className={`${styling['post-head-title']}`} aria-hidden={true}>
        {emoji}
      </div>
      }
      <div>
        <h1 className={`${styling['post-head-title']}`}>
          {title}
        </h1>
        { subtitle &&
        <p className={`${styling['post-head-subtitle']}`}>
          {subtitle}
        </p>
        }
        <p className={`${styling['post-head-date']}`}>
          {showDate &&
            <span>{formattedDate}</span>}
          {_updatedAt && (date !== _updatedAt) &&
            <span className="text-xs md:text-sm"> {text['updated']} {formattedUpdated}</span>
          }
        </p>
      </div>
    </div>
  )

}

