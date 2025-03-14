
/*
jonobase by @jonchius
/app/components/base/util/none.tsx
file not found template
*/

import { Sect } from "@/components/base/html/main"
import { text } from "@/lib/app.config"
import Link from "next/link"

export default function None() {
  return (
    <Sect className="font-sans">
      <h1 className="spec-head font-bold text-7xl">404</h1>
      <p className="text-3xl mt-10 font-serif">{text['page not found']}</p>
      <div className="mt-10">
        <Link className="p-2 px-5 border border-black dark:border-white bg-white text-black hover:bg-black hover:text-white" href="/">
          {text['go to the home page']}
        </Link>
      </div>
    </Sect>
  )
}