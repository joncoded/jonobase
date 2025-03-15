/*
jonobase by @jonchius
/app/components/base/html/main-apex.tsx
breadcrumbs for top of each page
"first" refers to first-level "subfolder" of domain
"second" refers to second-level "subfolder" of domain
(no more than two levels of breadcrumbs to keep things simpler)
"post" refers to whether the page is at the "post" (article) level
*/

import Link from "next/link"
import { Span } from "./main"
import { colors } from "@/lib/app.config"

export default function Apex( { first, second, post = false } : { first: string, second?: string, post?: boolean }) {

  const linkColors = `${colors.link} dark:${colors.darkLink} hover:${colors.linkHover} dark:hover:${colors.darkLinkHover}`

  return (
    <aside className={`uppercase`}>
      <>

        { (first && !second) && <Span className={`text-lg md:text-2xl`}>{first}</Span>}

        { (first && second) && (
          <>
            <Span className={`text-lg md:text-2xl`}>
              <Link className={linkColors} href={`/${first}/`}>{first}</Link>
            </Span>
            <Span ariaHidden={true}> / </Span>
          </>
        )}

        { (second && post === false) && <Span className={`text-sm md:text-lg`}>{second}</Span> }

        { (second && post === true) && (
          <>
            <Span className={`text-sm md:text-lg`}>
              <Link className={linkColors} href={`/${first}/${second}/`}>{second}</Link>
            </Span>
          </>
        )}

      </>
    </aside>

  )

}