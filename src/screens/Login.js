import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, Linking, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import BG from '../assets/images/loginbg.png';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducers/authReducer';

const isAndroid = Platform.OS === 'android';

const Login = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState({
    name: '',
    email: '',
    password: '',
    agreed: false,
  });
  const {assets, colors, gradients, sizes} = useTheme();

  const dispatch = useDispatch()
  

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

//   const handleSignUp = useCallback(() => {
//     if (!Object.values(isValid).includes(false)) {
//       /** send/save registratin data */
//       console.log('handleSignUp', registration);
//     }
//   }, [isValid, registration]);

  function handleSignUp(){
    dispatch(loginSuccess())
  }

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={BG}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
        }}
        resizeMode="cover">
        <Block
          flex={0}
          radius={sizes.sm}
          style={{
            padding: 24,
          }}
          shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
        >
          <View
            style={{backgroundColor: 'white', padding: 24, borderRadius: 8}}>
            <Text p bold center>
              Đăng nhập
            </Text>
            <Block
              row
              flex={0}
              align="center"
              justify="center"
              marginBottom={sizes.sm}
              paddingHorizontal={sizes.xxl}>
              <Block
                flex={0}
                height={1}
                width="50%"
                end={[1, 0]}
                start={[0, 1]}
                gradient={gradients.divider}
              />
              <Text center marginHorizontal={sizes.s}></Text>
              <Block
                flex={0}
                height={1}
                width="50%"
                end={[0, 1]}
                start={[1, 0]}
                gradient={gradients.divider}
              />
            </Block>
            <Input
              autoCapitalize="none"
              marginBottom={36}
              label="Tài khoản/SĐT"
              placeholder="Tài khoản/SĐT..."
              success={Boolean(registration.name && isValid.name)}
              danger={Boolean(registration.name && !isValid.name)}
              onChangeText={(value) => handleChange({name: value})}
            />
            <Input
              autoCapitalize="none"
              marginBottom={58}
              label="Mật khẩu"
              keyboardType="email-address"
              placeholder="Mật khẩu..."
              success={Boolean(registration.email && isValid.email)}
              danger={Boolean(registration.email && !isValid.email)}
              onChangeText={(value) => handleChange({email: value})}
            />
            <Button 
              gradient={gradients.black}
              marginBottom={14}
              onPress={e=>{
                console.log(`Handle loggin`)
                handleSignUp()
              }}
            //   disabled={Object.values(isValid).includes(false)}
              >
              <Text bold white transform="uppercase">
                Đăng nhập
              </Text>
            </Button>
            <Button
              primary
              outlined
              shadow={!isAndroid}
              onPress={() => navigation.navigate('Pro')}>
              <Text bold primary transform="uppercase">
                Đăng ký
              </Text>
            </Button>
          </View>
        </Block>
      </ImageBackground>
    </View>
  );
};

export default Login;
