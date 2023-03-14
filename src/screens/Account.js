import React, {useCallback, useEffect, useState} from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native'; 

import axios from 'axios';
import {Divider, List} from 'react-native-paper';

import {useData, useTheme, useTranslation} from '../hooks';
import {Block, Button, Image, Input, Product, Text} from '../components';

import {PRODUCTS, SALE_OFF} from '../constants/mocks';
import HorseClub from '../assets/icons/horse-1.png';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authReducer';

const Account = ({navigation}) => {
  const {t} = useTranslation();
  const [tab, setTab] = useState(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState([]);
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const [saleOffs, setSaleOffs] = useState([]);

  const tabs = ['Shopping', 'Original', 'Kids', 'Glamping', 'Beach'];

  const dispatch = useDispatch()

  function handleLogout(e){
    dispatch(logout())
  }


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
  });

  async function getProducts() {
    setProducts(PRODUCTS);
    let data = axios
      .get('/')
      .then((response) => {})
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
    getSaleOff();
    getProducts();
  }, []);

  return (
    <Block style={{paddingTop: 36, backgroundColor: 'white'}}>
      <Block color={colors.card} flex={0}>
        <Image style={{height: 256, width: '100%'}} source={HorseClub} />
      </Block>

      <View style={styles.container}>
        <List.Item
          title="Thông tin cá nhân"
          left={(props) => <List.Icon {...props} icon="account" />}
        />
        <List.Item
          title="Đổi mật khẩu"
          left={(props) => <List.Icon {...props} icon="onepassword" />}
        />
        <List.Item
          title="Đăng xuất"
          description=""
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={()=>{
            handleLogout()
          }}
        />
      </View>
    </Block>
  );
};

export default Account;
