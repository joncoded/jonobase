
/*
jonobase by @jonchius
/app/components/opus/opus-list.tsx
the list of opus (post/side/wiki/zine) instances (plural of opus: "opera")
*/

'use client'

import OpusLine from './opus-line'
import { text } from '@/lib/app.config'

export default function OpusList({opera} : any) {

  return (
    <div className="opus-list-base w-full sm:justify-start">

      {opera?.length === 0 &&
        <div className="opus-list-meat py-0 md:py-5">
          <p className="text-center">{text['results found none']}</p>
        </div>
      }

      {opera?.length > 0 &&
        <>
          <div className="opus-list-meat grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-0 md:py-5 gap-10">

            {opera.map((opus: any) => (

              <OpusLine key={opus._id} opus={opus} />

            ))}

          </div>
        </>
      }

    </div>
  )

}