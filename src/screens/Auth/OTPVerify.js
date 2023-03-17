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

const Signup = ({route}) => {
  let params = route.params;

  const dispatch = useDispatch();

  const {t} = useTranslation();

  const navigation = useNavigation();

  const [count, setCount] = useState(120);

  const [error, setError] = useState();

  const [formValues, setFormValues] = useState({
    otp: {
      value: '',
      isValid: false,
      message: 'Mã OTP không hợp lệ',
      touched: false,
    },
  });

  const {assets, colors, gradients, sizes} = useTheme();

  function checkValidByFieldAndValue(field, value) {
    let test = {
      otp: regex.otp.test(value),
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

  function handleSignUp() {
    console.log(`params: `, params);
    let isFormValid = checkFormValid(formValues);
    if (isFormValid) {
      let values = getFormValues(formValues);
      axios
        .post(`/mobile-verify-auth/${params?.username}`, values)
        .then((response) => {
          let data = response.data;
          if (data?.status === 200) {
            if (route?.params?.from === 'login') {
              console.log(response.data);
              let data = response?.data?.data;
              dispatch(loginSuccess(data));
            } else {
              navigation.navigate('Login');
            }
          } else {
            setError(data?.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function handleGetEmailOTP() {
    axios
      .get(`/mobile-signup-resend-otp/${params?.username}?from=${params?.from}`)
      .then((response) => {
        let data = response.data;
        if (data?.status === 200) {
          setCount(120);
        } else {
          setError(data?.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    count > 0 && setTimeout(() => setCount(count - 1), 1000);
  }, [count]);

  React.useEffect(() => {
    if (params?.from === 'login') {
      handleGetEmailOTP();
    }
  }, []);

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
                  XÁC THỰC TÀI KHOẢN
                </Text>
                <Block
                  row
                  flex={0}
                  align="center"
                  justify="center"
                  marginBottom={sizes.sm}
                  paddingHorizontal={sizes.xxl}>
                  <Block
                    row
                    flex={0}
                    align="center"
                    justify="center"
                    marginBottom={sizes.sm}
                    paddingHorizontal={8}>
                    <HelperText
                      style={{fontSize: 16, width: '100%', textAlign: 'center'}}
                      type="error"
                      visible={error}>
                      {error}
                    </HelperText>
                  </Block>
                </Block>
                <Block style={styles.inputBlock} flex={0}>
                  <TextInput
                    label="Mã xác thực"
                    style={styles.inputText}
                    onChangeText={(value) => {
                      handleChangeField('otp', value);
                    }}
                    keyboardType="numeric"
                    maxLength={6}
                    value={formValues.otp.value}
                    mode="outlined"
                    error={!formValues.otp.isValid && formValues.otp.touched}
                    onFocus={(e) => {
                      handleTouchedField('otp');
                    }}
                    autoFocus
                    theme={styles.theme.valid}
                    right={
                      <TextInput.Affix
                        text={
                          count > 0 ? (
                            `${count}s`
                          ) : (
                            <Text
                              onPress={(e) => {
                                console.log(`Handle lay ma`);
                                handleGetEmailOTP();
                              }}>
                              Lấy mã
                            </Text>
                          )
                        }
                      />
                    }
                  />
                  <HelperText
                    type="error"
                    visible={!formValues.otp.isValid && formValues.otp.touched}>
                    {formValues.otp.message}
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
                    XÁC NHẬN
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
