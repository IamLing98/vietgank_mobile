import React, { useCallback, useEffect, useState } from 'react';
import { Linking, Platform, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { useData, useTheme, useTranslation } from '../../hooks';
import * as regex from '../../constants/regex';
import { Block, Button, Input, Image, Text, Checkbox } from '../../components';
import { Divider } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import GridRow from '../../components/GridRow'
import GridCol from '../../components/GridCol'

import styles from './styles';

const isAndroid = Platform.OS === 'android';

const Booking = ({ navigation, route }) => {

  const service = route.params

  const [text, setText] = React.useState('');

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

  function handleChangeField() {

  }
 

  const handleNavigation = useCallback(
    (to, item) => {
      navigation.navigate(to, item);
    },
    [navigation],
  );

  useEffect(() => {
    console.log(`Booking: `, service)
  }, [])

  return (
    <Block style={{ padding: 24, marginTop: 24, backgroundColor: 'white' }}>
      <View style={styles.title}></View>
      <Text center bold>THÔNG TIN ĐẶT LỊCH</Text>
      <View style={[styles.app]}>
        <GridRow style={styles.textRow} >
          <GridCol numRows={4} >
            <Text bold black align='left'   >Dịch vụ: {service?.name}</Text>
          </GridCol>
        </GridRow>
        <GridRow style={styles.textRow}>
          <GridCol numRows={4}>
            <TextInput
              mode="outlined"
              label="Ngày đặt lịch"
              placeholder="Ngày đặt lịch"
              style={styles.input}
              onPressIn={e => {
                console.log(`On focus input booking`)
                handleNavigation('ChooseSeat')
              }}
              showSoftInputOnFocus={false}
              left={<TextInput.Icon icon="calendar" />}
            />
          </GridCol>
        </GridRow>
      </View>


    </Block>
  );
};

export default Booking;
