
/*
jonobase by @joncoded (aka @jonchius)
/app/components/post/post-link.tsx
the external link button of each post 
just takes in a link with "visit URL" as a label
*/

import Link from "next/link"
import { getStyling } from "@/app/config"
import { text } from "@/app/config"

export default function PostLink( {link, colorScheme = 'green'} : { link : URL, colorScheme?: string } ) {

  const styling = getStyling(colorScheme)

  return (
    <div className={`flex justify-end mt-5`}>
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

