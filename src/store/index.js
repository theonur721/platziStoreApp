import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './slice/productsSlice'; // Slice'ı doğru şekilde import et

export const store = configureStore({
  reducer: {
    products: productsReducer, // Slice reducer'ı store'a ekliyoruz
  },
});
