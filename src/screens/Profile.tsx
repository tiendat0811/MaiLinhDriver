import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import ButtonSmall from '../components/ButtonSmall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../contexts/AuthContext';
import {layThongTinNhanVien} from '../apis/api';
import {getData} from '../core/async.storage';
import theme from '../core/theme';
import {Image} from 'react-native';
const Profile = ({navigation}: any) => {
  const [info, setInfo] = useState<any>();
  const [msnv, setMsnv] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getMSNV = async () => {
      const msnvSTG: any = await getData();
      setMsnv(msnvSTG);
    };
    getMSNV();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    layThongTinNhanVien(msnv)
      .then(res => {
        setInfo(res.data[0]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [msnv]);

  const Auth = useContext(AuthContext);
  const handleLogout = async () => {
    await AsyncStorage.removeItem('msnv');
    await Auth?.setAuth({
      token: '',
      getToken: false,
    });
    navigation.navigate('Login'); // 'Homes' is the name of the stack navigator
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông tin nhân viên</Text>
      </View>

      <View style={styles.body}>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.text, {marginBottom: 50}]}>Đang tải...</Text>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          info && (
            <View style={{flex: 1}}>
              <View style={styles.twoColumns}>
                <Text style={styles.textField}>Mã số nhân viên: </Text>
                <Text style={styles.text}>{info.MSNV}</Text>
              </View>
              <View style={styles.twoColumns}>
                <Text style={styles.textField}>Họ và tên: </Text>
                <Text style={styles.text}>{info.HoTen}</Text>
              </View>
              <View style={styles.twoColumns}>
                <Text style={styles.textField}>Điện thoại: </Text>
                <Text style={styles.text}>{info.DienThoai}</Text>
              </View>
              <View style={styles.twoColumns}>
                <Text style={styles.textField}>Chi nhánh: </Text>
                <Text style={styles.text}>{info.ChiNhanh}</Text>
              </View>
              <View style={styles.twoColumns}>
                <Text style={styles.textField}>Đội: </Text>
                <Text style={styles.text}>{info.Doi}</Text>
              </View>
              <View style={styles.twoColumns}>
                <Text style={styles.textField}>Bãi giao ca: </Text>
                <Text style={styles.text}>{info.BaiGiaoCa}</Text>
              </View>
              <Image
                source={{uri: info.ImagePath}}
                style={{
                  width: 150,
                  height: 200,
                  alignSelf: 'center',
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 10,
                }}
              />
            </View>
          )
        )}
      </View>
      <View style={styles.bottom}>
        <View style={styles.button}>
          <ButtonSmall title="Đăng xuất" onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 5,
    paddingHorizontal: 20,
  },
  bottom: {
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  textField: {
    marginTop: 5,
    color: theme.colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    color: theme.colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Profile;
