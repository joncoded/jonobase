
/*
jonobase by @jonchius
/app/components/base/util/pagi.tsx
pagination (page turner) for lists
*/

import Link from "next/link"
import { Sect } from "../html/main"
import { UtilListTurnProps } from "@/sanity/myprops"
import { text } from "@/lib/app.config"

export default async function Paginate({myBase, totalPostsCount, searchParams} : UtilPaginationProps) {

  // for finds pages
  const query = searchParams?.query || ''

  // get current page based on search params or default to first page
  const currentPage = parseInt(searchParams?.page || '1')

  // get posts per page based on search params or CMS or default to 6 post per page 
  const perPage = searchParams?.perPage || myBase.perPage || '6'

  // get # of pages (total post count divided by posts per page)
  const totalPages = Math.ceil(totalPostsCount / parseInt(perPage))

  let pageNumbers = []
  for (let p = 1; p <= totalPages; p++) {
    pageNumbers.push(p)
  }    

  return (
    <>
    { totalPages > 1 && 
      <Sect className={`page-turn my-5`}>
        <div className="flex flex-wrap gap-2">
          {pageNumbers.map((pageNumber: number) => 
            <Link 
              key={`page-turn-${pageNumber}`}
              className={`button pagination
                ${(currentPage === pageNumber) ? 'current' : ''} 
              `}
              href={`?query=${query}&page=${pageNumber}&perPage=${perPage}`}
              aria-label={(currentPage === pageNumber) ? `${text['current page']}, ${text['page number']} ${pageNumber}` : `${text['page number']} ${pageNumber}`}
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