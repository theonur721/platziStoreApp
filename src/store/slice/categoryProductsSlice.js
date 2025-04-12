import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import service from '../../service/service';

// Asenkron thunk (Kategoriye göre ürünleri çekme)
export const fetchProductsByCategory = createAsyncThunk(
  'categoryProducts/fetch',
  async (categoryId, thunkAPI) => {
    try {
      // API'den ürünleri çekiyoruz
      const data = await service.getProductsByCategory(categoryId);
      console.log('Gelen Ürünler:', data); // API yanıtını kontrol edelim
      return data; // Dönüyoruz
    } catch (error) {
      // Hata durumunda hata mesajını döndürüyoruz
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Başlangıç durumu
const initialState = {
  products: [],
  pending: false,
  error: null,
};

// Slice
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
