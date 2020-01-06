const { apiUrl } = require('../config.js');

module.exports = {
  install(req, request) {
    req.order = {
      //-------- 订单相关操作 --------
      pay(data) {
        const url = `${apiUrl}/api/goods/order/buy`;
        return request({ url, method: 'POST', data });
      },
      buyAgain(data) {
        const url = `${apiUrl}/api/goods/order/againBuy`;
        return request({ url, method: 'POST', data });
      },
      detail(data) {
        const url = `${apiUrl}/api/goods/order/getOrderNew`;
        return request({ url, method: 'POST', data });
      },
      cancel(data) {
        const url = `${apiUrl}/api/goods/order/cancel`;
        return request({ url, method: 'POST', data });
      },
      delete(data) {
        const url = `${apiUrl}/api/goods/order/del`;
        return request({ url, method: 'POST', data });
      },
      takeDelivery(data) {
        const url = `${apiUrl}/api/goods/order/takeDelivery`;
        return request({ url, method: 'POST', data });
      },
      verifyRefund(data) {
        const url = `${apiUrl}/api/goods/order/getVerifyRefundResultNew`;
        return request({ url, method: 'POST', data });
      },
      viewLogistics(data) {
        const url = `${apiUrl}/api/goods/order/viewLogistics`;
        return request({ url, method: 'POST', data });
      },

      //---------- 结算订单 -------------
      settleInfo(data) {
        const url = `${apiUrl}/api/goods/order/getOrderSettleInfoNew`;
        return request({ url, method: 'POST', data });
      },
      totalPrice(data) {
        const url = `${apiUrl}/api/goods/order/getTotalPriceByCouponNew`;
        return request({ url, method: 'POST', data });
      },
      add(data) {
        const url = `${apiUrl}/api/goods/order/addOrderNew`;
        return request({ url, method: 'POST', data });
      },
      addGp(data) {
        const url = `${apiUrl}/api/goods/order/addGpOrder`;
        return request({ url, method: 'POST', data });
      },

      //--------退款 ----------
      applyRefundInfo(data) {
        const url = `${apiUrl}/api/goods/order/getApplyRefundInfo`;
        return request({ url, method: 'POST', data });
      },
      modifyApply(data) {
        const url = `${apiUrl}/api/goods/order/modifyApplyRefund`;
        return request({ url, method: 'POST', data });
      },
      cancelRefund(data) {
        const url = `${apiUrl}/api/goods/order/cancelRefund`;
        return request({ url, method: 'POST', data });
      },
      refund(data) {
        const url = `${apiUrl}/api/goods/order/refundOrderProduct`;
        return request({ url, method: 'POST', data });
      },
      refundDetail(data) {
        const url = `${apiUrl}/api/goods/order/getRefundDetailInfo`;
        return request({ url, method: 'POST', data });
      },
      expressCompanys() {
        const url = `${apiUrl}/api/goods/order/getExpressCompanys`;
        return request({ url, method: 'POST' });
      },
      refundExpress(data) {
        const url = `${apiUrl}/api/goods/order/refundExpressNew`;
        return request({ url, method: 'POST', data });
      },
      undoApplyRefund(data) {
        const url = `${apiUrl}/api/goods/order/undoApplyRefund`;
        return request({ url, method: 'POST', data });
      },

      //------订单列表---------
      afterSaleList(data) {
        const url = `${apiUrl}/api/goods/order/getAfterSale`;
        return request({ url, method: 'POST', data });
      },
      list(subUrl, data) {
        let url = `${apiUrl}${subUrl}`;

        if (data.currentPage === 1) {
          return request({ url, method: 'POST', data, showLoading: true });
        } else {
          return request({ url, method: 'POST', data });
        }
      }

    };
  },
};