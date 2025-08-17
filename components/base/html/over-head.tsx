
/*
jonobase by @jonchius
/app/components/base/html/over-head.tsx
beams things up to the <head> tag, e.g.:
- favicon
*/

import { getBase } from "@/sanity/actions"

export default async function OverHead() {

  const { logo } = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!) || {}    
  
  return (
    <>
      
      <link rel="icon" href={logo + '?v=new'} />
      
    </>
  )

}