import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import Block from '../../components/Block';
import Image from '../../components/Image';
import Text from '../../components/Text';
import {useTheme, useTranslation} from '../../hooks/';

import {concurrencyFormat} from '../../utils/dataUtils';

const ProductFive = ({imageUrl, name, tags, type, price, navigation, _id}) => {
  const {t} = useTranslation();
  const {assets, colors, sizes} = useTheme();

  const isHorizontal = type !== 'vertical';

  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;

  const [active, setActive] = useState('Home');

  const handleNavigation = useCallback(
    (to, id) => {
      setActive(to);
      navigation.navigate(to, {id: id});
    },
    [navigation, setActive],
  );

  return (
    <Block
      card
      flex={0}
      row={isHorizontal}
      marginBottom={sizes.sm}
      width={CARD_WIDTH + 20}
      style={{
        marginRight: 12,
      }}>
      <TouchableOpacity
        underlayColor="#DDDDDD"
        onPress={(e) => {
          console.log(`On press dat lich`);
          handleNavigation('ProductDetail', _id);
        }}>
        <Image
          resizeMode="cover"
          source={{uri: imageUrl}}
          style={{
            height: 256,
            width: CARD_WIDTH,
          }}
        />
        <Block
          paddingTop={sizes.s}
          justify="space-between"
          paddingLeft={3}
          paddingBottom={sizes.s}>
          <Text style={{fontSize: 12}} bold marginBottom={2}>
            {name}
          </Text>
          <Text style={{fontSize: 6}} marginBottom={2}>
            {tags?.join(',')}
          </Text>
          <Text style={{fontSize: 12}} marginBottom={2}>
            {concurrencyFormat(price)}
          </Text>

          <Block row flex={0} align="center">
            <Text
              p
              bold
              color={'#5B4D5E'}
              size={sizes.linkSize}
              marginRight={5}
              marginTop={5}>
              Mua ngay
            </Text>
            <Image
              source={assets.arrow}
              style={{marginTop: 8}}
              color={'#5B4D5E'}
            />
          </Block>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default ProductFive;
