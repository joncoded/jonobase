
/*
jonobase by @jonchius
/app/components/base/util/none.tsx
file not found template
*/

import { Sect } from "@/components/base/html/main"
import { styling, text } from "@/app/config"
import Link from "next/link"

export default function None() {
  return (
    <Sect>
      <h1 className="spec-head font-bold text-7xl">404</h1>
      <p className="text-3xl mt-10">{text['page not found']}</p>
      <div className="mt-10">
        <Link 
          className={styling.button} 
          href="/"
        >
          {text['go to the home page']}
        </Link>
      </div>
    </Sect>
  )
}