import {createAsyncThunk} from '@reduxjs/toolkit';
import service from '../../service/service';

// Arama için fetch işlemi (thunk)
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchTerm, {rejectWithValue}) => {
    try {
      const response = await service.searchProductByTitle(searchTerm); // servis fonksiyonunu çağırıyoruz
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
