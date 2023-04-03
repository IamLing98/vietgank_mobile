import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'counter',
  initialState: {
    login: {
      success: false,
    },
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.login.success = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {loginSuccess} = authSlice.actions;

export default authSlice.reducer;
