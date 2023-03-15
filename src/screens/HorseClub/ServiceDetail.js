import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { Button } from 'react-native-paper';

import axios from 'axios';

import { Block, Text } from '../../components';

import { PRODUCTS, SALE_OFF } from '../../constants/mocks';
import { useDispatch } from 'react-redux';

const isAndroid = Platform.OS === 'android';

const ServiceDetail = ({ route, navigation }) => {
  const service = route.params;

  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
    },
    scrollView: {
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
    itemWrapper: {
      marginHorizontal: 24,
      marginVertical: 48,
      borderRadius: 16,
    },
    itemBackground: {
      height: 256,
      width: '50%',
    },
    itemView: {
      flex: 0.3,
      borderColor: '#dfe1e5',
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    itemText: {
      fontSize: 52,
      fontWeight: 'bold',
      marginVertical: 12,
      marginLeft: 12,
      color: 'white',
    },
    itemImage: {
      height: 128,
      width: '100%',
      borderRadius: 0,
    },
    welcomeText: {
      textAlign: 'center',
      marginTop: 48,
    },
    bookingWrapper: {
      position: 'absolute',
      bottom: 0,
      alignItems: 'center',
      width: '105%',
      height: 64,
      borderColor: 'black',
      borderWidth: 1,
      borderColor: '#dfe1e5'
    },
    bookingButton: {
      height: 44,
      width: 200,
      marginVertical: 8,
      backgroundColor: 'black',
      borderRadius: 4,
    },
  });

  const handleNavigation = useCallback(
    (to, item) => {
      navigation.navigate(to, item);
    },
    [navigation],
  );

  function handleSelectService(item) {
    handleNavigation('Booking', item);
  }

  async function getTenants() {
    let data = axios
      .get('/')
      .then((response) => {
        setTenants(PRODUCTS);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getSaleOff() {
    setSaleOffs(SALE_OFF);
    let data = axios
      .get('/')
      .then((response) => { })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    // getTenants();
  }, []);

  useEffect(() => {
    console.log(`service`, service)
  }, [JSON.stringify(service)]);

  const { width } = useWindowDimensions();

  return (
    <Block style={{ paddingTop: 36, backgroundColor: 'white' }}>
      <Text h5 style={styles.itemText}>
        {service.name}
      </Text>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.app}>
            <ScrollView
              alwaysBounceHorizontal={true}
              indicatorStyle={'white'}
              removeClippedSubviews
              showsHorizontalScrollIndicator={false}>
              {service?.description ? <RenderHtml contentWidth={width} source={{ html: service?.description }} /> : ''}
            </ScrollView>
          </View>
        </SafeAreaView>
        <Block style={styles.bookingWrapper}>
          <Button textColor="white" buttonColor="black" style={styles.bookingButton} ma icon="book" mode="contained" onPress={() => {
            handleSelectService(service)
          }}>
            ĐẶT LỊCH NGAY
          </Button>
        </Block>
      </View>
    </Block>
  );
};

export default ServiceDetail;
