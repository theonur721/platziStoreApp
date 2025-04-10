import {createSlice} from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1); // çıkar
      } else {
        state.push(action.payload); // ekle
      }
    },
  },
});

export const {toggleFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;
