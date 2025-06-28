import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

interface PreferencesState {
  selectedCategories: string[]
  theme: Theme
}

const initialState: PreferencesState = {
  selectedCategories: ['technology', 'sports'],
  theme: 'light',
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.selectedCategories = action.payload
      localStorage.setItem('selectedCategories', JSON.stringify(action.payload))
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
    loadPreferences(state) {
      const savedCategories = localStorage.getItem('selectedCategories')
      const savedTheme = localStorage.getItem('theme')
      if (savedCategories) state.selectedCategories = JSON.parse(savedCategories)
      if (savedTheme === 'dark' || savedTheme === 'light') state.theme = savedTheme
    },
  },
})

export const { setCategories, toggleTheme, loadPreferences } = preferencesSlice.actions
export default preferencesSlice.reducer
