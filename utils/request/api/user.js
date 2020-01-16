const { apiUrl } = require('../config.js');

module.exports = {
  install(req, request) {
    req.user = {
      //用户登录 通过code获取openid
      login(data){
        const url = `${apiUrl}/chaomes/api/user/login`;
        return request({ url, method: 'POST', data });
      },
      //用户上报
      reportApiUserInfo(data){
        const url = `${apiUrl}/chaomes/api/user/reportApiUserInfo`;
        return request({ url, method: 'POST', data });
      },
      //--------------------


      updateLastLogin(data) {
        const url = `${apiUrl}/api/my/updateLastLogin`;
        return request({ url, method: 'POST', data });
      },
      judgeType(data) {
        const url = `${apiUrl}/api/usertype/judgeUserType`;
        return request({ url, method: 'POST', data });
      },
      info(data) {
        const url = `${apiUrl}/api/my/getPersonalData`;
        return request({ url, method: 'POST', data });
      },
      updateDevice(data) {
        const url = `${apiUrl}/api/my/updateUserDeviceInfo`;
        return request({ url, method: 'POST', data });
      },
      updateIDAndMobile(data) {
        const url = `${apiUrl}/api/my/updateIdcardAndRealName`;
        return request({ url, method: 'POST', data });
      },
      updatePersonalData(data) {
        const url = `${apiUrl}/api/my/updatePersonalData`;
        return request({ url, method: 'POST', data, showLoading: true });
      },
      wechatToApp(data) {
        const url = `${apiUrl}/api/my/wechatToApp`;
        return request({ url, method: 'POST', data, showLoading: true });
      },
      wxBindStatus(data) {
        const url = `${apiUrl}/api/my/wxBindStatus`;
        return request({ url, method: 'POST', data, showLoading: true });
      },

      //------- 授权登录 -------
      loginInfo(data) {
        const url = `${apiUrl}/api/oauth2/getMiniProgramLoginInfo`;
        return request({ url, method: 'POST', data });
      },
      oauthUserInfo(data) {
        const url = `${apiUrl}/api/oauth2/getMiniProgramUserInfo`;
        return request({ url, method: 'POST', data });
      },
      syncLogin(data) {
        const url = `${apiUrl}/api/my/miniProgramSyncLogin`;
        return request({ url, method: 'POST', data });
      },

      //-----注册 登录 ----
      createToken() {
        const url = `${apiUrl}/api/SMS/createToken`;
        return request({ url, method: 'POST' });
      },
      sendSMS(data) {
        const url = `${apiUrl}/api/SMS/sendSMSForWebActivity`;
        return request({ url, method: 'POST', data, showLoading: true });
      },
      checkMobile(data) {
        const url = `${apiUrl}/api/my/checkRegMobile`;
        return request({ url, method: 'POST', data, showLoading: true });
      },
      bindMobile(data) {
        const url = `${apiUrl}/api/my/wxBindMobile`;
        return request({ url, method: 'POST', data, showLoading: true });
      },
      mobileLogin(data) {
        const url = `${apiUrl}/api/my/mobileToLogin`;
        return request({ url, method: 'POST', data, showLoading: true });
      },
      relate(data) {
        const url = `${apiUrl}/api/my/smsLoginAndRelationOfWx`;
        return request({ url, method: 'POST', data, showLoading: true });
      },
      //-------token--------
      flushLoginToken() { //刷新token
        const url = `${apiUrl}/api/my/flushLoginToken`;
        return request({ url, method: 'POST' })
      },
      confirmToken() {  //确认token是否过期
        const url = `${apiUrl}/api/my/confirmLoginTokenExpire`;
        return request({ url, method: 'POST' })
      },
      loginOut() {
        const url = `${apiUrl}/api/my/logOut`;
        return request({ url, method: 'POST' })
      },

      //------- 手机 相关 -------
      appSendSMS(data) {
        const url = `${apiUrl}/api/SMS/appSendSMS`;
        return request({ url, method: 'POST', data });
      },
      checkSMS(data) {
        const url = `${apiUrl}/api/SMS/newCheckSMS`;
        return request({ url, method: 'POST', data });
      },
      updateMobile(data) {
        const url = `${apiUrl}/api/my/updateMobile`;
        return request({ url, method: 'POST', data });
      },

      //------- 地址 --------
      submitAddress(data, type) {
        var url = '';
        if (type === 'add') {
          url = `${apiUrl}/api/user/address/addUserAddress`
        } else if (type === 'update') {
          url = `${apiUrl}/api/user/address/updateUserAddress`
        } else {
          console.log('type参数错误');
          return;
        }
        return request({ url, method: 'POST', data });
      },
      addressList(data) {
        const url = `${apiUrl}/api/user/address/getDocumentRemendList`;
        return request({ url, method: 'POST', data });
      },
      delAddress(data) {
        const url = `${apiUrl}/api/user/address/delUserAddress`;
        return request({ url, method: 'POST', data });
      },
      setDefaultAddress(data) {
        const url = `${apiUrl}/api/user/address/updateDefaultAddress`;
        return request({ url, method: 'POST', data });
      },
      defaultAddress(data) {
        const url = `${apiUrl}/api/user/address/getDefaultAddress`;
        return request({ url, method: 'POST', data });
      },
      addressDetail(data) {
        const url = `${apiUrl}/api/user/address/getUserAddressDetail`;
        return request({ url, method: 'POST', data });
      },

      //新人专区封面
      newUserImg() {
        const url = `${apiUrl}/api/goods/newuser/getNewUserImg`;
        return request({ url, method: 'POST' });
      },
      //分享赚绑定手机
      shareBindMobile(data) {
        const url = `${apiUrl}/api/share/wxBindMobile`;
        return request({ url, method: 'POST', data });
      },
      //分享赚关联
      shareWxToApp(data) {
        const url = `${apiUrl}/api/my/wechatToApp`;
        return request({ url, method: 'POST', data });
      },

      // ------ 意见反馈 ------
      feedbackType(data) {
        const url = `${apiUrl}/api/my/getFeedBackType`;
        return request({ url, method: 'POST', data });
      },
      submitFeedback(data) {
        const url = `${apiUrl}/api/my/addFeedBackNew`;
        return request({ url, method: 'POST', data });
      },

    };
  },
};