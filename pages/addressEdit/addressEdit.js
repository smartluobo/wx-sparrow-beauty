//login.js

const req = require('../../utils/request/index.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    addressItem:{},
    checked: false,
    region: ['省', '市', '区'],
    consigneeName: "",
    consigneePhone:'',
    detailedAddress:'',
    isDefault: 0,
    // customItem: '全部',
  },

  onLoad: function (option) {
    let _this = this;
    const eventChannel = this.getOpenerEventChannel()
     // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
      _this.setData({
        // checked: data.isDefault,
        addressItem: data.data,
        region: [data.data.province,data.data.city,data.data.district],
        consigneeName: data.data.consigneeName,
        consigneePhone: data.data.consigneePhone,
        detailedAddress: data.data.detailedAddress,
        isDefault: data.data.isDefault
      })
    })
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
    req.address.update({
      "id": this.data.addressItem.id,
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
