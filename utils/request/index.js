const req = require('/prototype.js');

const goods = require('/api/goods.js');
const ad = require('/api/ad.js');
const user = require('/api/user.js');
const coupon = require('/api/coupon.js');
const cart = require('/api/cart.js');
const order = require('/api/order.js');
const other = require('/api/other.js');
const address = require('/api/address.js');



req.use(goods);
req.use(ad);
req.use(user);
req.use(coupon);
req.use(cart);
req.use(order);
req.use(other);
req.use(address);


module.exports = req;