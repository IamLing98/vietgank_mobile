import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Home from '../screens/Home';
import PlaceDetail from '../screens/PlaceDetail';
import Booking from '../screens/HorseClub/Booking';
import ProductDetail from '../screens/Product/ProductDetail';
import HorseClub from '../screens/HorseClub';
import Account from '../screens/Account';

// Horse club page
import HorseClubDetail from '../screens/HorseClub/Detail';
import ServiceDetail from '../screens/HorseClub/ServiceDetail';
import ChooseSeat from '../screens/HorseClub/ChooseSeat';

// Auth
import Signup from '../screens/Signup';
import Login from '../screens/Login';

import { Card } from '@rneui/themed';


const Stack = createStackNavigator();

function Activities() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text size={12} semibold>
        Hoạt động
      </Text>
    </View>
  );
}

function Sale() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ưu đãi của tôi</Text>
    </View>
  );
}

function Inbox() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tin nhắn</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Trang chủ"
      options={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Trang chủ"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Đặt lịch" component={Booking} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{
          headerShown: false,
        }}
        component={Login}
      />
      <Stack.Screen
        name="Signup"
        options={{
          headerShown: false,
        }}
        component={Signup}
      />
    </Stack.Navigator>
  );
}

function MainStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomePage"
        component={HomeStack}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarLabel: 'Hoạt động',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="magnet-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Sale"
        component={Sale}
        options={{
          tabBarLabel: 'Ưu đãi của tôi',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Tin nhắn',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" color={color} size={size} />
          ),
          tabBarBadge: 3,
          headerShown: false,
        }}
        name="Inbox"
        component={Inbox}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>
  );
}

function HomeStackMain() {
  return (
    <Stack.Navigator  >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={MainStack}
      />
      <Stack.Screen
        name="Horse Club"
        options={{
          headerShown: false,
          title: 'Vietgangz Horse Club',
        }}
        component={HorseClub}
      />
      <Stack.Screen
        name="ChooseSeat"
        options={{
          headerShown: false,
          title: 'Vietgangz Horse Club',
        }}
        component={ChooseSeat}
      />
      <Stack.Screen
        name="ServiceDetail"
        options={{
          headerShown: false,
          title: 'Vietgangz Horse Club',
          gestureEnabled: true,
        }}
        component={ServiceDetail}
      />

<Stack.Screen
        name="Booking"
        options={{
          headerShown: false,
          title: 'Vietgangz Horse Club',
          gestureEnabled: true,
        }}
        component={Booking}
      />
      <Stack.Screen
        name="Horse Club Detail"
        options={{
          headerShown: false,
          title: 'Vietgangz Horse Club',
        }}
        component={HorseClubDetail}
      />
      <Stack.Screen
        name="ProductDetail"
        options={{
          title: 'Chi tiết sản phẩm',
        }}
        component={ProductDetail}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const authReducer = useSelector((store) => store.authReducer);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'gray',
      background: 'gray',
    },
  };

  return (
    <>
      <NavigationContainer theme={MyTheme}>
        {/* <AuthStack /> */}
        {authReducer.isAuth ? <HomeStackMain /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}
