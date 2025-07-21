import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../features/favoritesSlice';
import searchReducer from '../features/preferences/searchSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';
import { tmdbApi } from '../utils/tmdbApi';
import { newsApi } from '../utils/newsApi';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    search: searchReducer,
    preferences: preferencesReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tmdbApi.middleware)
      .concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
