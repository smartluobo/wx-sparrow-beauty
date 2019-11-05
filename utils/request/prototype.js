const { apiUrl } = require('config.js')

const base64 = require('../upload/base64.js');
let change = false;
const R = {
  use,
};

function use(plugin) {
  return plugin.install(R, requestP);
}

function isHttpSuccess(status) {
  return (status >= 200 && status < 300) || status === 304;
}

//用Promise封装wx.request
function requestP(options = {}) {
  const {
    url,
    data,
    method,
    dataType,
    responseType,
    success,
    fail,
    complete,
    showLoading,
  } = options;

  let uid = '',
    token = '';

  if (wx.getStorageSync('uid')) {
    uid = wx.getStorageSync('uid');
  }

  if (wx.getStorageSync('token')) {
    token = wx.getStorageSync('token');
  }
  let domo_custom = {
    appVersion: '3.2.0',
    device: wx.getStorageSync('device'),
    sysVersion: wx.getStorageSync('sysVersion'),
    timestamp: new Date().getTime(),
    source: 3,
    token: token,
    uid: uid
  };
  domo_custom = JSON.stringify(domo_custom);
  const header = { 'Content-Type': 'application/x-www-form-urlencoded', 'domo-custom': base64.encode(domo_custom) };
  return new Promise((resolve, reject) => {
    if (showLoading) {
      wx.showLoading({
        title: ''
      });
    }
    wx.request({
      url,
      data,
      header,
      method,
      dataType,
      responseType,
      success(r) {
        let current = new Date().getTime();
        let tokenExp = wx.getStorageSync('tokenExp');
        if (!!tokenExp) {
          if (r.data.code == '52') {
            if (change == false) {
              change = true;
              wx.request({
                url: `${apiUrl}/api/my/logOut`,
                method: 'POST',
                header: header,
                success: res => {
                  wx.clearStorage();
                  wx.showModal({
                    title: '提示',
                    content: '登录信息已失效，请重新登录',
                    confirmText: '登录',
                    confirmColor: '#2c93e8',
                    success: res1 => {
                      if (res1.confirm) {
                        wx.navigateTo({
                          url: '/pages/register/register',
                        })
                      }
                    }
                  })
                }
              })
            }

          }

        }
        if (showLoading) {
          wx.hideLoading();
        }
        const isSuccess = isHttpSuccess(r.statusCode);
        if (isSuccess) {
          if (success) {
            success(r.data);
          }
          resolve(r.data);
        } else {
          wx.showToast({
            title: `服务器出错啦~（错误代码：${r.statusCode}）`,
            icon: 'none',
            duration: 1500,
            mask: true
          });
          if (fail) {
            fail({
              msg: `服务器出错啦~（错误代码：${r.statusCode}）`,
              detail: r,
            });
          }
          reject({
            msg: `服务器出错啦~（错误代码：${r.statusCode}）`,
            detail: r,
          });
        }
      },
      fail(err) {
        if (showLoading) {
          wx.hideLoading();
        }
        wx.showToast({
          title: '网络错误',
          icon: 'none',
          duration: 1500,
          mask: true
        });
        if (fail) {
          fail(err);
        }
        reject(err);
      },
      complete,
    });
  });
}

module.exports = R