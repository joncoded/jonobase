import Head from '@/components/head'
import Tail from '@/components/tail'

const layout = ({children}: { children : React.ReactNode }) => {
  return (
    <>
      <div>
        <Head />
        {children}
      </div>
      <Tail />
    </>
  )
}

export default layout