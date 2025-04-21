import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './slice/productsSlice'; // Slice'ı doğru şekilde import et
import categoriesReducer from './slice/categoriesSlice';
import favoriteReducer from './slice/favoriteSlice';
import cartReducer from './slice/cartSlice';
import categoryProductsReducer from './slice/categoryProductsSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer, // Slice reducer'ı store'a ekliyoruz
    categories: categoriesReducer,
    favorites: favoriteReducer,
    cart: cartReducer,
    categoryProducts: categoryProductsReducer,
    auth: authReducer,
  },
});
