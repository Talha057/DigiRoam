import {createSlice} from '@reduxjs/toolkit';
import {addToCart, getCartDetails, removeFromCart} from './mainThunk';

const INITIAL_STATE = {
  cart: [],
  loading: false,
};
const mainSlice = createSlice({
  initialState: INITIAL_STATE,
  name: 'main',

  reducers: {
    // addToCart: (state, action) => {
    //   const {packageCode} = action.payload;
    //   const existingItemIndex = state.cart.findIndex(
    //     elem => elem.packageCode === packageCode,
    //   );
    //   if (existingItemIndex !== -1) state.cart[existingItemIndex].quantity += 1;
    //   else state.cart.push({...action.payload, quantity: 1});
    // },
  },
  extraReducers: builder => {
    builder.addCase(getCartDetails.fulfilled, (state, action) => {
      state.cart = action.payload.cart;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});
// export const {addToCart} = mainSlice.actions;
export default mainSlice.reducer;
