
/*
jonobase by @jonchius
/app/(root)/[opera]/page.tsx
the opera (many articles) template that has a content _type
(i.e. post / side / wiki / zine)
*/

import { getBase, getOpera, getOperaCount } from "@/sanity/actions"
import { styling } from "@/lib/app.config"
import { Sect } from "@/components/base/html/main"
import ScrollToTop from "@/components/base/util/ttop"
import None from "@/components/base/util/none"
import Apex from "@/components/base/html/main-apex"
import OpusLine from "@/components/opus/opus-line"
import ListTurn from "@/components/list/list-turn"

export const revalidate = 10
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata({params}: any) {

  const { opera } = params
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}

  if (opera) {
    return {
      title: `${opera} @ ${myBase?.title}`
    }
  }

}

export default async function Main({ params, searchParams } : any) {
  
  const { opera } = params
  const { page, perPage } = searchParams
  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)
  const myJoin = opera.slice(0, -1)
  const myOpera = await getOpera({type: myJoin, page: page, perPage: perPage})
  const myOperaCount = await getOperaCount({ type: myJoin })
  
  if (!myOpera || myOpera.length === 0) return <None />

  return (

    <main id="main" tabIndex={-1}>

      <ScrollToTop />

      <Sect id="join-apex" className={`${styling['main-apex']}`}>
        <Apex first={opera} />
      </Sect>

      <Sect id="join-main">
        {myOpera && (
          <>
            <div
              className={`join-list 
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center mt-0`}
            >
              {myOpera.map((opus: any) => (
                <OpusLine key={opus._id} opus={opus} showType={false} showKind={true} />
              ))}    
              
            </div>
          </>
        )}    
      </Sect>

      <ListTurn myBase={myBase} totalOperaCount={myOperaCount} searchParams={searchParams} />
      
    </main>

  )

}