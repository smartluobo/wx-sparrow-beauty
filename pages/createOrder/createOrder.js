//logs.js
const util = require("../../utils/util.js");
const req = require('../../utils/request/index.js')
var mta = require('../../utils/mta_analysis.js')
var app = getApp();
Page({
  data: {
    Address: {},
    groupType: 0,
    payStatus: true,
    uuid: util.generateUUID(),
    sourceType: ''
  },
  goHome() {
    wx.switchTab({
      url: "../goods/goods"
    });
  },
  onLoad: function (option) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: "pid",
      complete: function (res) {
        if (res.data) {
          console.info(res.data)
          that.setData({
            pid: res.data
          });
        }
      }
    });
    wx.getStorage({
      key: "uid",
      complete: function (res) {
        if (res.data) {
          that.setData({
            uid: res.data
          });
        } else {
          wx.showToast({
            title: '请先登录',
            icon: "none",
            duration: 2000,
            success: function () {
              wx.removeStorageSync("openId");
              wx.removeStorage({
                key: "uid"
              });
              wx.navigateTo({
                url: "../register/register"
              });
            }
          })
        }
      }
    });
    wx.getStorage({
      key: "unionid",
      complete: function (res) {
        that.setData({
          unionid: res.data
        });
      }
    });
    wx.getStorage({
      key: "addressIds",
      complete: function (res) {
        if (res.data) {
          that.setData({
            addressIds: res.data
          });
          that.getAddress_a();
        } else {
          that.getAddress();
        }
      }
    });
    let openId = wx.getStorageSync('openId');
    if (openId) {
      that.setData({
        openId: openId
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: "none",
        duration: 2000,
        success: function () {
          wx.removeStorageSync("openId");
          wx.removeStorage({
            key: "uid"
          });
          wx.navigateTo({
            url: "../register/register"
          });
        }
      })
    }
    wx.getStorage({
      key: "goods",
      complete: function (res) {
        if (res.data) {
          goods = res.data;
          goods = JSON.parse(goods);
          let gpInfoId, gpRecordId, gpProductId;
          let arr = [];
          goods.forEach(item => {
            let obj = {
              id: item.id,
              count: item.count,
              saleSkuId: item.saleSkuId
            };
            if (item.cartId) {
              obj.cartId = item.cartId
            };
            //开团
            if (item.gpInfoId) {
              gpInfoId = item.gpInfoId,
                gpProductId = item.gpProductId
              that.setData({
                gpInfoId: gpInfoId,
                gpProductId: gpProductId
              });
            };
            //参团
            if (item.gpRecordId) {
              that.setData({
                gpRecordId: item.gpRecordId,
              });
            };
            arr.push(obj)
          });
          that.setData({
            goods: JSON.stringify(arr),
            goodsArr: res.data
          });
        }
      }
    });
    mta.Page.init();
    var app = getApp();
  },
  //首次进来   获取默认收货地址
  getAddress() {
    let uid = this.data.uid;
    let that = this;
    let obj = {
      uid: uid,
      reqId: that.data.uuid
    };
    req.user.defaultAddress(obj).then((res) => {
      if (res.code == '01') {
        let data = res.result;
        that.setData({
          Address: data,
          addressIds: data.id
        });
        that.getGoods();
      } else {
        req.user.addressList(obj).then((res) => {
          if (res.code == "01") {
            let data = res.result[0];
            that.setData({
              Address: data,
              addressIds: data.id
            });
            that.getGoods();
          } else {
            that.getGoods();
          }
        });
      }
    });
  },
  //已选择收货地址
  getAddress_a() {
    let that = this;
    let obj = {
      id: this.data.addressIds,
      reqId: this.data.uuid
    };
    req.user.addressDetail(obj).then((res) => {
      if (res.code == "01") {
        let data = res.result;
        that.setData({
          Address: data,
          addressIds: data.id
        });
        that.getGoods();
      }
    });
  },
  //获取订单结算信息
  getGoods() {
    let that = this;
    let addressIds = this.data.addressIds;
    if (!that.data.addressIds) {
      addressIds = '';
    } else {
      addressIds = that.data.addressIds;
    }
    let uid = that.data.uid;
    let obj = {
      userId: that.data.uid,
      goods: that.data.goods,
      gpRecordId: 0,
      gpInfoId: 0,
      device_type: 1,
      addressId: addressIds,
      version: 'v3.1.5',
      reqId: that.data.uuid
    };
    if (that.data.gpInfoId) {
      obj.gpInfoId = that.data.gpInfoId;
    }
    if (that.data.gpRecordId) {
      obj.gpRecordId = that.data.gpRecordId;
    }
    req.order.settleInfo(obj).then((res) => {
      if (res.code == "01") {
        let CouponTitle = '',
          couponIds = '';
        if (res.result.userCouponInfo) {
          CouponTitle = '满' + res.result.userCouponInfo.start_fee + '减' + res.result.userCouponInfo.amount,
            couponIds = res.result.userCouponInfo.id
        } else {
          CouponTitle = '';
          couponIds = 0
        }
        that.setData({
          order: res.result,
          userName: res.result.realName,
          userIdentity: res.result.idcard,
          priceInfo: res.result.priceInfo,
          userCouponTitle: CouponTitle,
          couponIds: couponIds
        });
        wx.getStorage({
          key: "couponIds",
          complete: function (res) {
            if (res.data) {
              let coupon = res.data;
              let re = coupon.indexOf('&');
              let couponIds = coupon.slice(0, re);
              let couponT = '';
              couponT = coupon.slice(re + 1, coupon.length);
              if (res.data == 'null') {
                couponIds = 0;
                couponT = "不使用优惠劵"
              } else {
                couponIds = couponIds;
                couponT = couponT
              }
              that.setData({
                couponIds: couponIds,
                userCouponTitle: couponT
              });
              that.newPrice();
            } else {
              wx.hideLoading()
            }
          }
        });
      }
    });
  },
  newPrice() {
    let that = this;
    let couponIds = this.data.couponIds;
    var yhData = {
      'userId': this.data.uid,
      'orderList': this.data.goodsArr,
      'newUserCouponId': couponIds,
      'addressId': this.data.addressIds,
      'version': 'v3.1.5',
      reqId: this.data.uuid
    }
    req.order.totalPrice(yhData).then((res) => {
      if (res.code == "01") {
        that.setData({
          priceInfo: res.result,
        });
        wx.hideLoading()
      }
    });
  },

  //用户真实姓名
  userName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  //用户身份证号码
  userIdentity: function (e) {
    this.setData({
      userIdentity: e.detail.value
    })
  },
  //用户留言
  leaveWord: function (e) {
    this.setData({
      leaveWord: e.detail.value
    })
  },

  //选择优惠劵
  goCoupon() {
    if (this.data.order.productIsUsable != 0) {
      let url = "/pages/createOrder/createOrder";
      if (this.data.sourceType != '') {
        url = url + '?sourceType=' + this.data.sourceType + '&sourceId=' + this.data.sourceId;
      }
      wx.setStorageSync('orderUrl', url)
      wx.redirectTo({
        url: '../chooseCoupon/chooseCoupon'
      });
    } else {
      wx.showToast({
        title: '暂无可用优惠劵',
        icon: "none",
      });
    }
  },
  //选择收货地址
  selectAdd() {
    var savePath;
    if (this.data.groupType) { //抽奖团
      savePath = '/pages/createOrder/createOrder?groupType=1';
    } else { //普通团以及普通商品
      savePath = '/pages/createOrder/createOrder';
      if (this.data.sourceType != '') {
        savePath = savePath + '?sourceType=' + this.data.sourceType + '&sourceId=' + this.data.sourceId;
      }
    }
    wx.setStorageSync('orderUrl', savePath)
    if (!this.data.Address) {
      wx.redirectTo({
        url: "../addAddress/addAddress"
      });
    } else {
      wx.redirectTo({
        url: "../address/address?mark=1"
      });
    }
  },
  //提交订单
  creator() {
    console.info(this.data.payStatus)
    if (this.data.payStatus == false) {
      return;
    } else {
      this.setData({
        payStatus: false
      });
    }
    console.info(this.data.payStatus)
    wx.showLoading({
      title: '加载中',
    });
    if (this.data.gpInfoId) {
      this.gpOrder()
    } else {
      this.commonOrder()
    }
  },
  //普通订单
  commonOrder() {
    let couponIds = this.data.couponIds;
    let that = this;
    let uid = that.data.uid;
    if (!that.data.leaveWord) {
      that.data.leaveWord = ''
    };
    if (this.data.order.isOverseasGo) {
      if (!this.data.userName) {
        wx.showToast({
          title: '因国家海关要求，购买跨境商品时需完善实名信息后方可购买。',
          icon: 'none'
        })
        return
      }
      if (!this.data.userIdentity) {
        wx.showToast({
          title: '因国家海关要求，购买跨境商品时需完善实名信息后方可购买。',
          icon: 'none'
        })
        return
      }
    };
    let obj = {
      'goods': that.data.goods,
      'userId': uid,
      'userAddressId': that.data.addressIds, //地址
      'buyType': 'miniprogramJSPay', //支付方式
      'userCouponId': couponIds, //优惠券
      'source': 3,
      'isWeb': false,
      'remark': that.data.leaveWord,
      'openid': this.data.openId,
      'openId': this.data.openId,
      'unionid': this.data.unionid,
      'reqId': this.data.uuid
    };
    //分享人
    if (this.data.pid) {
      obj.shareUser = this.data.pid;
    }
    if (this.data.order.isOverseasGo) {
      obj.idcard = this.data.userIdentity;
      obj.realName = this.data.userName;
      obj.isOverseasGo = true;
    }
    // 统计订单来源
    if (this.data.sourceType != '') {
      obj['sourceType'] = this.data.sourceType;
      obj['sourceId'] = this.data.sourceId;
    }
    req.order.add(obj).then((res) => {
      console.info(res)
      if (res.code == "01") {
        let no = res.result.no;
        wx.requestPayment({
          'timeStamp': res.result.payKey.timeStamp,
          'nonceStr': res.result.payKey.nonceStr,
          'package': res.result.payKey.package,
          'signType': 'MD5',
          'paySign': res.result.payKey.paySign,
          'success': function (res) {
            wx.hideLoading();
            wx.redirectTo({
              url: "../paySuccess/paySuccess?noid=" + no
            });
          },
          'fail': function (res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.hideLoading();
              wx.showToast({
                title: '取消支付',
                icon: 'none',
                complete: function () {
                  wx.redirectTo({
                    url: "../orderList/orderList?m=0"
                  });
                }
              })
            } else {
              wx.hideLoading();
              wx.showToast({
                title: '支付失败,请联系客服小姐姐~',
                icon: 'none',
                complete: function () {
                  wx.redirectTo({
                    url: "../orderList/orderList?m=1"
                  });
                }
              })
            }
          }
        })
      } else {
        wx.hideLoading();
        wx.showToast({
          title: res.result.msg,
          icon: 'none'
        })
      }
    });

  },
  //拼团订单
  gpOrder() {
    console.log('拼团订单')
    let that = this;
    let uid = that.data.uid;
    if (!that.data.leaveWord) {
      that.data.leaveWord = ''
    };
    let gpStatus, gpRecordId;
    if (this.data.gpRecordId) {
      gpStatus = 2;
      gpRecordId = this.data.gpRecordId
    } else {
      gpStatus = 1;
      gpRecordId = 0
    };
    // console.log('地址' + that.data.addressIds);
    let obj = {
      'goods': that.data.goods,
      'userId': uid,
      'userAddressId': that.data.addressIds, //地址
      'buyType': 'miniprogramJSPay', //支付方式
      'source': 3,
      'remark': that.data.leaveWord,
      'openid': this.data.openId,
      'openId': this.data.openId,
      'unionid': this.data.unionid,
      'gpStatus': gpStatus, //拼团状态，1为开团，2为参团
      'gpProductId': this.data.gpProductId,
      'gpInfoId': this.data.gpInfoId,
      'gpRecordId': gpRecordId,
      reqId: this.data.uuid
    };
    console.log('创建订单参数')
    console.log(obj);
    req.order.addGp(obj).then((res) => {
      console.info(res)
      if (res.code == "01") {
        let no = res.result.no;
        wx.requestPayment({
          'timeStamp': res.result.payKey.timeStamp,
          'nonceStr': res.result.payKey.nonceStr,
          'package': res.result.payKey.package,
          'signType': 'MD5',
          'paySign': res.result.payKey.paySign,
          'success': function (res) {
            // console.log('支付success')
            wx.showToast({
              title: '支付成功',
            })
            wx.hideLoading();
            var url;
            if (that.data.groupType) {
              if (gpRecordId) {
                url = "../LotteryGroupJoin/lotteryGroupJoin?gpInfoId=" + that.data.gpInfoId + "&shareUid=" + uid + "&gpRecordId=" + gpRecordId;
              } else { //开团后要通过订单ID获取gpRecordId
                url = "../LotteryGroupJoin/lotteryGroupJoin?gpInfoId=" + that.data.gpInfoId + "&shareUid=" + uid + "&orderId=" + no
              }

            } else {
              url = "../groupSuccess/groupSuccess?no=" + no
            }
            wx.setStorageSync("tempMsg", "");
            setTimeout(function () {
              wx.redirectTo({
                url: url
              });
            }, 1000);
          },
          'fail': function (res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.hideLoading();
              wx.showToast({
                title: '取消支付',
                icon: 'none',
                complete: function () {
                  wx.redirectTo({
                    url: "../myGroup/myGroup"
                  });
                }
              })
            } else {
              wx.hideLoading();
              wx.showToast({
                title: '支付失败,请联系客服小姐姐~',
                icon: 'none',
                complete: function () {
                  wx.redirectTo({
                    url: "../myGroup/myGroup"
                  });
                }
              })
            }
          }
        })
      } else {
        wx.hideLoading();
        wx.showToast({
          title: res.result.msg,
          icon: 'none'
        })
      }
    });
  }
});