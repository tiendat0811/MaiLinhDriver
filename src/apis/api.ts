import React from 'react';
import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://webapi.mailinh.vn:2017',
  timeout: 60000,
  headers: {'Content-Type': 'application/json'},
});

export const layDoanhThuThang = (date: any, msnv: any) => {
  const url = `/api/Revenue?pwsws=B@nCNTT!20I8&usr=${msnv}&dte=${date}&staffcode=123`;
  return instance
    .get(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const layLuongNhanVien = async (date: any, msnv: any) => {
  const url = `/api/salary?pwsws=B@nCNTT!20I8&usr=${msnv}&dte=${date}&staffcode=123`;
  return await instance
    .get(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export const layThongTinNhanVien = (msnv: any) => {
  const url = `/api/infostaff?pwsws=B@nCNTT!20I8&usr=${msnv}`;
  return instance
    .get(url)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};
