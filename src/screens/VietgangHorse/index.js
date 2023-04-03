import React, {useState} from 'react';
import {useDispatch} from 'react-redux'; 
import {
  View,
  TouchableOpacity, 
  Platform,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {BaseStyle, useTheme, Images} from '../../config';
import axios from 'axios';

import { 
  Text,
  Button,
  TextInput,
} from '../../components'; 

import {loginSuccess} from '../../reducers/auth' 
import {getFormValues, regex} from '../../utils/data.utils';

export default function SignIn({navigation}) {
  const {colors} = useTheme();

  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    username: {
      value: 'linhdv71',
      isValid: false,
      message: 'Tài khoản/SDT không hợp lệ',
      touched: false,
    },
    password: {
      value: 'Linh@12345',
      isValid: true,
      message: 'Mật khẩu không hợp lệ',
      touched: false,
    },
  });

  function checkValidByFieldAndValue(field, value) {
    let test = {
      username: regex.username.test(value),
      password: true,
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

  function handleTouchedField(field) {
    let newFormValues = {...formValues};
    newFormValues[field].touched = true;
    setFormValues({...newFormValues});
  }

  async function handleSignUp() {
    await setError('');
    // await setLoading(true);
    console.log(`Handle signing`, formValues);
    let isFormValid = checkFormValid(formValues);
    if (isFormValid) {
      let values = getFormValues(formValues);
      await axios
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
      await setLoading(false);
    }
  }

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
            ĐĂNG NHẬP
          </Text>
          <TextInput
            onChangeText={(text) => handleChangeField('username', text)}
            onFocus={(e) => {
              handleTouchedField('username');
            }}
            placeholder="Tài khoản"
            success={formValues.username.isValid && formValues.username.touched}
            value={formValues.username.value}
          />
          <TextInput
            style={{marginTop: 12}}
            onChangeText={(text) => handleChangeField('password', text)}
            onFocus={(e) => {
              handleTouchedField('password');
            }}
            placeholder="Mật khẩu"
            success={formValues.password.isValid && formValues.password.touched}
            value={formValues.password.value}
            secureTextEntry={true}
          />
          {error ? (
            <Text
              style={{color: 'red', marginTop: 12, textAlign: 'center'}}>
              {error?.toUpperCase()}
            </Text>
          ) : (
            ''
          )}
          <Button
            style={{marginTop: 20}}
            full
            loading={loading}
            onPress={async () => {
              await handleSignUp();
            }}>
            ĐĂNG NHẬP
          </Button>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => navigation.navigate('SignUp')}>
            <Text
              body1
              grayColor
              style={{
                marginTop: 25,
                textAlign: 'center',
                color: colors.primary,
              }}>
              Đăng ký
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => navigation.navigate('SignUp')}>
            <Text
              body1
              grayColor
              style={{
                marginTop: 25,
                textAlign: 'center',
                color: colors.primary,
              }}>
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
