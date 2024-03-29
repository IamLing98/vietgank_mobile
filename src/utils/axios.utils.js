import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL, ACCESS_TOKEN} from './constants';
import store from '../store'
import { logout } from '../reducers/auth';

function axiosInterceptor() {
  let token = AsyncStorage.getItem(ACCESS_TOKEN);
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // if (!response?.data?.success) {
      //   toast.error(response?.data?.message);
      //   return Promise.reject(response?.data?.message);
      // }
      // if (response?.data?.success) {
      //   if (response?.data?.message) {
      //     toast.success(response?.data?.message);
      //   }
      // }
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 400) {
          store.dispatch(logout());
        }
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
}

export default axiosInterceptor;