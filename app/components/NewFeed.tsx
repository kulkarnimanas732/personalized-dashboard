'use client'

import { useEffect, useState } from 'react'
import { fetchNewsByCategory } from '../utils/newApi'
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
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNewsByCategory(category)
      .then(setArticles)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold capitalize">{category} News</h2>

      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article, i) => (
            <ContentCard
              key={i}
              title={article.title}
              description={article.description}
              publisher={article.source.name}
              imageUrl={article.urlToImage || '/placeholder.jpg'}
              publishedAt={new Date(article.publishedAt).toLocaleDateString()}
              url={article.url}
            />
          ))}
        </div>
      )}
    </div>
  )
}
