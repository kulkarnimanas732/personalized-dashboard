// // Sidebar.tsx
// 'use client'

// import Link from 'next/link'

// const navItems = [
//   { label: 'Home', href: '/' },
//   { label: 'Reports', href: '/reports' },
//   { label: 'Settings', href: '/settings' },
// ]

// export default function Sidebar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
//   return (
//     <aside
//       className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       } md:translate-x-0 md:static`}
//     >
//       <div className="flex items-center justify-between p-4 md:hidden">
//         <h2 className="text-xl font-bold">MyApp</h2>
//         <button onClick={toggle} className="text-white text-xl">
//           ✕
//         </button>
//       </div>

//       <nav className="mt-10 space-y-2 p-4">
//         {navItems.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className="block px-4 py-2 rounded hover:bg-gray-700"
//           >
//             {item.label}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   )
// }
'use client'

import Link from 'next/link'
import { Home, FileText, Settings } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Reports', href: '/reports', icon: FileText },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <aside
      className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static`}
    >
      <div className="flex items-center justify-between p-4 md:hidden">
        <h2 className="text-xl font-bold">MyApp</h2>
        <button onClick={toggle} className="text-white text-xl">
          ✕
        </button>
      </div>

      <div className="mt-6 px-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
