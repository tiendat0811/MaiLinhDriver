import React, {useContext, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import {AuthContext} from '../contexts/AuthContext';
import Notification from '../screens/Notification';
import {Icon} from '@rneui/themed';
import {Text, TouchableOpacity, View} from 'react-native';
import {getData} from '../core/async.storage';
import LoadingScreen from '../screens/Loading';
import {layThongTinNhanVien} from '../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Home: any;
  Login: any;
  Profile: any;
  Notification: any;
  Loading: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const [msnv, setMsnv] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Auth = useContext(AuthContext);
  const isLoggedin: any = Auth?.auth.getToken;

  const isFocused = useIsFocused();

  const getMSNV = async () => {
    setIsLoading(true);
    const msnvSTG: any = await getData();
    setMsnv(msnvSTG);
    setIsLoading(false);
    return msnvSTG;
  };

  useEffect(() => {
    getMSNV();
  }, []);

  const [name, setName] = useState<any>();

  useEffect(() => {
    if (msnv) {
      Auth?.setAuth({
        token: msnv,
        getToken: true,
      });
      layThongTinNhanVien(msnv)
        .then(res => {
          setName(res.data[0].HoTen);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [msnv]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('msnv');
    await Auth?.setAuth({
      token: '',
      getToken: false,
    });
  };

  const HomeTab = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 1,
            height: 50,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            paddingBottom: 2,
          },
        }}>
        <Tab.Screen
          name="HomePage"
          component={Home}
          options={{
            title: name || 'Trang chủ',
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  handleLogout();
                }}>
                <Text
                  style={{
                    marginRight: 10,
                    padding: 5,
                    backgroundColor: 'gray',
                    borderRadius: 5,
                    color: '#fff',
                  }}>
                  Đăng xuất
                </Text>
              </TouchableOpacity>
            ),
            tabBarIcon: ({size, color}) => {
              return (
                <Icon size={size} name="receipt" type="ionicon" color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: true,
            title: 'Tổng lương nhận',
            tabBarIcon: ({size, color}) => {
              return (
                <Icon size={size} name="wallet" type="ionicon" color={color} />
              );
            },
          }}
        />
        {/* <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            title: 'Đổi tài khoản',
            tabBarIcon: ({size, color}) => {
              return (
                <Icon size={size} name="person" type="ionicon" color={color} />
              );
            },
          }}
        /> */}
      </Tab.Navigator>
    );
  };

  if (msnv !== '' && isLoggedin) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeTab} />
      </Stack.Navigator>
    );
  } else {
    if (isLoading) {
      return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Loading" component={LoadingScreen} />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      );
    }
  }
};

export default Navigator;
