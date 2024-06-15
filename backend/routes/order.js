const express = require('express');
const { placeOrder, verifyOrder, myOrders } = require('../controller/orderCOntroller');
const isLoggedin = require('../middlewares/isLoggedin');
const router = express.Router();



router.route('/place').post(isLoggedin,placeOrder)
router.route('/verify').post(verifyOrder)
router.route("/myorders").post(isLoggedin, myOrders);


module.exports = router