'use client'

/*
jonanity by @jonchius
/app/components/menu-find.tsx
the find (search) UI for the head menu
*/

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { UtilMenuFindProps } from "@/lib/types"
import { text } from "@/lib/app.config"

export default function MenuFind({showMenu, inputName, placeholder = '🔎'}: UtilMenuFindProps) {

  const [ searchTerm, setSearchTerm ] = useState('')
  const router = useRouter()

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()
    router.push(`/finds/?query=${decodeURIComponent(searchTerm)}`)
    showMenu && showMenu(false)
    document.getElementById("main")?.focus()
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setSearchTerm(event.target.value)
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
          onChange={handleSearchChange}
        />
        <input 
          type="submit"
          value={text["search go"]}
          className={`
            bg-green-900 border border-gray-200 dark:border-gray-500 
            text-white cursor-pointer p-2 px-5
          `}
        />
      </form>
    </div>
  )

}