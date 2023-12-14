import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '',
  description: '',
}

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
      <body className="flex flex-col h-screen justify-between font-serif">
        {children}
      </body>
    </html>
  )
}
