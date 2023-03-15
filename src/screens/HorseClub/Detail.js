import React, {useCallback, useEffect, useState} from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import axios from 'axios';
import {Divider, List} from 'react-native-paper';

import {Block, Button, Image, Input, Product, Text} from '../../components';

import {PRODUCTS, SALE_OFF} from '../../constants/mocks';
import HorseClubImg from '../../assets/images/horse_club_item.png';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/reducers/authReducer';

const HorseClubDetail = ({route, navigation}) => { 
  
  const tenant = route.params; 

  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      height: 480,
      width: 220,
    },
    itemView: {
      flex: 0.3,
      borderColor: '#dfe1e5',
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: 0,
      width: 160,
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
  });

  const handleNavigation = useCallback(
    (to,item) => {
      navigation.navigate(to,item);
    },
    [navigation],
  );

  function handleSelectService(item) { 
    handleNavigation('ServiceDetail', item);
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
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getTenants();
    console.log(tenant);
  }, []);

  return (
    <Block style={{paddingTop: 36, backgroundColor: 'white'}}>
      <Text h4 style={styles.welcomeText}>
        Chào mừng bạn đến với {tenant.name} !
      </Text>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            alwaysBounceHorizontal={true}
            horizontal={true}
            indicatorStyle={'white'}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}>
            {tenant?.services?.map((item, index) => {
              return (
                <TouchableOpacity
                  underlayColor="#DDDDDD"
                  onPress={(e) => {
                    handleSelectService(item);
                  }}>
                  <View style={styles.itemWrapper}>
                    <ImageBackground
                      source={HorseClubImg}
                      resizeMode="cover"
                      imageStyle={{borderRadius: 16}}
                      style={styles.itemBackground}>
                      <View style={styles.itemView}>
                        <Text color="white" h5 style={styles.itemText}>
                          {item.name?.toUpperCase()}
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Block>
  );
};

export default HorseClubDetail;
