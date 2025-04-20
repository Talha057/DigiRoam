import {createAsyncThunk} from '@reduxjs/toolkit';
import {apiManager} from '../../api';
const throwError = (err, rejectWithValue) => {
  if (err.response && err.response.data && err.response.data.message) {
    return rejectWithValue(err.response.data.message);
  }
  return rejectWithValue('Network Error. Please try again.');
};

export const getEsims = createAsyncThunk(
  'main/getEsims',
  async (data, {rejectWithValue, getState}) => {
    try {
      const res = await apiManager.post('/user/getDataPackagesList', data);
      return res.data;
    } catch (error) {
      return throwError(error, rejectWithValue);
    }
  },
);
export const getCartDetails = createAsyncThunk(
  'main/getCartDetails',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.get('/cart/getCartDetails', {
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
export const addToCart = createAsyncThunk(
  'main/addToCart',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.post('/cart/addToCart', data, {
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
export const removeFromCart = createAsyncThunk(
  'main/removeFromCart',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.post('/cart/removeFromCart', data, {
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

export const getAllCountries = createAsyncThunk(
  'main/getAllCountries',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.get('/countries', {
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
export const getUserEsims = createAsyncThunk(
  'main/getUserEsims',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.get('/users/esims', {
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
export const changePassword = createAsyncThunk(
  'main/changePassword',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.post('/user/change-password', data, {
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
export const verifyUserToken = createAsyncThunk(
  'main/verifyUserToken',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.post(
        '/user/verify-token',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      return throwError(error, rejectWithValue);
    }
  },
);
