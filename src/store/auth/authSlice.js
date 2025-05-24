import {createSlice} from '@reduxjs/toolkit';
import {
  facebookLogin,
  forgotPassword,
  getMyProfile,
  googleLogin,
  login,
  resetOtp,
  signup,
  verifyOtp,
} from './authThunk';

const INITIAL_STATE = {
  user: null,
  loading: false,
  token: null,
};
const authSlice = createSlice({
  initialState: INITIAL_STATE,
  name: 'auth',
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.data.accessToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    });
    builder.addCase(facebookLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
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
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(verifyOtp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(resetOtp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetOtp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(resetOtp.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
    });
  },
});
export const {setToken} = authSlice.actions;
export default authSlice.reducer;
