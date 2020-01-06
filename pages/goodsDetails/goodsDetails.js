const util = require("../../utils/util.js");
const req = require('../../utils/request/index.js');
const WxParse = require("../../wxParse/wxParse.js");
var app = getApp();
let timesOut;
let startTimer;
let endTimer;
Page({
  data: {
    details: {},
    imgUrls: [],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    indicatorDots: true,
    animationData: {},
    selectVal: [], //已选择sku值
    selectName: [], //已选择skuName值
    isScroll: true,
    showCount: 1,
    propValName: '',
    uid: '',
    ysf: { title: '商品详情' },
    detailsShow: false,
    uuid: util.generateUUID(),
    sourceType: '',
    goodsSkuList:[]

  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
    });
    
  },
  onShow() {
    this.getGoods();
    this.getGoodsSku()
  },

  qykefu() {
    let nickname = wx.getStorageSync('u-nickname');
    let mobile = wx.getStorageSync('u-mobile');
    let avatar = wx.getStorageSync('u-avatar');
    if (this.data.uid && !nickname) {
      this.userInfo(this.data.uid);
    }
    let that = this;
    this.setData({
      nickname: nickname,
      mobile: mobile,
      avatar: avatar
    });
    this.setData({
      ysf: {
        title: '商品详情',
        config: JSON.stringify({
          "uid": that.data.uid + '',
          "data": JSON.stringify([
            { "key": "real_name", "value": that.data.nickname },
            { "key": "mobile_phone", "value": that.data.mobile },
          ])
        })
      }
    });
  },
  userInfo(uid) {
    let that = this;
    req.user.info({
      uid: uid,
      reqId: that.data.uuid
    }).then((res) => {
      console.info(res)
      if (res.code == '01') {
        wx.setStorageSync('u-nickname', res.result.nickname);
        wx.setStorageSync('u-mobile', res.result.mobile);
        wx.setStorageSync('u-avatar', res.result.avatar);
        that.setData({
          nickname: res.result.nickname,
          mobile: res.result.mobile,
          avatar: res.result.avatar
        });
      }
    });
  },

  //商品详情
  getGoods: function () {
    let id = this.data.id;
    let that = this;
    let data = {
      goodsId: id,
    };
    console.log(data)    
    req.goods.getGoodsDetails(data).then((res) => {
      console.log(res.data)
      if (res.code == 200) {
        var data = res.data;
        let itemBody = data.goodsDetailImagesList;
        let temp = '';
        for (let index = 0; index < itemBody.length; index++) {
            temp += '<img   src="' + itemBody[index] + '"/>';
        }
        WxParse.wxParse('itemBody', 'html', temp, this);
        let str = ""
        let promise = ['承诺', '承诺', '承诺', '承诺', '承诺', '承诺', '承诺', '承诺', '承诺', '承诺', '承诺']
        for (let i = 0; i < promise.length; i++) {
          str += promise[i];
        }
        WxParse.wxParse("service_promise", "html", str, this);
        that.setData({
          imgUrls: data.goodsCarouselImageList,
          details: data,
        });
      }
    });
      
    
  },
  getGoodsSku: function () {
    let id = this.data.id;
    let that = this;
    let data = {
      goodsId: id,
    };
    req.goods.getGoodsSku(data).then((res) => {
      console.log(res.data)
      if (res.code == 200) {
        that.setData({
          goodsSkuList: res.data
        });
      }
    });


  },
  Intergral: function () {
    wx.showToast({
      title: this.data.details.integralTip,
      icon: "none",
      duration: 2000
    });
  },
  noway: function () {
    wx.showToast({
      title: "该商品不支持使用优惠券！",
      icon: "none",
      duration: 2000
    });
  },
  
  
  //添加购物车
  _addCart: function (e) {
    //0正常 1非正常
    if (e.currentTarget.dataset.status == 1) {
      return;
    }
    if (true) { //单个sku
      this.setData({
        skuId: 'sd',
        quantity: 12
      })
      this.addCart();
    } else {
      this.showModal()
    }
  },
  //立即购买
  _promptly: function (e) {
    //0正常 1非正常
    if (e.currentTarget.dataset.status == 1) {
      return;
    }
    if (true) { //单个sku
      this.setData({
        skuId: 'asd',
        quantity: 12
      })
      this.shopNow();
    } else {
      this.showModal()
    }
  },
  //显示对话框
  showModal: function () {
    console.log("aaa")
    let imgArr = [];
    console.log(this.data.details.goodsCarouselImageList)
    this.setData({
      skuImg: this.data.details.goodsPoster
    });
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      isScroll: false
    });
    setTimeout(
      function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export()
        });
      }.bind(this),
      200
    );
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export(),
      isScroll: true
    });
    setTimeout(
      function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        });
      }.bind(this),
      200
    );
  },
  //选择sku
  selectProp: function (e) {
    let that = this;
    console.log(e.currentTarget.dataset)
    var skuid = e.currentTarget.dataset.propId;
    let skuname = e.currentTarget.dataset.propName; 
    let list = this.data.goodsSkuList
    this.setData({
      goodsSkuList: list,
    });
    
    
  },
  //加入购物车
  addCart: function () {
    if (this.data.uid) {
      let skuId = this.data.goodsSkuList;
      let quantity = this.data.quantity;
      if (!skuId) {
        wx.showToast({
          title: "请先选择商品属性！",
          icon: "none",
          duration: 2000 //持续的时间
        });
      } else if (quantity < 1) {
        wx.showToast({
          title: "该属性暂时缺货！",
          icon: "none",
          duration: 2000 //持续的时间
        });
      } else {
        let data = {
          userId: this.data.uid,
          productId: this.data.id,
          saleSkuId: skuId,
          count: this.data.showCount,
          price: this.data.skuPrice,
          reqId: this.data.uuid
        };
        if (this.data.sourceType != '') {
          data['sourceType'] = this.data.sourceType;
          data['sourceId'] = this.data.sourceId;
        }
        if (this.data.activityCode) {
          data.activityCode = this.data.activityCode;
        }
        this.addcartNow(data);
      }
    } else {
      wx.navigateTo({
        url: "../register/register"
      });
    }
  },
  //加入购物车接口
  addcartNow: function (obj) {
    //商品服务承诺
    let that = this;
    req.cart.add(obj).then((res) => {
      if (res.code == "01") {
        wx.showToast({
          title: "成功加入购物车",
          icon: "none",
          duration: 2000 //持续的时间
        });
        that.hideModal();
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 2000 //持续的时间
        });
      }
    });
  },
  //立即购买
  shopNow: function () {
    //验证是否登录
    if (true) {
      let skulist = this.data.goodsSkuList;
      let isNoSelectedSku = false
      let quantity = this.data.showCount;
      console.log(quantity)
      if (quantity < 1) {
        wx.showToast({
          title: "该属性暂时缺货！",
          icon: "none",
          duration: 2000 //持续的时间
        });
      } else if (isNoSelectedSku) {
        wx.showToast({
          title: "请先选择商品属性",
          icon: "none",
          duration: 2000 //持续的时间
        });
      } else {
        let data = {
          "id": this.data.id,
          "saleSkuId": ['1'],
          "count": quantity
        };
        wx.setStorage({
          key: "goods",
          data: JSON.stringify(data)
        });
        wx.redirectTo({
          url: "../createOrder/createOrder"
        });
      }
    } else {
      wx.navigateTo({
        url: "../index/index"
      });
    }
  },
  //数量减
  subCount: function () {
    let count = this.data.showCount;
    if (count > 1) {
      count--;
    }
    this.setData({
      showCount: count
    });
  },
  //数量加
  addCount: function () {
    let count = this.data.showCount;
    count++;
    this.setData({
      showCount: count
    });
  },
  
  goHome() {
    wx.switchTab({
      url: "../index/index"
    });
  },
  
  //购物车
  goCart() {
    let that = this;
    if (this.data.uid) {
      wx.navigateTo({
        url: '../cart/cart'
      })
    } else {
      wx.redirectTo({
        url: "../register/register"
      });
    }
  },
  //活动专区
  goActivity: function () {
    wx.navigateTo({
      url: "../activitySpecial/activitySpecial?id=" + this.data.details.activityCode
    });
  },
  goLabelActivity(e) {
    wx.navigateTo({
      url: "../tagActivity/tagActivity?id=" + e.currentTarget.dataset.id
    });
  },
  getCoupon: function (e) {
    if (!this.data.uid) {
      wx.navigateTo({
        url: "../register/register"
      });
      return;
    }
    let obj = {
      couponId: e.currentTarget.dataset.id,
      userId: this.data.uid,
      reqId: this.data.uuid
    };
    req.coupon.take(obj).then((res) => {
      if (res.code == "01") {
        wx.showToast({
          title: "领取成功",
          icon: "none",
        });
      } else {
        wx.showToast({
          title: res.msg,
          icon: "none",
        });
      }
    });
  },
  onShareAppMessage(options) {
    let data = {
      shareType: 1,
      objId: this.data.id,
      road: 'wechatFriend',
      objName: this.data.details.name,
      status: 1,
      reqId: this.data.uuid
    }
    req.share.shareRecord(data).then(res => {
      console.log(res)
    })
    return {
      title: '【多妈推荐好物】' + this.data.details.name,
      path: 'pages/goodsDetails/goodsDetails?id=' + this.data.id,
      imageUrl: this.data.imgUrls[0],
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: "none",
        });
      }
    };
  },
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  imgsku: function (e) {
    var src = e.currentTarget.dataset.src;
    var imgList = e.currentTarget.dataset.list;
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  //商品详情里面的链接跳转
  wxParseTagATap: function (e) {
    let wxLink = util.linkConvert(e.currentTarget.dataset.src)
    wx.navigateTo({
      url: wxLink
    });
  },
  scroll(e) {
    this.setData({
      top: e.detail.scrollTop
    })
  },
  goTop() {
    this.setData({
      scrollTop: 0
    })
  },
  //页面被卸载时被执行
  onUnload: function () {
    clearInterval(timesOut);
    clearInterval(startTimer);
    clearInterval(endTimer);
  },
});