const express=require('express');
const router = express.Router();

const {addFood,getallFoodItems,deleteOne} = require('../controller/foodController');


router.route('/add').post(addFood);
router.route('/allfooditems').get(getallFoodItems);
router.route('/delete/:id').delete(deleteOne);



module.exports = router;