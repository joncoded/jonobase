import Image from 'next/image'
import Link from 'next/link'
import { UtilDOMChildrenProps } from '@/lib/types'
import { getBase } from '@/sanity/actions'
import Menu from './menu'

export default async function Head() {
  
  const base = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)  
  
  const { title } = base || ""

  const HeadWrap = ({children}: UtilDOMChildrenProps) => {
    return (
      <header className="head-wrapper flex sticky top-0 z-50 w-full border-b-2 border-black-200 bg-gradient-to-t from-gray-900 to-gray-600 text-white shadow-xl p-2 sm:p-5 md:py-5">
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
          <Image className="head-logo rounded-full border-4 border-white drop-shadow mr-5" src="/images/logo.png" alt="logo" width={40} height={40} />
          <h1 className="head-title text-2xl md:text-4xl uppercase font-sans">{title}</h1>
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