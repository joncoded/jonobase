import "./globals.css"
import Head from "@/components/base/html/head"
import Tail from "@/components/base/html/tail"
import Skip from "@/components/base/util/skip"
import { ThemeProvider } from "@/components/base/util/lite-dark"
import OverHead from "@/components/base/html/over-head"
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <OverHead />
      <body
        className="flex flex-col min-h-screen font-sans">
        <ThemeProvider attribute={`class`} defaultTheme={`light`} enableSystem>
          <Skip />
          <Head />
          {children}
          <Tail />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
