import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
// import FastImage from "react-native-fast-image";
import { Text } from "react-native";

export default function Image(props) {
  // const { style, resizeMode, ...rest } = props;
  // let resize = FastImage.resizeMode.cover;
  // switch (resizeMode) {
  //   case "contain":
  //     resize = FastImage.resizeMode.contain;
  //     break;
  //   case "stretch":
  //     resize = FastImage.resizeMode.stretch;
  //     break;
  //   case "center":
  //     resize = FastImage.resizeMode.center;
  //     break;
  //   default:
  //     break;
  // }
  return (
    // <FastImage
    //   style={StyleSheet.flatten([style && style])}
    //   {...rest}
    //   resizeMode={resize}
    // />
    <Text>Image</Text>
  );
}

Image.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

Image.defaultProps = {
  style: {},
  resizeMode: "cover"
};
