import "./globals.css"
import { headers } from "next/headers"
import Head from "@/components/base/html/head"
import Tail from "@/components/base/html/tail"
import Skip from "@/components/base/util/skip"
import { ThemeProvider } from "@/components/base/util/lite-dark"
import OverHead from "@/components/base/html/over-head"
import { Analytics } from "@vercel/analytics/next"
import { getBase } from "@/sanity/actions"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const hostname = await headers().get("x-forwarded-host") || headers().get("host") || ""
  const myBase = await getBase(hostname)

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <OverHead base={myBase} />
      <body
        className="flex flex-col min-h-screen font-sans">
        <ThemeProvider attribute={`class`} defaultTheme={`light`} enableSystem>
          <Skip />
          <Head base={myBase} />
          {children}
          <Tail base={myBase} />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
