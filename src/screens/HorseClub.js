import React, {useCallback, useEffect, useState} from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import {Divider, List} from 'react-native-paper';

import {useData, useTheme, useTranslation} from '../hooks';
import {Block, Button, Image, Input, Product, Text} from '../components';

import {PRODUCTS, SALE_OFF} from '../constants/mocks';
import HorseClubImg from '../assets/images/horse_club_item.png';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/reducers/authReducer';

const HorseClub = ({navigation}) => {
  const [tenants, setTenants] = useState([
    {
      name: 'Vietgangz Horse Sài Gòn',
      services: [
        {
          name: 'Trải nghiệm tham quan tiệc BBQ',
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
      paddingHorizontal: 24,
      paddingVertical: 24,
    },
    itemList: {
      flex: 0.3,
      backgroundColor: 'white',
      borderColor: '#dfe1e5',
      borderWidth: 1,
      borderRadius: 4,
    },
    itemText: {
      fontSize: 52,
      fontWeight: 'bold',
      marginVertical: 12,
      marginLeft: 12,
    },
    itemImage: {
      height: 128,
      width: '100%',
      borderRadius: 0,
    },
    guideText: {
      marginLeft: 24,
    },
  });

  const handleNavigation = useCallback(
    (to, item) => {
      navigation.navigate(to, item);
    },
    [navigation],
  );

  function handleClickTenantItem(item) {
    handleNavigation('Horse Club Detail', item);
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
  }, []);

  return (
    <Block style={{paddingTop: 36, backgroundColor: 'white'}}>
      <Text h5 style={styles.guideText}>
        Cùng khám phá:
      </Text>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            alwaysBounceHorizontal={true}
            indicatorStyle={'white'}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}>
            {tenants?.map((item, index) => {
              return (
                <TouchableOpacity
                  underlayColor="#DDDDDD"
                  onPress={(e) => {
                    handleClickTenantItem(item);
                  }}>
                  <Block style={styles.itemWrapper}>
                    <View style={styles.itemList}>
                      <Image style={styles.itemImage} source={HorseClubImg} />
                      <Text h5 style={styles.itemText}>
                        {item.name}
                      </Text>
                    </View>
                  </Block>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Block>
  );
};

export default HorseClub;
