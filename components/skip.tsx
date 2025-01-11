'use client'

/*
jonanity by @jonchius
/app/components/skip-card.tsx
the "skip to main content" button
*/

import Link from "next/link"
import { text } from "@/lib/app.config"

export default function Skip() {

  const handleSkip = () => {
    document.getElementById("main")?.focus()
  }

  return (
    <Link 
      href="#main"
      onClick={handleSkip}
      className={`skip-link
        absolute top-0 right-full z-[1000]
        focus:right-auto focus:bg-white focus:text-black focus:border-2
        focus:border-white focus:p-4
      `}
    >
      {text['skip to main content']}
    </Link>
  )

}