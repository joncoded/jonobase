'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { formUrlQuery } from '@/sanity/utils'
import { FindPageParams } from '@/lib/types'
import FindFilters from './find-filters'
import PostCard from './post-card'
import ListHead from './list-head'
import { Span } from './main'
import { text } from '@/lib/app.config'

export default function Find({filters, showFilters, posts, urlParams} : FindPageParams ) {

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
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  useEffect(() => {
    setQuery(urlParams.query!)
  }, [urlParams.query])

  const handleQuery = (event: any) => {
    setQuery(event.target.value)
  }

  const FindApex = () => {
    return (
      <aside className={`find-apex uppercase font-sans text-2xl`}>
        <Span>{text['finds']}</Span>
        { query && 
          <>
            <Span ariaHidden={true}> / </Span>        
            <Span className="text-lg">{query}</Span>
          </>
        } 
      </aside>
    )
  }

  return (
    <div className={`find-base flex flex-col gap-5 mx-auto`}>

      <FindApex />
    
      {/* moving this to a separate component will make the API struggle */}
      <form className={`find-form w-full flex text-center`}>
        <label className={`w-full max-w-full md:max-w-screen-md mx-auto sr-only`}></label>        
        <input 
          type="text"
          placeholder={text['search']} 
          className={`font-sans 
            w-full border-0 bg-gray-200 dark:bg-black dark:border dark:border-gray-200 px-5 py-2 text-2xl focus:!ring-2
            placeholder:text-black placeholder:font-sans placeholder:text-3xl
          `}
          value={query}
          onChange={handleQuery}
        />
      </form>
    
      { showFilters && <FindFilters filters={filters} /> }
    
      <section className={`find-main flex justify-center w-full flex-col`}>

        <div className={`find-post w-full sm:justify-start my-5`}>
          {posts && (
            <>
              <div className={`text-right mb-5`}>
                <h2 className="text-lg"><ListHead count={posts.length} query={query ?? ''} kind={urlParams.kind ?? ''} /></h2>
              </div>                                                
              <div className={`find-post-list 
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center mt-0`
              }>
                {posts.map((post: any) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>

      </section>
    </div>
  )
}