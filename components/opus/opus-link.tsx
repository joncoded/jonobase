
/*
jonobase by @jonchius
/app/components/opus/opus-link.tsx
the link button of each opus (post/side/wiki/zine/etc.) page
just takes in a link with "visit URL" as a label
*/

import Link from "next/link"
import { text } from "@/lib/app.config"

export default function OpusLink( {link} : { link : URL } ) {

  return (
    <div className={`my-5`}>
      <Link 
        className={`
          px-5 py-2 bg-black text-white text-lg 
          hover:border hover:border-black hover:bg-white hover:text-black
        `}
        href={link} 
        target="_blank"
      >
        {text['visit url']}
      </Link>
    </div>
  )  

}

