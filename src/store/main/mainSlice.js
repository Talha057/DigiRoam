import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {};
const mainSlice = createSlice({
  initialState: INITIAL_STATE,
  name: 'main',
  reducers: {},
  extraReducers: builder => {},
});
export default mainSlice.reducer;
