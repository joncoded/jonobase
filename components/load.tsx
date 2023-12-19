import { Sect } from "@/components/main"
import { text } from "@/lib/app.config"

export default function Main() {
  return (
    <Sect>
      <h1 className="spec-head font-sans font-bold text-7xl">{text['loading']}</h1>
      <p className="text-3xl mt-10">{text['loading message']}</p>
    </Sect>
  )
}