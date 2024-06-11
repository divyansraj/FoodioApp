const User = require('../models/UserModel')
const validator = require('validator')

exports.login = async(req,res,next)=> {
    try{
        const {email,password} =req.body;
        if(!email || !password){
            res.send("Email and password must be provided");
            return next(Error("Email and Password is required."));
        }

        const user = await User.findOne({email:email});

        if(!user){
            res.send("User does not exist");
            return next(Error("User does not exist."));
        }

        const validateUser = await user.isValidatedPassword(password);

        if(!validateUser){
            res.send("Password is incorrect");
            return next(Error("Password is incorrect."));
        }

        const generateJwtToken = user.generateJwtToken();
        user.password =undefined;
        res.json({
            success:true,
            token:generateJwtToken,
            user,
            message:"Login Successful"
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

exports.register=async(req,res,next)=> {
    try{
        const {name,email,password} =req.body;
        if(!name || !email || !password){
            return next(Error("Name, Email and Password is required."));
        }
        const user = await User.findOne({email:email})

        if(user){
            return next(Error("User already exist."))
        }
        if(password.length<6){
            res.send("Password must be at least 6 characters")
        }
        if(!validator.isEmail(email)){
            res.send("Please enter a valid email");
        }
        

        const newUser =await User.create({
            name:name,
            email:email,
            password:password,
        })
        const token = newUser.generateJwtToken();
        res.json({
            success:true,
            newUser,
            token
        })
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}