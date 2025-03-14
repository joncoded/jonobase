
/*
jonobase by @jonchius
/app/components/base/html/tail.tsx
the footer of each page
*/

import { getBase } from '@/sanity/actions'
import BlockContent from '@sanity/block-content-to-react'
import { serializers } from '../util/rich'
import { colors } from '@/lib/app.config'

export default async function Tail() {  

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const { colophon1, colophon2 } = myBase || ''

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
    <footer className={`tail-wrapper 
      w-full border-t border-gray-300 bg-gradient-to-b from-black to-gray-900 mt-auto p-5 font-sans
    `}>
      <div className={`tail-prop 
        max-w-screen-lg flex max-md:flex-col justify-between gap-0 mx-auto 
        prose prose-p:text-white prose-p:my-2 md:propse-p:my-0 
        prose-a:${colors.link} prose-a:font-bold prose-a:no-underline 
        dark:prose-a:${colors.darkLink}
        hover:prose-a:${colors.darkLinkHover} 
        hover:prose-a:underline p-5 xl:p-0
        dark:hover:prose-a:${colors.darkLinkHover}
      `}>
        <Colophon1 />
        <Colophon2 />
      </div>
    </footer>
  )
  
}
