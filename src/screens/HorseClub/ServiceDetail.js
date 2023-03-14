import React, {useCallback, useEffect, useState} from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

import axios from 'axios';
import {Divider, List} from 'react-native-paper';

import {Block, Button, Image, Input, Product, Text} from '../../components';

import {PRODUCTS, SALE_OFF} from '../../constants/mocks';
import HorseClubImg from '../../assets/images/horse_club_item.png';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/reducers/authReducer';

const source = {
  html: `
  <article>
  <h1>
      HTML playground
  </h1>
  <p data-foo="bar">
      This is a sample paragraph with a <code><strong>data</strong></code><strong> attribute</strong>.
  </p>
  <div class="raw-html-embed">
  </div>
  <details style="margin:10px auto;" id="details-example">
      <summary><span style="color:#d32f2f;"><strong>Spoiler alert</strong></span> created with a <code>details</code> element!</summary>
      <p>
          This demo uses elements such as <code>abbr</code>, <code>article</code>, <code>section</code>, <code>aside</code>, and <code>details</code>.
      </p>
  </details>
  <hr>
  <section>
      <h2>
          Responsive column layout
      </h2>
      <div class="columns" style="gap:10px;">
          <div class="column" style="border:1px solid orange;">
              <figure class="image">
                  <img src="https://ckeditor.com/assets/images/ckdemo/html-source-editing/html.png" width="185" height="209">
                  <figcaption>
                      <abbr title="HyperText Markup Language">HTML</abbr>
                  </figcaption>
              </figure>
          </div>
          <div class="column" style="border:1px dotted blue;">
              <figure class="image">
                  <img src="https://ckeditor.com/assets/images/ckdemo/html-source-editing/css.png" width="185" height="210">
                  <figcaption>
                      <abbr title="Cascading Style Sheets">CSS</abbr>
                  </figcaption>
              </figure>
          </div>
          <div class="column" style="border:1px dashed olive;">
              <figure class="image">
                  <img src="https://ckeditor.com/assets/images/ckdemo/html-source-editing/js.png" width="185" height="209">
                  <figcaption>
                      <abbr title="JavaScript">JS</abbr>
                  </figcaption>
              </figure>
          </div>
      </div>
  </section>
  <hr>
  <aside>
      <h2>
          HTML-related features
      </h2>
      <ul>
          <li>
              <a target="_blank" rel="noopener noreferrer" href="https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html">HTML embed</a>
          </li>
          <li>
              <a target="_blank" rel="noopener noreferrer" href="https://ckeditor.com/docs/ckeditor5/latest/features/style.html">Styles</a>
          </li>
          <li>
              <a target="_blank" rel="noopener noreferrer" href="https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html">General HTML Support</a>
          </li>
      </ul>
  </aside>
</article>`,
};

const HorseClubDetail = ({route, navigation}) => {
  /* 2. Get the param */
  const tenant = route.params;

  const [tenants, setTenants] = useState([
    {
      name: 'Vietgangz Horse Sài Gòn',
    },
    {
      name: 'Vietgangz Horse Hà Nội',
    },
    {
      name: 'Vietgangz Horse Đà Nẵng',
    },
    {
      name: 'Vietgangz Horse Thanh Hóa',
    },
  ]);

  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
    },
    scrollView: {
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
    itemWrapper: {
      marginHorizontal: 24,
      marginVertical: 48,
      borderRadius: 16,
    },
    itemBackground: {
      height: 256,
      width: '50%',
    },
    itemView: {
      flex: 0.3,
      borderColor: '#dfe1e5',
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    itemText: {
      fontSize: 52,
      fontWeight: 'bold',
      marginVertical: 12,
      marginLeft: 12,
      color: 'white',
    },
    itemImage: {
      height: 128,
      width: '100%',
      borderRadius: 0,
    },
    welcomeText: {
      textAlign: 'center',
      marginTop: 48,
    },
    bookingButton: {
      position: 'absolute',
      bottom: 0,
    },
  });

  const handleNavigation = useCallback(
    (to) => {
      navigation.navigate(to);
    },
    [navigation],
  );

  function handleSelectService(item) {
    handleNavigation('ServiceDetail');
  }

  async function getTenants() {
    let data = axios
      .get('/')
      .then((response) => {
        setTenants(PRODUCTS);
      })
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
    getTenants();
    console.log(tenant);
  }, []);

  const stylesBox = {
    app: {
      flex: 4, // the number of columns you want to devide the screen into
      marginHorizontal: 'auto',
      width: '100%',
      backgroundColor: 'red',
    },
    row: {
      flexDirection: 'row',
    },
    '1col': {
      backgroundColor: 'lightblue',
      borderColor: '#fff',
      borderWidth: 1,
      flex: 1,
    },
    '2col': {
      backgroundColor: 'green',
      borderColor: '#fff',
      borderWidth: 1,
      flex: 2,
    },
    '3col': {
      backgroundColor: 'orange',
      borderColor: '#fff',
      borderWidth: 1,
      flex: 3,
    },
    '4col': {
      flex: 4,
    },
  };

  // RN Code
  const Col = ({numRows, children}) => {
    return <View style={stylesBox[`${numRows}col`]}>{children}</View>;
  };

  const Row = ({children}) => <View style={stylesBox.row}>{children}</View>;

  const {width} = useWindowDimensions();

  return (
    <Block style={{paddingTop: 36, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.app}>
            <RenderHtml contentWidth={width} source={source} />
          </View>
        </SafeAreaView>
        <Block style={styles.bookingButton}>
          <Text>Dat lich</Text>
        </Block>
      </View>
    </Block>
  );
};

export default HorseClubDetail;
