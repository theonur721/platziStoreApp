import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import service from '../../service/service';

export const fetchProductsByCategory = createAsyncThunk(
  'categoryProducts/fetch',
  async (categoryId, thunkAPI) => {
    try {
      const data = await service.getProductsByCategory(categoryId);
      console.log('Gelen Ürünler:', data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  products: [],
  pending: false,
  error: null,
};

const categoryProductsSlice = createSlice({
  name: 'categoryProducts',
  initialState,
  reducers: {
    // Ürünleri sıfırlamak için
    clearProducts: state => {
      state.products = [];
      state.pending = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductsByCategory.pending, state => {
        state.pending = true;
        state.error = null; // Hata durumunu sıfırlıyoruz
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.pending = false;
        state.products = action.payload; // Ürünleri setliyoruz
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload; // Hata mesajını setliyoruz
      });
  },
});

// Action'ı dışarıya aktarıyoruz
export const {clearProducts} = categoryProductsSlice.actions;

export default categoryProductsSlice.reducer;
