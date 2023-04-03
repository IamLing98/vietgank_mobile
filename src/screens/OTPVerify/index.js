import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {BaseStyle, useTheme, Images} from '../../config';
import {Text, Button, TextInput} from '../../components';
import styles from './styles';

import axios from 'axios';
import {camelToSnakeCase, getFormValues, regex} from '../../utils/data.utils';

export default function OTPVerify({navigation, route}) {
  const {colors} = useTheme();

  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const [count, setCount] = useState(120);

  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    otp: {
      value: '',
      isValid: false,
      message: 'Mã xác thực khôg hợp lệ',
      touched: false,
    },
  });

  function checkValidByFieldAndValue(field, value) {
    if (field === 'confirmPassword') {
      if (value != formValues.password.value) {
        return false;
      } else {
        return true;
      }
    }
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
    newFormValues[field] = {
      ...newFormValues[field],
      value: value,
      isValid: isValid,
    };
    setFormValues({...newFormValues});
  }

  function handleTouchedField(field) {
    let newFormValues = {...formValues};
    newFormValues[field].touched = true;
    let isValid = checkValidByFieldAndValue(field, formValues[field].value);
    newFormValues[field].isValid = isValid;
    setFormValues({...newFormValues});
  }

  async function handleVerify(username) {
    await setError('');
    // await setLoading(true); 
    let isFormValid = checkFormValid(formValues);
    if (isFormValid) {
      let values = getFormValues(formValues);
      values = camelToSnakeCase(values); 
      await axios
        .post(`/mobile-verify-auth/${username}`, values)
        .then((response) => {
          let data = response.data;
          console.log(data)
          if (data?.status === 200) {
            navigation.navigate('SignIn', {from: 'signup', ...values});
          } else {
            setError(data?.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  async function handleReGetOtp(username) {
    await axios
      .get(`/mobile-signup-resend-otp/${username}`)
      .then((response) => {
        let data = response.data;
        console.log('ResponseL ', data);
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

  useEffect(() => {
    let timerId;
    if (!count <= 0) {
      timerId = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  }, [count]);

  useEffect(()=>{
    if(route?.params?.from === 'login'){
      handleReGetOtp(route?.params?.username)
    }
  }, [route?.params?.from])

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={Images.backgroundvg}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ScrollView
          style={{flex: 1, paddingHorizontal: 24, paddingVertical: 48}}>
          <Image
            source={Images.vietganglogo}
            style={{width: '100%', height: 128}}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 12,
              textAlign: 'center',
            }}>
            XÁC THỰC ĐĂNG KÝ
          </Text>
          <TextInput
            onChangeText={(text) => handleChangeField('otp', text)}
            onFocus={(e) => {
              handleTouchedField('otp');
            }}
            placeholder="Nhập mã xác thực nhận được trong email"
            success={!formValues.otp.isValid && formValues.otp.touched}
            value={formValues.otp.value}
            maxLength={6}
            keyboardType="numeric"
            suffix={
              count > 0 ? (
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  {count}
                </Text>
              ) : (
                <Pressable
                  onPress={(e) => {
                    handleReGetOtp(route?.params?.username);
                  }}>
                  {({pressed}) => (
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Lấy mã
                    </Text>
                  )}
                </Pressable>
              )
            }
          />
          {!formValues.otp.isValid && formValues.otp.touched ? (
            <Text style={{color: 'red', marginTop: 0}}>
              {formValues.otp.message}
            </Text>
          ) : (
            ''
          )}

          <Button
            style={{marginTop: 20}}
            full
            loading={loading}
            onPress={async () => {
              await handleVerify(route?.params?.username);
            }}>
            XÁC NHẬN
          </Button>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => navigation.navigate('SignIn')}>
            <Text
              body1
              grayColor
              style={{
                marginTop: 25,
                textAlign: 'center',
                color: colors.primary,
              }}>
              Quay lại trang đăng nhập
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
