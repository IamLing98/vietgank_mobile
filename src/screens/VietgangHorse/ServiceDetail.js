import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  TouchableOpacity,
  Platform,
  ImageBackground,
  ScrollView,
  Image,
  Block,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {BaseStyle, useTheme, Images} from '../../config';
import axios from 'axios';
import {Text, Button, TextInput} from '../../components';

import {loginSuccess} from '../../reducers/auth';
import {getFormValues, regex} from '../../utils/data.utils'; 

export default function VietgangzHorseServicesDetail({navigation, route}) {
  const {height, width} = useWindowDimensions();

  const [service, setService] = useState();

  const [tenant, setTenant] = useState();

  const styles = StyleSheet.create({
    scrollView: {
      marginHorizontal: 20,
      flex: 0,
    },
    text: {
      fontSize: 42,
    },
    itemWrapper: {
      marginRight: 36,
    },
    itemList: {
      flex: 0.3,
      backgroundColor: 'white',
      borderColor: '#dfe1e5',
    },
    itemText: {
      fontSize: 26,
      fontWeight: 'bold',
      bottom: 0,
      textAlign: 'left',
      position: 'absolute',
      margin: 12,
    },
    itemImage: {
      height: height - 256,
      width: width - 128,
    },
    guideText: {
      marginTop: 36,
    },
    subText: {
      marginVertical: 12,
    },
  });

  const [error, setError] = useState('');

  const dispatch = useDispatch();

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

  useEffect(() => { 
    const service = route?.params?.service;
    const tenant = route?.params?.tenant;
    setService(service);
    setTenant(tenant);
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={Images.backgroundvg}
        resizeMode="cover"
        style={{
          flex: 1,
        }}>
        <View style={{padding: 24, flex: 1, flexDirection: 'column'}}>
          <Text title2 bold style={[styles.guideText, {textAlign: 'center'}]}>
            Chào mừng bạn đến với {tenant?.booking_info?.name?.toUpperCase()}
          </Text>
          <Text title3 bold style={styles.subText}>
            {service?.service_info?.name}
          </Text>
          <ScrollView
            horizontal={true}
            style={{
              height: '75%',
              flex: 1,
            }}>
            <RenderHtml
              contentWidth={width}
              source={{html: service?.service_info?.description}}
            />
          </ScrollView>
          <TouchableOpacity
            style={{width: '100%', backgroundColor: 'black'}}
            onPress={() =>
              navigation?.navigate('VietgangzHorseServiceBooking', {
                service: service,
                tenant: tenant,
              })
            }>
            <Text
              body1
              grayColor
              style={{
                height: 36,
                marginTop: 12,
                textAlign: 'center',
                // color: colors.primary,
                color: 'white',
              }}>
              ĐẶT LỊCH NGAY
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
