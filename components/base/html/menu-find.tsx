'use client'

/*
jonobase by @joncoded (aka @jonchius)
/app/components/base/html/menu-find.tsx
the find (search) UI for the head menu
*/

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UtilMenuFindProps } from "@/sanity/myprops"
import { getStyling, text } from "@/app/config"

export default function MenuFind({showMenu, inputName, placeholder = "🔎", colorScheme = 'green'}: UtilMenuFindProps & {colorScheme?: string}) {

  const styling = getStyling(colorScheme)

  const [ findTerm, setFindTerm ] = useState("")
  const router = useRouter()

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()
    router.push(`/finds/?query=${decodeURIComponent(findTerm)}`)
    showMenu && showMenu(false)
    document.getElementById("main")?.focus()
  }

  const handleFindChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setFindTerm(event.target.value)
  }

  return (
    <div className={`flex justify-center`}>
      <form 
        className={`flex gap-5 w-full`}
        onSubmit={handleSubmit}
      >  
        <label htmlFor={inputName} className="sr-only">
          {text["search"]}
        </label>
        <input 
          type="text"
          name={inputName}
          id={inputName}
          className={`${styling['find-bar']}`}
          placeholder={placeholder}
          onChange={handleFindChange}
        />
        <input 
          type="submit"
          value={text['search go']}
          className={`${styling['button']} ${styling['find-button']}`}
        />
      </form>
    </div>
  )

}