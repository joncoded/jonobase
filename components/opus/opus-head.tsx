
/*
jonobase by @jonchius
/app/components/opus/opus-head.tsx
the head of each opus (post/side/wiki/zine/etc.) page
shows the emoji (or background image) + title + subtitle + date 
*/

import { OpusProps } from "@/sanity/myprops"
import getFormattedDate from "../base/util/date-form"
import { timezone } from "@/lib/app.config"

export default function OpusHead( { opus } : { opus : OpusProps } ) {

  const { title, emoji, subtitle, image, date, showDate } = opus
  const formattedDate = getFormattedDate({date, timezone, time: true})

  return (
    <div className={`flex gap-5 ${image ? 'bg-zinc-900/70 text-white p-5 md:p-10 my-5' : 'text-black dark:text-white'}`}>        

      {emoji && <div className="text-5xl" aria-hidden={true}>{emoji}</div>}
      <div>
        <h1 className="text-5xl font-bold">          
          {title}
        </h1> 
        { subtitle && <p className="text-xl md:text-2xl mt-2">{subtitle}</p>}
        { showDate && 
          <p className="text-sm md:text-lg mt-6">              
            <span className="">{formattedDate}</span>             
          </p>
        }
      </div>
    </div>
  )  

}

