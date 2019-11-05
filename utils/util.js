const { apiUrl } = require('/request/config.js');
const req = require('./request/index.js')
const shareImgUrl = 'http://image.domolife.cn/wechatIcon/shareimg.jpg'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function groupListEnd(param) {
  var day = parseInt(param / (24 * 60 * 60));
  var h = parseInt(param / (60 * 60) % 24);
  var m = parseInt(param / 60 % 60);
  var s = parseInt(param % 60);
  var time;
  if (day > 0) {
    time = '距结束' + day + '天' + p(h) + ':' + p(m) + ':' + p(s);
  } else if (day <= 0) {
    if (h > 0) {
      time = '距结束' + p(h) + ':' + p(m) + ':' + p(s);
    } else if (h <= 0) {
      if (m > 0) {
        time = '距结束' + p(m) + ':' + p(s);
      } else if (m <= 0) {
        if (s > 0) {
          time = '距结束' + p(s);
        } else if (s <= 0) {
          time = '活动已结束';
        }
      }
    }
  }
  return time;
}

function groupListEndS(param) {
  var day = parseInt(param / (24 * 60 * 60));
  var h = parseInt(param / (60 * 60) % 24);
  var m = parseInt(param / 60 % 60);
  var s = parseInt(param % 60);
  var time;
  if (day > 0) {
    time = '距结束<span>' + day + '</span>天<span>' + p(h) + '</span>:<span>' + p(m) + '</span>:<span>' + p(s) + '</span>';
  } else if (day <= 0) {
    if (h > 0) {
      time = '距结束<span>' + p(h) + '</span>:<span>' + p(m) + '</span>:<span>' + p(s) + '</span>';
    } else if (h <= 0) {
      if (m > 0) {
        time = '距结束<span>' + p(m) + '</span>:<span>' + p(s) + '</span>';
      } else if (m <= 0) {
        if (s > 0) {
          time = '距结束<span>' + p(s) + '</span>';
        } else if (s <= 0) {
          time = '活动已结束';
        }
      }
    }
  }
  return time;
}

function groupListStart(param) {
  var day = parseInt(param / (24 * 60 * 60));
  var h = parseInt(param / (60 * 60) % 24);
  var m = parseInt(param / 60 % 60);
  var s = parseInt(param % 60);
  var time;
  if (day > 0) {
    time = '距开始' + day + '天' + p(h) + ':' + p(m) + ':' + p(s);
  } else if (day <= 0) {
    if (h > 0) {
      time = '距开始' + p(h) + ':' + p(m) + ':' + p(s);
    } else if (h <= 0) {
      if (m > 0) {
        time = '距开始' + p(m) + ':' + p(s);
      } else if (m <= 0) {
        if (s > 0) {
          time = '距开始' + p(s);
        } else if (s <= 0) {
          time = '活动已开始';
        }
      }
    }
  }
  return time;
}

function groupListStartS(param) {
  var day = parseInt(param / (24 * 60 * 60));
  var h = parseInt(param / (60 * 60) % 24);
  var m = parseInt(param / 60 % 60);
  var s = parseInt(param % 60);
  var time;
  if (day > 0) {
    time = '距开始<span>' + day + '</span>天<span>' + p(h) + '</span>:<span>' + p(m) + '</span>:<span>' + p(s) + '</span>';
  } else if (day <= 0) {
    if (h > 0) {
      time = '距开始<span>' + p(h) + '</span>:<span>' + p(m) + '</span>:<span>' + p(s) + '</span>';
    } else if (h <= 0) {
      if (m > 0) {
        time = '距开始<span>' + p(m) + '</span>:<span>' + p(s) + '</span>';
      } else if (m <= 0) {
        if (s > 0) {
          time = '距开始<span>' + p(s) + '</span>';
        } else if (s <= 0) {
          time = '活动已开始';
        }
      }
    }
  }
  return time;
}

function serverTime2TimeStamp(timeStr) {
  var date = timeStr.substring(0, 19);
  date = date.replace(/-/g, '/');
  var timestamp = new Date(date).getTime();
  return timestamp;
}

function getUrlParam(r, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = r.match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null;
}

function shareEnd(param) {
  var day = parseInt(param / (24 * 60 * 60));
  var h = parseInt(param / (60 * 60) % 24);
  var m = parseInt(param / 60 % 60);
  var s = parseInt(param % 60);
  var time;
  if (day > 0) {
    time = '<span class="gt_cant_t_text">剩余</span><span class="gt_cant_t_time">' + day + '</span><span class="gt_cant_t_text">天</span><span class="gt_cant_t_time">' + p(h) + '</span><span class="gt_cant_t_text">:</span><span class="gt_cant_t_time">' + p(m) + '</span><span class="gt_cant_t_text">:</span><span class="gt_cant_t_time">' + p(s) + '</span>';
  } else if (day <= 0) {
    if (h > 0) {
      time = '<span class="gt_cant_t_text">剩余</span><span class="gt_cant_t_time">' + p(h) + '</span><span class="gt_cant_t_text">:</span><span class="gt_cant_t_time">' + p(m) + '</span><span class="gt_cant_t_text">:</span><span class="gt_cant_t_time">' + p(s) + '</span>';
    } else if (h <= 0) {
      if (m > 0) {
        time = '<span class="gt_cant_t_text">剩余</span><span class="gt_cant_t_time">' + p(m) + '</span><span class="gt_cant_t_text">:</span><span class="gt_cant_t_time">' + p(s) + '</span>';
      } else if (m <= 0) {
        if (s > 0) {
          time = '<span class="gt_cant_t_text">剩余</span><span class="gt_cant_t_time">' + p(s) + '</span>';
        } else if (s <= 0) {
          time = '活动已结束';
        }
      }
    }
  }
  return time;
}

function p(n) {
  if (n < 10) {
    return "0" + n;
  }
  return n;
}


function slideUp() {
  var animation = wx.createAnimation({
    duration: 300
  });
  this.setData({
    maskDisplay: 'block'
  });
  animation.translateX('-100%').step();
  this.setData({
    slideAnimation: animation.export()
  });
}

function slideDown() {
  var animation = wx.createAnimation({
    duration: 300
  });
  animation.translateX('100%').step();
  this.setData({
    slideAnimation: animation.export()
  });
  this.setData({
    maskDisplay: 'none'
  });
}

function articlePrase(dpt) {
  let t = '';
  for (let i = 0; i < dpt.length; i++) {
    if (dpt[i].type == 'text') {
      t += '<div class="topic_text">' + dpt[i].content + '</div>';
    } else if (dpt[i].type == 'coupon') {
      t += '<div class="topic_coupon" data-val="' + dpt[i].content.id + '"><img src="' + dpt[i].content.picUrl + '" /></div>';
    } else if (dpt[i].type == 'goods') {
      if (!dpt[i].content.picUrl) {
        dpt[i].content.picUrl = '../../images/logo.png';
      }
      t += '<a class="topic_goods" href="https://www.domolife.cn/m/template/common/proprietary.html?id=' + dpt[i].content.id + '">' +
        '<div class="topic_img">' +
        '<img src="' + dpt[i].content.picUrl + '?x-oss-process=image/resize,w_200/" />' +
        '</div>' +
        '<div class="topic_name">' + dpt[i].content.name + '</div>' +
        '<div class="topic_price">￥' + dpt[i].content.price + '</div>' +
        '</a>';
    } else if (dpt[i].type == 'pictureGoods') {
      t += '<a class="topic_imggoods" href="https://www.domolife.cn/m/template/common/proprietary.html?id=' + dpt[i].id + '"><img src="' + dpt[i].picUrl + '?x-oss-process=image/resize,w_600/" /></a>';
    } else if (dpt[i].type == 'pictureGoodsX2') {
      let goodsList = dpt[i].goodsList;
      let temp = '';
      for (let j = 0; j < goodsList.length; j++) {
        temp += '<a href="href="https://www.domolife.cn/m/template/common/proprietary.html?id=' + goodsList[j].id + '""> <img src="' + goodsList[j].picUrl + '?x-oss-process=image/resize,w_600/" /></a>'
      }
      t += '<div class="pictureGoodsX2">' + temp + '</div>';
    } else if (dpt[i].type == 'pictureGoodsX3') {
      let goodsList = dpt[i].goodsList;
      let temp = '';
      for (let j = 0; j < goodsList.length; j++) {
        temp += '<a href="href="https://www.domolife.cn/m/template/common/proprietary.html?id=' + goodsList[j].id + '""><img src="' + goodsList[j].picUrl + '?x-oss-process=image/resize,w_200/" /></a>'
      }
      t += '<div class="pictureGoodsX3">' + temp + '</div>';
    } else if (dpt[i].type == 'goodsX3') {
      let goodsList = dpt[i].goodsList;
      let temp = '';
      for (let j = 0; j < goodsList.length; j++) {
        temp += '<a class="goodsX3" href="https://www.domolife.cn/m/template/common/proprietary.html?id=' + goodsList[j].id + '" ><img src="' + goodsList[j].picUrl + '?x-oss-process=image/resize,w_200/" />' +
          '<div class="goodsX3Txt"><div class="goodsX3Title">' + goodsList[j].title + '</div>' +
          '<div class="goodsX3Money">￥' + goodsList[j].price + '</div>' +
          '<div class="goodsX3Money_s">￥' + goodsList[j].marketPrice + '</div>' +
          '</div></a>'
      }
      t += '<div class="goodsX3Box">' + temp + '</div>';
    } else if (dpt[i].type == 'goodsX2') {
      var goodsList = dpt[i].goodsList;
      var temp = '';
      for (let j = 0; j < goodsList.length; j++) {
        temp += '<a class="goodsX2" href="https://www.domolife.cn/m/template/common/proprietary.html?id=' + goodsList[j].id + '"><img src="' + goodsList[j].picUrl + '?x-oss-process=image/resize,w_200/" />' +
          '<div class="goodsX2Txt"><div class="goodsX2Title">' + goodsList[j].title + '</div>' +
          '<div class="goodsX2Money">￥' + goodsList[j].price + '</div>' +
          '<div class="goodsX2Money_s">￥' + goodsList[j].marketPrice + '</div>' + '</div></a>'
      }
      t += '<div class="goodsX2Box">' + temp + '</div>';
    }
  }
  return t;
}

function scene(data, type) {
  let scene = data;
  scene = decodeURIComponent(scene)
  var idstr = scene.split('&');
  var id = idstr[0];
  var pid = idstr[1];
  // console.info(pid)
  id = id.substring(id.indexOf('=') + 1);
  if (pid) {
    pid = pid.substring(pid.indexOf('=') + 1);
  }
  if (type == 'id') {
    return id
  } else if (type == 'pid') {
    return pid
  }
}

function replaceId(id) {
  let obj = {
    short_id: id
  }
  req.goods.pid(obj).then((res) => {
    if (res.code == "01") {
      wx.setStorage({
        key: "pid",
        data: res.result.pid
      });
    }
  });
}

function linkConvert(webLink) {
  //后台配置h5链接，有原生小程序的跳转小程序内部界面
  let id = webLink.match(/id=(\S*)/)[1];
  let wxLink = '';
  if (webLink.indexOf("common/proprietary") > 0 || webLink.indexOf("ProductDetails") > 0) { //自营商品详情
    wxLink = '/pages/goodsDetails/goodsDetails?id=' + id;
  } else if (webLink.indexOf("/goods/CustomZone") > 0) { //自定义专区
    wxLink = '/pages/handpick/handpick?id=' + id;
  } else if (webLink.indexOf("/common/taoBaoGoods") > 0) { //淘宝商品详情
    wxLink = '/pages/taoBaoGoods/taoBaoGoods?id=' + id;
  } else if (webLink.indexOf("/goods/new_exclusive") > 0) { //新人专区
    wxLink = '/pages/new_exclusive/new_exclusive';
  } else if (webLink.indexOf("goods/must_buy") > 0) { //必买清单
    wxLink = '/pages/must_buy/must_buy';
  } else if (webLink.indexOf("share_template/group") > 0) { //拼团列表
    wxLink = '/pages/group/group';
  } else if (webLink.indexOf("share_template/groupDetail") > 0) { //开团详情页面
    wxLink = '/pages/groupDetails/groupDetails?id=' + id;
  } else if (webLink.indexOf("/limit_time_template/brand") > 0) { //品牌团详情页
    wxLink = '/pages/brand/brand?id=' + id;
  } else if (webLink.indexOf('html') < 0) {
    wxLink = webLink
  } else {
    wxLink = '/pages/webView2/webView2?url=' + webLink;
  }
  return wxLink;
}
//获取uuid
function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
}


module.exports = {
  formatTime: formatTime, //时间日期标准化
  groupListEnd: groupListEnd,
  groupListEndS: groupListEndS, //区别有些页面展示的时候需要数字标红,加了span标签标红
  groupListStart: groupListStart,
  groupListStartS: groupListStartS, //区别有些页面展示的时候需要数字标红,加了span标签标红
  getUrlParam: getUrlParam,
  shareEnd: shareEnd, // 分享 开团剩余计时
  serverTime2TimeStamp: serverTime2TimeStamp, //标准时间字符串转时间戳 
  slideDown: slideDown, //侧栏展开
  slideUp: slideUp, //侧栏展开
  articlePrase: articlePrase, //解析我们后台编辑器里面可以插入的文本
  scene: scene, //解析后台返回的scene
  replaceId: replaceId, //转换长的pid
  linkConvert: linkConvert, //链接转换
  generateUUID: generateUUID,//获取uuid
  shareImgUrl: shareImgUrl
}