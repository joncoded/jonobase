"use client"

/*
jonobase by @jonchius
/app/components/find/find.tsx
the "find" (search) page UI
*/

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { formUrlQuery } from "@/sanity/utils"
import { FindPageParams } from "@/sanity/myprops"
import { text, styling } from "@/app/config"
import { Span } from "../base/html/main"
import FindHead from "./find-head"
import PostLine from "../list/list-post"

export default function Find({ posts, totalPostsCount, urlParams }: FindPageParams) {

  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(urlParams.query || "")  

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = ""
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query
        })
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString()
        })
      }
      router.push(newUrl, { scroll: false })
    }, 200)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  useEffect(() => {
    setQuery(urlParams.query!)    
  }, [urlParams.query])

  const handleQuery = (event: any) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
  }

  const FindApex = () => {
    return (
      <aside className={`find-apex uppercase text-lg md:text-2xl`}>
        <Span>{text['finds']}</Span>
        {query && (
          <>
            <Span ariaHidden={true}> / </Span>
            <Span className="text-sm md:text-lg">{query}</Span>
          </>
        )}
      </aside>
    )
  }

  return (
    <div id="find-base" className={`flex flex-col gap-5 mx-auto`}>
      <FindApex />

      {/* moving this to a separate component will make the API struggle */}
      <form id="find-form" className={`w-full flex`} onSubmit={handleSubmit}>
        <label className={`w-full max-w-full md:max-w-screen-md mx-auto sr-only`}></label>
        <input
          type="text"
          placeholder={text['search']}
          className={`${styling['find-bar-big']}`}         
          value={query}
          onChange={handleQuery}
        />        
      </form>      

      <section id="find-main" className={`w-full flex flex-col justify-center`}>
        <div className={`w-full sm:justify-start my-5`}>
          {posts && (
            <>
              <div className={`text-center mt-0 mb-10`}>
                <h2 className="text-lg">
                  <FindHead count={totalPostsCount} query={query ?? ""} kind={urlParams.kind ?? ""} />
                </h2>
              </div>
              <div
                className={`find-post-list 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center mt-0`}
              >
                {posts.map((post: any) => (
                  <PostLine key={post._id} post={post} showJoin={true} showKind={true} />
                ))}
              </div>
              
            </>
          )}
        </div>
      </section>
    </div>
  )
}
