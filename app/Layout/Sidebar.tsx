'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Home,
  Newspaper,
  Film,
  Settings,
  ChevronRight,
  Heart,
} from 'lucide-react'
import { useGetNewsByCategoryQuery } from '../utils/newsApi'
import { useGetTrendingMoviesQuery } from '../utils/tmdbApi'

type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

type Article = {
  title: string
  source: {
    name: string
  }
}

type Movie = {
  title: string
  poster_path: string
  release_date: string
  vote_average: number
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Favorites', href: '/favorites', icon: Heart },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar({
  isOpen,
  toggle,
}: {
  isOpen: boolean
  toggle: () => void
}) {
  const pathname = usePathname()
  const { data: newsData } = useGetNewsByCategoryQuery('business')
  const { data: moviesData } = useGetTrendingMoviesQuery(1)

  const articles: Article[] = newsData?.articles?.slice(0, 3) || []
  const movies: Movie[] = moviesData?.results?.slice(0, 3) || []

  return (
    <aside
      className={`fixed z-40 top-0 left-0 h-full w-80 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static`}
    >
      <div className="flex items-center justify-between p-4 md:hidden">
        <h2 className="text-xl font-bold">MyApp</h2>
        <button onClick={toggle} className="text-white text-xl">
          ✕
        </button>
      </div>

      <div className="mt-6 px-4 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition ${
                pathname === href ? 'bg-gray-700' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* News Section */}
        <div className="border-t border-gray-700 pt-4">
          <Link
            href="/news"
            className={`flex items-center justify-between px-3 py-2 rounded hover:bg-gray-700 transition mb-3 ${
              pathname === '/news' ? 'bg-gray-700' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <Newspaper className="w-5 h-5" />
              <span className="font-medium">Business News</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <div className="space-y-2">
            {articles.map((article, index) => (
              <Link
                key={index}
                href="/news"
                className="block px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition"
              >
                <h4 className="text-xs font-medium text-white line-clamp-2 mb-1">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-400">{article.source.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Movies Section */}
        <div className="border-t border-gray-700 pt-4">
          <Link
            href="/movies"
            className={`flex items-center justify-between px-3 py-2 rounded hover:bg-gray-700 transition mb-3 ${
              pathname === '/movies' ? 'bg-gray-700' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <Film className="w-5 h-5" />
              <span className="font-medium">Trending Movies</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <div className="space-y-2">
            {movies.map((movie, index) => (
              <Link
                key={index}
                href="/movies"
                className="block px-3 py-2 rounded bg-gray-800 hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    width={32}
                    height={48}
                    className="rounded object-cover w-8 h-12"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-white line-clamp-2 mb-1">
                      {movie.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {new Date(movie.release_date).getFullYear()}
                      </span>
                      <span className="text-xs text-yellow-400">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
