const uploadUtil = require('/utils/upload/upload.js')
const req = require('/utils/request/index.js')
const base64 = require('/utils/upload/base64.js')
const addressUtil = require('/utils/address.js')
var mta = require('/utils/mta_analysis.js')

App({
  onLaunch: function (res) {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //网络请求
        req.user.login({
          "code":res.code,
          'referrerOppenId':''
        }).then((res) => {
          this.globalData.openId = res.data
          this.getSetting();
        });
      }
    })



    // wx.getSystemInfo({
    //   success(res) {
    //     wx.setStorageSync('device', res.model);
    //     wx.setStorageSync('sysVersion', res.version);
    //   }
    // })

    // let current = new Date().getTime();
    
    
    // if (wx.canIUse('getUpdateManager')) {
    //   const updateManager = wx.getUpdateManager()
      
    //   updateManager.onCheckForUpdate(function (res) {
    //     // 请求完新版本信息的回调
        
    //     if (res.hasUpdate) {
    //       updateManager.onUpdateReady(function () {
    //         wx.showModal({
    //           title: '更新提示',
    //           content: '新版本已经准备好，是否重启应用？',
    //           success: function (res) {
    //             if (res.confirm) {
    //               // wx.clearStorage();
    //               // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //               updateManager.applyUpdate()
    //             }
    //           }
    //         })
    //       })
    //       updateManager.onUpdateFailed(function () {
    //         // 新的版本下载失败
    //         wx.showModal({
    //           title: '已经有新版本了哟~',
    //           content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
    //         })
    //       })
    //     }
    //   })
    // } else {
    //   // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    //   wx.showModal({
    //     title: '提示',
    //     content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    //   })
    // }
    // this.getOSSConfig();
    // this.getAddress();
    // mta.App.init({
    //   "appID": "wx9e278f44a0e3b1f2"
    // });
    // wx.removeStorage({
    //   key: "orderUrl"
    // });
    // this.updataStatus();
    // this.collectDeviceInfo();
    // 
  },
  getSetting: function(){
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              req.user.reportApiUserInfo({
                "openId":this.globalData.openId,
                'referrerOppenId':'',
                'nickName': res.userInfo.nickName,
                'wechatPhoneNum': '',
                'userHeadImage': res.userInfo.avatarUrl,
                'userBindPhoneNum': ''

              }).then((res) => {

              });


              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  updataStatus: function () {
    let uid = '',
      openId = '',
      unionid = '';
    wx.getStorage({
      key: "uid",
      complete: function (res) {
        if (res.data) {
          uid = res.data
        }
      }
    });

    openId = wx.getStorageSync("openId");
    wx.getStorage({
      key: "unionid",
      complete: function (res) {
        if (res.data) {
          unionid = res.data;
          if (uid && openId && unionid) {
            let obj = {
              'uid': uid,
              'openId': openId,
              'unionid': unionid
            }
            req.user.wxBindStatus(obj).then((res) => {
              if (res.code == '01') {
                if (res.result.status == 3) {
                  wx.clearStorage();
                } else {
                  if (uid != res.result.uid) {
                    // console.info("fadsfd")
                    wx.clearStorage();
                  }
                }
              }
            });
          }

        }
      }
    });

  },
  /**
   * 获取阿里云OSS配置
   */
  getOSSConfig: function () {
      var newConfig = {
        endpoint: '',
        bucketname: '',
        accesskeyid: '',
        accesskeysecret: '',
        url: 'https://'
      }
      this.globalData.OSSConfig = newConfig;
  },
  getAddress: function () {
    
      this.globalData.addressJson = "{}";
       
  },
  //收集设备信息
  // collectDeviceInfo: function() {
  //     let data = {
  //             device_code: 5
  //         }     
  // },
  goHome() {
    wx.switchTab({
      url: "../goods/goods"
    });
  },
  globalData: {
    openId: '',
    userInfo: null,
    OSSConfig: {},
    addressJson: {} //省市区地址
  },
  // onPageShow: function(datracker, router, page) {
  //     //在页面路由变动时，发送页面标题的事件
  //     datracker.track_pageview({ data: page.data.ysf });

  // }
})