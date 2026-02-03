"use client"

/*
jonobase by @joncoded (aka @jonchius)
/app/components/base/html/head.tsx
the site header
*/

import Image from "next/image"
import Link from "next/link"
import { UtilDOMChildrenProps } from "@/sanity/myprops"
import Menu from "./menu"
import { Span } from "./main"
import { getStyling } from "@/app/config"

export default function Head({ base }: { base: any }) {
    
  const { logo, title, tagline } = base || ""
  const styling = getStyling(base?.colorScheme || 'green')

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
          {base?.logo &&
            <Image className={`${styling['head-branding-logo']}`} src={logo} alt="" width={40} height={40} />
          }
          <div className="flex flex-col gap-1">
            <div className={`${styling['head-branding-name']}`}>{title}</div>
            <Span className={`${styling['head-branding-subs']}`}>{tagline}</Span>
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