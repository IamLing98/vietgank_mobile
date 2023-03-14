import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

import React from 'react'; 

import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import store from './src/redux/index'
import axiosInterceptor from './src/utils/axios.config';
import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';

// import './assets/index.scss'

axiosInterceptor();

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <DataProvider>
          <AppNavigation />
        </DataProvider>
      </PaperProvider>
    </Provider>
  );
}
