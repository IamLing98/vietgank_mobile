import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import Block from '../components/Block';
// import Image from '../components/Image';
import Text from '../components/Text';
import {Button} from 'react-native-paper';

import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  SectionList,
  SafeAreaView,
} from 'react-native';
import {useTheme, useTranslation} from '../hooks/';

import {Avatar, Card, Divider, IconButton} from 'react-native-paper';

const PlaceDetail = ({image, title, type, navigation}) => {
  const {t} = useTranslation();
  const {assets, colors, sizes} = useTheme();

  const [active, setActive] = useState('Home');

  const [imagesList, setImagesList] = useState([
    {
      title: 'asdasd',
    },
  ]);

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );

  var styles = StyleSheet.create({
    image: {
      width: 360,
      height: 40,
    },
    scrollView: {
      backgroundColor: 'white',
      flexDirection: 'column',
      padding: 20,
    },
    item: {
      padding: 20,
      marginVertical: 8,
    },
    header: {
      fontSize: 32,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
    },
    imageListContainer:{
      marginTop:12,
      marginBottom:12
    }
  });

  const imageStyles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    image: {
      width: 350,
      height: 400,
    },
    imageSelection: {
      width: 48,
      height: 72,
      marginLeft: 12,
    },
  });

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'white',
        overflow: 'scroll',
      }}>
      <ScrollView style={styles.scrollView}>
        <View style={imageStyles.container}>
          <Image
            style={imageStyles.image}
            source={{
              uri: 'https://vietgangz.com/wp-content/uploads/2022/04/z3321486720006_04f58a789a61852e442246da12f92697-533x400.jpg',
            }}
          />
        </View>
        <Divider /> 
        <Divider />
        <View style={styles.imageListContainer}>
          <SafeAreaView style={{flex: 1}}>
            <SectionList
              horizontal={true}
              contentContainerStyle={{paddingHorizontal: 0}}
              stickySectionHeadersEnabled={false}
              sections={SECTIONS}
              di
              // renderSectionHeader={({section}) => (
              //   <Text style={styles.sectionHeader}>{section.title}</Text>
              // )}
              renderItem={({item, section}) => {
                return (
                  <Image
                    style={imageStyles.imageSelection}
                    source={{
                      uri: 'https://vietgangz.com/wp-content/uploads/2022/04/z3321486720006_04f58a789a61852e442246da12f92697-533x400.jpg',
                    }}
                  />
                );
              }}
            />
          </SafeAreaView>
        </View>
        <Divider />
        <View style={imageStyles.imageListContainer}> 

        <Text h5 black  marginTop={sizes.s}>
          Địa chỉ: 
        </Text>
        <Text p black >
            {'88 đường số 9 – phường Long Phước – Quận 9'}
          </Text>
        <Text h5 black   marginTop={sizes.s}>
          Chi tiết:
        </Text>
          <Text p>
            Với mục đích đem lại cho người Việt Nam được học và trải nghiệm bộ
            môn thể thao hoàng gia,quý tộc với mức giá tốt nhất nên Vietgangz
            chúng tôi đã nhập khẩu 100% ngựa đua,ngựa Úc,Hà Lan,Anh… với các
            giáo viên nước ngoài tới từ : Anh,Nam Phi,Mông Cổ,Thổ Nhỹ Kỳ và các
            giáo viên tay đua chuyên nghiệp tới từ trường đua Đại Nam và trường
            đua Phú Thọ.
          </Text>
        </View>
        <Divider />
      </ScrollView>
      <Button
        icon="table"
        mode="contained"
        dark
        style={{borderRadius:2}}
        buttonColor='gray'
        onPress={() =>{
          navigation.navigate('Đặt lịch')
        }}>
        Đặt lịch
      </Button>
    </View>
  );
};

const SECTIONS = [
  {
    title: 'Made for you',
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
      },
    ],
  },
];

export default PlaceDetail;
