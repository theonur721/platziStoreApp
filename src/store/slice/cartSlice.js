import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );

      if (existingItem >= 0) {
        state.cartItems[existingItem].quantity += 1;
      } else state.cartItems.push({...action.payload, quantity: 1});
    },
    removeFromCart: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === action.payload,
      );

      if (existingItemIndex !== -1) {
        if (state.cartItems[existingItemIndex].quantity > 1) {
          // miktarı 1 azalt
          state.cartItems[existingItemIndex].quantity -= 1;
        } else {
          // sepette sadece 1 tane varsa tamamen kaldır
          state.cartItems.splice(existingItemIndex, 1);
        }
      }
    },
  },
});

export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
