
//login.js

const req = require('../../utils/request/index.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    addressList: []
  },

  onLoad: function () {
   this.findList();
  },
  findList: function(){
    req.address.findList({openId: app.globalData.openId}).then((res)=>{
      this.setData({
        addressList: res.data
      })
    })
  },
  addressAdd: function(){
    wx.redirectTo({
      url: '../addressAdd/addressAdd'
    })
  },
  addressDelete: function(e){
    let curItem = this.data.addressList[e.currentTarget.dataset.index];
    let _this = this;
    wx.showModal({
      content: '确定删除该地址？',
      success (res) {
        if (res.confirm) {
          req.address.delete({
            addressId: curItem.id,
            openId: app.globalData.openId
          }).then((res)=>{
            wx.showToast({
              title: '删除成功！',
              icon: 'success',
              duration: 2000
            })
            _this.findList();
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  addressEdit: function(e){
    let curItem = this.data.addressList[e.currentTarget.dataset.index];
    wx.navigateTo({
      url: '../addressEdit/addressEdit',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: curItem })
      }
    })
  }
})
