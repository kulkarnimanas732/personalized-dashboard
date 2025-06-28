'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/index'
import { setCategories, toggleTheme } from '../features/preferences/preferencesSlice'

const SettingsPanel = () => {
  const dispatch = useDispatch()
  const { selectedCategories, theme } = useSelector((state: RootState) => state.preferences)

  const handleToggleCategory = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    dispatch(setCategories(updated))
  }

  return (
    <div className="p-4 border rounded-md shadow">
      <h2 className="text-xl font-bold mb-2">Settings</h2>
      <div className="mb-4">
        <p className="mb-1 font-semibold">Select Categories:</p>
        {['technology', 'sports', 'finance'].map((category) => (
          <label key={category} className="block">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleToggleCategory(category)}
            />
            <span className="ml-2">{category}</span>
          </label>
        ))}
      </div>
      <div>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Toggle Theme (Current: {theme})
        </button>
      </div>
    </div>
  )
}

export default SettingsPanel
