import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import service from '../../service/service';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const data = await service.getCategories(); // API'den kategorileri al
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // hata varsa reducer'a gönder
    }
  },
);

const initialState = {
  categories: [],
  pending: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.pending = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.pending = false;
      });
  },
});

export default categoriesSlice.reducer;
