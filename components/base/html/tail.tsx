"use client"

/*
jonobase by @jonchius
/app/components/base/html/tail.tsx
the footer of each page
*/

import { getBase } from "@/sanity/actions"
import BlockContent from "@sanity/block-content-to-react"
import { serializers } from "../util/rich"
import { styling } from "@/app/config"

export default function Tail({ base }: { base: any }) {

  const { colophon1, colophon2 } = base || ""

  const Colophon1 = () => {
    return (
      <div className={`tail-colo-1 text-center md:text-left`}>
        <BlockContent 
          blocks={colophon1} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        />        
      </div>
    )
  }

  const Colophon2 = () => {
    return (
      <div className={`tail-colo-2 text-center md:text-right`}>
        <BlockContent 
          blocks={colophon2} 
          serializers={serializers} 
          dataset="production"
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
        />        
      </div>
    )
  }

  return (
    <footer id="tail-wrap" className={`${styling['tail-wrap']}`}>    
      <div className={`${styling['tail-prop']}`}>      
        <Colophon1 />
        <Colophon2 />
      </div>
    </footer>
  )
  
}