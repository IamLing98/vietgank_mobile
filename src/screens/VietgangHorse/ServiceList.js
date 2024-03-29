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
import {BaseStyle, useTheme, Images} from '../../config';
import axios from 'axios';
import {Text, Button, TextInput} from '../../components';

const defaultUrl =
  'https://res.cloudinary.com/linkdoan/image/upload/v1680506857/vietgangz/horse_club_item_yksdzz.jpg';

import {loginSuccess} from '../../reducers/auth';
import {getFormValues, regex} from '../../utils/data.utils';

export default function VietgangHorseServices({navigation, route}) {
  const {height, width} = useWindowDimensions();

  const services = route?.params?.services;
   const tenant = route?.params;
  console.log(services);

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
      margin:12
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

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [loading, setLoading] = useState(false); 

  function checkFormValid(formValues) {
    let isValid = true;
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key].isValid) {
        isValid = false;
      }
    });
    return isValid;
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

  function handleClickService(item){
    navigation.navigate("VietgangzHorseServicesDetail", {tenant:tenant, service:item})
  }

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
            Dịch vụ:
          </Text>
          <ScrollView
            horizontal={true}
            style={{height: '85%', flex: 1, marginTop: 12}}>
            {services?.map((item, index) => {
              return (
                <TouchableOpacity
                  underlayColor="#DDDDDD"
                  onPress={(e) => {
                    handleClickService(item);
                  }}>
                  <View style={styles.itemWrapper}>
                    <View style={styles.itemList}>
                      <ImageBackground
                        style={styles.itemImage}
                        imageStyle={{borderRadius: 16}}
                        // src={item?.booking_info?.thumbnail | defaultUrl}
                        source={{uri: defaultUrl}}>
                        <Text whiteColor style={styles.itemText}>
                          {item?.service_info?.name}
                        </Text>
                      </ImageBackground>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}
