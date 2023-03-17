import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, Linking, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../../hooks';
import * as regex from '../../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../../components';
import BG from '../../assets/images/loginbg.png';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../redux/reducers/authReducer';
import {getFormValues} from '../../utils/dataUtils';
import axios from 'axios';
import {HelperText, TextInput} from 'react-native-paper';
import styles from '../../utils/styles';

const isAndroid = Platform.OS === 'android';

const Login = () => {
  const {t} = useTranslation();

  const [error, setError] = useState();

  const [show, setShow] = useState({
    password:false
  })

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
    let isValid = checkValidByFieldAndValue(field, value);
    let newFormValues = {...formValues};
    newFormValues[field] = {value: value, isValid: isValid};
    setFormValues({...newFormValues});
  }

  const dispatch = useDispatch();

  function handleSignUp() {
    console.log(`Handle signing`);
    let isFormValid = checkFormValid(formValues);
    if (isFormValid) {
      let values = getFormValues(formValues);
      axios
        .post(`/mobile-signin`, values)
        .then((response) => {
          console.log(response.data);
          let data = response.data;
          if (
            data.status === 500 &&
            data?.message === 'Tài khoản chưa xác minh'
          ) {
            navigation.navigate('OTPVerify', {
              from: 'login',
              ...values,
            });
          } else if (data.status === 200) {
            let data = response?.data?.data;
            dispatch(loginSuccess(data));
          } else if (data?.status === 500) {
            setError(data?.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleTouchedField(field) {
    let newFormValues = {...formValues};
    newFormValues[field].touched = true;
    setFormValues({...newFormValues});
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
              ĐĂNG NHẬP
            </Text>
           {error ?  <Block
              row
              flex={0}
              align="center"
              justify="center"
              marginBottom={sizes.sm}
              paddingHorizontal={8}
              >
              <HelperText
                style={{fontSize: 16, width: '100%', textAlign: 'center'}}
                type="error"
                visible={error}>
                {error}
              </HelperText>
            </Block> : ''}
            <Block style={styles.inputBlock} flex={0}>
              <TextInput
                label="Tài khoản"
                style={styles.inputText}
                onChangeText={(value) => {
                  handleChangeField('username', value);
                }}
                value={formValues.username.value}
                mode="outlined"
                error={
                  !formValues.username.isValid && formValues.username.touched
                }
                onFocus={(e) => {
                  handleTouchedField('username');
                }}
                right={<TextInput.Icon icon="account" />}
              />
              <HelperText
                type="error"
                visible={
                  !formValues.username.isValid && formValues.username.touched
                }>
                {formValues.username.message}
              </HelperText>
            </Block>
            <Block style={styles.inputBlock} flex={0}>
              <TextInput
                label="Mật khẩu"
                value={formValues.password.value}
                style={styles.inputText}
                secureTextEntry={show.password}
                onChangeText={(value) => {
                  handleChangeField('password', value);
                }}
                onFocus={(e) => {
                  handleTouchedField('password');
                }}
                mode="outlined"
                error={
                  !formValues.password.isValid && formValues.password.touched
                }
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={(e) => {
                      setShow({...show, password: !show.password});
                    }}
                  />
                }
              />
              <HelperText
                type="error"
                visible={
                  !formValues.password.isValid && formValues.password.touched
                }>
                {formValues.password.message}
              </HelperText>
            </Block> 
            <Button
              gradient={gradients.black}
              marginBottom={14}
              marginTop={14}
              onPress={(e) => {
                handleSignUp();
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
              onPress={() => navigation.navigate('Signup')}>
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
