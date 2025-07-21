'use client';

import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/features/favoritesSlice';
import { RootState } from '@/store';
import { Heart } from 'lucide-react';

type Item = {
  id: string;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  release_date?: string;
  url?: string;
  publisher?: string;
  imageUrl?: string;
  publishedAt?: string;
};

export default function Card({ item }: { item: Item }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  const isFavorited = favorites.some((fav) => fav.id === item.id);

  const handleFavoriteToggle = () => {
    dispatch(
      toggleFavorite({
        id: item.id,
        title: item.title || item.name || 'Untitled',
        description: item.overview || 'No description available',
        publisher: item.publisher || 'Unknown',
        imageUrl: item.imageUrl || item.poster_path || '',
        publishedAt: item.publishedAt || item.release_date || '',
        url: item.url || '',
      })
    );
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {item.title || item.name}
        </h3>
        <button onClick={handleFavoriteToggle} className="text-yellow-500 hover:text-yellow-600">
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-yellow-400' : ''}`} />
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        {item.overview?.slice(0, 100) || 'No overview available...'}...
      </p>
    </div>
  );
}
