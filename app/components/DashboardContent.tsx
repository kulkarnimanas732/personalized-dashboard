// components/DashboardContent.tsx
'use client'

import ContentCard from './ContentCard'
import SearchResults from './SearchResults'
import { useGetNewsByCategoryQuery } from '../utils/newsApi'
import { useGetTrendingMoviesQuery } from '../utils/tmdbApi'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Types
type Item = {
  id: string
  title: string
  description: string
  publisher: string
  imageUrl: string
  publishedAt: string
  url: string
}

type NewsAPIResponse = {
  title: string
  description?: string
  source?: { name: string }
  urlToImage?: string
  publishedAt: string
  url: string
}

type MovieAPIResponse = {
  id: number
  title: string
  overview?: string
  poster_path?: string
  release_date?: string
}

const ITEMS_PER_SCROLL = 3

function SortableCard({ item }: { item: Item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(item.id) })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ContentCard {...item} />
    </div>
  )
}

export default function DashboardContent() {
  const { data: newsData } = useGetNewsByCategoryQuery('business')
  const { data: moviesData } = useGetTrendingMoviesQuery(1)

  const [visibleItems, setVisibleItems] = useState<Item[]>([])
  const [page, setPage] = useState(1)
  const observerRef = useRef<HTMLDivElement | null>(null)

  const allNews = useMemo<Item[]>(
    () =>
      newsData?.articles?.map((n: NewsAPIResponse, idx: number): Item => ({
        id: `news-${idx}`,
        title: n.title,
        description: n.description || '',
        publisher: n.source?.name || 'Unknown',
        imageUrl: n.urlToImage || '',
        publishedAt: new Date(n.publishedAt).toLocaleDateString(),
        url: n.url,
      })) || [],
    [newsData]
  )

  const allMovies = useMemo<Item[]>(
    () =>
      moviesData?.results?.map((m: MovieAPIResponse, idx: number): Item => ({
        id: `movie-${idx}`,
        title: m.title,
        description: m.overview || '',
        publisher: 'TMDB',
        imageUrl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        publishedAt: m.release_date || '',
        url: `https://www.themoviedb.org/movie/${m.id}`,
      })) || [],
    [moviesData]
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const loadMoreItems = useCallback(() => {
    const newsSlice = allNews.slice(
      visibleItems.filter((i) => i.id.startsWith('news')).length,
      page * ITEMS_PER_SCROLL
    )
    const movieSlice = allMovies.slice(
      visibleItems.filter((i) => i.id.startsWith('movie')).length,
      page * ITEMS_PER_SCROLL
    )
    setVisibleItems((prev) => [...prev, ...newsSlice, ...movieSlice])
    setPage((prev) => prev + 1)
  }, [allNews, allMovies, visibleItems, page])

  useEffect(() => {
    if (allNews.length > 0 && allMovies.length > 0 && visibleItems.length === 0) {
      loadMoreItems()
    }
  }, [allNews, allMovies, visibleItems, loadMoreItems])

  useEffect(() => {
    if (!observerRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems()
        }
      },
      { threshold: 1 }
    )
    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [loadMoreItems])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = visibleItems.findIndex((item) => item.id === active.id)
    const newIndex = visibleItems.findIndex((item) => item.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      setVisibleItems(arrayMove(visibleItems, oldIndex, newIndex))
    }
  }

  return (
    <div className="p-6 space-y-8">
      <SearchResults />
      <div>
        <h1 className="text-2xl font-bold">Your Personalized Feed</h1>
        <p className="text-sm text-gray-500">Drag to reorder, scroll to load more</p>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={visibleItems.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleItems.map((item) => (
                <SortableCard key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div ref={observerRef} className="h-10" />
      </div>
    </div>
  )
}
