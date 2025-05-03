import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './slice/productsSlice';
import categoriesReducer from './slice/categoriesSlice';
import favoriteReducer from './slice/favoriteSlice';
import cartReducer from './slice/cartSlice';
import categoryProductsReducer from './slice/categoryProductsSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    favorites: favoriteReducer,
    cart: cartReducer,
    categoryProducts: categoryProductsReducer,
    auth: authReducer,
  },
});
