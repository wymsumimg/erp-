let domainsFuc = env => {
  let domain,
    bucket,
    uri = location.host;
  if (uri.includes('test')) {
    domain = 'https://pretest.i31.com/AIR/CRM';
    bucket = '';
  } else {
    domain = 'https://m.balpu.com/AIR/CRM';
    bucket = '';
  }

  

  // domain = 'https://api.moldcube.com/api/'
  // domain='http://192.168.21.222:8058/api/'
  // domain = 'https://data.moldcube.com:8103/api/'; //测试地址
  // domain = 'http://192.168.1.234:8100/api/' //博森

  // domain='https://192.168.21.168:44331/api/'
  // domain = 'https://order.moldcube.com:8100/api' //正式地址
  // domain = 'http://api.moldcube.com/api' //正式地址

  // domain = 'http://192.168.9.201:8100/api/' //冲模
  // 接口放入外部
  domain = window.baseURL

  return {
    domain: domain,
    ossBucket: bucket,
    ossDomain: '',

    ossRegion: ''
  };
};
export default domainsFuc;
