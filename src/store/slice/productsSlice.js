import {createSlice} from '@reduxjs/toolkit';

// İlk state'imiz
const initialState = {
  products: [], // Ürünlerin listesi
  pending: false, // Yükleniyor durumu
  error: null, // Hata
};

// `products` slice'ını oluşturuyoruz
export const productsSlice = createSlice({
  name: 'products', // Slice'ın adı
  initialState, // Başlangıç state'i
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload; // Ürünleri state'e set ediyoruz
      state.pending = false; // Ürünler yüklendiğinde loading durumu false oluyor
    },
    setLoading: state => {
      state.pending = true; // Yükleniyor durumu true
    },
    setError: (state, action) => {
      state.error = action.payload; // Hata mesajını set ediyoruz
      state.pending = false; // Hata alındığında loading durumu false
    },
  },
});

// Actions'ı export ediyoruz
export const {setProducts, setLoading, setError} = productsSlice.actions;

// Reducer'ı export ediyoruz
export default productsSlice.reducer;
