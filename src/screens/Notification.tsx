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
import {layDoanhThuThang, layLuongNhanVien} from '../apis/api';
const Notification = ({navigation}: any) => {
  const [dates, setDates] = useState<any>([]);
  const [msnv, setMsnv] = useState<string>('');
  const [pickedDate, setPickedDate] = useState<string>('1-2023');
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    layLuongNhanVien(pickedDate, msnv)
      .then(res => {
        if (res.data.length == 0) {
          setData(null);
          setIsLoading(false);
        } else {
          var temp = res.data[0];
          for (const prop in temp) {
            temp[prop] = temp[prop]
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // change the value of each property to 1.0
          }
          setData(res.data[0]);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [pickedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Text style={styles.headerTitle}>Xem lương cuối kỳ theo tháng</Text>
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
            {data == null ? (
              <Text style={styles.text}>Chưa có dữ liệu lương tháng này</Text>
            ) : (
              <View>
                {/* <Text style={styles.text}>Result: {data.Result}</Text>
                <Text style={styles.text}>
                  EmployeeType: {data.EmployeeType}
                </Text> */}
                <View style={styles.title}>
                  <Text style={styles.text}>Tổng doanh thu</Text>
                  <Text style={styles.text}>{data.tongDoanhThu}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Phần trăm tỷ lệ chia</Text>
                  <Text style={styles.text}>{data.tiLeChia}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>PC tổ trưởng</Text>
                  <Text style={styles.text}> {data.pcToTruong}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>PC giờ cao điểm</Text>
                  <Text style={styles.text}>0</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>HTLX mới</Text>
                  <Text style={styles.text}>{data.hoTroLaiXeMoi}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>PC xăng</Text>
                  <Text style={styles.text}>{data.pcXang}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Thưởng DT đặc cách</Text>
                  <Text style={styles.text}>{data.thuongDoanhThuDacCach}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>PC tăng ca</Text>
                  <Text style={styles.text}>{data.pcTangCa}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Thưởng lễ (tết)</Text>
                  <Text style={styles.text}>{data.thuongLeTet}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Thưởng khác</Text>
                  <Text style={styles.text}>{data.thuongKhac}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Truy thu tăng ca</Text>
                  <Text style={styles.text}>{data.truyThuTangCa}</Text>
                </View>
                <View
                  style={[
                    styles.title,
                    {backgroundColor: theme.colors.TWITTER},
                  ]}>
                  <Text style={styles.text}>Tổng DT + PC [1]</Text>
                  <Text style={styles.text}>{data.tongDoanhThuPhuCap}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Xăng</Text>
                  <Text style={styles.text}>{data.xang}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Bảo hiểm XH</Text>
                  <Text style={styles.text}>{data.bhxh}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Bảo hiểm Y tế</Text>
                  <Text style={styles.text}>{data.bhyt}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Đoàn phí</Text>
                  <Text style={styles.text}>{data.congDoan}</Text>
                </View>
                <View
                  style={[
                    styles.title,
                    {backgroundColor: theme.colors.TWITTER},
                  ]}>
                  <Text style={styles.text}>Tổng Xăng + BH [2]</Text>
                  <Text style={styles.text}>{data.tongXangBaoHiem}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Hỗ trợ tai nạn</Text>
                  <Text style={styles.text}>{data.httn}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Kinh doanh tiếp thị</Text>
                  <Text style={styles.text}>{data.kdtt}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Rửa xe hút bụi</Text>
                  <Text style={styles.text}>{data.ruaXeHutBui}</Text>
                </View>
                <View
                  style={[
                    styles.title,
                    {backgroundColor: theme.colors.TWITTER},
                  ]}>
                  <Text style={styles.text}>Tổng phí thu hộ [3]</Text>
                  <Text style={styles.text}>{data.tongPhiThuHo}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Nợ bảo hiểm</Text>
                  <Text style={styles.text}>{data.noBaoHiem}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Nợ doanh thu</Text>
                  <Text style={styles.text}>{data.noDoanhThu}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Nợ điện thoại</Text>
                  <Text style={styles.text}>{data.noDienThoai}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Nợ xưởng</Text>
                  <Text style={styles.text}>{data.noXuong}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Nợ tạm ứng</Text>
                  <Text style={styles.text}>{data.noTamUng}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Nợ ký quỹ</Text>
                  <Text style={styles.text}>{data.noKyQuy}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Nợ vi phạm</Text>
                  <Text style={styles.text}>{data.noViPham}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Trả góp điện thoại</Text>
                  <Text style={styles.text}>{data.noTraGopDienThoai}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Nợ cước Wifi</Text>
                  <Text style={styles.text}>{data.noCuocWifi}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Nợ âm lương</Text>
                  <Text style={styles.text}>{data.noAmLuong}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Trừ nợ NĐT(GX,BH,KĐ)</Text>
                  <Text style={styles.text}>{data.noTruNDT}</Text>
                </View>
                <View
                  style={[
                    styles.title,
                    {backgroundColor: theme.colors.TWITTER},
                  ]}>
                  <Text style={styles.text}>Tổng công nợ [4]</Text>
                  <Text style={styles.text}>{data.tongCongNo}</Text>
                </View>

                <View style={styles.title}>
                  <Text style={styles.text}>Thu nhập chịu thuế [1]-[2]</Text>
                  <Text style={styles.text}>{data.thuNhapChiuThue}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Giảm trừ gia cảnh</Text>
                  <Text style={styles.text}>{data.giamTruGiaCanh}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Thuế TNCN</Text>
                  <Text style={styles.text}>{data.thueTNCN}</Text>
                </View>
                <View
                  style={[
                    styles.title,
                    {backgroundColor: theme.colors.TWITTER},
                  ]}>
                  <Text style={styles.text}>Tổng thuế [5]</Text>
                  <Text style={styles.text}>{data.tongThue}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Lương [1]-[2+3+4+5]</Text>
                  <Text style={styles.text}>{data.luongLaiXe}</Text>
                </View>
                <View style={styles.title}>
                  <Text style={styles.text}>Tạm ứng lương kỳ 1</Text>
                  <Text style={styles.text}>{data.tamUngLuongKy1}</Text>
                </View>
                <View
                  style={[
                    styles.title,

                    {backgroundColor: theme.colors.TWITTER},
                  ]}>
                  <Text style={styles.text}>Thực lĩnh</Text>
                  <Text style={styles.text}>{data.tongThucLinh}</Text>
                </View>
              </View>
            )}
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
  headerTitle: {
    color: theme.colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
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
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  menu: {
    color: theme.colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },

  day: {},
});
export default Notification;
