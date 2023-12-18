import Link from 'next/link'

const Tail = () => {  

  const Colophon1 = () => {
    return (
      <div>
        a <a href="/">@joncoded</a> project
      </div>
    )
  }

  const Colophon2 = () => {
    return (
      <div className="flex gap-x-10">
        <Link href="/">bottom-link 1</Link>
        <Link href="/">bottom-link 2</Link>
      </div>
    )
  }

  return (
    <footer className="tail-wrapper w-full border-t border-gray-300 bg-gradient-to-b from-zinc-50 to-zinc-300 px-5 py-12">
      <div className="tail-prop flex justify-between max-md:flex-col gap-y-10 max-w-screen-lg mx-auto">
        <Colophon1 />
        <Colophon2 />
      </div>
    </footer>
  )
}

export default Tail
