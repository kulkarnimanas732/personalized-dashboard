import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY

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
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (builder) => ({
    getLatestNews: builder.query<NewsApiResponse, number>({
      query: (page = 1) =>
        `top-headlines?country=us&page=${page}&pageSize=10&apiKey=${API_KEY}`,
    }),
    getNewsByCategory: builder.query<NewsApiResponse, string>({
      query: (category) =>
        `top-headlines?country=us&category=${category}&apiKey=${API_KEY}`,
    }),
    searchNews: builder.query<NewsApiResponse, string>({
      query: (keyword) =>
        `everything?q=${keyword}&apiKey=${API_KEY}`,
    }),
  }),
})

export const {
  useGetLatestNewsQuery,
  useLazyGetLatestNewsQuery,
  useGetNewsByCategoryQuery,
  useSearchNewsQuery,
} = newsApi
