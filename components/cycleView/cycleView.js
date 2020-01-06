// Components/cycleView/cycleView.js
const req = require('../../utils/request/index.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    //支持两种类型：1、banner-广告位 2、goods-商品详情
    viewType: {
      type: String,
      value: '',
      observer(newVal, oldVal, changedPath) {
        if (newVal == 'banner') {
          //banner默认长方形
          if (!this.data.viewShape.length) {
            this.setData({ viewShape: 'rectangle' })
          }
        } else if (newVal == 'goods') {
          //goods默认正方形
          if (!this.data.viewShape.length) {
            this.setData({ viewShape: 'square' })
          }
        } else {
          wx.showToast({
            title: 'viewType参数错误',
          })
        }
      }
    },

    //1、square 2、rectangle
    viewShape: {
      type: String,
      value: '',
    },

    //viewType='banner'时必传
    bannerArray: {
      type: Array,
      value: [],
    },

    //viewType='goods'时必传
    picUrls: {
      type: Array,
      value: [],
    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    picTap: function (e) {
      let link = e.currentTarget.dataset.link;
      let id = e.currentTarget.dataset.id;
      console.log(link)
      this.clickCount(id);
      if (link.indexOf("pages/") > 0) {
        wx.navigateTo({
          url: link
        })
      } else {
        wx.navigateTo({
          url: "../webView2/webView2?url=" + link
        })
      }
    },

    clickCount: function (id) {
      var cData = { id: id };
      req.ad.addClickCount(cData).then((res) => { });
    },
  }
})
