const { apiUrl } = require('../config.js');

module.exports = {
  install(req, request) {
    req.other = {
      
      addressFromServer() {
        const url = `${apiUrl}/api/area/getWebArea`;
        return request({ url, method: 'GET' });
      },
      
      //收集用户设备信息
      // collectDeviceInfo(data) {
      //     const url = `${apiUrl}/api/userbehavioursts/collectWebUserDeviceInfo`;
      //     return request({ url, method: 'POST', data });
      // },
    };
  },
};