const { apiUrl } = require('../config.js');

module.exports = {
  install(req, request) {
    req.goods = {
      //---------商品列表---------
      greateGoodsList(data) {
        const url = `${apiUrl}/chaomes/api/goods/findGoodsList`;
        return request({ url, method: 'POST', data });
      },
      getGoodsDetails(data){
        const url = `${apiUrl}/chaomes/api/goods/findGoodsDetailById`;
        return request({ url, method: 'POST', data });
      },
      getGoodsSku(data){
        const url = `${apiUrl}/chaomes/api/goods/getSkuByGoodsId`;
        return request({ url, method: 'POST', data });
      }
    };
    
  },
};