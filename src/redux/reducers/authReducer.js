import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = true;
    },
    logout: (state, action) => {
      state.isAuth = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {loginSuccess, logout} = authSlice.actions;

export default authSlice.reducer;
