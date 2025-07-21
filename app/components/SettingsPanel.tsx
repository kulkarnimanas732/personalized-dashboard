'use client'

import Dashboard from '../Layout/Dashboard'
import { useDispatch } from 'react-redux'
import { clearFavorites } from '../features/favoritesSlice'
import { signOut, useSession } from 'next-auth/react'

export default function SettingsPage() {
  const dispatch = useDispatch()
  const { data: session } = useSession()

  return (
    <Dashboard>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">⚙️ Settings</h1>

        {session?.user && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Account</h2>
            <p><strong>Name:</strong> {session.user.name}</p>
            <p><strong>Email:</strong> {session.user.email}</p>
            <button
              onClick={() => signOut()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          {/* <h2 className="text-lg font-semibold mb-2">App Preferences</h2> */}
          <button
            onClick={() => dispatch(clearFavorites())}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Clear All Favorites
          </button>
        </div>
      </div>
    </Dashboard>
  )
}
