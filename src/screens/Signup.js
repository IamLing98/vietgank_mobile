import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, Linking, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import BG from '../assets/images/loginbg.png';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../redux/reducers/authReducer';

const isAndroid = Platform.OS === 'android';

const Signup = () => {
  const {t} = useTranslation();

  const navigation = useNavigation();

  const [formValues, setFormValues] = useState({
    username: {
      value: '',
      isValid: false,
      message: 'Tài khoản/SDT không hợp lệ',
    },
    password: {
      value: '',
      isValid: false,
      message: 'Mật khẩu không hợp lệ',
    },
    confirmPassword: {
      value: '',
      isValid: false,
      message: 'Xác minh mật khẩu không hợp lệ',
    },
  });
  const {assets, colors, gradients, sizes} = useTheme();

  function checkValidByFieldAndValue(field, value) {
    let test = {
      username: regex.username.test(value),
      password: regex.password.test(value), 
    };
    return test[field];
  }

  function checkFormValid(formValues) {
    let isValid = true;
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key].isValid) {
        isValid = false;
      }
    });
    return isValid;
  }

  function handleChangeField(field, value) {
    console.log(field, value);
    let isValid = checkValidByFieldAndValue(field, value);
    let newFormValues = {...formValues};
    newFormValues[field] = {value: value, isValid: isValid};
    setFormValues({...newFormValues});
  }

  const dispatch = useDispatch();

  function handleSignUp() {
    let isFormValid = checkFormValid(formValues);
    if (isFormValid) {
      dispatch(loginSuccess());
    }
  }

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
              Đăng ký tài khoản
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
              label="Số điện thoại"
              placeholder="Số điện thoại..."
            
              success={Boolean(
                formValues.username.value && formValues.username.isValid,
              )}
              danger={Boolean(
                formValues.username.value && !formValues.username.isValid,
              )}
              onChangeText={(value) => handleChangeField('username', value)}
            />
            <Input
              autoCapitalize="none"
              marginBottom={36}
              label="Mật khẩu"
              keyboardType="email-address"
              placeholder="Mật khẩu..."
              success={Boolean(
                formValues.password.value && formValues.password.isValid,
              )}
              danger={Boolean(
                formValues.password.value && !formValues.password.isValid,
              )}
              onChangeText={(value) => handleChangeField('password', value)}
            />
             <Input
              autoCapitalize="none"
              marginBottom={58}
              label="Nhập lại mật khẩu"
              keyboardType="email-address"
              placeholder="Nhập lại mật khẩu..."
              success={Boolean(
                formValues.confirmPassword.value && formValues.confirmPassword.isValid,
              )}
              danger={Boolean(
                formValues.confirmPassword.value && !formValues.confirmPassword.isValid,
              )}
              onChangeText={(value) => handleChangeField('confirmPassword', value)}
            />
            <Button
              gradient={gradients.black}
              marginBottom={14}
              onPress={(e) => {
                handleSignUp();
              }}
              //   disabled={Object.values(isValid).includes(false)}
            >
              <Text bold white transform="uppercase">
                Đăng ký
              </Text>
            </Button>
            <Button
              primary
              outlined
              shadow={!isAndroid}
              onPress={() => navigation.navigate('Login')}>
              <Text bold primary transform="uppercase">
                Quay lại đăng nhập
              </Text>
            </Button>
          </View>
        </Block>
      </ImageBackground>
    </View>
  );
};

export default Signup;
