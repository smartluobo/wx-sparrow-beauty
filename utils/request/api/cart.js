const { apiUrl } = require('../config.js');

module.exports = {
  install(req, request) {
    req.cart = {
      info(data) {
        const url = `${apiUrl}/api/goods/cart/getCartNew`;
        return request({ url, method: 'POST', data });
      },
      change(data) {
        const url = `${apiUrl}/api/goods/cart/changeNew`;
        return request({ url, method: 'POST', data });
      },
      delete(data) {
        const url = `${apiUrl}/api/goods/cart/del`;
        return request({ url, method: 'POST', data });
      },
      refreshPrice(data) {
        const url = `${apiUrl}/api/goods/cart/changeCartCheckStatus`;
        return request({ url, method: 'POST', data });
      },
      add(data) {
        const url = `${apiUrl}/api/goods/cart/addNew`;
        return request({ url, method: 'POST', data });
      }
    };
  },
};