import { ThemeProvider } from '@/components/lite-dark'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {    
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body 
        className="flex flex-col min-h-screen font-serif">                          
        <ThemeProvider attribute={`class`} defaultTheme={`light`} enableSystem>
          {children}
        </ThemeProvider>        
      </body>
    </html>
  )
}
