const util = require('../util.js')
const req = require('../request/index.js')
require('/hmac.js');
require('/sha1.js');
const Crypto = require('/crypto.js');
const Base64 = require('/base64.js');

var successCount, allCount; //用来记录批量上传图片完成情况

var config = {

}



/**
 * 批量上传图片
 * config: OSS配置，App.js中的globalData.OSSConfig
 * fileArray: 待上传图片的本地路径数组
 * callback: 成功回调（返回网络路径，string类型，用“,”拼接）
 */
function uploadFiles(config, fileArray, success) {
  successCount = 0;
  allCount = fileArray.length;
  var picWebUrlArr = [];
  for (var i = 0; i < fileArray.length; i++) {
    var filePath = fileArray[i];
    this.uploadFile(config, filePath, (picWebUrl) => {
      successCount++;
      picWebUrlArr.push(picWebUrl);
      if (successCount >= allCount) {
        var urls = picWebUrlArr.toString();

        success(urls);
      }
    }, (res) => {
      //TODO: 失败回调未考虑
      wx.showToast({
        title: res.errMsg,
        icon: 'none'
      })
    })
  }

}

/**
 * 上传单张图片
 */
const uploadFile = function (config, filePath, successc, failc) {
  if (!filePath || filePath.length < 1) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  }

  console.log('上传图片…');

  //处理文件名称
  var fileName = filePath.replace('wxfile://', '').replace('http://', '').replace('tmp/', '');
  const aliyunFileKey = fileName;

  const aliyunServerURL = config.url;//OSS地址
  const accessid = config.accesskeyid;

  const policyBase64 = getPolicyBase64();
  const signature = getSignature(policyBase64, config.accesskeysecret);//获取签名

  // console.log('aliyunFileKey=', aliyunFileKey);
  // console.log('aliyunServerURL', aliyunServerURL);
  wx.uploadFile({
    url: aliyunServerURL,
    filePath: filePath,
    name: 'file',//必须填file
    formData: {
      'key': aliyunFileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200',
    },
    success: function (res) {
      if (res.statusCode != 200) {
        failc(res)
        return;
      }
      console.log('上传图片成功', res)
      var fullUrl = config.url + '/' + aliyunFileKey;
      successc(fullUrl);
    },
    fail: function (err) {
      err.wxaddinfo = aliyunServerURL;
      failc(err);
    },
  })
}

const getPolicyBase64 = function () {
  let date = new Date();
  date.setHours(date.getHours() + 87600);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
      ["content-length-range", 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ]
  };

  const policyBase64 = Base64.encode(JSON.stringify(policyText));
  return policyBase64;
}

const getSignature = function (policyBase64, accesskeySecret) {

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskeySecret, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);

  return signature;
}

module.exports = {
  uploadFile: uploadFile,
  uploadFiles: uploadFiles
}


