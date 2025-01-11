
/*
jonanity by @jonchius
/app/components/none.tsx
file not found template
*/

import { Sect } from "@/components/main"
import { text } from "@/lib/app.config"
import Link from "next/link"

export default function None() {
  return (
    <Sect>
      <h1 className="spec-head font-sans font-bold text-7xl">404</h1>
      <p className="text-3xl mt-10">{text['page not found']}</p>
      <Link className="mt-5 p-2 px-5 border border-black dark:border-white bg-white text-black hover:bg-black hover:text-white" href="/">{text['go to the home page']}</Link>
    </Sect>
  )
}