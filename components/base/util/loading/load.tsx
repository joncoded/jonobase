/*
jonobase by @joncoded (aka @jonchius)
/app/components/base/util/load.tsx
the "loading" page
*/

import { Sect } from "@/components/base/html/main"
import Image from "next/image"

export default function Main() {
  return (
    <Sect>
      <Image src={`/images/load.gif?v=${Date.now()}`} alt={`loading`} height={64} width={64} />
    </Sect>
  )
}