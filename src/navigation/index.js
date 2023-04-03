import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {DarkModeProvider, useDarkMode} from 'react-native-dark-mode';
import {useTheme, BaseSetting} from '../config';
import SplashScreen from 'react-native-splash-screen';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {useSelector} from 'react-redux';

/* Main Stack Navigator */
import Main from '../navigation/main';

/* Main Stack Navigator */
import AuthStack from './authStack';
// /* Modal Screen only affect iOS */
import Loading from '../screens/Loading';
// import Filter from '@screens/Filter';
// import FlightFilter from '@screens/FlightFilter';
// import BusFilter from '@screens/BusFilter';
// import Search from '@screens/Search';
// import SearchHistory from '@screens/SearchHistory';
// import PreviewImage from '@screens/PreviewImage';
// import SelectBus from '@screens/SelectBus';
// import SelectCruise from '@screens/SelectCruise';
// import CruiseFilter from '@screens/CruiseFilter';
// import EventFilter from '@screens/EventFilter';
// import SelectDarkOption from '@screens/SelectDarkOption';
// import SelectFontOption from '@screens/SelectFontOption';

const RootStack = createStackNavigator();

export default function Navigator() {
  const storeLanguage = useSelector((state) => state.application.language);

  const authReducer = useSelector((store) => store.auth);

  const {theme, colors} = useTheme();
  // const isDarkMode = useDarkMode();
  const isDarkMode = false;

  const forFade = ({current, closing}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: BaseSetting.resourcesLanguage,
      lng: storeLanguage ?? BaseSetting.defaultLanguage,
      fallbackLng: BaseSetting.defaultLanguage,
    });
    SplashScreen?.hide();
    StatusBar.setHidden(true);
    // StatusBar.setBackgroundColor(colors.primary, true);
    // StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
  }, []);

  return (
    <NavigationContainer theme={theme}>
      {authReducer?.login?.success ? <Main /> : <AuthStack />}
    </NavigationContainer>
  );
}
