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
      console.log(getState());
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
      const token = getState().auth;
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
      const token = getState().auth;
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
      const token = getState().auth;
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
