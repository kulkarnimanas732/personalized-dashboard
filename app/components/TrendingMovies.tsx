'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useGetTrendingMoviesQuery } from '../utils/tmdbApi'

type Movie = {
  id: number
  title: string
  poster_path: string
}

export default function TrendingMovies() {
  const [showAll, setShowAll] = useState(false)
  const { data, error, isLoading } = useGetTrendingMoviesQuery(1)

  const movies: Movie[] = data?.results || []
  const visibleMovies = showAll ? movies : movies.slice(0, 8)

  if (isLoading) return <p>Loading trending movies...</p>
  if (error) return <p className="text-red-500">Failed to load movies.</p>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Trending Movies</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white dark:bg-zinc-900 rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col items-center"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
              className="rounded"
            />
            <h3 className="mt-2 font-semibold text-center text-sm">{movie.title}</h3>
          </div>
        ))}
      </div>

      {movies.length > 8 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-blue-600 hover:underline"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  )
}
