
/*
jonobase by @jonchius
/app/components/post/post-link.tsx
the external link button of each post 
just takes in a link with "visit URL" as a label
*/

import Link from "next/link"
import { styling } from "@/lib/app.config"
import { text } from "@/lib/app.config"

export default function PostLink( {link} : { link : URL } ) {

  return (
    <div className={`my-5`}>
      <Link 
        className={`${styling['button']}`}
        href={link} 
        target="_blank"
      >
        {text['visit url']}
      </Link>
    </div>
  )  

}

