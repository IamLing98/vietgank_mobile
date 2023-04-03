import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as constants from '../utils/constants';
import axios from 'axios';

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
      AsyncStorage.setItem(
        constants.ACCESS_TOKEN,
        action?.payload?.access_token,
      );

      let token = action?.payload?.access_token; 
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
  },
});

// Action creators are generated for each case reducer function
export const {loginSuccess} = authSlice.actions;

export default authSlice.reducer;
