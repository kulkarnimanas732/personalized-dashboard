import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY

type Movie = {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
}

type TMDBApiResponse = {
  results: Movie[]
  page: number
  total_pages: number
}

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
  }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<TMDBApiResponse, number>({
      query: (page = 1) => `trending/movie/week?api_key=${API_KEY}&page=${page}`,
    }),
    searchMovies: builder.query<TMDBApiResponse, string>({
      query: (query) =>
        `search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`,
    }),
  }),
})

export const {
  useGetTrendingMoviesQuery,
  useLazyGetTrendingMoviesQuery,
  useSearchMoviesQuery,
} = tmdbApi
