import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: true,
  },
  reducers: {
    loginSuccess: (state, action) => {
      let payload = action.payload;
      AsyncStorage.setItem('ACCESS_TOKEN', payload.access_token);
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
