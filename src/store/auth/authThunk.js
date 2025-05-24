import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiManager} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
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

      const {idToken, user} = signInResult?.data;

      if (!idToken) {
        throw new Error('Unable to Login');
      }
      const response = await apiManager.post('/auth/native/callback', {
        provider: 'google',
        providerId: idToken, // socialID of google|facebook|apple
        email: user?.email, // user email retrieved from google|facebook|apple
        name: user?.name, // user name retrieved from google|facebook|apple
      });
      AsyncStorage.setItem('token', JSON.stringify(response.data.accessToken));
      return response?.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue({
        message: err?.response?.data?.message || 'Failed. Please try again.',
        code: err?.response?.status || null,
      });
    }
  },
);

export const facebookLogin = createAsyncThunk(
  'auth/facebookLogin',
  async (_, {rejectWithValue}) => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        console.log('login cancelled');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        console.log('something went wrong');
        return;
      }

      const profile = await Profile.getCurrentProfile();

      const response = await apiManager.post('/auth/native/callback', {
        provider: 'facebook',
        providerId: profile?.userID, // socialID of google|facebook|apple
        email: profile?.email, // user email retrieved from google|facebook|apple
        name: `${profile.firstName} ${profile.lastName}`, // user name retrieved from google|facebook|apple
      });

      AsyncStorage.setItem('token', JSON.stringify(response.data.accessToken));
      return response?.data;
    } catch (err) {
      return rejectWithValue({
        message: err?.response?.data?.message || 'Failed. Please try again.',
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
