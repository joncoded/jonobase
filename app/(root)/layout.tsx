import Head from "@/components/head"
import Tail from "@/components/tail"
import Skip from "@/components/skip"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Skip />
      <Head />
      {children}
      <Tail />
    </div>
  )
}
