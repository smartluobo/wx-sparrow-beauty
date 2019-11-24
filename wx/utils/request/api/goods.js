const { apiUrl } = require('../config.js');

module.exports = {
  install(req, request) {
    req.goods = {
      //---------商品列表---------
      greateGoodsList(data) {
        const url = `${apiUrl}/api/goods/greate/getGreateGoodList`;
        return request({ url, method: 'POST', data });
      },
      hotSale(data) {
        const url = `${apiUrl}/api/goods/hot/sale/getHotGoods`;
        return request({ url, method: 'POST', data });
      },
      activity(data) {
        const url = `${apiUrl}/api/goods/activity/getDiscountActivityGoods`;
        return request({ url, method: 'POST', data });
      },
      newUser(data) { //新人专区商品
        const url = `${apiUrl}/api/goods/newuser/getGoods`;
        return request({ url, method: 'POST', data });
      },
      coupon() { //优惠券商品
        const url = `${apiUrl}/api/goods/coupon/getCouponGoodsList`;
        return request({ url, method: 'POST' });
      },
      listByLabel(data) {
        const url = `${apiUrl}/api/goods/getProductListByLabelId`;
        return request({ url, method: 'POST', data });
      },
      customZone(data) {
        const url = `${apiUrl}/api/goods/greate/getZoneProductList`;
        return request({ url, method: 'POST', data });
      },

      //新品专区
      newReleaseTimes() {
        const url = `${apiUrl}/api/goods/new/release/getNewReleaseTimes`;
        return request({ url, method: 'POST' });
      },
      newReleaseGoods(data) {
        const url = `${apiUrl}/api/goods/new/release/getNewReleaseGoods`;
        return request({ url, method: 'POST', data });
      },

      //每周优选
      weekGoods(data) {
        const url = `${apiUrl}/api/goods/weeklypreferred/getGoods`;
        return request({ url, method: 'POST', data });
      },
      weekZone(data) {
        const url = `${apiUrl}/api/goods/weeklypreferred/getZone`;
        return request({ url, method: 'POST', data });
      },
      //福利社推荐商品
      welfareRecommend(data) {
        const url = `${apiUrl}/api/hot/welfare/getTopicGoodsPush`;
        return request({ url, method: 'POST', data });
      },
      //福利社专区列表
      welfareZoneList() {
        const url = `${apiUrl}/api/hot/welfare/getOverdueTopics`;
        return request({ url, method: 'POST' });
      },
      //福利社专区
      welfareZone(data) {
        const url = `${apiUrl}/api/hot/welfare/getTopics`;
        return request({ url, method: 'POST', data });
      },
      //福利社专题
      topic(data) {
        const url = `${apiUrl}/api/hot/welfare/getNewTopic`;
        return request({ url, method: 'POST', data });
      },
      //必买清单
      mustbuy(data) {
        const url = `${apiUrl}/api/goods/mustbuy/getZone`;
        return request({ url, method: 'POST', data });
      },
      //历史清单列表
      mustbuyList() {
        const url = `${apiUrl}/api/goods/mustbuy/getoverdueZone`;
        return request({ url, method: 'GET' });
      },
      //必买清单商品列表
      mustbuyGoods(data) {
        const url = `${apiUrl}/api/goods/mustbuy/newGetGoods`;
        return request({ url, method: 'POST', data });
      },
      //----------自营商品详情---------
      evaluateList(data) {
        const url = `${apiUrl}/api/goods/getEvaluate`;
        return request({ url, method: 'POST', data });
      },
      //历史清单专题
      overdueZone(data) {
        const url = `${apiUrl}/api/goods/mustbuy/getZonebyId`;
        return request({ url, method: 'POST', data });
      },
      detail(data) {
        const url = `${apiUrl}/api/goods/getGoods`;
        return request({ url, method: 'POST', data });
      },
      pid(data) {
        const url = `${apiUrl}/api/goods/getMerhcantPidById`;
        return request({ url, method: 'POST', data });
      },
      promise(data) {
        const url = `${apiUrl}/api/goods/order/getProductPromise`;
        return request({ url, method: 'POST', data });
      },

      //--------推荐商品--------
      cartRecommend(data) {
        const url = `${apiUrl}/api/goods/cart/shopFullCartRecommend`;
        return request({ url, method: 'POST', data });
      },
      emptyCartRecommend(data) {
        const url = `${apiUrl}/api/goods/cart/shopEmptyCartRecommend`;
        return request({ url, method: 'POST', data });
      },
      paySuccessRecommend(data) {
        const url = `${apiUrl}/api/goods/paySuccessProductRecomment`;
        return request({ url, method: 'POST', data });
      },
      collect(data) {
        const url = `${apiUrl}/api/home/addGoodsCollect`;
        return request({ url, method: 'POST', data });
      },

    };
  },
};