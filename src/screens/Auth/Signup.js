import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, Linking, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {HelperText, TextInput, TextInputMask} from 'react-native-paper';

import {useData, useTheme, useTranslation} from '../../hooks';
import * as regex from '../../constants/regex';
import {Block, Button, Image, Text, Checkbox} from '../../components';
import BG from '../../assets/images/loginbg.png';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../redux/reducers/authReducer';

import styles from '../../utils/styles';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getFormValues} from '../../utils/dataUtils';
import axios from 'axios';

const isAndroid = Platform.OS === 'android';

const Signup = ({}) => {
  const {t} = useTranslation();

  const navigation = useNavigation();

  const [show, setShow] = useState({
    password: true,
    confirmPassword: true,
  });

  const [error, setError] = useState('');

  const [formValues, setFormValues] = useState({
    username: {
      value: 'linhdv71',
      isValid: false,
      message: 'Tài khoản không hợp lệ',
      touched: false,
    },
    email: {
      value: 'vandoan1029i@gmail.com',
      isValid: false,
      message: 'Email không hợp lệ',
      touched: false,
    },
    phoneNumber: {
      value: '0964708429',
      isValid: false,
      message: 'SDT không hợp lệ',
      touched: false,
    },
    password: {
      value: 'Linh@12345',
      isValid: false,
      message: 'Mật khẩu không hợp lệ',
      touched: false,
    },
    confirmPassword: {
      value: 'Linh@12345',
      isValid: false,
      message: 'Mật khẩu không trùng khớp',
      touched: false,
    },
  });

  const {assets, colors, gradients, sizes} = useTheme();

  function checkValidByFieldAndValue(field, value) {
    if (field === 'confirmPassword') {
      if (value != formValues.password.value) {
        return false;
      } else {
        return true;
      }
    }
    let test = {
      username: regex.username.test(value),
      password: regex.password.test(value),
      email: regex.email.test(value),
      phoneNumber: regex.phoneNumber.test(value),
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
    newFormValues[field].value = value;
    newFormValues[field].isValid = isValid;
    setFormValues({...newFormValues});
  }

  function handleTouchedField(field) {
    let newFormValues = {...formValues};
    newFormValues[field].touched = true;
    setFormValues({...newFormValues});
  }

  const dispatch = useDispatch();

  function handleSignUp() { 
    let isFormValid = checkFormValid(formValues);
    if (isFormValid) {
      let values = getFormValues(formValues);
      axios
        .post('/mobile-signup', values)
        .then((response) => { 
          let data = response.data;
          if (data?.status === 200) {
            navigation.navigate('OTPVerify', { from:'signup', ...values});
          } else {
            setError(data?.message)
          }
        })
        .catch((error) => {
          console.error(error);
        });
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
        <SafeAreaView style={styles.container}>
          <ScrollView
            alwaysBounceHorizontal={true}
            indicatorStyle={'white'}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}>
            <Block
              flex={0}
              radius={sizes.sm}
              style={{
                padding: 24,
              }}
              shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            >
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 24,
                  borderRadius: 8,
                }}>
                <Text p bold center>
                  ĐĂNG KÝ TÀI KHOẢN
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

                  <HelperText style={{fontSize:16}} type="error" visible={error}>
                    {error}
                  </HelperText>
                  <Block
                    flex={0}
                    height={1}
                    width="50%"
                    end={[0, 1]}
                    start={[1, 0]}
                    gradient={gradients.divider}
                  />
                </Block>

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
                      !formValues.username.isValid &&
                      formValues.username.touched
                    }
                    onFocus={(e) => {
                      handleTouchedField('username');
                    }}
                    right={<TextInput.Icon icon="account" />}
                  />
                  <HelperText
                    type="error"
                    visible={
                      !formValues.username.isValid &&
                      formValues.username.touched
                    }>
                    {formValues.username.message}
                  </HelperText>
                </Block>
                <Block style={styles.inputBlock} flex={0}>
                  <TextInput
                    label="Số điện thoại"
                    style={styles.inputText}
                    value={formValues.phoneNumber.value}
                    onChangeText={(value) => {
                      handleChangeField('phoneNumber', value);
                    }}
                    onFocus={(e) => {
                      handleTouchedField('phoneNumber');
                    }}
                    mode="outlined"
                    error={
                      !formValues.phoneNumber.isValid &&
                      formValues.phoneNumber.touched
                    }
                    right={<TextInput.Icon icon="phone" />}
                  />
                  <HelperText
                    type="error"
                    visible={
                      !formValues.phoneNumber.isValid &&
                      formValues.phoneNumber.touched
                    }>
                    {formValues.phoneNumber.message}
                  </HelperText>
                </Block>
                <Block style={styles.inputBlock} flex={0}>
                  <TextInput
                    label="Email"
                    style={styles.inputText}
                    value={formValues.email.value}
                    onChangeText={(value) => {
                      handleChangeField('email', value);
                    }}
                    onFocus={(e) => {
                      handleTouchedField('email');
                    }}
                    mode="outlined"
                    error={
                      !formValues.email.isValid && formValues.email.touched
                    }
                    right={<TextInput.Icon icon="mail" />}
                  />
                  <HelperText
                    type="error"
                    visible={
                      !formValues.email.isValid && formValues.email.touched
                    }>
                    {formValues.email.message}
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
                      !formValues.password.isValid &&
                      formValues.password.touched
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
                      !formValues.password.isValid &&
                      formValues.password.touched
                    }>
                    {formValues.password.message}
                  </HelperText>
                </Block>

                <Block style={styles.inputBlock} flex={0}>
                  <TextInput
                    label="Xác nhận mật khẩu"
                    value={formValues.confirmPassword.value}
                    style={styles.inputText}
                    secureTextEntry={show.confirmPassword}
                    onChangeText={(value) => {
                      handleChangeField('confirmPassword', value);
                    }}
                    onFocus={(e) => {
                      handleTouchedField('confirmPassword');
                    }}
                    mode="outlined"
                    error={
                      !formValues.confirmPassword.isValid &&
                      formValues.confirmPassword.touched
                    }
                    right={
                      <TextInput.Icon
                        icon="eye"
                        onPress={(e) => {
                          setShow({
                            ...show,
                            confirmPassword: !show.confirmPassword,
                          });
                        }}
                      />
                    }
                  />
                  <HelperText
                    type="error"
                    visible={
                      !formValues.confirmPassword.isValid &&
                      formValues.confirmPassword.touched
                    }>
                    {formValues.confirmPassword.message}
                  </HelperText>
                </Block>

                <Button
                  gradient={gradients.black}
                  onPress={(e) => {
                    handleSignUp();
                  }}
                  marginBottom={12}
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
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Signup;
