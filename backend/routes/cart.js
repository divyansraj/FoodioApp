const express = require('express');
const { addtoCart, removeFromCart, cartItems, deleteCart } = require('../controller/cartController');
const isLoggedin = require('../middlewares/isLoggedin');
const router = express.Router();

router.route('/add').post(isLoggedin,addtoCart);
router.route('/delete').post(isLoggedin,removeFromCart);
router.route('/items').post(isLoggedin,cartItems)
router.route('/clearcart').post(isLoggedin,deleteCart)

module.exports = router;