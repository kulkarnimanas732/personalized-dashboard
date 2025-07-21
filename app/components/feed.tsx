
'use client'

import { useEffect, useRef, useState } from 'react'
import Card from './Card'
import { useLazyGetTrendingMoviesQuery } from '../utils/tmdbApi'
import { useLazyGetLatestNewsQuery } from '../utils/newsApi'

type FeedItem = {
  id: string
  title: string
  description: string
  publisher: string
  imageUrl: string
  publishedAt: string
  url: string
  type: 'news' | 'movie'
}

type MovieApiItem = {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
}

type NewsApiItem = {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: { name: string }
}

export default function UnifiedFeedPage() {
  const [moviePage, setMoviePage] = useState(1)
  const [newsPage, setNewsPage] = useState(1)
  const [items, setItems] = useState<FeedItem[]>([])

  const loaderRef = useRef<HTMLDivElement | null>(null)

  const [getMovies, { data: moviesData }] = useLazyGetTrendingMoviesQuery()
  const [getNews, { data: newsData }] = useLazyGetLatestNewsQuery()

  useEffect(() => {
    getMovies(moviePage)
    getNews(newsPage)
  }, [moviePage, newsPage, getMovies, getNews])

  useEffect(() => {
    const newItems: FeedItem[] = []

    if (moviesData?.results?.length) {
      // newItems.push(
      //   ...moviesData.results.map((item: MovieApiItem) => ({
      //     id: `movie-${moviePage}-${item.id}`,
      //     title: item.title,
      //     description: item.overview || '',
      //     publisher: 'TMDB',
      //     imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      //     publishedAt: item.release_date || '',
      //     url: `https://www.themoviedb.org/movie/${item.id}`,
      //     type: 'movie',
      //   }))
      // )
      newItems.push(
  ...moviesData.results.map((item: MovieApiItem) => ({
    id: `movie-${moviePage}-${item.id}`,
    title: item.title,
    description: item.overview || '',
    publisher: 'TMDB',
    imageUrl: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    publishedAt: item.release_date || '',
    url: `https://www.themoviedb.org/movie/${item.id}`,
    type: 'movie' as const, // ✅ Fix here
  }))
)
    }

    if (newsData?.articles?.length) {
      newItems.push(
  ...newsData.articles.map((item: NewsApiItem, index: number) => ({
    id: `news-${newsPage}-${index}`,
    title: item.title,
    description: item.description || '',
    publisher: item.source?.name || 'Unknown',
    imageUrl: item.urlToImage || '',
    publishedAt: new Date(item.publishedAt).toLocaleDateString(),
    url: item.url,
    type: 'news' as const, // ✅ Fix here
  }))
)
      // newItems.push(
      //   ...newsData.articles.map((item: NewsApiItem, index: number) => ({
      //     id: `news-${newsPage}-${index}`,
      //     title: item.title,
      //     description: item.description || '',
      //     publisher: item.source?.name || 'Unknown',
      //     imageUrl: item.urlToImage || '',
      //     publishedAt: new Date(item.publishedAt).toLocaleDateString(),
      //     url: item.url,
      //     type: 'news',
      //   }))
      // )
    }

    setItems((prev) => [...prev, ...newItems])
  }, [moviesData, newsData, moviePage, newsPage])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMoviePage((prev) => prev + 1)
        setNewsPage((prev) => prev + 1)
      }
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📰 Unified Feed</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <div ref={loaderRef} className="h-10" />
    </div>
  )
}
