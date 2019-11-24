const { apiUrl } = require('../config.js');

module.exports = {
  install(req, request) {
    req.coupon = {
      take(data) {
        const url = `${apiUrl}/api/my/coupon/receiveCoupon`;
        return request({ url, method: 'POST', data });
      },
      choose(data) {
        const url = `${apiUrl}/api/my/coupon/choiceSelfCouponV2`;
        return request({ url, method: 'POST', data });
      },
      goodsList(data) {
        const url = `${apiUrl}/api/my/coupon/getCouponAvailableProductList`;
        return request({ url, method: 'POST', data });
      },
      takeByNewUser(data) {
        const url = `${apiUrl}/api/goods/newuser/getCouponByNewUser`;
        return request({ url, method: 'POST', data });
      },
      list(data) {
        const url = `${apiUrl}/api/my/coupon/getNewMyCouponList`;
        return request({ url, method: 'GET', data });
      },

    };
  },
};