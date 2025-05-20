import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiManager} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const throwError = (err, rejectWithValue) => {
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
      AsyncStorage.setItem('token', JSON.stringify(res.data.data.accessToken));
      return res.data;
    } catch (err) {
      // throw error;
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue({
          message: err.response.data.message,
          code: err.response.status || null,
        });
      }
      return rejectWithValue({
        message: 'Network Error. Please try again.',
        code: null,
      });
    }
  },
);
export const googleLogin = createAsyncThunk(
  'auth/googlelogin',
  async (data, {rejectWithValue}) => {
    try {
      const hasPlayService = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      if (!hasPlayService) {
        throw new Error('This device doesnot have google play services');
      }
      const signInResult = await GoogleSignin.signIn();
      console.log(signInResult);
      // Try the new style of google-sign in result, from v13+ of that module
      const idToken = signInResult?.data?.idToken;

      if (!idToken) {
        throw new Error('Unable to Login');
      }
      const response = await apiManager.post('/api/auth/native/callback', {
        idToken,
      });
      AsyncStorage.setItem('token', JSON.stringify(res.data.data.accessToken));
      return response?.data;
    } catch (err) {
      return rejectWithValue({
        message:
          err?.response?.data?.message || 'Network Error. Please try again.',
        code: err?.response?.status || null,
      });
    }
  },
);
export const getMyProfile = createAsyncThunk(
  'auth/getMyProfile',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.get('/user/getMyProfile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      console.log(error.response);
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
      console.log(error.response);
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
export const editUserProfile = createAsyncThunk(
  'main/editUserProfile',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.put('/user/updateProfile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
