const { apiUrl } = require('../config.js');

module.exports = {
  install(req, request) {
    req.ad = {
      homeBanner() {
        const url = `${apiUrl}/api/home/getWxHomeTopBannerAd`;
        return request({ url, method: 'POST' });
      },
      topAd() {
        const url = `${apiUrl}/api/home/getWxHomeTopAd`;
        return request({ url, method: 'POST' });
      },
      addClickCount(data) {
        const url = `${apiUrl}/api/home/addAdClickCount`;
        return request({ url, method: 'POST', data });
      },
      gpAd() {
        const url = `${apiUrl}/api/gp/getGpAd`;
        return request({ url, method: 'POST' });
      }
    };
  },
};