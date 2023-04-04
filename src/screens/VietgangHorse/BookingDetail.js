import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  FlightPlan,
  Tag,
  Button,
} from '../../components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector} from 'react-redux';
import moment from 'moment';
const countries = [
  'Thanh toán tiền mặt',
  'Chuyển khoản ví MOMO',
  'Chuyển khoản',
];
const codes = ['Giảm 20.000 VND(200 điểm)', 'Giảm 50.000 VND(500 điểm)'];

export default function FlightTicket({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);

  const [service, setService] = useState();
  const [tenant, setTenant] = useState();
  const [date, setDate] = useState();
  const [tickerNumbers, setTickerNumbers] = useState();
  const userData = useSelector((state) => state?.auth?.userData);

  useEffect(() => {
    if (route?.params) {
      let params = route.params;
      setService(params.service);
      setTenant(params?.tenant);
      setDate(params?.date);
      setTickerNumbers(params?.tickerNumbers);
    }
  }, [JSON.stringify(route?.params)]);

  function handleCheckout(values) {
    let formValues = {};
    formValues['booking_id'] = values?.tenant?._id;
    formValues['service_id'] = values?.service?._id;
    formValues['payment_type'] = values?.payment_type;
    formValues['order_info'] = {
      data: values?.date,
      ticker_numbers: values?.tickerNumbers,
      price: values?.price,
      user_data: values?.userData,
    };
    console.log(`value`, JSON.stringify(formValues));
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Text title3 bold style={{textAlign: 'center', marginVertical: 24}}>
        THÔNG TIN ĐẶT LỊCH
      </Text>
      <ScrollView>
        <View style={styles.contain}>
          <View style={styles.classContent}>
            <Tag outline >
              <Text bold>{tenant?.booking_info?.name}</Text>
            </Tag>
            <Tag outline round style={{marginTop: 12}}>
              {service?.service_info?.name}
            </Tag>
          </View>

          <View style={styles.line} />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text headline style={{marginTop: 5}}>
                Người đặt lịch
              </Text>
              <Text caption1 light>
                {userData?.username}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text headline style={{marginTop: 5}}>
                Ngày
              </Text>
              <Text caption1 light>
                {moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{flex: 1}}>
              <Text headline style={{marginTop: 5}}>
                Số điện thoại
              </Text>
              <Text caption1 light>
                {userData?.phoneNumber}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text headline style={{marginTop: 5}}>
                Địa chỉ email
              </Text>
              <Text caption1 light>
                {userData?.email}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{flex: 1}}>
              <Text headline style={{marginTop: 5}}>
                Số người tham gia:
              </Text>
              {tickerNumbers?.adult ? (
                <Text caption1 light>
                  {`${tickerNumbers?.adult} người lớn`}
                </Text>
              ) : (
                ''
              )}

              {tickerNumbers?.childrenHigh ? (
                <Text caption1 light>
                  {`${tickerNumbers?.childrenHigh} trẻ em trên 1m3`}
                </Text>
              ) : (
                ''
              )}
              {tickerNumbers?.childrenLow ? (
                <Text caption1 light>
                  {`${tickerNumbers?.childrenLow} trẻ em dưới 1m3`}
                </Text>
              ) : (
                ''
              )}
            </View>
          </View>
          <View style={styles.line} />
          <View style={{flexDirection: 'row', marginTop: 12, width: '100%'}}>
            <View style={{flex: 1}}>
              <Text headline style={{marginTop: 5}}>
                Phương thức thanh toán
              </Text>
              <SelectDropdown
                buttonStyle={{width: '100%', marginTop: 8}}
                data={countries}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                defaultButtonText="Chọn phương thức thanh toán"
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          </View>

          <View style={{flex: 1, marginTop: 12}}>
            <Text headline style={{marginTop: 5}}>
              Mã giảm giá
            </Text>
            <SelectDropdown
              buttonStyle={{width: '100%', marginTop: 8}}
              data={codes}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              defaultButtonText="Chọn mã giảm giá"
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <View style={{flex: 1, marginTop: 12}}>
            <Text headline style={{marginTop: 5, textAlign: 'right'}}>
              ĐƠN GIÁ:
            </Text>
            <Text caption1 light style={{textAlign: 'right'}}>
              5 người lớn: 3.000.000 vnđ
            </Text>
          </View>
          <View style={{flex: 1, marginTop: 12}}>
            <Text headline style={{marginTop: 5, textAlign: 'right'}}>
              TẠM TÍNH TỔNG TIỀN:
            </Text>
            <Text caption1 light style={{textAlign: 'right'}}>
              3.000.000 vnđ
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{padding: 20}}>
        <Button
          loading={loading}
          full
          onPress={() => {
            handleCheckout({
              tenant: tenant,
              service: service,
              date: date,
              tickerNumbers: tickerNumbers,
              userData: userData,
            });
          }}>
          THANH TOÁN
        </Button>
      </View>
    </SafeAreaView>
  );
}
