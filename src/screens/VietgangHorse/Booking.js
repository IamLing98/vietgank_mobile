import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {BaseStyle, Images, useTheme} from '../../config';
import moment from 'moment';
import {
  Header,
  SafeAreaView,
  Icon,
  BookingTime,
  Tag,
  FlightPlan,
  FormOption,
  QuantityPicker,
  Button,
} from '../../components';

import styles from './styles';
import {useTranslation} from 'react-i18next';
import {DatePicker, Text} from '../../components';

export default function Booking({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [round, setRound] = useState(true);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const [tickerNumbers, setTickerNumbers] = useState({
    adult: 0,
    childrenHigh: 0,
    childrenLow: 0,
  });

  const onChange = (type, field) => {
    let newTickerNumbers = {...tickerNumbers};

    if (type == 'up') {
      newTickerNumbers[field] = newTickerNumbers[field] + 1;
    } else {
      newTickerNumbers[field] =
        newTickerNumbers[field] > 0 ? newTickerNumbers[field] - 1 : 0;
    }
    setTickerNumbers(newTickerNumbers);
  };

  const onSetFlightType = (round) => {
    setRound(round);
  };

  const onSelectFlight = (type) => {
    switch (type) {
      case 'to':
        navigation.navigate('SelectFlight', {
          selected: to,
          onChangeAir: (air) => setTo(air),
        });
        break;
      case 'from':
        navigation.navigate('SelectFlight', {
          selected: from,
          onChangeAir: (air) => setFrom(air),
        });
        break;
      default:
        break;
    }
  };

  const [service, setService] = useState();
  const [tenant, setTenant] = useState();

  useEffect(() => {
    if (route?.params) {
      let params = route.params;
      setService(params.service);
      setTenant(params?.tenant);
    }
  }, [JSON.stringify(route?.params)]);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Text title3 bold style={{textAlign: 'center', marginVertical: 24}}>
        THÔNG TIN ĐẶT LỊCH
      </Text>
      <View style={styles.classContent}>
        <Tag outline round>
          {service?.service_info?.name}
        </Tag>
      </View>
      <ScrollView contentContainerStyle={styles.contain} style={{flex: 1}}>
        <View style={{marginTop: 20, flexDirection: 'column'}}>
          <DatePicker
            label={'Ngày'}
            date={date}
            onChange={(value) => {
              setDate(value);
            }}
          />
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <QuantityPicker
            label={'Người lớn'}
            detail={``}
            field="adult"
            value={tickerNumbers?.adult}
            onChange={onChange}
          />
          <QuantityPicker
            label={'Trẻ em'}
            detail={`Trên 1m3`}
            field="childrenHigh"
            value={tickerNumbers?.childrenHigh}
            onChange={onChange}
            style={{marginHorizontal: 15}}
          />
          <QuantityPicker
            label={'Trẻ em'}
            detail={`Dưới 1m3`}
            field="childrenLow"
            value={tickerNumbers?.childrenLow}
            onChange={onChange}
          />
        </View>
        <Text>{JSON.stringify(service)}</Text>
      </ScrollView>
      <View style={{padding: 20}}>
        <Button
          loading={loading}
          full
          onPress={() => {
            navigation.navigate('VietgangzHorseServiceBookingDetail', {
              service: service,
              tenant: tenant,
              date: date,
              tickerNumbers: tickerNumbers,
            });
          }}>
          ĐẶT LỊCH NGAY
        </Button>
      </View>
    </SafeAreaView>
  );
}
