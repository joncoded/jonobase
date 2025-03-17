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
import { text } from "@/lib/app.config"
import { Span } from "../base/html/main"
import FindHead from "./find-head"
import PostLine from "../post/post-line"

export default function Find({ posts, totalPostsCount, urlParams }: FindPageParams) {

  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(urlParams.query || "")
  const [typeFilter, setTypeFilter] = useState(urlParams.type || "")

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
    setTypeFilter(urlParams.type || "")
  }, [urlParams.query])

  const handleQuery = (event: any) => {
    setQuery(event.target.value)
  }

  const FindApex = () => {
    return (
      <aside className={`find-apex uppercase text-lg md:text-2xl`}>
        <Span>{text["finds"]}</Span>
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
      <form id="find-form" className={`find-form w-full flex text-center`}>
        <label className={`w-full max-w-full md:max-w-screen-md mx-auto sr-only`}></label>
        <input
          type="text"
          placeholder={text["search"]}
          className={` 
            w-full border-0 dark:border dark:border-gray-200 px-5 py-2 
            bg-gray-200 dark:bg-black focus:!ring-2
            text-2xl placeholder:text-gray-300 placeholder:text-3xl
          `}
          value={query}
          onChange={handleQuery}
        />        
      </form>      

      <section id="find-main" className={`flex justify-center w-full flex-col`}>
        <div className={`find-post w-full sm:justify-start my-5`}>
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
