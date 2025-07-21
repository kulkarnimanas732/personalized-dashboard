'use client'

import { useGetNewsByCategoryQuery } from '../utils/newsApi' // <-- RTK Query API hook
import ContentCard from './ContentCard'

type Article = {
  title: string
  description: string
  source: { name: string }
  urlToImage: string
  publishedAt: string
  url: string
}

export default function NewsFeed({ category = 'business' }: { category?: string }) {
  const { data, isLoading, error } = useGetNewsByCategoryQuery(category)

  const articles: Article[] = data?.articles || []

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold capitalize">{category} News</h2>

      {isLoading ? (
        <p>Loading news...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load news.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article, i) => (
            <ContentCard
              key={`${article.url}-${i}`} // Fixed: Added unique key
              id={article.url}
              title={article.title}
              description={article.description}
              publisher={article.source.name}
              imageUrl={article.urlToImage} // Let ContentCard handle empty images
              publishedAt={new Date(article.publishedAt).toLocaleDateString()}
              url={article.url}
            />
          ))}
        </div>
      )}
    </div>
  )
}