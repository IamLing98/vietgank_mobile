import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Icon} from '@components';
import styles from './styles';
import {BaseColor, useTheme} from '@config';

export default function QuantityPicker({
  value,
  field,
  style,
  label,
  detail,
  onChange,
}) {
  const {colors} = useTheme();

  return (
    <View style={[styles.contentPicker, {backgroundColor: colors.card}, style]}>
      <Text body1 numberOfLines={1} style={{marginBottom: 5}}>
        {label}
      </Text>
      <Text caption1 light style={{marginBottom: 5}}>
        {detail}
      </Text>
      <TouchableOpacity onPress={() => onChange('up', field)}>
        <Icon name="plus-circle" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text title1>{value}</Text>
      <TouchableOpacity onPress={() => onChange('down', field)}>
        <Icon name="minus-circle" size={24} color={BaseColor.grayColor} />
      </TouchableOpacity>
    </View>
  );
}

QuantityPicker.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  detail: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
};

QuantityPicker.defaultProps = {
  style: {},
  label: 'Adults',
  detail: '>= 12 years',
  value: 1,
  onChange: () => {},
};
