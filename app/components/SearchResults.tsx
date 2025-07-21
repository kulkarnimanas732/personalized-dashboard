'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { useSearchNewsQuery } from '../utils/newsApi'
import { useSearchMoviesQuery } from '../utils/tmdbApi'
import ContentCard from './ContentCard'

type NewsArticle = {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
}

type Movie = {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string
}

export default function SearchResults() {
  const query = useSelector((state: RootState) => state.search)
  const searchQuery = typeof query === 'string' ? query : ''

  const { data: newsData, isLoading: loadingNews, error: errorNews } = useSearchNewsQuery(searchQuery, {
    skip: searchQuery.length < 2,
  })

  const { data: movieData, isLoading: loadingMovies, error: errorMovies } = useSearchMoviesQuery(searchQuery, {
    skip: searchQuery.length < 2,
  })

  const newsResults: NewsArticle[] = newsData?.articles || []
  const movieResults: Movie[] = movieData?.results || []

  const showNothing =
    !searchQuery ||
    (newsResults.length === 0 && movieResults.length === 0 && !loadingNews && !loadingMovies)

  if (showNothing) return null

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-xl font-bold">🔍 Search Results for: {searchQuery}</h2>

      {/* News */}
      <div>
        <h3 className="text-lg font-semibold mb-2">📰 News</h3>
        {loadingNews ? (
          <p className="text-sm text-gray-500">Loading news...</p>
        ) : errorNews ? (
          <p className="text-sm text-red-500">Failed to load news.</p>
        ) : newsResults.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newsResults.map((article: NewsArticle, i: number) => (
              <ContentCard
                key={`news-${i}`}
                id={article.url}
                title={article.title}
                description={article.description}
                publisher={article.source.name}
                imageUrl={article.urlToImage}
                publishedAt={new Date(article.publishedAt).toLocaleDateString()}
                url={article.url}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No news results found.</p>
        )}
      </div>

      {/* Movies */}
      <div>
        <h3 className="text-lg font-semibold mb-2">🎬 Movies</h3>
        {loadingMovies ? (
          <p className="text-sm text-gray-500">Loading movies...</p>
        ) : errorMovies ? (
          <p className="text-sm text-red-500">Failed to load movies.</p>
        ) : movieResults.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {movieResults.map((movie: Movie) => (
              <ContentCard
                key={`movie-${movie.id}`}
                id={movie.id.toString()}
                title={movie.title}
                description={movie.overview}
                publisher="TMDB"
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                publishedAt={movie.release_date}
                url={`https://www.themoviedb.org/movie/${movie.id}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No movie results found.</p>
        )}
      </div>
    </div>
  )
}
