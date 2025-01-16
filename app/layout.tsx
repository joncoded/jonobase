import './globals.css'
import Head from "@/components/head"
import Tail from "@/components/tail"
import Skip from "@/components/skip"
import { ThemeProvider } from '@/components/lite-dark'
import OverHead from "@/components/over-head"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {      
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <OverHead />
      <body 
        className="flex flex-col min-h-screen font-serif">                          
        <ThemeProvider attribute={`class`} defaultTheme={`light`} enableSystem>          
          <Skip />          
          <Head />
          {children}
          <Tail />
        </ThemeProvider>        
      </body>      
    </html>
  )
}
