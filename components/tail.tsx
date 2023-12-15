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
    <footer className="w-full border-t border-black px-10 py-10">
      <div className="flex justify-between max-md:flex-col gap-y-10 max-w-screen-2xl mx-auto">
        <Colophon1 />
        <Colophon2 />
      </div>
    </footer>
  )
}

export default Tail
