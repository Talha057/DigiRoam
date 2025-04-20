import {createSlice} from '@reduxjs/toolkit';
import {
  addToCart,
  getCartDetails,
  getUserEsims,
  removeFromCart,
} from './mainThunk';

const INITIAL_STATE = {
  cart: [],
  loading: false,
  instantBuyItem: null,
  userEsims: [],
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
    setInstantBuyItem: (state, action) => {
      state.instantBuyItem = action.payload;
    },
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
    builder.addCase(getUserEsims.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserEsims.fulfilled, (state, action) => {
      state.userEsims = action.payload.esims;
      state.loading = false;
    });
    builder.addCase(getUserEsims.rejected, (state, action) => {
      state.userEsims = action.payload.esims;
      state.loading = false;
    });
  },
});
export const {setInstantBuyItem} = mainSlice.actions;
export default mainSlice.reducer;
