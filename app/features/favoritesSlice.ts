
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoriteItem = {
  id: string;
  title: string;
  description: string;
  publisher: string;
  imageUrl: string;
  publishedAt: string;
  url: string;
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as FavoriteItem[],
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        return state.filter((item) => item.id !== action.payload.id);
      } else {
        state.push(action.payload);
      }
    },
    reorderFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      return action.payload;
    },
    clearFavorites: () => {
      return [];
    },
  },
});

export const { toggleFavorite, reorderFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
