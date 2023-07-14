import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import theme from '../core/theme';
import {getData} from '../core/async.storage';
import {Picker} from '@react-native-community/picker';
import {AuthContext} from '../contexts/AuthContext';
import {Icon} from '@rneui/themed';
import {layDoanhThuThang} from '../apis/api';
const Home = ({navigation}: any) => {
  const [dates, setDates] = useState<any>([]);
  const [msnv, setMsnv] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<string>('1-2023');
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const notPrice = ['Ngày', 'Mã bãi', 'Số tài', 'Biển số xe'];
  useEffect(() => {
    const currentDate = new Date();
    const result = [];

    for (let i = 0; i < 72; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1,
      );
      const dateString = `${('0' + (date.getMonth() + 1)).slice(
        -2,
      )}-${date.getFullYear()}`;
      result.push(dateString);
    }
    setDates(result);
    const getMSNV = async () => {
      const msnvSTG: any = await getData();
      setPickedDate(dates[0]);
      setMsnv(msnvSTG);
    };
    getMSNV();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    layDoanhThuThang(pickedDate, msnv)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [pickedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Text style={styles.title}>Xem doanh thu từng ngày theo tháng</Text>
        <Text style={styles.menu}>Chọn thời gian </Text>
        <View style={styles.pickerInput}>
          <Picker
            selectedValue={pickedDate}
            style={styles.pickerDrop}
            onValueChange={(itemValue: any, itemIndex) =>
              setPickedDate(itemValue)
            }>
            {dates.map((item: any, index: number) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>
          <View style={{flex: 1}}>
            <Icon name="caret-down" type="ionicon" />
          </View>
        </View>
      </View>
      <View style={styles.result}>
        {isLoading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.text, {marginBottom: 50}]}>Đang tải...</Text>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ScrollView>
            {data.map((item: any) => {
              return (
                <View
                  key={item.ID}
                  style={{
                    borderColor: theme.colors.PRIMARY,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginHorizontal: 20,
                    marginVertical: 20,
                  }}>
                  {item.DetailModels.map((detail: any) => {
                    return (
                      <View key={detail.title} style={styles.twoColumns}>
                        <Text style={styles.text}>{detail.title}</Text>

                        {notPrice.includes(detail.title) ? (
                          <Text style={styles.text}>{detail.value}</Text>
                        ) : (
                          <Text style={styles.text}>
                            {detail.value
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                          </Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.BACKGROUND,
    flex: 1,
  },
  picker: {
    flex: 3,
    width: '100%',
    backgroundColor: theme.colors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  result: {
    flex: 8,
    paddingBottom: 30,
    paddingTop: 10,
  },

  pickerInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.WHITE,
  },
  pickerDrop: {
    flex: 8,
    height: 50,
    backgroundColor: theme.colors.TRANSPARENT,
    color: theme.colors.BLACK,
    borderRadius: 10,
  },
  text: {
    color: theme.colors.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  title: {
    color: theme.colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  menu: {
    color: theme.colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  day: {},
});
export default Home;
