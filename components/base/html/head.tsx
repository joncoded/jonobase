
/*
jonobase by @jonchius
/app/components/base/html/head.tsx
the site header
*/

import Image from "next/image"
import Link from "next/link"
import { UtilDOMChildrenProps } from "@/sanity/myprops"
import { getBase } from "@/sanity/actions"
import Menu from "./menu"
import { Span } from "./main"
import { styling } from "@/app/config"

export default async function Head() {

  const myBase = await getBase(process.env.NEXT_PUBLIC_SANITY_BASE_SLUG!)

  const { title } = myBase || ""
  const { tagline } = myBase || ""

  const HeadWrap = ({children}: UtilDOMChildrenProps) => {
    return (
      <header id="head-wrap" className={`${styling['head-wrap']}`}>
        <nav className={`${styling['head-wrap-navs']}`}>
          {children}
        </nav>
      </header>
    )
  }

  const HeadBranding = () => {

    return (
      <div id="head-branding">
        <Link href="/" className="flex items-center">
          {myBase.logo &&
            <Image className={`${styling['head-branding-logo']}`} src={myBase.logo} alt="logo" width={40} height={40} />
          }
          <div className="flex flex-col gap-1">
            <h1 className={`${styling['head-branding-name']}`}>{title}</h1>
            <Span className={`${styling['head-branding-subs']}`}>{tagline}</Span>
          </div>
        </Link>

      </div>
    )
  }

  const HeadMenu = () => {
    return (
      <Menu myBase={myBase} />
    )
  }

  return (
    <HeadWrap>
      <HeadBranding />
      <HeadMenu />
    </HeadWrap>
  )

}