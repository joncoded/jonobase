'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { formUrlQuery } from '@/sanity/utils'
import { Input } from './ui/input'
import FindFilters from './find-filters'
import PostCard from './post-card'
import ListHead from './list-head'
import { text } from '@/lib/app.config'

export default function Find({filters, posts, urlParams} : any ) {

  const searchParams = useSearchParams()  
  const router = useRouter()  
  const [ query, setQuery ] = useState(urlParams.query || '')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = ''  
      if (query) {
        newUrl = formUrlQuery({ 
          params: searchParams.toString(),
          key: 'query', 
          value: query
        })          
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString()          
        })
      }     
      router.push(newUrl, {scroll: false})
    }, 250)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const handleQuery = (event: any) => {
    setQuery(event.target.value)
  }

  return (
    <div className="flex flex-col gap-5 mx-auto py-10">
    
      <form className="w-full flex mt-10 text-center">
        <label className="w-full max-w-full md:max-w-screen-md mx-auto sr-only"></label>        
        <Input 
          type="text"
          placeholder={text['search']} 
          className="border-0 bg-gray-200 p-10 placeholder:text-black placeholder:font-sans text-3xl placeholder:text-3xl focus:!ring-4"
          value={query}
          onChange={handleQuery}
        />
      </form>
    
      <FindFilters filters={filters} />
    
      <section className="flex justify-center mt-5 w-full flex-col">

        {(urlParams?.query || urlParams?.category) && ( 
        <div className="text-center mb-5">
          <ListHead query={query} category={urlParams.category} />
        </div>
        )}

        <div className="w-full mt-5 sm:justify-start">
          {posts?.length > 0 ? (
            <>
              {(urlParams?.query || urlParams.category) && ( 
                <p className="text-3xl text-gray-400 text-center mb-10">{posts.length} result(s) found</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center mt-0">
                {posts.map((post: any) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-3xl text-gray-400 text-center">0 results found</p>
          )}
        </div>

      </section>
    </div>
  )
}