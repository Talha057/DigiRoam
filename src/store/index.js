import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import mainReducer from './main/mainSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
