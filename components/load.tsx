/*
jonanity by @joncoded
/app/components/load.tsx
the "loading" page
*/

import { Sect } from "@/components/main"
import Image from "next/image"

export default function Main() {
  return (
    <Sect>
      <Image src={`/images/load.gif?v=${Date.now()}`} alt={`loading`} height={64} width={64} />
    </Sect>
  )
}