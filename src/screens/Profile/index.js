import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '@actions';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
  ProfilePerformance,
} from '@components';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';
import {logout} from '../../reducers/auth';

export default function Profile({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state?.auth?.userData);

  const dispatch = useDispatch();

  const onLogOut = () => {
    setLoading(true);
    dispatch(logout());
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={'Thông tin cá nhân'}
        renderRight={() => {
          return <Icon name="bell" size={24} color={colors.primary} />;
        }}
        onPressRight={() => {
          navigation.navigate('Notification');
        }}
      />
      <ScrollView>
        <View style={styles.contain}>
          <ProfileDetail
            image={'https://avatars.githubusercontent.com/u/42459014?v=4'}
            textFirst={userData.username}
            point={userData.point ? userData.point : 0}
            textSecond={userData.address}
            textThird={userData.id}
            onPress={() => navigation.navigate('ProfileExanple')}
          /> 
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => {
              navigation.navigate('ProfileEdit');
            }}>
            <Text body1>Cập nhật thông tin</Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{marginLeft: 5}}
              enableRTL={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.profileItem,
              {borderBottomColor: colors.border, borderBottomWidth: 1},
            ]}
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            <Text body1>Đổi mật khẩu</Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{marginLeft: 5}}
              enableRTL={true}
            />
          </TouchableOpacity>  
           
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
        <Button full loading={loading} onPress={() => onLogOut()}>
          Đăng xuất
        </Button>
      </View>
    </SafeAreaView>
  );
}
