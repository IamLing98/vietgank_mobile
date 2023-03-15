import {View} from 'react-native'

// RN Code
const Col = ({ numRows, children }) => {

    const styles = {
        app: {
          flex: 4, // the number of columns you want to devide the screen into
          marginHorizontal: "auto",
          width: "100%",
        },
        row: {
          flexDirection: "row",
          borderWidth: 1,
          borderBottom: 1,
          borderColor: '#dfe1e5',
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 1,
        },
        "1col": {
          borderColor: "#fff",
          borderWidth: 1,
          flex: 1
        },
        "2col": {
          borderColor: "#fff",
          borderWidth: 1,
          flex: 2
        },
        "3col": {
          borderColor: "#fff",
          borderWidth: 1,
          flex: 3
        },
        "4col": {
          flex: 4
        }, shadowProp: {
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
      };
    
    return (
        <View style={styles[`${numRows}col`]}>{children}</View>
    )
}

export default Col;