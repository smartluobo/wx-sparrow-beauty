//logs.js
const util = require('../../utils/util.js')
const req = require('../../utils/request/index.js')
var mta = require('../../utils/mta_analysis.js')

var app = getApp()
Page({
  data: {
    uuid: util.generateUUID()
  },
  onLoad: function () {
    let that = this;
    mta.Page.init()
  },

  bindGetUserInfo: function (e) {
    wx.showLoading({
      title: '请求中',
    })
    console.log(e)
    let that = this;
    wx.checkSession({
      success: function (res) {
        console.info(res)
        let openId = wx.getStorageSync('openId');
        if (openId) {
          // var storageOpenId = res.data
          if (openId != '' && openId != null) {
            let obj = {
              rawData: e.detail.rawData,
              signature: e.detail.signature,
              openid: openId,
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv
            };
            that.getUserInfo(e, obj);
          }
        } else {
          that.userLogin(e)
        }
      },
      fail: function (res) {
        that.userLogin(e)
      }
    })
  },
  //授权登录接口
  userLogin(e) {
    let that = this;
    wx.login({
      success: res => {
        var code = res.code;
        req.user.loginInfo({
          jscode: code,
          reqId: that.data.uuid
        }).then((res) => {
          let openid = res.info.openId
          // console.log("openid==" + openid)
          let obj = {
            rawData: e.detail.rawData,
            signature: e.detail.signature,
            openid: openid,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            reqId: that.data.uuid
          };
          that.getUserInfo(e, obj);
        });
      }
    })
  },
  //换取我们后台的用户登录信息
  getUserInfo(e, obj) {
    let that = this;
    req.user.oauthUserInfo(obj).then((res) => {
      if (res.code == '01') {
        let loginData = {
          openid: res.userInfo.openId,
          unionid: res.userInfo.unionId,
          rawData: e.detail.rawData,
          signature: e.detail.signature,
          reqId: that.data.uuid
        };
        req.user.syncLogin(loginData).then((res) => {
          if (res.code == '01') {
            let current = new Date().getTime(),
              tokenExp = current + res.result.tokenExpireSeconds * 1000;
            console.info(res)
            wx.setStorage({
              key: "unionid",
              data: res.result.unionid
            });
            wx.setStorageSync('openId', res.result.openid);
            wx.setStorageSync('token', res.result.token);
            wx.setStorageSync('tokenExp', tokenExp);
            wx.setStorage({
              key: "uid",
              data: res.result.uid,
              success: function () {
                wx.navigateBack({
                  delta: 1
                })

              }
            });
          } else {
            wx.hideLoading();
            wx.removeStorageSync("openId");
            wx.showToast({
              title: '请求失败，请重试~',
              icon: "none",
            });
          }
        });
      } else {
        wx.hideLoading();
        wx.removeStorageSync("openId");
        wx.showToast({
          title: '请求失败，请重试~',
          icon: "none",
        });
      }
    });
  },
})