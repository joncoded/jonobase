/*
jonobase by @jonchius
/app/components/base/html/main-apex.tsx
breadcrumbs for top of each page
"first" refers to first-level "subfolder" of domain
"second" refers to second-level "subfolder" of domain
(no more than two levels of breadcrumbs to keep things simpler)
"opus" refers to whether the page is at the "opus" (post/side/wiki/zine/etc.) level
*/

import Link from "next/link"
import { Span } from "./main"
import { colors } from "@/lib/app.config"

export default function Apex( { first, second, opus = false } : { first: string, second?: string, opus?: boolean }) {

  const linkColors = `${colors.link} dark:${colors.darkLink} hover:${colors.linkHover} dark:hover:${colors.darkLinkHover}`

  return (
    <aside className={`font-sans uppercase`}>
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

        { (second && opus === false) && <Span className={`text-sm md:text-lg`}>{second}</Span> }

        { (second && opus === true) && (
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