'use client';

import { Heart, Share2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/favoritesSlice';
import { RootState } from '../store';
import Image from 'next/image';

type Props = {
  id: string;
  title: string;
  description: string;
  publisher: string;
  imageUrl: string;
  publishedAt: string;
  url: string;
};

export default function ContentCard({
  id,
  title,
  description,
  publisher,
  imageUrl,
  publishedAt,
  url,
}: Props) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.some((item) => item.id === id)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      toggleFavorite({ id, title, description, publisher, imageUrl, publishedAt, url })
    );
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const hasValidImage =
    typeof imageUrl === 'string' &&
    imageUrl.trim() !== '' &&
    imageUrl !== 'null' &&
    imageUrl.startsWith('http') &&
    !imageUrl.includes('placeholder');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-all max-w-sm w-full select-none">
      {hasValidImage ? (
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={160}
          unoptimized
          className="h-40 w-full object-cover rounded-t-xl pointer-events-none"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.style.display = 'none';

            const fallback = document.createElement('div');
            fallback.className =
              'h-40 w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-t-xl flex items-center justify-center';
            fallback.innerHTML = `
              <div class="text-center">
                <svg class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span class="text-sm text-gray-500 dark:text-gray-400">Image Not Available</span>
              </div>
            `;
            target.parentNode?.appendChild(fallback);
          }}
        />
      ) : (
        <div className="h-40 w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-t-xl flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400">No Image Available</span>
          </div>
        </div>
      )}

      <div className="p-4 space-y-2">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium text-xs pointer-events-none">
            {publisher}
          </span>
          <span className="pointer-events-none">{publishedAt}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 pointer-events-none">
          {title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 pointer-events-none">
          {description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition pointer-events-auto"
            onClick={handleReadMoreClick}
          >
            Read More ↗
          </a>
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300">
            <Heart
              className={`w-5 h-5 cursor-pointer pointer-events-auto ${
                isFavorite ? 'text-red-500' : 'hover:text-red-500'
              }`}
              onClick={handleFavoriteClick}
            />
            <Share2
              className="w-5 h-5 hover:text-blue-500 cursor-pointer pointer-events-auto"
              onClick={handleShareClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
