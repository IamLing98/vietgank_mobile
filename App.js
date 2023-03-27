import React, {useEffect} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {store, persistor} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigator from './src/navigation';
import {StatusBar} from 'react-native';
import axiosInterceptor from './src/utils/axios.utils';
console.disableYellowBox = true;

// SplashScreen.preventAutoHideAsync();

axiosInterceptor();

export default function App() {
  
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
}
