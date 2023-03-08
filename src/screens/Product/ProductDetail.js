import React, { useCallback, useState } from 'react';
import {TouchableOpacity} from 'react-native';

import Block from '../../components/Block';
import Image from '../../components/Image';
import Text from '../../components/Text';
import {useTheme, useTranslation} from '../../hooks/';

const ProductDetail = ({image, title, type, navigation, route}) => {
    console.log(`Route: `, route, navigation)
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

  async function fetchDetail(_id){
    axios.get(``)
  }

  return (
    <Block
      card
      flex={0}
      row={isHorizontal}
      marginBottom={sizes.sm}
    //   width={isHorizontal ? CARD_WIDTH * 2 + sizes.sm : CARD_WIDTH}
      >
      <Image
        resizeMode="cover"
        source={{uri: image}}
        style={{
          height: isHorizontal ? 114 : 110,
          width: !isHorizontal ? '100%' : sizes.width / 2.435,
        }}
      />
      <Block
        paddingTop={sizes.s}
        justify="space-between"
        paddingLeft={isHorizontal ? sizes.sm : 0}
        paddingBottom={isHorizontal ? sizes.s : 0}>
        <Text p marginBottom={sizes.s}>
          {title}
        </Text>
        <TouchableOpacity>
          <Block row flex={0} align="center">
            <Text
              p
              color={colors.link}
              semibold
              size={sizes.linkSize}
              marginRight={sizes.s}
              onPress={e=>{
                console.log(`On press dat lich`)
                handleNavigation('Horse Club')
              }}
              >
              Đặt lịch
            </Text>
            <Image source={assets.arrow} color={colors.link} />
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default ProductDetail;
