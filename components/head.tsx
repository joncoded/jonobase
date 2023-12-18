import Image from 'next/image'
import Link from 'next/link'
import { DOMChildrenProps } from '@/lib/types'
import { getBase } from '@/sanity/actions'

export default async function Head() {
  
  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)  
  
  const { title } = base || ""

  const HeadWrap = ({children}: DOMChildrenProps) => {
    return (
      <header className="head-wrapper flex sticky top-0 z-50 w-full border-b-2 border-black-200 bg-gradient-to-t from-gray-900 to-gray-600 text-white shadow-xl p-5 xl:py-5">
        <nav className="flex items-center justify-between mx-auto w-full max-w-screen-lg">          
          {children}          
        </nav>
      </header>
    )
  }

  const HeadBranding = () => {
  
    return (
      <div className="head-branding flex justify-between items-center gap-5">
        <Link href="/" className="flex items-center">
          <Image className="head-logo rounded-full border-4 border-white drop-shadow mr-5" src="/images/logo.png" alt="logo" width={50} height={40} />
          <h1 className="head-title text-4xl uppercase font-sans">{title}</h1>
        </Link>                
      </div>      
    )
  }  

  const HeadNavi = () => {
    return (
      <ul className="head-navi flex justify-center max-md:hidden gap-x-5 md:gap-x-10">
         
      </ul>
    )
  }

  const HeadMenu = () => {
    return (
      <Image className="head-menu block md:hidden" src="/images/menu.svg" alt="menu" width={30} height={30} />
    )
  }

  return (
    <HeadWrap>
      <HeadBranding />
      <HeadMenu />      
      <HeadNavi />      
    </HeadWrap>
  )

}