import {createAsyncThunk} from '@reduxjs/toolkit';
import service from '../../service/service';

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
