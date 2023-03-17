import axios from './config'
import { getType } from '@/utils'
import { TokenKeys } from '@/utils/variable'
import { Message } from 'element-ui';
import Router from '@/router/index'

// 请求拦截
axios.interceptors.request.use((config) => {
  config.headers[TokenKeys.language] = localStorage.getItem('lang');//加语言请求头字符串

  return config
}, (error) => {
  return Promise.reject(error);
});

var ifshow = false;
// var that=this

// 响应拦截
axios.interceptors.response.use((response) => {

  let res = response.data;
  if (getType(res) == 'object') {
    if (res.ReturnCode != 200) {
      // if (localStorage.getItem(TokenKeys.memberToken)) {
      if (res.ReturnCode == 404) {
        if (ifshow == false) {
          // 
          Message.error(res.ErrorMessage);
          ifshow = true;
        }

        window.setTimeout(() => {
          ifshow = false;
        }, 1000);

      }
      if (res.ReturnCode == 201) {

        if (ifshow == false) {
          // 授权失败
          Message.error('输入内容与创建内容重复，请检查重新输入！');
          ifshow = true;
        }

        window.setTimeout(() => {
          ifshow = false;
        }, 1000);
      } else if (res.ReturnCode == 203) {
        // 返回错误提示为空的时候不显示错误提示
        // Message.error(res.ErrorMessage);
      }
      else if (res.ReturnCode == 206) {
        if (ifshow == false) {
          Message.error(res.ErrorMessage);
          // console.log('====================================');
          // console.log(Router);
          // console.log('====================================');
          // Router.go(-1)
          ifshow = true;
        }

        window.setTimeout(() => {
          ifshow = false;
        }, 1000);
      }
      else {
        Message.error(res.ErrorMessage);
      }

    } else {
      // Message.error(res.ErrorMessage);
    }
  }
  return res;
}, (response) => {

  return response;
}, (error) => {
  return Promise.reject(error);
});
export default axios
