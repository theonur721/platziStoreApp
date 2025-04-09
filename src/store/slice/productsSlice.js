import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import service from '../../service/service'; // servisin doğru yolu
import {searchProducts} from '../actions/searchProductActions'; // Arama eylemi burada

// Tüm ürünleri çekme işlemi (fetchProducts)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', // Redux action tipi
  async (_, {rejectWithValue}) => {
    try {
      const response = await service.getAllProducts('v1/products'); // API'yi doğru çağırıyoruz
      return response; // Ürünleri döndürüyoruz
    } catch (error) {
      return rejectWithValue(error.message); // Hata mesajını döndürüyoruz
    }
  },
);

// Başlangıç state
const initialState = {
  products: [],
  searchedProducts: [],
  loading: false,
  error: null,
};

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Tüm ürünleri çekme işlemi
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Ürünleri güncelliyoruz
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Hata durumunu kaydediyoruz
      })
      // Arama işlemi
      .addCase(searchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedProducts = action.payload; // Arama sonuçlarını kaydediyoruz
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Hata mesajını kaydediyoruz
      });
  },
});

export default productsSlice.reducer;
