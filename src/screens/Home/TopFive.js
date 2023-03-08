import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import Block from '../../components/Block';
import Image from '../../components/Image';
import Text from '../../components/Text';
import {useTheme, useTranslation} from '../../hooks/';

const PlaceItem = ({_id, image, title, type, navigation}) => {
  const {t} = useTranslation();
  const {assets, colors, sizes} = useTheme();

  const isHorizontal = type !== 'vertical';

  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;

  const [active, setActive] = useState('Home');

  const handleNavigation = useCallback(
    (to, params) => {
      setActive(to);
      navigation.navigate(to, params);
    },
    [navigation, setActive],
  );

  return (
    <Block
      card
      flex={0}
      row={isHorizontal}
      marginBottom={sizes.sm}
      width={CARD_WIDTH}
      style={{
        marginRight: 12,
      }}>
      <TouchableOpacity
        underlayColor="#DDDDDD"
        onPress={(e) => {
          console.log(`On press product detail`);
          handleNavigation('ProductDetail', _id);
        }}>
        <Image
          resizeMode="cover"
          source={{uri: image}}
          style={{
            height: 110,
            width: CARD_WIDTH - 20,
          }}
        />
        <Block
          paddingTop={sizes.s}
          justify="space-between"
          paddingLeft={3}
          paddingBottom={sizes.s}>
          <Text style={{fontSize: 12}} bold marginBottom={sizes.s}>
            {title}
          </Text>

          <Block row flex={0} align="center">
            <Text
              p
              color={colors.link}
              semibold
              size={sizes.linkSize}
              marginRight={sizes.s}>
              Chi tiết
            </Text>
            <Image source={assets.arrow} color={colors.link} />
          </Block>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default PlaceItem;
