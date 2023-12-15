'use client'

import { useState } from 'react'
// import { filterList as filters } from '@/lib/app.config'
import { useSearchParams, useRouter } from 'next/navigation'
import { formUrlQuery } from '@/sanity/utils'

interface FiltersProps {
  filters: string[]
}

const FindFilters = ({filters}: FiltersProps) => {

  const [active, setActive] = useState('all')
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleFilter = (filter: string) => {
    let newUrl = ''
    
    if (active === filter) {
      setActive('')
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['category'], 
        value: null
      })
    } else {      
      setActive(filter)
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category', 
        value: filter.toLowerCase()
      })
    }

    router.push(newUrl, { scroll: false })

  }

  return (
    <ul className="flex flex-wrap justify-center gap-5 mx-auto">
      <li key="all">
        <button 
          onClick={() => handleFilter('all')}
          className={`rounded-lg font-sans text-xl ${active === 'all' ? `bg-green-800` : `bg-gray-600`} hover:bg-black text-white px-5 py-2`}>
          all
        </button>
      </li>
      {filters.map((filter) => (
        <li key={filter}>
          <button             
            onClick={() => handleFilter(filter)}
            className={`whitespace-nowrap rounded-lg font-sans text-xl ${active === filter ? `bg-green-800` : `bg-gray-600`} hover:bg-black text-white px-5 py-2`}
          >
            {filter}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default FindFilters
