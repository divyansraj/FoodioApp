const User = require('../models/UserModel')

exports.addtoCart = async(req,res,next)=> {
    try{
        let user = await User.findById(req.body.userid);
        
        let cartData = await user.cartData;
        if (!cartData[req.body.itemId]) {
          cartData[req.body.itemId] = 1;
        } else{ 
            cartData[req.body.itemId] += 1;
        }

        await User.findByIdAndUpdate(req.body.userid, { cartData });
        res.json({
            success: true,
            message: "Added to cart",
            user
        })
        console.log(cartData[req.body.itemId]);
    }
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }

}

exports.removeFromCart = async(req,res,next)=> {
    try{
    let user =await User.findById(req.body.userid);
    let cartData = await user.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await User.findByIdAndUpdate(req.body.userid, { cartData });
    res.json({
        success: true,
        message: "Removed from cart",
        user
    })
    console.log(user)

    }
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

exports.cartItems = async(req,res,next)=> {
    try{
        let user = await User.findById(req.body.userid);
        const cartData = await user.cartData;
        res.json({
          success: true,
          message: "Cart Items",
          cartData
        });
        console.log(cartData);
    }
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }

}