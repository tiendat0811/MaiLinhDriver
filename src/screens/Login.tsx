import React, {useContext, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getData, storeData} from '../core/async.storage';
import {AuthContext} from '../contexts/AuthContext';
import TextField from '../components/TextField';
import ButtonSmall from '../components/ButtonSmall';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}: any) => {
  const [text, setText] = useState('002104');
  const auth = useContext(AuthContext);

  const handleLogin = async () => {
    if (text !== '') {
      await storeData(text);
      const token = await getData();
      if (token !== null) {
        auth?.setAuth({
          token: text,
          getToken: true,
        });
        navigation.navigate('Home', {screen: 'HomePage'});
      }
    } else {
      Alert.alert('Thông báo', 'Sai MSNV');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mai Linh Driver</Text>
        <Text style={styles.headerText2}>Xem doanh thu theo ca</Text>
        <Text style={styles.headerText2}>Xem lương tháng</Text>
        <Text style={styles.headerText2}>Xem thông tin cá nhân</Text>
      </View>
      {/* <TouchableOpacity
        style={styles.fastBtn}
        onPress={() => {
          setText('002104');
        }}>
        <View>
          <Text style={styles.header}>Quà Tết tặng Bố Hùng</Text>
          <Text style={styles.label}>
            Bố bấm vào chỗ màu xám này rồi bấm đăng nhập
          </Text>
        </View>
      </TouchableOpacity> */}
      <View style={styles.body}>
        <View style={styles.textField}>
          <TextField
            label="Mã số nhân viên"
            placeholder="Nhập mã số nhân viên"
            onChangeText={setText}
            value={text}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.button}>
          <ButtonSmall title="Đăng nhập" onPress={handleLogin} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flex: 2,
  },
  body: {
    flex: 4,
  },
  bottom: {
    flex: 3,
  },
  headerText: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  headerText2: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  textField: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
  },
  fastBtn: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    color: 'red',
  },
});
export default Login;
