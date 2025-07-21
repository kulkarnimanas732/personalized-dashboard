import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
