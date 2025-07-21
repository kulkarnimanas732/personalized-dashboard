'use client'

import { useSession, signOut } from 'next-auth/react'
import { Menu, Search, Moon, Sun, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../features/preferences/searchSlice'

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const [query, setQuery] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Debounced search function
  const handleSearch = debounce((value: string) => {
    dispatch(setSearchQuery(value))
  }, 400)

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    handleSearch(e.target.value)
  }

  // Dark mode logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Content Dashboard
        </h1>
      </div>

      {/* 🔍 Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={onChangeSearch}
            placeholder="Search content..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>

        {session?.user ? (
          <div className="relative dropdown-container">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
                {session.user.name}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600 py-1">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{session.user.email}</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/auth/login" className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Login
          </a>
        )}
      </div>
    </header>
  )
}
