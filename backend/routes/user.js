const express = require('express');
const { login, register, getUserDetails } = require('../controller/userController');
const isLoggedin = require('../middlewares/isLoggedin');
const router =express.Router();


router.route('/login').post(login);
router.route('/register').post(register);
router.route('/userdetails').post(isLoggedin,getUserDetails)

module.exports =router;