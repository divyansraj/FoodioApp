const express=require('express');
const router = express.Router();

const {addFood,getallFoodItems,deleteOne,getFoodDetails} = require('../controller/foodController');


router.route('/add').post(addFood);
router.route('/allfooditems').get(getallFoodItems);
router.route('/delete').delete(deleteOne);
router.route('/getfood/:id').get(getFoodDetails);



module.exports = router;