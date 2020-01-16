//login.js

const req = require('../../utils/request/index.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    checked: false,
    region: ['省', '市', '区'],
    consigneeName: "",
    consigneePhone:'',
    detailedAddress:'',
    isDefault: 0,
    // customItem: '全部',
  },

  onLoad: function () {

  },
  bindNameInput: function (e) {
    this.setData({
      consigneeName: e.detail.value
    })
  },
  bindPhoneInput: function (e) {
    this.setData({
      consigneePhone: e.detail.value
    })
  },
  bindAddressInput: function (e) {
    this.setData({
      detailedAddress: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  checkboxChange: function (e) {
    this.setData({
      isDefault: this.data.isDefault == 1 ? 0 : 1
    })
  },
  createAddress: function(){
    // debugger
    if(!this.data.consigneeName){
      wx.showToast({
        title: '请输入姓名！',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if(!this.data.consigneePhone){
      wx.showToast({
        title: '请输入手机号码！',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if(!this.data.region[2] == "区"){
      wx.showToast({
        title: '请选择省市区！',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if(!this.data.detailedAddress){
      wx.showToast({
        title: '请输入详细地址！',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let shippingAddress = `${this.data.region[0]}${this.data.region[1]}${this.data.region[2]}${this.data.detailedAddress}`;
    req.address.create({
      "openId": app.globalData.openId,
      "consigneeName": this.data.consigneeName,
      "consigneePhone": this.data.consigneePhone,
      "province": this.data.region[0],
      "city": this.data.region[1],
      "district": this.data.region[2],
      "detailedAddress": this.data.detailedAddress,
      "shippingAddress": shippingAddress,
      "isDefault": this.data.isDefault
    }).then((res) => {
      wx.showToast({
        title: '保存成功！',
        icon: 'success',
        duration: 2000
      })
      wx.redirectTo({
        url: '../addressList/addressList'
      })
    });
  }
})
