// // // Header.tsx
// // 'use client'

// // import { Menu } from 'lucide-react'

// // export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
// //   return (
// //     <header className="flex justify-between items-center bg-white dark:bg-gray-900 shadow-md px-4 py-3">
// //       <div className="flex items-center gap-4">
// //         <button className="md:hidden" onClick={toggleSidebar}>
// //           <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
// //         </button>
// //         <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
// //       </div>

// //       <div className="flex items-center gap-3">
// //         <span className="text-sm text-gray-600 dark:text-gray-300">Hello, User</span>
// //         <img
// //           src="https://i.pravatar.cc/40"
// //           alt="User Avatar"
// //           className="w-8 h-8 rounded-full"
// //         />
// //       </div>
// //     </header>
// //   )
// // }
// 'use client'

// import { Menu } from 'lucide-react'
// import { useState } from 'react'

// export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
//   const [query, setQuery] = useState('')

//   return (
//     <header className="flex justify-between items-center bg-white dark:bg-gray-900 shadow-md px-4 py-3 sticky top-0 z-10">
//       <div className="flex items-center gap-4">
//         <button className="md:hidden" onClick={toggleSidebar}>
//           <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
//         </button>
//         <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
//       </div>

//       <div className="flex items-center gap-4 w-full max-w-md">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search..."
//           className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
//         />
//         {/* Future: You can trigger search here */}
//       </div>

//       <div className="flex items-center gap-3">
//         <span className="text-sm text-gray-600 dark:text-gray-300">Hello, User</span>
//         <img
//           src="https://i.pravatar.cc/40"
//           alt="User Avatar"
//           className="w-8 h-8 rounded-full"
//         />
//       </div>
//     </header>
//   )
// }
'use client';

import Image from 'next/image';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [query, setQuery] = useState('');

  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-900 shadow-md px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden" onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4 w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-300">Hello, User</span>
        <Image
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          width={40}
          height={40}
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}
