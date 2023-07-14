import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: any) => {
  try {
    await AsyncStorage.setItem('msnv', value);
  } catch (e) {
    // saving error
    return e;
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('msnv');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return e;
    // error reading value
  }
};
