import { FilmIcon } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="flex gap-2 py-5 px-5 bg-slate-900 text-white">
      <FilmIcon />
      <Link href="/" className="text-xl font-bold">
        <h1>Favorite Movies</h1>
      </Link>
      <p className="font-bold">|</p>

      <Link href="/add" className="text-xl font-light">
        Add A Movie
      </Link>
    </header>
  )
}

export default Header
