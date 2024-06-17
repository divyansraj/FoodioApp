require("dotenv").config()
const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.placeOrder = async(req,res,next)=>{
    // const frontend_url = "http://localhost:5173";
    const frontend_url = "https://foodio-app-yzyz.vercel.app/";
    try{
        const newOrder = new Order({
          userId: req.body.userid,
          items: req.body.items,
          amount: req.body.amount,
          address: req.body.address,
        });

        await newOrder.save();

        await User.findByIdAndUpdate(req.body.userid, { cartData: {} });

        const line_items = req.body.items.map((item)=> ({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
          line_items: line_items,
          mode: "payment",
          success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
          cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({
            success:true,
            session_url:session.url
        })

    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

exports.verifyOrder = async(req,res,next)=> {
    try{
        const {success , orderId}= req.body;
        if(success==="true"){
            await Order.findByIdAndUpdate(orderId,{payment: true});
            res.json({
                success:true,
                message:"Payment Successful"
            })
        }
            else{
                await Order.findByIdAndDelete(orderId);
                res.json({
                    success:false,
                    message:"Payment Unsuccessful"
                })
            }

    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

//user myorders
exports.myOrders = async(req,res,next) => {
    try{
        const { userid } = req.body;

        const order = await Order.find({ userId: userid });
        res.json({
          success: true,
          message: "My Orders",
          order,
        });
    }
    
    catch(error){
        console.log(error);
        res.json({
          success: false,
          message: "Error",
        });

    }
}


//admin all orders

exports.allorders = async(req,res) => {
    
    try{
        const orders = await Order.find({});
        console.log(orders);
        res.json({
          success: true,
          message: "All Orders",
          orders,
        });
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

//api updating order status

exports.updateStatus= async(req,res) => {
    try{
        await Order.findByIdAndUpdate(req.body.orderId,{status : req.body.status})
        res.json({
            success:true,
            message:"Status Updated"
        })
    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}


