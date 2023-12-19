import type { Metadata } from 'next'
import './globals.css'
import Head from '@/components/head'
import Tail from '@/components/tail'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body 
        className="flex flex-col h-screen justify-between font-serif">
          <Head />
            {children}
          <Tail />
      </body>
    </html>
  )
}
