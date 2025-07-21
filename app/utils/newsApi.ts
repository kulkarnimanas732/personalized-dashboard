import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Article = {
  source: { name: string }
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
}

type NewsApiResponse = {
  status: string
  totalResults: number
  articles: Article[]
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/news/' }),
  endpoints: (builder) => ({
    getLatestNews: builder.query<NewsApiResponse, number>({
      query: (page = 1) => `latest?page=${page}`,
    }),
    getNewsByCategory: builder.query<NewsApiResponse, string>({
      query: (category) => `category?category=${category}`,
    }),
    searchNews: builder.query<NewsApiResponse, string>({
      query: (keyword) => `search?query=${keyword}`,
    }),
  }),
})

export const {
  useGetLatestNewsQuery,
  useLazyGetLatestNewsQuery,
  useGetNewsByCategoryQuery,
  useSearchNewsQuery,
} = newsApi
