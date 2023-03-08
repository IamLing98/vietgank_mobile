import React, {useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import Block from '../../components/Block';
import Image from '../../components/Image';
import Text from '../../components/Text';
import {useTheme, useTranslation} from '../../hooks/';

const SaleOff = ({imageUrl, description, type, navigation}) => {
  const {t} = useTranslation();
  const {assets, colors, sizes} = useTheme();

  const isHorizontal = type !== 'vertical';

  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;

  const [active, setActive] = useState('Home');

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );

  return (
    <TouchableOpacity
    //   underlayColor="#DDDDDD"
      onPress={(e) => {
        console.log(`On press dat lich`);
        handleNavigation('Horse Club');
      }}>
      <Block
        card
        flex={0}
        row={isHorizontal}
        marginBottom={sizes.sm}
        width={CARD_WIDTH * 2 - 24}
        style={{
          marginRight: 12,
        }}>
        <Image
          resizeMode="cover"
          source={{uri: imageUrl}}
          style={{
            height: 100,
            width: CARD_WIDTH - 70,
            marginRight:12
          }}
        />
        <Block
          paddingTop={sizes.s}
          justify="space-between"
          paddingLeft={3}
          paddingBottom={sizes.s}>
          <Text style={{fontSize: 12}} marginBottom={sizes.s}>
            {description}
          </Text>

          <Block row flex={0} align="center">
            <Text
              p
              color={colors.link}
              semibold
              size={sizes.linkSize}
              marginRight={sizes.s}>
              Sử dụng ngay
            </Text>
            <Image source={assets.arrow} color={colors.link} />
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default SaleOff;
