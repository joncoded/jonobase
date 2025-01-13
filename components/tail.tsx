
/*
jonobase by @jonchius
/app/components/tail.tsx
the footer of each page
*/


import { getBase } from '@/sanity/actions'
import { PortableText } from '@portabletext/react'

export default async function Tail() {  

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const { colophon1, colophon2 } = base || ''

  const Colophon1 = () => {
    return (
      <div className="tail-colo-1 text-center md:text-left">
        <PortableText value={colophon1} />
      </div>
    )
  }

  const Colophon2 = () => {
    return (
      <div className="tail-colo-2 text-center md:text-right">
        <PortableText value={colophon2} />
      </div>
    )
  }

  return (
    <footer className={`tail-wrapper 
      w-full border-t border-gray-300 bg-gradient-to-b from-black to-gray-900 mt-auto p-5 
    `}>
      <div className={`tail-prop 
        max-w-screen-lg flex max-md:flex-col justify-between gap-0 mx-auto 
        prose prose-p:text-white prose-p:my-2 md:propse-p:my-0 
        prose-a:text-sky-300 prose-a:font-bold prose-a:no-underline 
        hover:prose-a:text-white hover:prose-a:underline p-5 xl:p-0
      `}>
        <Colophon1 />
        <Colophon2 />
      </div>
    </footer>
  )
  
}
