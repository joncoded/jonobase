
/*
jonanity by @jonchius
/app/components/head.tsx
the site header
*/

import Image from 'next/image'
import Link from 'next/link'
import { UtilDOMChildrenProps } from '@/lib/types'
import { getBase } from '@/sanity/actions'
import Menu from './menu'
import { Span } from './main'

export default async function Head() {
  
  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)  
  
  const { title } = base || ""
  const { tagline } = base || ""

  const HeadWrap = ({children}: UtilDOMChildrenProps) => {
    return (
      <header className="head-wrapper sticky top-0 !z-[200] w-full bg-gradient-to-t from-gray-900 to-gray-600 text-white shadow-xl py-5">
        <nav className="flex items-center justify-between mx-auto w-full max-w-screen-lg px-5 gap-5">          
          {children}          
        </nav>
      </header>
    )
  }

  const HeadBranding = () => {
  
    return (
      <div className="head-branding">
        <Link href="/" className="flex items-center">
          <Image className="head-logo rounded-full border-4 border-white drop-shadow mr-5" src="/images/logo.png" alt="logo" width={40} height={40} />
          <div className="flex flex-col gap-1 font-sans">
            <h1 className="head-title text-3xl uppercase">{title}</h1>
            <Span className="hidden md:inline text-sm">{tagline}</Span>
          </div>          
        </Link>                
        
      </div>      
    )
  }  

  const HeadMenu = () => {
    return (
      <Menu base={base} />
    )
  }

  return (
    <HeadWrap>
      <HeadBranding />
      <HeadMenu />          
    </HeadWrap>
  )

}