import React from 'react';
import {TextInput,Text, View, I18nManager, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {BaseStyle, BaseColor, useTheme} from '@config';

export default function Index(props) {
  const {colors} = useTheme();
  const cardColor = colors.card;
  const {
    style,
    onChangeText,
    onFocus,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing,
    maxLength,
    suffix
  } = props;

  const styles = StyleSheet.create({
    inputContainer: {
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      marginHorizontal: 10,
      borderRadius: 10
    },
    prefix: {
      paddingHorizontal: 10,
      fontWeight: 'bold',
      color: 'black'
    }
  })

  return (
    <View style={[BaseStyle.textInput, {backgroundColor: cardColor}, style]}>
      <TextInput
        style={{
          flex: 1,
          height: '100%',
          textAlign: I18nManager.isRTL ? 'right' : 'left',
          color: colors.text,
          paddingTop: 5,
          paddingBottom: 5,
        }}
        type
        onChangeText={(text) => onChangeText(text)}
        onFocus={() => onFocus()}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={ colors.primary}
        secureTextEntry={secureTextEntry}
        value={value} 
        selectionColor={colors.primary}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        maxLength={maxLength ? maxLength : 100}
      />
      {icon}
      {suffix ? suffix : ''}
    </View>
  );
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  success: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  icon: PropTypes.node,
  onSubmitEditing: PropTypes.func,
};

Index.defaultProps = {
  style: {},
  onChangeText: (text) => {},
  onFocus: () => {},
  placeholder: 'Placeholder',
  value: '',
  success: true,
  secureTextEntry: false,
  keyboardType: 'default',
  multiline: false,
  textAlignVertical: 'center',
  icon: null,
  onSubmitEditing: () => {},
};
