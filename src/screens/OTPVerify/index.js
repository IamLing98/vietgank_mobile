import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {BaseStyle, useTheme, Images} from '../../config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  TextInput,
} from '../../components';
import styles from './styles';
import {useTranslation} from 'react-i18next';

import axios from 'axios';
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

  async function handleSignUp() {
    await setError('');
    // await setLoading(true);
    console.log(`Handle signing`, formValues);
    let isFormValid = checkFormValid(formValues);
    if (isFormValid) {
      let values = getFormValues(formValues);
      await axios
        .post('/mobile-signup', values)
        .then((response) => {
          let data = response.data;
          if (data?.status === 200) {
            navigation.navigate('OTPVerify', {from: 'signup', ...values});
          } else {
            setError(data?.message);
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
            ĐĂNG KÝ
          </Text>
          <TextInput
            onChangeText={(text) => handleChangeField('username', text)}
            onFocus={(e) => {
              handleTouchedField('username');
            }}
            placeholder="Tài khoản"
            success={
              !formValues.username.isValid && formValues.username.touched
            }
            value={formValues.username.value}
          />
          {!formValues.username.isValid && formValues.username.touched ? (
            <Text style={{color: 'red', marginTop: 0}}>
              {formValues.username.message}
            </Text>
          ) : (
            ''
          )}
          <TextInput
            style={{marginTop: 12}}
            onChangeText={(text) => handleChangeField('email', text)}
            onFocus={(e) => {
              handleTouchedField('email');
            }}
            placeholder="Email"
            success={formValues.email.isValid && formValues.email.touched}
            value={formValues.email.value}
          />
          {!formValues.email.isValid && formValues.email.touched ? (
            <Text style={{color: 'red', marginTop: 0}}>
              {formValues.email.message}
            </Text>
          ) : (
            ''
          )}
          <TextInput
            style={{marginTop: 12}}
            onChangeText={(text) => handleChangeField('phoneNumber', text)}
            onFocus={(e) => {
              handleTouchedField('phoneNumber');
            }}
            placeholder="Số điện thoại"
            success={
              formValues.phoneNumber.isValid && formValues.phoneNumber.touched
            }
            value={formValues.phoneNumber.value}
          />
          {!formValues.phoneNumber.isValid && formValues.phoneNumber.touched ? (
            <Text style={{color: 'red', marginTop: 0}}>
              {formValues.phoneNumber.message}
            </Text>
          ) : (
            ''
          )}
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
          {!formValues.password.isValid && formValues.password.touched ? (
            <Text style={{color: 'red', marginTop: 0}}>
              {formValues.password.message}
            </Text>
          ) : (
            ''
          )}
          <TextInput
            style={{marginTop: 12}}
            onChangeText={(text) => handleChangeField('password', text)}
            onFocus={(e) => {
              handleTouchedField('confirmPassword');
            }}
            placeholder="Xác nhận mật khẩu"
            success={
              formValues.confirmPassword.isValid &&
              formValues.confirmPassword.touched
            }
            value={formValues.confirmPassword.value}
            secureTextEntry={true}
          />
          {!formValues.confirmPassword.isValid &&
          formValues.confirmPassword.touched ? (
            <Text style={{color: 'red', marginTop: 0}}>
              {formValues.confirmPassword.message}
            </Text>
          ) : (
            ''
          )}
          {error ? (
            <Text style={{color: 'red', marginTop: 12, textAlign: 'center'}}>
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
            ĐĂNG KÝ
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
              Đã có tài khoản? Đăng nhập
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
