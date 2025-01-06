import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiManager} from '../../api';
const throwError = (err, rejectWithValue) => {
  console.log(err);
  if (err.response && err.response.data && err.response.data.message) {
    return rejectWithValue(err.response.data.message);
  }
  return rejectWithValue('Network Error. Please try again.');
};

export const login = createAsyncThunk(
  'auth/login',
  async (data, {rejectWithValue}) => {
    try {
      const res = await apiManager.post('/user/login', data);
      return res.data;
    } catch (error) {
      return throwError(error, rejectWithValue);
    }
  },
);
export const signup = createAsyncThunk(
  'auth/signup',
  async (data, {rejectWithValue}) => {
    try {
      const res = await apiManager.post('/user/createUserAndSendOtp', data);
      return res.data;
    } catch (error) {
      return throwError(error, rejectWithValue);
    }
  },
);
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data, {rejectWithValue}) => {
    try {
      const res = await apiManager.post('/user/forgot-password', data);
      return res.data;
    } catch (error) {
      return throwError(error, rejectWithValue);
    }
  },
);
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (data, {rejectWithValue}) => {
    try {
      const res = await apiManager.post('/user/verifyOtp', data);
      return res.data;
    } catch (error) {
      return throwError(error, rejectWithValue);
    }
  },
);
export const resetOtp = createAsyncThunk(
  'auth/resetOtp',
  async (data, {rejectWithValue}) => {
    try {
      const res = await apiManager.post(
        '/user/verifyForgotPasswordOtpVerification',
        data,
      );
      return res.data;
    } catch (error) {
      return throwError(error, rejectWithValue);
    }
  },
);
