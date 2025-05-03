import {createSlice} from '@reduxjs/toolkit';
import {
  addToCart,
  getCartDetails,
  getSettings,
  getUserEsims,
  removeFromCart,
  settings,
} from './mainThunk';

const INITIAL_STATE = {
  cart: [],
  loading: false,
  instantBuyItem: null,
  userEsims: [],
  settings: null,
};
const mainSlice = createSlice({
  initialState: INITIAL_STATE,
  name: 'main',

  reducers: {
    setInstantBuyItem: (state, action) => {
      state.instantBuyItem = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCartDetails.fulfilled, (state, action) => {
      state.cart = action.payload.cart;
    });
    builder.addCase(getCartDetails.rejected, (state, action) => {
      state.cart = [];
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
    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.settings = action.payload.settings;
    });
    builder.addCase(getUserEsims.rejected, (state, action) => {
      state.userEsims = action.payload.esims;
      state.loading = false;
    });
  },
});
export const {setInstantBuyItem} = mainSlice.actions;
export default mainSlice.reducer;
