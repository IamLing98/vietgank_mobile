import React, {useCallback, useEffect, useState} from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {View, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import {useData, useTheme, useTranslation} from '../hooks';
import {Block, Button, Image, Input, Product, Text} from '../components';
import ProductFive from './Home/ProductFive';
import TopFive from './Home/TopFive';
import SaleOff from './Home/SaleOff';

import {PRODUCTS, SALE_OFF} from '../constants/mocks';

import HorseClub from '../assets/icons/horse-1.png';

import axios from 'axios';
import {Divider} from 'react-native-paper';

const Home = ({navigation}) => {
  const {t} = useTranslation();
  const [tab, setTab] = useState(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState([]);
  const {assets, colors, fonts, gradients, sizes} = useTheme();

  const [saleOffs, setSaleOffs] = useState([]);

  const tabs = ['Shopping', 'Original', 'Kids', 'Glamping', 'Beach'];

  const handleProducts = useCallback(
    (tab) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts],
  );
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
    <Block style={{paddingTop: 36}}>
      {/* search input */}
      <Block color={colors.card} flex={0} >
        <Image style={{height: 64, width: '100%'}} source={HorseClub} />
      </Block>

      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder="Tìm kiếm" />
      </Block>

      {/* Headers */}
      <Block
        row
        flex={0}
        align="center"
        justify="center"
        color={colors.card}
        style={{height: 100, backgroundColor: 'gray'}}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            horizontal={true}
            alwaysBounceHorizontal={true}
            indicatorStyle={'white'}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}>
            {tabs?.map((item, index) => {
              return (
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  style={{
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    borderRadius: 20,
                    marginRight: 24,
                  }}
                  key={`touch-home-index-` + index}
                  onPress={() => console.log('Pressed!')}>
                  <View style={{flexDirection: 'column'}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        borderRadius: 64,
                      }}>
                      <Image
                        style={{height: 48, width: 48}}
                        source={HorseClub}
                      />
                    </View>
                    <Text style={{textAlign: 'center'}}>{item}</Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </Block>
      <Divider />

      <Block
        style={{backgroundColor: 'white'}}
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        {/* shoping list  */}
        <Text bold style={{marginLeft: 8, marginTop: 12}}>
          Sản phẩm nổi bật
        </Text>
        <SafeAreaView style={styles.container}>
          <ScrollView
            horizontal={true}
            alwaysBounceHorizontal={true}
            indicatorStyle={'white'}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}>
            {products?.map((product, index) => {
              return (
                <ProductFive
                  {...product}
                  key={`card-PRODUCTS-${product?._id}`}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>

        {/* shoping list  */}
        <Text bold style={{marginLeft: 8}}>
          Ưu đãi
        </Text>
        <SafeAreaView style={styles.container}>
          <ScrollView
            horizontal={true}
            alwaysBounceHorizontal={true}
            indicatorStyle={'white'}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}>
            {saleOffs?.map((sale, index) => {
              return (
                <SaleOff
                  {...sale}
                  key={`card-SALE-${sale?._id}`}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>

        {/* Original list  */}
        <Text bold style={{marginLeft: 8}}>
          Original
        </Text>
        <SafeAreaView style={styles.container}>
          <ScrollView
            horizontal={true}
            alwaysBounceHorizontal={true}
            indicatorStyle={'white'}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}>
            {products?.map((product, index) => {
              return (
                <TopFive
                  {...product}
                  key={`card-${product?.id}`}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
        {/* Kids list  */}
        <Text bold style={{marginLeft: 8}}>
          Kids
        </Text>
        <SafeAreaView style={styles.container}>
          <ScrollView
            horizontal={true}
            alwaysBounceHorizontal={true}
            indicatorStyle={'white'}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}>
            {products?.map((product, index) => {
              return (
                <TopFive
                  {...product}
                  key={`card-${product?.id}`}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>

        {/* Glamping list  */}
        <Text bold style={{marginLeft: 8}}>
          Glamping Club
        </Text>
        <SafeAreaView style={styles.container}>
          <ScrollView
            horizontal={true}
            alwaysBounceHorizontal={true}
            indicatorStyle={'white'}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}>
            {products?.map((product, index) => {
              return (
                <TopFive
                  {...product}
                  key={`card-${product?.id}`}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
        {/* Glamping list  */}
        <Text bold style={{marginLeft: 8}}>
          Beach Club
        </Text>
        <SafeAreaView style={styles.container}>
          <ScrollView
            horizontal={true}
            alwaysBounceHorizontal={true}
            indicatorStyle={'white'}
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}>
            {products?.map((product, index) => {
              return (
                <TopFive
                  {...product}
                  key={`card-${product?.id}`}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </Block>
    </Block>
  );
};

export default Home;
