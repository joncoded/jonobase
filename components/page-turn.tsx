
/*
jonanity by @joncoded
/app/components/page-turn.tsx
pagination (page turner) for lists
*/

import Link from "next/link"
import { getPostCount } from "@/sanity/actions"
import { Sect } from "./main"

export default async function PageTurn({base, searchParams} : any) {

  // get current page based on search params or default to first page
  const currentPage = parseInt(searchParams?.page) || 1

  // get posts per page based on search params or CMS or default to 6 post per page 
  const perPage = searchParams?.perPage || base.perPage || '6'

  // get total post count of all posts in app
  const totalPosts = await getPostCount()  

  // get # of pages (total post count divided by posts per page)
  const totalPages = Math.ceil(totalPosts / parseInt(perPage))

  let pageNumbers = []
  for (let p=1; p<=totalPages; p++) {
    pageNumbers.push(p)
  }  

  return (
    <>
    { totalPages > 1 && 
      <Sect className={`page-turn mt-5 mb-10`}>
        <div className="flex flex-wrap gap-2">
          {pageNumbers.map((pageNumber: number) => 
            <Link 
              key={`page-turn-${pageNumber}`}
              className={`button pagination
                ${(currentPage === pageNumber) ? 'current' : ''} 
              `}
              href={`?page=${pageNumber}&perPage=${perPage}`}
            >
              {pageNumber}
            </Link>
          )}
        </div>
      </Sect> 
    }
    </>
  )
}