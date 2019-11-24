const req = require('/prototype.js');

const goods = require('/api/goods.js');
const ad = require('/api/ad.js');
const user = require('/api/user.js');
const coupon = require('/api/coupon.js');
const cart = require('/api/cart.js');



req.use(goods);
req.use(ad);
req.use(user);
req.use(coupon);
req.use(cart);


module.exports = req;