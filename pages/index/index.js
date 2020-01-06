const req = require('../../utils/request/index.js')
var app = getApp()
Page({
  data: {
    background: ['/image/pink.png', '/image/orange.png', '/image/blue.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    goodsList: []
  },
  onLoad: function (option) {
    let that = this;
    let data = {};
    req.goods.greateGoodsList(data).then((res) => {
      console.log("------------")
      
      if (res.code == 200) {
        let List = res.data;
        for (let i = 0; i < List.length; i++) {
          
        }
        console.log(List)
        that.setData({
          goodsList: List
        });
      }
    });


    
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
