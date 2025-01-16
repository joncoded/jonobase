
/*
jonobase by @jonchius
/app/components/over-head.tsx
beams things up to the <head> tag, e.g.:
- favicon
*/

import type { Metadata } from 'next'
import { getBase } from '@/sanity/actions'

export default async function OverHead() {

  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)      
  
  return (
    <>
      
      <link rel="icon" href={base.logo + '?v=new'} />
      
    </>
  )

}