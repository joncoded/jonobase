'use client'

/*
jonobase by @jonchius
/app/components/base/html/menu-find.tsx
the find (search) UI for the head menu
*/

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { UtilMenuFindProps } from "@/sanity/myprops"
import { text } from "@/lib/app.config"

export default function MenuFind({showMenu, inputName, placeholder = '🔎'}: UtilMenuFindProps) {

  const [ findTerm, setFindTerm ] = useState('')
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
    <div className={`flex justify-center `}>
      <form 
        className={`flex gap-5 w-full`}
        onSubmit={handleSubmit}
      >  
        <label htmlFor={inputName} className="sr-only">
          {text['search']}
        </label>
        <input 
          type="text"
          name={inputName}
          id={inputName}
          className={`px-5 w-full border
            border-black dark:bg-black
            border-gray-800 dark:border-gray-600
            text-black dark:text-white`}
          placeholder={placeholder}
          onChange={handleFindChange}
        />
        <input 
          type="submit"
          value={text["search go"]}
          className={`
            bg-green-900 dark:bg-lime-300 border border-gray-200 dark:border-gray-500 
            text-white dark:text-black cursor-pointer p-2 px-5 
            focus:bg-white focus:text-black dark:focus:bg-black dark:focus:text-white 
            hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white 
          `}
        />
      </form>
    </div>
  )

}