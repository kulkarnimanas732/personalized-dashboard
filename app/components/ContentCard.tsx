// 'use client'

// import { Heart, Share2 } from 'lucide-react'

// type Props = {
//   title: string
//   description: string
//   publisher: string
//   imageUrl: string
//   publishedAt: string
//   url: string
// }

// export default function ContentCard({ title, description, publisher, imageUrl, publishedAt, url }: Props) {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-all max-w-sm w-full">
//       <img
//         src={imageUrl}
//         alt={title}
//         className="h-40 w-full object-cover rounded-t-xl"
//       />

//       <div className="p-4 space-y-2">
//         <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
//           <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium text-xs">
//             {publisher}
//           </span>
//           <span>{publishedAt}</span>
//         </div>

//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{title}</h3>
//         <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{description}</p>

//         <div className="flex justify-between items-center mt-3">
//           <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//           >
//             Read More ↗
//           </a>
//           <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300">
//             <Heart className="w-5 h-5 hover:text-red-500 cursor-pointer" />
//             <Share2 className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client';

import Image from 'next/image';
import { Heart, Share2 } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  publisher: string;
  imageUrl: string;
  publishedAt: string;
  url: string;
};

export default function ContentCard({ title, description, publisher, imageUrl, publishedAt, url }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-all max-w-sm w-full">
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={160}
        className="h-40 w-full object-cover rounded-t-xl"
      />

      <div className="p-4 space-y-2">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium text-xs">
            {publisher}
          </span>
          <span>{publishedAt}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{description}</p>

        <div className="flex justify-between items-center mt-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Read More ↗
          </a>
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-300">
            <Heart className="w-5 h-5 hover:text-red-500 cursor-pointer" />
            <Share2 className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
