/*
jonobase by @jonchius
/app/components/base/html/main-apex.tsx
breadcrumbs for top of each page
"first" refers to first-level "subfolder" of domain
"second" refers to second-level "subfolder" of domain
(no more than two levels of breadcrumbs will exist, in order to keep things simpler)
"post" refers to whether the page is at the "post" (article) level
*/

import Link from "next/link"
import { Span } from "./main"
import { colors, styling } from "@/app/config"

export default function Apex( { first, second, post = false } : { first: string, second?: string, post?: boolean }) {

  const linkColors = `${colors.link} dark:${colors.darkLink} hover:${colors.linkHover} hover:underline dark:hover:${colors.darkLinkHover}`

  return (
    <aside className={`uppercase`}>
      <>

        { (first && !second) && <Span className={`${styling['main-apex-first']}`}>{first}</Span>}

        { (first && second) && (
          <>
            <Span className={`${styling['main-apex-first']}`}>
              <Link className={linkColors} href={`/${first}/`}>{first}</Link>
            </Span>
            <Span ariaHidden={true}> / </Span>
          </>
        )}

        { (second && post === false) && <Span className={`${styling['main-apex-second']}`}>{second}</Span> }

        { (second && post === true) && (
          <>
            <Span className={`${styling['main-apex-second']}`}>
              <Link className={linkColors} href={`/${first}/${second}/`}>{second}</Link>
            </Span>
          </>
        )}

      </>
    </aside>

  )

}