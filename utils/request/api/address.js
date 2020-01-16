const { apiUrl } = require('../config.js');

module.exports = {
  install(req, request) {
    req.address = {
      //创建地址
      create(data){
        const url = `${apiUrl}/chaomes/api/address/create`;
        return request({ url, method: 'POST', data });
      },
      //获取地址列表
      findList(data){
        const url = `${apiUrl}/chaomes/api/address/findList`;
        return request({ url, method: 'GET', data });
      },
      //删除地址
      delete(data){
        const url = `${apiUrl}/chaomes/api/address/delete`;
        return request({ url, method: 'GET', data });
      },
      //修改地址
      update(data){
        const url = `${apiUrl}/chaomes/api/address/update`;
        return request({ url, method: 'POST', data });
      },
    };
  },
};