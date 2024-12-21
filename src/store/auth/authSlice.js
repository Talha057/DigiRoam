import {createSlice} from '@reduxjs/toolkit';
import {login, signup} from './authThunk';

const INITIAL_STATE = {
  user: null,
  loading: false,
};
const authSlice = createSlice({
  initialState: INITIAL_STATE,
  name: 'auth',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default authSlice.reducer;
