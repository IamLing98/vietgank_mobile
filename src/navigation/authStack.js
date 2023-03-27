import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import OTPVerify from '../screens/OTPVerify';

const MainStack = createStackNavigator();

export default function Main() {
  return (
    <MainStack.Navigator
      headerMode="none"
      initialRouteName="SignIn"
      screenOptions={{
        headerLeft: null,
        headerBackVisible: false,
      }}>
      <MainStack.Screen
        name="SignUp"
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerLeft: () => <></>,
          header: {
            left: null,
          },
        }}
        component={SignUp}
      />
      <MainStack.Screen
        name="OTPVerify"
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerLeft: () => <></>,
          header: {
            left: null,
          },
        }}
        component={OTPVerify}
      />
      <MainStack.Screen
        name="SignIn"
        options={{
          headerShown: false,
          headerBackVisible: false,
        }}
        component={SignIn}
      />
    </MainStack.Navigator>
  );
}
