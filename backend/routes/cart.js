const express = require('express');
const { addtoCart, removeFromCart, cartItems } = require('../controller/cartController');
const isLoggedin = require('../middlewares/isLoggedin');
const router = express.Router();

router.route('/add').post(isLoggedin,addtoCart);
router.route('/delete').post(isLoggedin,removeFromCart);
router.route('/items').post(isLoggedin,cartItems)

module.exports = router;