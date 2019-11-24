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
    goodsList: [{
        picUrl: '/image/1.jpg',
        name: '中囯香水',
        price: 12,
        subtitle: '這個冬天不怕冷',
        quantity: 1
      }, {
        picUrl: '/image/1.jpg',
        name: '中囯香水',
        price: 12,
        subtitle: '這個冬天不怕冷',
        quantity: 0
      }, {
        picUrl: '/image/1.jpg',
        name: '中囯香水',
        price: 12,
        subtitle: '這個冬天不怕冷',
        quantity: 0
      }, {
        picUrl: '/image/1.jpg',
        name: '中囯香水',
        price: 12,
        subtitle: '這個冬天不怕冷',
        quantity: 0
      }, {
        picUrl: '/image/1.jpg',
        name: '中囯香水',
        price: 12,
        subtitle: '這個冬天不怕冷',
        quantity: 0
      }, {
        picUrl: '/image/1.jpg',
        name: '中囯香水',
        price: 12,
        subtitle: '這個冬天不怕冷',
        quantity: 12
      }, {
        picUrl: '/image/1.jpg',
        name: '中囯香水',
        price: 12,
        subtitle: '這個冬天不怕冷',
        quantity: 12
      },{
        picUrl: '/image/1.jpg',
        name: '中囯香水',
        price: 12,
        subtitle: '這個冬天不怕冷',
        quantity: 12
      }]
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
