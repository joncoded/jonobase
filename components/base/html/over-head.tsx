
/*
jonobase by @jonchius
/app/components/base/html/over-head.tsx
beams things up to the <head> tag, e.g.:
- favicon
*/

import { getBase } from "@/sanity/actions"

export default async function OverHead(base: any) {

  const { logo } = await getBase(base) || {}    
  
  return (
    <>
      
      { logo && <link rel="icon" href={logo + '?v=new'} /> }
      
    </>
  )

}