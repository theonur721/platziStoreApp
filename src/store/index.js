import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './slice/productsSlice'; // Slice'ı doğru şekilde import et
import categoriesReducer from './slice/categoriesSlice';
import favoriteReducer from './slice/favoriteSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer, // Slice reducer'ı store'a ekliyoruz
    categories: categoriesReducer,
    favorites: favoriteReducer,
  },
});
