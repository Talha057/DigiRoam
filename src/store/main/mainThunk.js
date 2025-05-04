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
      console.log(error);
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
export const addToBuyNow = createAsyncThunk(
  'main/addToBuyNow',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.post('/buynow/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
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
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue({
          message: err.response.data.message,
          code: err.response.status || null,
        });
      }
      return rejectWithValue({
        message: 'Network Error. Please try again.',
        code: err.response.status || null,
      });
    }
  },
);
export const createOrderId = createAsyncThunk(
  'main/createOrderId',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.post(
        '/payment/paypal/generateOrderId/native',
        data,
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

export const orderProfile = createAsyncThunk(
  'main/orderProfile',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.post('/eSim/orderProfiles', data, {
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
export const savePayment = createAsyncThunk(
  'main/savePayment',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.post('/paymentSave/store', data, {
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
export const createPaymentIntent = createAsyncThunk(
  'main/createPaymentIntent',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.post(
        '/payment/stripe/stripePaymentIntent/native',
        data,
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
export const clearCart = createAsyncThunk(
  'main/clearCart',
  async (data, {rejectWithValue, getState}) => {
    try {
      const {token} = getState().auth;
      const res = await apiManager.post(
        '/cart/clearCart',
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
export const getSettings = createAsyncThunk(
  'auth/getSettings',
  async (_, {rejectWithValue}) => {
    try {
      const res = await apiManager.get('/settings');
      return res.data;
    } catch (error) {
      return throwError(error, rejectWithValue);
    }
  },
);
