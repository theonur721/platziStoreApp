import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email, password}, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const {access_token, refresh_token} = response.data;

      // Tokenları AsyncStorage'a kaydet
      await AsyncStorage.setItem('accessToken', access_token);
      await AsyncStorage.setItem('refreshToken', refresh_token);

      return {access_token, refresh_token};
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('refreshToken');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
