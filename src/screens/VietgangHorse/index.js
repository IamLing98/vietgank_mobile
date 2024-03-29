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

export default function VietgangzHorse({navigation}) {
  const {height, width} = useWindowDimensions();

  const [tenants, setTenants] = useState([
    {
      name: 'Vietgangz Horse Sài Gòn',
      services: [
        {
          name: 'Trải nghiệm tham quan tiệc BBQ',
          description: `<p>html</p>`,
        },
        {
          name: 'Trải nghiệm tham quan trong ngày',
        },
        {
          name: 'Trải nghiệm qua đêm trong lều',
        },
        {
          name: 'Tiệc cưới ngoài trời',
        },
        {
          name: 'Trải nghiệm tham quan tiệc BBQ',
        },
      ],
    },
    {
      name: 'Vietgangz Horse Hà Nội',
    },
    {
      name: 'Vietgangz Horse Đà Nẵng',
    },
    {
      name: 'Vietgangz Horse Thanh Hóa',
    },
  ]);

  function getTenants() {
    axios
      .get('/api/booking?booking_type_code=HORSE_CLUB')
      .then((response) => {
        console.log(response?.data);
        setTenants([...response?.data?.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const styles = StyleSheet.create({
    scrollView: {
      marginHorizontal: 20,
      flex: 0,
    },
    text: {
      fontSize: 42,
    },
    itemWrapper: {
      marginBottom: 24,
      borderRadius: 16,
    },
    itemList: {
      flex: 0.3,
      backgroundColor: 'white',
      borderColor: '#dfe1e5',
    },
    itemText: {
      padding: 10,
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold',
    },
    itemImage: {
      height: 156,
      width: width,
    },
    guideText: { 
      marginTop: 36,
    },
    subText: {
      marginVertical: 12,
    },
  });
  ``;
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

  function handleClickTenantItem(item) { 
    navigation.navigate("VietgangzHorseServices", item)
  }

  useEffect(() => {
    getTenants();
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
            VIETGANGZ HORSE CLUB
          </Text>
          <Text title3 bold style={styles.subText}>
            Chọn điểm đến:
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{height: '85%', flex: 1, marginTop: 12}}>
            {tenants?.map((item, index) => {
              console.log(item);
              return (
                <View underlayColor="#DDDDDD">
                  <View style={styles.itemWrapper}>
                    <View style={styles.itemList}>
                      <Image
                        style={styles.itemImage}
                        // src={item?.booking_info?.thumbnail | defaultUrl}
                        src={defaultUrl}></Image>
                      <TouchableOpacity
                        onPress={(e) => {
                          handleClickTenantItem(item);
                        }}>
                        <Text title3 style={styles.itemText}> 
                          {item?.booking_info?.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}
